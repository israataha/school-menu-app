// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintPluginReactNative = require('eslint-plugin-react-native');
const eslintPluginSimpleImportSort = require('eslint-plugin-simple-import-sort');
const eslintPluginUnusedImports = require('eslint-plugin-unused-imports');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
    plugins: {
      'react-native': eslintPluginReactNative,
      'simple-import-sort': eslintPluginSimpleImportSort,
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      curly: ['error', 'multi'],
      'prettier/prettier': 'error',
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-native/no-unused-styles': 2,
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
    },
  },
]);
