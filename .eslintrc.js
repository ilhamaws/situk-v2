module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  extends: [
    "plugin:nuxt/recommended",
    // "plugin:vue/recommended",
  ],
  // add your custom rules here
  rules: {
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off",
    // 'vue/valid-v-slot': ['error', {
    //   allowModifiers: true,
    // }],
    // 'vue/html-indent': 'off',
    "semi": ["error", "never"],
    "no-multi-spaces": ["error"],
    'indent': ['error', 2]
  },
}
