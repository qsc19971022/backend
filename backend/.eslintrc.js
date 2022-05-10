/*
 * @Author: your name
 * @Date: 2020-03-27 11:14:51
 * @LastEditTime: 2020-04-15 10:49:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eportalBackend/.eslintrc.js
 */
module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "max-depth": 2,
    // "no-inline-comments": 2,
    "no-debugger": 2,
    "no-proto": 2,
    "no-label-var": 2,
    "no-mixed-spaces-and-tabs": 2,
    "indent": [0, "tab"],
    "require-yield": 2,
    // "prefer-const": 1,   // 根据Paul的要求，将此约束去掉   Leon  2019-12-23 15：12
    "prefer-arrow-callback": 2,
    "no-var": 2,
    "space-infix-ops": 2,
    "space-unary-ops": 2,
    "no-negated-condition": 2,
    "no-nested-ternary": 0,
    "max-nested-callbacks": 2,
    "no-undef-init": 2,
    "no-undefined": 1,
    "no-delete-var": 2,
    "no-implied-eval": 2,
    "no-iterator": 2,
    "no-else-return": 2,
    "no-unreachable": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-parens": 2,
    "no-extra-semi": 2,
    "no-shadow-restricted-names": 2,
    "no-spaced-func": 2,
    //禁止使用稀疏数组
    "no-sparse-arrays": 2,
    "no-redeclare": 2,
    "no-regex-spaces": 2,
    "no-new-func": 2,
    "no-new-object": 2,
    "no-multiple-empty-lines": [2, { "max": 2 }], //空行不能够超过2行
    "no-inner-declarations": [2, "functions"],
    "no-const-assign": 2,
  }
};
