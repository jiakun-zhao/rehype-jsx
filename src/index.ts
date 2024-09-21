import type { Options } from 'hast-util-to-estree'
import type { Processor } from 'unified'
import { jsx, toJs } from 'estree-util-to-js'
import { toEstree } from 'hast-util-to-estree'

export default function rehypeJsx(this: Processor, options?: Options) {
  this.compiler = function (root: any): string {
    const tree = toEstree(root, options ?? { elementAttributeNameCase: 'html', stylePropertyNameCase: 'css' })
    return toJs(tree, { handlers: jsx }).value
  }
}
