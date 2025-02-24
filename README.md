# rehype-jsx

![npm version](https://img.shields.io/npm/v/rehype-jsx?color=%23954)

Rehype Plugin to JSX

#### Install

```bash
npm install rehype-jsx
```

#### Usage

```ts
import rehype from 'rehype'
import rehypeJsx from 'rehype-jsx'

rehype()
  .data('settings', { fragment: true })
  .use(rehypeJsx)
  .process('<div>Hello World</div>')
  .then(({ value }) => {
    console.log(value) // <><div>{"Hello World"}</div></>;
  })
```

#### License

MIT
