module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: ["warn", "double"],
    semi: ["warn", "always"],
    "comma-dangle": ["warn", "never"],
    "no-unused-vars": [
      2,
      {
        vars: "all",
        args: "after-used"
      }
    ],
    "space-before-function-paren": [2, "always"],
    eqeqeq: ["error", "always", { null: "ignore" }],
    "space-infix-ops": 2,
    camelcase: [
      0,
      {
        properties: "always"
      }
    ],
    "comma-dangle": [2, "never"],
    "comma-style": [2, "last"],
    "dot-location": [2, "property"],
    "func-call-spacing": ["error", "never"],
    "key-spacing": [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    "constructor-super": 2,
    "no-class-assign": 2,
    "no-const-assign": 2,
    "no-control-regex": "error",
    "no-delete-var": 2,
    "no-dupe-args": 2,
    "no-dupe-class-members": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-duplicate-imports": "error",
    "no-empty-character-class": 2,
    "no-eval": 2
  },
  //当使用第三方的SDK时，eslint会报找不到，可以加入到globals，取消对这个的检查
  globals: {
    fengmap: true
  }
};
