import { ValueHandlerContext, ValueHandler } from './types'

type HTMLArray<T> = { length: number, item: (i: number) => T | null }

export function toArray<T>(src: HTMLArray<T>): Array<T> {
    const result = new Array<T>(src.length)

    for (let i = 0; i < src.length; i++) {
        const item = src.item(i)
        if (item === null) {
            continue
        }

        result[i] = item
    }

    return result
}


export type Next<A, B> = (context: A) => B
export type Middleware<A, B> = (context: A, next: Next<A, B>) => B

export function combine<A, B>(...fns: Middleware<A, B>[]): Next<A, B> {
    return fns.reduceRight<Next<A, B>>(
        (prev, next) => (ctx: A) => next(ctx, prev),
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