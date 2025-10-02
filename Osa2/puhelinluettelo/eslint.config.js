import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'

export default [
  // ignore build output
  {
    ignores: ['dist/**'],
  },

  // base recommended config
  js.configs.recommended,

  // frontend-specific rules
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { window: 'readonly', document: 'readonly' },
    },
    plugins: { react: reactPlugin },
    rules: {
      'react/react-in-jsx-scope': 'off', // not needed in React 17+
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
    },
  },
]
