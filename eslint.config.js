import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tailwindcss from 'eslint-plugin-tailwindcss';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import * as mdx from 'eslint-plugin-mdx';

// require.resolve() doesn't exist in ESM — this is the equivalent way
// to get an absolute path from a relative one.
const tailwindConfigPath = fileURLToPath(new URL('./tailwind.config.ts', import.meta.url));

export default [
  // Ignores (replaces --ignore-path .gitignore from the old lint script —
  // this repo's .gitignore only has node_modules, per what you confirmed)
  {
    ignores: ['node_modules/**', '.react-router/**'],
  },

  js.configs.recommended,

  // Base JS/JSX + React + Tailwind (was the root-level config + first override)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2015,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      tailwindcss,
    },
    settings: {
      react: { version: 'detect' },
      tailwindcss: {
        config: tailwindConfigPath,
        callees: ['classnames', 'clsx', 'ctl', 'cx'],
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...tailwindcss.configs.recommended.rules,

      'no-multi-spaces': 'warn',
      'react/jsx-curly-newline': ['warn', { multiline: 'consistent', singleline: 'consistent' }],
      'react/jsx-max-props-per-line': ['warn', { maximum: 1, when: 'multiline' }],
      /*'tailwindcss/classnames-order': ['warn', {
        callees: ['classnames', 'clsx', 'ctl', 'cx'],
        config: 'tailwind.config.ts',
        prependCustom: true,
        removeDuplicates: true,
        whitespace: 'condense',
      }],*/
      'tailwindcss/no-custom-classname': ['warn', {
        cssFiles: ['app/css/tailwind.css', 'app/css/github-dark.css'],
        callees: ['classnames', 'clsx', 'ctl', 'cx'],
        whitelist: ['language-.*'],
      }],
      'tailwindcss/enforces-negative-arbitrary-values': 'warn',
      'tailwindcss/enforces-shorthand': 'warn',
      'tailwindcss/migration-from-tailwind-2': 'warn',
      'tailwindcss/no-arbitrary-value': 'off',
      'tailwindcss/no-contradicting-classname': 'error',
    },
  },

  // TypeScript (was the second override)
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
    },
  },

  // MDX (was the third override)
  {
    files: ['**/*.mdx'],
    ...mdx.flat,
    settings: {
      ...mdx.flat.settings,
      // Without this, eslint-plugin-mdx doesn't recognize YAML frontmatter
      // (---) at all — it parses it as regular MDX prose, and chokes with
      // "Could not parse expression with acorn" on any frontmatter value
      // containing a `{` (e.g. `download: { title: ..., href: ... }`).
      'mdx/remark-config-path': fileURLToPath(new URL('./.remarkrc.cjs', import.meta.url)),
    },
    plugins: {
      ...mdx.flat.plugins,
      react,
    },
    rules: {
      ...mdx.flat.rules,
      // eslint-plugin-mdx's JSX body isn't seen as JSX by the base
      // no-unused-vars rule on its own — jsx-uses-vars is what tells it
      // that an import referenced only inside JSX (e.g. <FlexContainer>,
      // <Image>) counts as used, so it stops false-flagging MDX imports.
      'react/jsx-uses-vars': 'error',
    },
  },


  // Node config files (was the "Node" override targeting .eslintrc.js —
  // that filename no longer exists; pointed at your actual node-run
  // config files instead)
  {
    files: ['*.config.js', '*.config.cjs', 'eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
