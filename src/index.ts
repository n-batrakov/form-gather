import { gather } from './core'
import { combine } from './utils'
import { defaultHandlers } from './handlers'

export { ValueHandler, ValueHandlerContext } from './types'
export { gather } from './core'

export const getFormData = (target: HTMLFormElement) => gather(target, combine(...defaultHandlers))
