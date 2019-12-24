import { ValueHandlerContext } from './types'

export function gather(target: HTMLFormElement, getElementValue: (x: ValueHandlerContext) => any) {
    const result: { [key: string]: any } = {}

    for (let i = 0; i < target.elements.length; i++) {
        const element = target.elements.item(i) as HTMLElement | null
        if (element === null || element.nodeType !== element.ELEMENT_NODE) continue

        const name = element.getAttribute('name')
        if (name === null) continue

        const ctx = createHandlerContext(element)
        const value = getElementValue(ctx)
        const prev = result[name]

        if (prev === undefined) {
            result[name] = value === undefined ? null : value
        } else if (Array.isArray(prev)) {
            prev.push(value)
        } else {
            result[name] = [prev, value]
        }
    }

    return result
}

function createHandlerContext(element: HTMLElement): ValueHandlerContext {
    return {
        element,
        tagName: element.tagName.toLowerCase(),
        type: element.getAttribute('type')?.toLowerCase() as string | null,
        value: (element as any).value,
        checked: (element as any).checked,
        multiple: element.hasAttribute('multiple'),
    }
}
