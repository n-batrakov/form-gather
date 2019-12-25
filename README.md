# form-gather

JavaScript HTML Form to object conversion library.

Works similar to browsers FormData but returns a plain object and works in IE 9+ without polyfills.

Features:
* Does not depend on `FormData` browser API.
* Customizable - you can decide how to handle every form element.
* Tiny - 187 bytes (minified and gzipped). No dependencies. Size Limit controls the size.
* Written with TypeScript.

## Getting started

```
$ npm install form-gather
```

### Sample

Let's say we have a form:


```html
<form>
    <input type="text" name="str" />
    <input type="number" name="number" />
    <input type="date" name="date" />
    <input type="checkbox" name="bool" value="1" />

    <input type="radio" name="radio" value="1" />
    <input type="radio" name="radio" value="2" />
    <input type="radio" name="radio" value="3" />

    <select name="select">
        <option value="value0">One</option>
        <option value="value1" selected>Two</option>
    </select>
</form>
```

Then the following code on form submission

```js
import { getFormData } from 'form-gather'

function onSumbit(event) {
    let form = event.target

    const data = getFormData(form)

    console.log(data)
}
```

will output

```js
{
    str: '',
    number: 42,
    date: Date(),
    checkbox: '1',
    radio: [null, 2, null],
    select: 'value1'
}
```

## How it works

`getFormData` internally looks like the following:

```js
const handler = combine(...defaultHandlers)
const getFormData = (form) => gather(form.elements, handler)
```

### `gather`

The main function is `gather`. It takes HTML elements array and a single function to retrieve form elements values.

Consider the example below:

```js
let element = document.createElement('input')
element.name = 'test'
element.value = '42'

let form = gather([element], context => context.value)

console.log(form) // output: { test: '42' }
```

The two important parts are:
* elements *MUST* be of type `HTMLElement` (i.e. `nodeType === Element.ELEMENT_NODE`).
* elements *MUST* have `name` property, otherwise there's no key to bind value to.

The function argument returns the value, assosiated with the element. The whole thing may be simplified to:

```js
let name = 'test'
let context = { value: '42' }

let form = {
    [name]: context.value
}
```

And that's basically it. The other interesting things:
* `gather` may take plain array (`Array<Element>`) or HTML-like collection (`{ length: number, item: (i) => Element }`)
* function argument accepts `context` which looks like:
    ```ts
    type Context = {
        element: HTMLElement,
        tagName: string,
        type?: string | null,
        value?: string | null,
        checked?: boolean,
        multiple: boolean,
    }
    ```

### Value handlers

`gather` functional argument is implemented by chaining together several value handlers.

`combine` function is used for chaining. It accepts spread array of functions with signature like:

```ts
handler(context: Context, next: (context: Context) => any): any
```

The second argument allows you to call the next handler,
which may be used to skip execution or to alter the next result.
When the handler processed the element fully, it simply skips the `next` call, terminating the chain.

The are many default handlers, but you can add your own. Simply use

```js
import { gather, defaultHandlers, combine } from 'form-gather'

const customHandlers = []

const handler = combine(
    ...customHandlers,
    ...defaultHandlers
)

const getFormData = (form) => gather(form.elements, handler)
```
