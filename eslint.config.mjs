import antfu, { parserPlain } from '@antfu/eslint-config';

export default antfu(
  {
    formatters: true,
    vue: true,
    markdown: false,
    typescript: {
      tsconfigPath: 'tsconfig.json',
      overrides: {
        'ts/consistent-type-definitions': ['error', 'type'],
        'ts/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
      },
    },
  },

  {
    rules: {
      'style/semi': ['error', 'always'],
      'no-console': ['warn'],
    },
  },
  {
    files: ['_dev/*.mjs'],
    rules: {
      'antfu/no-top-level-await': 'off',
    },
  },
  {
    files: ['**/*.njk'],
    languageOptions: {
      parser: parserPlain,
    },
    rules: {
      'format/prettier': [
        'error',
        {
          plugins: ['prettier-plugin-jinja-template'],
          parser: 'jinja-template',
        },
      ],
    },
  },
);
