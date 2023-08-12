import type { ArrowFunctionExpression, BlockStatement, Expression, ImportDeclaration, JSXAttribute, JSXElement, JSXExpressionContainer, JSXFragment, JSXIdentifier, JSXOpeningElement, JSXSpreadAttribute, Literal, Node } from 'estree-jsx'
import type { StringLiteral } from './types'

export function toCompName(name: string) {
  return `__${name.toLowerCase()}__`
}

export function isImageNode(node: JSXOpeningElement): boolean {
  if (node.name.type !== 'JSXIdentifier')
    return false
  const name = node.name.name
  return name === 'img' || name === toCompName('img')
}

export function isStringLiteral(node: Literal | JSXElement | JSXExpressionContainer | JSXFragment | null): node is StringLiteral {
  if (node?.type !== 'Literal')
    return false
  return typeof node.value === 'string'
}

export function isSrcAttribute(node: JSXSpreadAttribute | JSXAttribute): node is JSXAttribute {
  if (node.type !== 'JSXAttribute')
    return false
  if (node.name.type !== 'JSXIdentifier')
    return false
  return node.name.name === 'src'
}

export function isJSXOpeningElement(node: Node): node is JSXOpeningElement {
  return node.type === 'JSXOpeningElement'
}

export function createJSXSpreadAttribute(argument: Expression): JSXSpreadAttribute {
  return {
    type: 'JSXSpreadAttribute',
    argument,
  }
}

export function createImportDefaultDeclaration(props: [string, string]): ImportDeclaration {
  const [name, value] = props
  return {
    type: 'ImportDeclaration',
    specifiers: [{
      type: 'ImportDefaultSpecifier',
      local: { type: 'Identifier', name },
    }],
    source: { type: 'Literal', value },
  }
}

export function createSpecialArrowFunctionExpression(body: Expression | BlockStatement): ArrowFunctionExpression {
  return {
    type: 'ArrowFunctionExpression',
    expression: true,
    params: [],
    generator: false,
    async: false,
    body,
  }
}

export function createJSXIdentifier(name: string): JSXIdentifier {
  return { type: 'JSXIdentifier', name }
}
