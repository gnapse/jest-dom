import {matcherHint} from 'jest-matcher-utils'
import isEqualWith from 'lodash/isEqualWith'
import {
  checkHtmlElement,
  compareArraysAsSet,
  getMessage,
  getSingleElementValue,
} from './utils'

export function toHaveValue(htmlElement, expectedValue) {
  checkHtmlElement(htmlElement, toHaveValue, this)

  if (
    htmlElement.tagName.toLowerCase() === 'input' &&
    ['checkbox', 'radio'].includes(htmlElement.type)
  ) {
    throw new Error(
      'input with type=checkbox or type=radio cannot be used with .toHaveValue(). Use .toHaveFormValues() instead',
    )
  }

  const receivedValue = getSingleElementValue(htmlElement)
  const expectsValue = expectedValue !== undefined
  return {
    pass: expectsValue
      ? isEqualWith(receivedValue, expectedValue, compareArraysAsSet)
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
