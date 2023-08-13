import type { Processor } from 'unified'
import type { Identifier } from 'estree-jsx'
import { jsx, toJs } from 'estree-util-to-js'
import { toEstree } from 'hast-util-to-estree'
import { valueToEstree } from 'estree-util-value-to-estree'
import { visit as visitEstree } from 'estree-util-visit'
import { visit } from 'unist-util-visit'
import type { HastNodes } from 'hast-util-to-estree/lib'
import type { Options } from './types'
import { createImportDefaultDeclaration, createJSXIdentifier, createJSXSpreadAttribute, createSpecialArrowFunctionExpression, isImageNode, isJSXOpeningElement, isSrcAttribute, isStringLiteral, toCompName } from './utils'

export default function rehypeJsx(this: Processor, options: Options) {
  this.Compiler = function (hast: HastNodes): string {
    const wrapper = toCompName('Wrapper')
    const mods: Record<string, string> = { [wrapper]: options.wrapper }
    const components = new Map<string, string>()

    Object.entries(options.components ?? {}).forEach(([key, value]) => {
      components.set(key.toLowerCase(), value)
    })

    function appendToMods(name: string, value: string) {
      mods[name] = value
      return name
    }

    if (options.components) {
      visit(hast, 'element', (node) => {
        if (components.has(node.tagName))
          node.tagName = appendToMods(toCompName(node.tagName), components.get(node.tagName)!)
      })
    }

    const tree = toEstree(hast, options.estreeOptions ?? { elementAttributeNameCase: 'html', stylePropertyNameCase: 'css' })
    const firstNode = tree.body.length === 1 ? tree.body[0] : null
    if (!firstNode || firstNode.type !== 'ExpressionStatement')
      throw new Error('Unexpected tree body')

    visitEstree(firstNode.expression, (node) => {
      if (isJSXOpeningElement(node) && isImageNode(node)) {
        node.attributes = node.attributes.map((_node) => {
          if (!isSrcAttribute(_node) || !isStringLiteral(_node.value))
            return _node
          const argument: Identifier = {
            type: 'Identifier',
            name: appendToMods(`__image_${Object.keys(mods).length}__`, _node.value.value),
          }
          return createJSXSpreadAttribute(argument)
        })
      }
    })

    tree.body = [
      ...Object.entries(mods).map(createImportDefaultDeclaration),
      {
        type: 'ExportDefaultDeclaration',
        declaration: createSpecialArrowFunctionExpression({
          type: 'JSXElement',
          openingElement: {
            type: 'JSXOpeningElement',
            selfClosing: false,
            name: createJSXIdentifier(wrapper),
            attributes: options.props ? [createJSXSpreadAttribute(valueToEstree(options.props))] : [],
          },
          children: [{
            type: 'JSXExpressionContainer',
            expression: createSpecialArrowFunctionExpression(firstNode.expression),
          }],
          closingElement: {
            type: 'JSXClosingElement',
            name: createJSXIdentifier(wrapper),
          },
        }),
      },
    ]

    return toJs(tree, { handlers: jsx }).value
  }
}
