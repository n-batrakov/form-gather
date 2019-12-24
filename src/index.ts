import { gather } from './core'
import { combine } from './utils'
import { ValueHandler } from './types'
import * as defaultHandlers from './handlers'

export const composeFormHandlers = (...customHandlers: ValueHandler[]) => {
    const handler = combine(
        ...customHandlers,
        ...Object.values(defaultHandlers),
        ctx => ctx.value,
    )

    return (target: HTMLFormElement) => gather(target, handler)
}


export const getFormData = composeFormHandlers()

export { ValueHandler, ValueHandlerContext } from './types'
export { gather } from './core'