import { rehype } from 'rehype'
import { it } from 'vitest'
import rehypeJsx from './index'

it('should be work', () => {
  rehype()
    .data('settings', { fragment: true })
    .use(rehypeJsx)
    .process('<div>Hello World</div>')
    .then(({ value }) => {
      console.log(value) // <><div>{"Hello World"}</div></>;
    })
})
