export default {
    plugins: ['ember-template-lint-plugin-prettier'],
    extends: [
        'recommended',
        'ember-template-lint-plugin-prettier:recommended',
        'a11y',
    ],
    ignore: ['src/client/templates/**'],
    rules: {
        'no-curly-component-invocation': false,
        'no-implicit-this': false,
        'no-with': false,
    },
};
