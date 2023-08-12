import type { BaseExpression, BaseNode } from 'estree-jsx'

export interface Options {
  wrapper: string
  props?: any
  components?: Record<string, string>
  estreeOptions?: import('hast-util-to-estree').Options
}

export interface StringLiteral extends BaseNode, BaseExpression {
  type: 'Literal'
  value: string
  raw?: string | undefined
}
