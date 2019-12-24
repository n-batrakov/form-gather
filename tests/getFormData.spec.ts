import { getFormData } from '../src'

const testData: Array<[string, any]> = [
    ['<input type="text" name="text" value="test" />', { text: 'test' }],
    ['<input type="number" name="number" value="42" />', { number: 42 }],
    ['<input type="number" name="nan" value="" />', { nan: NaN }],
    ['<textarea name="textarea">test</textarea>', { textarea: 'test' }],
    ['<input type="date" name="date" value="2019-01-01" />', { date: new Date('2019-01-01') }],
    [
        `<select name="select">
            <option value="value0"></option>
            <option value="value1" selected></option>
        </select>`,
        { select: 'value1' },
    ],
    [
        `<select name="multiselect" multiple>
            <option value="value0"></option>
            <option value="value1" selected></option>
        </select`,
        { multiselect: [null, 'value1'] },
    ],
    [
        '<input type="checkbox" name="checkbox" value="id0" checked />',
        { checkbox: 'id0' },
    ],
    [
        '<input type="checkbox" name="checkboxUnchecked" value="true" />',
        { checkboxUnchecked: null },
    ],
    [
        `<input type="checkbox" name="checkboxMany" value="id0" checked />
         <input type="checkbox" name="checkboxMany" value="id1" checked />
         <input type="checkbox" name="checkboxMany" value="id2" />`,
        { checkboxMany: ['id0', 'id1', null] },
    ],
    [
        `<input type="checkbox" name="checkboxManyUnchecked" value="id1" />
         <input type="checkbox" name="checkboxManyUnchecked" value="id2" />`,
        { checkboxManyUnchecked: [null, null] },
    ],
    [
        `<input type="radio" name="radio" value="id0" />
         <input type="radio" name="radio" value="id1" checked />
         <input type="radio" name="radio" value="id2" />`,
        { radio: [null, 'id1', null] },
    ],
    [
        `<input type="radio" name="radioUnchecked" value="id0" />
         <input type="radio" name="radioUnchecked" value="id1" />`,
        { radioUnchecked: [null, null] },
    ],
    [
        `<input type="text" name="textArray" value="1" />
         <input type="text" name="textArray" value="2" />
         <input type="text" name="textArray" value="3" />`,
        { textArray: ['1', '2', '3'] },
    ],
]

describe('getFormData', () => {
    testData.forEach(([element, expected]) => {
        const testName = Object.keys(expected).join(' ')

        it(testName, () => {
            const form$ = document.createElement('form')
            form$.innerHTML = element

            const actual = getFormData(form$)

            expect(actual).toEqual(expected)
        })
    })
})
