import {matcherHint} from 'jest-matcher-utils'
import jestDiff from 'jest-diff'
import chalk from 'chalk'
import {checkHtmlElement, parseCSS} from './utils'

function getStyleDeclaration(document, css) {
  const styles = {}

  // The next block is necessary to normalize colors
  const copy = document.createElement('div')
  Object.keys(css).forEach(property => {
    copy.style[property] = css[property]
    styles[property] = copy.style[property]
  })

  return styles
}

function isSubset(styles, computedStyle) {
  return Object.entries(styles).every(
    ([prop, value]) =>
      computedStyle.getPropertyValue(prop.toLowerCase()) === value,
  )
}

function printoutStyles(styles) {
  return Object.keys(styles)
    .sort()
    .map(prop => `${prop}: ${styles[prop]};`)
    .join('\n')
}

// Highlights only style rules that were expected but were not found in the
// received computed styles
function expectedDiff(expected, computedStyles) {
  const received = Array.from(computedStyles)
    .filter(prop => expected[prop])
    .reduce(
      (obj, prop) =>
        Object.assign(obj, {[prop]: computedStyles.getPropertyValue(prop)}),
      {},
    )
  const diffOutput = jestDiff(
    printoutStyles(expected),
    printoutStyles(received),
  )
  // Remove the "+ Received" annotation because this is a one-way diff
  return diffOutput.replace(`${chalk.red('+ Received')}\n`, '')
}

function getCss(document, css) {
  if (typeof css === 'object') {
    const sandboxElement = document.createElement('div')
    Object.assign(sandboxElement.style, css)
    return sandboxElement.style.cssText
  }

  return css
}

export function toHaveStyle(htmlElement, expectedCss) {
  checkHtmlElement(htmlElement, toHaveStyle, this)
  const css = getCss(htmlElement.ownerDocument, expectedCss)
  const parsedCSS = parseCSS(css, toHaveStyle, this)
  const {getComputedStyle} = htmlElement.ownerDocument.defaultView

  const expected = getStyleDeclaration(htmlElement.ownerDocument, parsedCSS)
  const received = getComputedStyle(htmlElement)

  return {
    pass: isSubset(expected, received),
    message: () => {
      const matcher = `${this.isNot ? '.not' : ''}.toHaveStyle`
      return [
        matcherHint(matcher, 'element', ''),
        expectedDiff(expected, received),
      ].join('\n\n')
    },
  }
}
