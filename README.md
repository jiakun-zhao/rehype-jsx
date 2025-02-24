# rehype-jsx

![npm version](https://img.shields.io/npm/v/rehype-jsx?color=%23954)

Rehype Plugin to JSX

### Install

```bash
npm install rehype-jsx
```

### Usage

```ts
import rehype from 'rehype'
import rehypeJsx from 'rehype-jsx'

const { value } = await rehype()
  .data('settings', { fragment: true })
  .use(rehypeJsx)
  .process('<div>Hello World</div>')

expect(value.toString().trim()).toMatchInlineSnapshot(`"<><div>{"Hello World"}</div></>;"`)
```

### LICENSE

MIT License © 2025-PRESENT [Jiakun Zhao](https://github.com/jiakun-zhao)
