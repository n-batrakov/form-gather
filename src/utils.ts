import { ValueHandlerContext, ValueHandler, ValueHandlerCallback } from './types'

type HTMLArray<T> = { length: number, item: (i: number) => T | null }


/**
 * Converts HTML collection into plain array
 * @param src - source html collection
 * @return - plain array
 */
export function toArray<T>(src: HTMLArray<T>): Array<T> {
    let result = new Array<T>()

    for (let i = 0; i < src.length; i++) {
        let item = src.item(i)
        item !== null && result.push(item)
    }

    return result
}

/**
 * Combines value handling functions into single handler function
 * @param fns - element value handling functions
 * @return - single value handler
 */
export function combine<A, B>(...fns: ValueHandler[]): ValueHandlerCallback {
    return fns.reduceRight<ValueHandlerCallback>(
        (prev, next) => ctx => next(ctx, prev),
        () => { throw new Error('No middleware handled the context') },
    )
}

/**
 * Returns value handler based on trigger predicate
 * @param predicate - function to determine when `action` should be called
 * @param action - function to call when `predicate` argument returns true
 * @return - element value handler function
 */
export function createHandler<T>(
    predicate: (ctx: ValueHandlerContext) => boolean,
    action: ValueHandler<T>,
): ValueHandler<T> {
    return (ctx, next) => predicate(ctx) ? action(ctx, next) : next(ctx)
}

/**
 * Returns function of handler context to boolean, which may be used as a `createHandler` predicate
 * @param tag - HTML element tag name (case-insensitive) to include
 * @param {...string} types - type attribute values to include
 * @return - predicate of handler context
 */
export function filterElement(tag: string, ...types: string[]) {
    const ltag = tag.toLowerCase()
    const ltypes = types.filter(x => typeof x === 'string').map(x => x.toLowerCase())

    return (ctx: ValueHandlerContext) => ltypes.length === 0
        ? ltag === tag
        : ltag === tag
          && typeof ctx.type === 'string'
          && ltypes.indexOf(ctx.type) >= 0
}