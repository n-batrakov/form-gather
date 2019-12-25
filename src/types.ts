export type ValueHandlerContext = {
    element: HTMLElement,
    tagName: string,
    type?: string | null,
    value?: string | null,
    checked?: boolean,
    multiple: boolean,
}

type In = ValueHandlerContext
type Out<T> = T | null | undefined
export type ValueHandlerCallback<T = any> = (x: In) => Out<T>
export type ValueHandler<T = any> = (val: In, next: ValueHandlerCallback<T>) => Out<T>

export type HTMLArray<T> = { length: number, item: (i: number) => T | null }