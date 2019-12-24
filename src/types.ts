import { Middleware } from './utils'

export type ValueHandlerContext = {
    element: HTMLElement,
    tagName: string,
    type?: string | null,
    value?: string | null,
    checked?: boolean,
    multiple: boolean,
}

export type ValueHandler<T = any> = Middleware<ValueHandlerContext, T | null | undefined>