import { ValueHandlerContext } from './types'

export function gather(target: HTMLFormElement, getElementValue: (x: ValueHandlerContext) => any) {
    let result: { [key: string]: any } = {}

    for (let i = 0; i < target.elements.length; i++) {
        let element = target.elements.item(i) as HTMLElement | null
        if (element === null || element.nodeType !== element.ELEMENT_NODE) continue

        let name = element.getAttribute('name')
        if (name === null) continue

        let ctx = createHandlerContext(element)
        let value = getElementValue(ctx)
        let prev = result[name]

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
