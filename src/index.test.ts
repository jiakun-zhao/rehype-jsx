import { expect, it } from 'vitest'
import { rehype } from 'rehype'
import rehypeJsx from './index'

it('should work', async () => {
  expect(
    await rehype()
      .data('settings', { fragment: true })
      .use(rehypeJsx)
      .process('<h1>1Hello world!</h1>'),
  ).toMatchInlineSnapshot(`
    VFile {
      "cwd": "/Users/jiakun/Space/Code/github.com/jiakun-zhao/rehype-jsx",
      "data": {},
      "history": [],
      "messages": [],
      "value": "<><h1>{\\"1Hello world!\\"}</h1></>;
    ",
    }
  `)
})
