module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:@next/next/recommended',
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-compiler', 'react-refresh', 'prettier', 'jest'],
  parserOptions: {
    project: ['./tsconfig.json', 'tsconfig.vite.json'],
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react-refresh/only-export-components': 'off',
    'jest/no-mocks-import': 'off',
    'max-len': ['error', { code: 120 }],
    'arrow-body-style': ['off', 'never'],
    'react/jsx-no-useless-fragment': 'off',
    'react/prop-types': 'off',
    'operator-linebreak': 'off',
    'react/state-in-constructor': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/destructuring-assignment': 'off',
    'implicit-arrow-linebreak': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'react/jsx-one-expression-per-line': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'no-console': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'object-curly-newline': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-restricted-globals': 'off',
    'jest/no-commented-out-tests': 'off',
    'consistent-return': 'off'
  },
  overrides: [
    {
      files: ['src/store/**/*.ts', 'src/store/**/*.tsx'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
  ],
};