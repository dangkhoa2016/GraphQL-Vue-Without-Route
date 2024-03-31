module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential', // or 'plugin:vue/vue3-recommended' for more rules
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'vue/multi-word-component-names': 0, // Skip check
    'indent': ['error', 'tab'], // Enforce the use of tabs for indentation
    'vue/script-indent': ['error', 'tab', { // Enforce tabs for indentation inside <script> in Vue files
      baseIndent: 1,
      switchCase: 1, // Adjust this as needed for case statements
    }],
    // Any other rules you want to add or override
  },
  overrides: [{ // This is necessary to correctly apply the `vue/script-indent` rule
    files: ['*.vue'],
    rules: {
      'indent': 'off', // Turn off the global indent rule for Vue files
      'vue/script-indent': ['error', 'tab', { // Specifically enforce tabs in <script>
        baseIndent: 1,
        switchCase: 1, // Adjust this as needed for case statements
      }],
    },
  }],
};
