import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/no-unescaped-entities': 'off',
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'dist/**',
    'build/**',
    'node_modules/**',
    'next-env.d.ts',
    'public/**',
    'docs/**',
  ]),
]);
