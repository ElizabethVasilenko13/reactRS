module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-compiler', 'react-refresh'],
  parserOptions: {
    project: ['./tsconfig.json', 'tsconfig.vite.json'],
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'max-len': ["error", { "code": 120 }],
    'arrow-body-style': ['off', 'never'],
    'react/jsx-no-useless-fragment': 'off',
    'react/prop-types': 'off',
    'operator-linebreak': 'off',
    'react/state-in-constructor': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/destructuring-assignment': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'react/jsx-one-expression-per-line': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'no-console': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'object-curly-newline': 'off',
  },
};
