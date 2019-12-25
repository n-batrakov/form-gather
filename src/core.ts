import { ValueHandlerContext, HTMLArray } from './types'

type ElementsArray = HTMLArray<Element> | Array<Element>

/**
 * Function for form element values handling
 * @name getElementValue
 * @function
 * @param {Object} context - form element context, including element itself and its most used properties and attributes
 * @return - form element value
*/

/**
 * @name getItem
 * @function
 * @param {number} i - element index
 * @return - element
 */

/**
 * Given form and element value handler, returns form-data object
 * @param {{ length: number, item: getItem }} elements - form elements collection
 * @param {getElementValue} getElementValue - function for form element values handling
 * @return {Object} - form data object
 */
export function gather(elements: ElementsArray, getElementValue: (x: ValueHandlerContext) => any): { [key: string]: any } {
    let result: { [key: string]: any } = {}

    for (let i = 0; i < elements.length; i++) {
        let element = (Array.isArray(elements) ? elements[i] : elements.item(i)) as HTMLElement | null
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
