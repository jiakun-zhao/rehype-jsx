import { rehype } from 'rehype'
import { expect, it } from 'vitest'
import rehypeJsx from './index'

it('should be work', async () => {
  const { value } = await rehype()
    .data('settings', { fragment: true })
    .use(rehypeJsx)
    .process('<div>Hello World</div>')

  expect(value.toString().trim()).toMatchInlineSnapshot(`"<><div>{"Hello World"}</div></>;"`)
})
