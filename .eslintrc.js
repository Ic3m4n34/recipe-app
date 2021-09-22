// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: '.eslint.webpack.config.js',
      },
    },
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'any',
        normal: 'any',
        component: 'any',
      },
      svg: 'always',
      math: 'always',
    }],
    'vue/attribute-hyphenation': [2, 'always'],
    'vue/no-deprecated-destroyed-lifecycle': 'off', // TODO: remove when upgrading to vue3
    'vue/no-deprecated-v-on-native-modifier': 'off', // TODO: remove when upgrading to vue3
    'vue/script-setup-uses-vars': 'off',
    'vue/no-v-html': 'off',
    'max-len': [0, 100, {
      ignoreStrings: true,
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js'],
    }],
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': 'off',
    'no-else-return': 'off',
    'no-multiple-empty-lines': 'off',
    'lines-between-class-members': 'off',
    'import/order': 'off',
    'space-before-function-paren': 'off',
  },
};
