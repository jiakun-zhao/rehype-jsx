import type { Processor } from 'unified'
import type { Node } from 'hast-util-to-estree/lib'
import type { Options } from 'hast-util-to-estree'
import { toEstree } from 'hast-util-to-estree'
import { jsx, toJs } from 'estree-util-to-js'

export default function rehypeJsx(this: Processor, options?: Options) {
  this.Compiler = function (tree: Node): string {
    const _options = Object.assign({ elementAttributeNameCase: 'html', stylePropertyNameCase: 'css' }, options)
    const estree = toEstree(tree, options ?? _options)
    const jsxCode = toJs(estree, { handlers: jsx }).value
    return jsxCode
  }
}
