import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    overrides: {
      'no-console': 'warn',
      'style/brace-style': ['warn', '1tbs'],
      'ts/ban-ts-comment': 'off',
      'ts/no-unused-expressions': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'style/jsx-quotes': ['warn', 'prefer-single'],
      'style/jsx-one-expression-per-line': 'off',
    },
  },
})
