/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },

  // Base config
  extends: ['plugin:react/recommended', 'eslint:recommended', 'plugin:mdx/recommended', 'plugin:tailwindcss/recommended'],

  plugins: ['react', 'tailwindcss'],

  rules: {
    'no-multi-spaces': 'warn',
    'react/jsx-curly-newline': [1, {'multiline': 'consistent', 'singleline': 'consistent'}],
    'react/jsx-max-props-per-line': [1, {'maximum': 1, 'when': 'multiline'}],
    'tailwindcss/classnames-order': ['warn', {
      'callees': ['classnames', 'clsx', 'ctl', 'cx'],
      'config': 'tailwind.config.ts',
      'prependCustom': true,
      'removeDuplicates': true,
      'whitespace': 'condense',
    }],
    'tailwindcss/enforces-negative-arbitrary-values': 'warn',
    'tailwindcss/enforces-shorthand': 'warn',
    'tailwindcss/migration-from-tailwind-2': 'warn',
    'tailwindcss/no-arbitrary-value': 'off',
    'tailwindcss/no-contradicting-classname': 'error',
  },

  settings: {
    tailwindcss: {
      config: require.resolve('./tailwind.config.ts'),
    },
  },

  overrides: [
    // React
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: ['react', 'jsx-a11y'],
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
        formComponents: ['Form'],
        linkComponents: [
          {name: 'Link', linkAttribute: 'to'},
          {name: 'NavLink', linkAttribute: 'to'},
        ],
      },
    },

    // Typescript
    {
      files: ['**/*.{ts,tsx}'],
      plugins: ['@typescript-eslint', 'import'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.json',
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
    },

    // MDX
    {
      files: ['**/*.mdx'],
      extends: ['plugin:mdx/recommended'],
      parser: 'eslint-mdx',
    },

    // Node
    {
      files: ['.eslintrc.js'],
      env: {
        node: true,
      },
    },
  ],
};
