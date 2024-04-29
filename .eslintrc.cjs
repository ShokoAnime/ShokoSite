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
  extends: ['plugin:react/recommended', 'eslint:recommended', 'plugin:mdx/recommended', 'plugin:tailwindcss/recommended', 'plugin:prettier/recommended'],

  plugins: ['react', '@stylistic', 'tailwindcss'],

  rules: {
    'no-multi-spaces': 'warn',
    '@stylistic/indent': ['error', 2],
    'react/jsx-curly-newline': [1, { 'multiline': 'consistent', 'singleline': 'consistent' }],
    'react/jsx-max-props-per-line': [1, { 'maximum': 1, 'when': 'multiline' }],
    'tailwindcss/classnames-order': ['warn', {
      'callees': ['classnames', 'clsx', 'ctl'],
      'config': 'tailwind.config.js',
      'prependCustom': true,
      'removeDuplicates': true,
      'whitespace': 'condense',
      'whitelist': [
        'bg-backgroundAlt-light',
        'bg-backgroundAlt-dark',
        'bg-backgroundNorm-light',
        'bg-backgroundNorm-dark',
        'bg-buttonAlt-light',
        'bg-buttonAlt-dark',
        'bg-header-light',
        'bg-header-dark',
        'bg-overlay-light',
        'bg-overlay-dark',
        'border-border-light',
        'border-border-dark',
        'text-highlight-light',
        'text-highlight-dark',
        'text-link-light',
        'text-link-dark',
        'text-textBody-light',
        'text-textBody-dark',
        'text-linkHover-light',
        'text-linkHover-dark',
        'text-textAlt-light',
        'text-textAlt-dark',
        'text-textHeader-light',
        'text-textHeader-dark',
      ],
    }],
    'tailwindcss/enforces-negative-arbitrary-values': 'warn',
    'tailwindcss/enforces-shorthand': 'warn',
    'tailwindcss/migration-from-tailwind-2': 'warn',
    'tailwindcss/no-arbitrary-value': 'off',
    'tailwindcss/no-custom-classname': 'warn',
    'tailwindcss/no-contradicting-classname': 'error',
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
          { name: 'Link', linkAttribute: 'to' },
          { name: 'NavLink', linkAttribute: 'to' },
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
