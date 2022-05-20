module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: [
      './tsconfig.json'
    ]
  },
  plugins: [
    '@typescript-eslint'
  ],
  ignorePatterns: [
    "node_modules/",
    "dist/",
    '.eslintrc.js'
  ],
  rules: {
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxBOF": 1,
        "maxEOF": 1
      }
    ],
    "eol-last": [
      "error",
      "always"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "key-spacing": [
      "error", 
      { 
        "beforeColon": false,
        "afterColon": true 
      }
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "space-before-blocks": "error",
    "keyword-spacing": [
      "error",
      { 
        "before": true,
        "after": true
      }
    ],
    "brace-style": [
      "error",
      "stroustrup"
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "space-infix-ops": "error",
    "no-mixed-spaces-and-tabs": "error",
    "no-multi-spaces": "error",
    "no-return-await": "error",
    "require-await": "off",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/ban-types": "off"
  },
  overrides: [{
    // enable the rule specifically for TypeScript files
    "files": ["*.ts"],
    "rules": {
      "@typescript-eslint/explicit-function-return-type": [
        "error"
      ],
      "@typescript-eslint/no-floating-promises": [
        "error"
      ],
      "@typescript-eslint/require-await": [
        "error"
      ]
    }
  }]
};
