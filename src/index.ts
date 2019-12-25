import { gather } from './core'
import { combine } from './utils'
import { defaultHandlers } from './handlers'

export { ValueHandler, ValueHandlerContext } from './types'
export { gather } from './core'

const handler = combine(...defaultHandlers)

/**
 * Given form, returns plain object with form element values
 * @param target - HTML form element
 * @retrun - form-data object
 */
export const getFormData = (target: HTMLFormElement) => gather(target, handler)
