import type { Processor } from 'unified'
import { jsx, toJs } from 'estree-util-to-js'
import type { Options } from 'hast-util-to-estree'
import { toEstree } from 'hast-util-to-estree'
import type { HastNodes } from 'hast-util-to-estree/lib'

export default function rehypeJsx(this: Processor, options?: Options) {
  this.Compiler = function (hast: HastNodes): string {
    const tree = toEstree(hast, options ?? { elementAttributeNameCase: 'html', stylePropertyNameCase: 'css' })
    return toJs(tree, { handlers: jsx }).value
  }
}
