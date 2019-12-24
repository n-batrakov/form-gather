import { toArray, createHandler, filterElement } from './utils'

const SKIP_VALUE = undefined
const NO_VALUE = null
const NOT_SELECTED_VALUE = null


export const checkbox = createHandler(
    filterElement('input', 'checkbox'),
    ctx => ctx.checked ? ctx.value : NOT_SELECTED_VALUE,
)

export const radiobox = createHandler(
    filterElement('input', 'radio'),
    ctx => ctx.checked ? ctx.value : NOT_SELECTED_VALUE,
)

export const inputNumber = createHandler(
    filterElement('input', 'number'),
    ctx => parseFloat(ctx.value!),
)

export const inputDate = createHandler(
    filterElement('input', 'date', 'datetime-local'),
    ctx => new Date(Date.parse(ctx.value!)),
)

export const inputStatic = createHandler(
    filterElement('input', 'button', 'submit', 'reset', 'image'),
    () => SKIP_VALUE,
)

export const inputFile = createHandler(
    filterElement('input', 'file'),
    (ctx) => {
        const multiple = ctx.multiple
        const filesList = (ctx.element as any).files as FileList | null

        if (filesList === null) return SKIP_VALUE

        const files = toArray(filesList)

        if (multiple) {
            return files
        } else {
            return files.length === 1 ? files[0] : NO_VALUE
        }
    },
)

export const select = createHandler(
    filterElement('select'),
    (ctx) => {
        if (!ctx.multiple) {
            return ctx.value
        }

        const select = ctx.element as HTMLSelectElement
        return toArray(select.options).map(x => x?.selected ? x.value : NOT_SELECTED_VALUE)
    },
)
