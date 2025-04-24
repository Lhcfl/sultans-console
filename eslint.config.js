import vuetify from 'eslint-config-vuetify/index.ts.mjs'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...vuetify.filter(c => c.name !== 'app/overrides'),
  {
    name: 'app/overrides',
    files: ['**/*.vue'],
    rules: {
      '@stylistic/indent': 'off',
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always',
      }],
      'vue/html-closing-bracket-spacing': 'error',
      'vue/max-attributes-per-line': ['error', {
        singleline: 4,
        multiline: 1,
      }],
      'vue/multi-word-component-names': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/no-v-html': 'off',
      'vue/script-indent': ['error', 2, {
        baseIndent: 0,
        switchCase: 1,
        ignores: [],
      }],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/valid-v-on': 'off', // This rule doesn't allow empty event listeners
      'vue/valid-v-slot': ['error', { allowModifiers: true }],
    },
  },
]);
