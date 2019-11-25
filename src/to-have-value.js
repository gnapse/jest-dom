import {matcherHint} from 'jest-matcher-utils'
import {checkHtmlElement, getMessage, getSingleElementValue} from './utils'

export function toHaveValue(htmlElement, expectedValue) {
  checkHtmlElement(htmlElement, toHaveValue, this)

  if (
    htmlElement.tagName.toLowerCase() === 'input' &&
    ['checkbox', 'radio'].includes(htmlElement.type)
  ) {
    throw new Error(
      'input with type=checkbox or type=radio cannot be used with .toHaveValue(). Use .toBeChecked() for type=checkbox or .toHaveFormValues() instead',
    )
  }

  const receivedValue = getSingleElementValue(htmlElement)
  const expectsValue = expectedValue !== undefined
  return {
    pass: expectsValue
      ? this.equals(receivedValue, expectedValue)
      : Boolean(receivedValue),
    message: () => {
      const to = this.isNot ? 'not to' : 'to'
      const matcher = matcherHint(
        `${this.isNot ? '.not' : ''}.toHaveValue`,
        'element',
        expectedValue,
      )
      return getMessage(
        matcher,
        `Expected the element ${to} have value`,
        expectsValue ? expectedValue : '(any)',
        'Received',
        receivedValue,
      )
    },
  }
}
