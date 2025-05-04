import eslint from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create compat instance to use legacy config
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended
});

export default [
  // Use the recommended ESLint and TypeScript ESLint rules 
  // (using recommended instead of recommendedTypeChecked to avoid strict type checking errors)
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  
  // Legacy config compatibility for React and Next.js plugins
  ...compat.extends(
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'prettier'
  ),
  
  // Use TypeScript parser for all JavaScript and TypeScript files
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2024,
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  
  // Custom rules
  // {
  //   rules: {
  //     'max-lines': [
  //       'warn',
  //       {
  //         max: 250,
  //         skipBlankLines: true,
  //         skipComments: true,
  //       },
  //     ],
  //     'max-depth': [
  //       'error',
  //       {
  //         max: 3,
  //       },
  //     ],
  //     'max-nested-callbacks': ['error', 2],
  //     'no-template-curly-in-string': 'error',
  //     'prefer-const': 'error',
  //     'no-useless-escape': 'off',
  //     '@typescript-eslint/no-unused-vars': 'warn',
  //     '@typescript-eslint/no-explicit-any': 'off',
  //     '@typescript-eslint/no-unsafe-assignment': 'off',
  //     '@typescript-eslint/no-unsafe-member-access': 'off',
  //     '@typescript-eslint/no-unsafe-call': 'off',
  //     '@typescript-eslint/no-unsafe-argument': 'off',
  //     '@typescript-eslint/no-unsafe-return': 'off',
  //     'react/react-in-jsx-scope': 'off',
  //     // Changed from 'error' to 'warn' for development
  //     'no-console': 'warn',
  //     'react/display-name': 'warn',
  //     'react/prop-types': 'off',
  //   },
  // },
  
  // Special overrides for generated files
  {
    files: ['**/generated/**/*'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'max-lines': 'off',
      'max-depth': 'off',
      'max-nested-callbacks': 'off',
      'no-template-curly-in-string': 'off',
    },
  },
  
  // Special overrides for Tailwind config
  {
    files: ['tailwind.config.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  
  // Ignore patterns - replacing .eslintignore
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'src'
    ]
  }
]; 