import antfu from '@antfu/eslint-config'
import prettier from 'eslint-config-prettier'

export default antfu(
  {
    typescript: true,
    react: true,
    jsonc: false,
    yaml: false,
    toml: false,
    markdown: false,
  },
  {
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['packages/core/**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@zui/web',
              message: '@zui/core cannot import from @zui/web.',
            },
            {
              name: '@zui/react',
              message: '@zui/core cannot import from @zui/react.',
            },
          ],
          patterns: [
            {
              group: ['@zui/web/*', '@zui/react/*'],
              message: '@zui/core cannot import subpaths from @zui/web or @zui/react.',
            },
            {
              group: ['../web', '../web/**', '../../web', '../../web/**', '../../../web', '../../../web/**', '**/packages/web/**'],
              message: '@zui/core cannot use relative/path imports from the web package.',
            },
            {
              group: ['../react', '../react/**', '../../react', '../../react/**', '../../../react', '../../../react/**', '**/packages/react/**'],
              message: '@zui/core cannot use relative/path imports from the react package.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['packages/web/**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@zui/react',
              message: '@zui/web cannot import from @zui/react.',
            },
          ],
          patterns: [
            {
              group: ['@zui/react/*'],
              message: '@zui/web cannot import subpaths from @zui/react.',
            },
            {
              group: ['../react', '../react/**', '../../react', '../../react/**', '../../../react', '../../../react/**', '**/packages/react/**'],
              message: '@zui/web cannot use relative/path imports from the react package.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['packages/react/**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@zui/core',
              message: '@zui/react should import core functionality via @zui/web only.',
            },
          ],
          patterns: [
            {
              group: ['@zui/core/*'],
              message: '@zui/react should import core subpaths via @zui/web only.',
            },
            {
              group: ['../core', '../core/**', '../../core', '../../core/**', '../../../core', '../../../core/**', '**/packages/core/**'],
              message: '@zui/react cannot use relative/path imports from the core package.',
            },
          ],
        },
      ],
    },
  },
  prettier,
)
