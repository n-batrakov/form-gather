import { ValueHandlerContext, ValueHandler, ValueHandlerCallback } from './types'

type HTMLArray<T> = { length: number, item: (i: number) => T | null }

export function toArray<T>(src: HTMLArray<T>): Array<T> {
    let result = new Array<T>()

    for (let i = 0; i < src.length; i++) {
        let item = src.item(i)
        item !== null && result.push(item)
    }

    return result
}


export function combine<A, B>(...fns: ValueHandler[]): ValueHandlerCallback {
    return fns.reduceRight<ValueHandlerCallback>(
        (prev, next) => ctx => next(ctx, prev),
        () => { throw new Error('No middleware handled the context') },
    )
}

export function createHandler<T>(
    filter: (ctx: ValueHandlerContext) => boolean,
    action: ValueHandler<T>,
): ValueHandler<T> {
    return (ctx, next) => filter(ctx) ? action(ctx, next) : next(ctx)
}

export function filterElement(tag: string, ...types: string[]) {
    return (ctx: ValueHandlerContext) => types.length === 0
        ? ctx.tagName === tag
        : ctx.tagName === tag
          && ctx.type !== undefined
          && ctx.type !== null
          && types.indexOf(ctx.type) >= 0
}