module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "parserOptions": {
    "project": "./tsconfig.json",
    "createDefaultProgram": true
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "ignorePatterns": [
    "node_modules/"
  ],
  "extends": [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      "warn",
      {
        "extensions": [
          ".ts",
          ".tsx"
        ]
      }
    ],
    "no-useless-catch": "off",
    "undefined": 0,
    "import/extensions": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "react/jsx-pascal-case": 0,
    "@typescript-eslint/naming-convention": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "import/prefer-default-export": 0,
    "react/function-component-definition": 0,
    "prettier/prettier": 0,
    "import/order": 0,
    "@typescript-eslint/no-unused-expressions": 0,
    "lines-around-directive": 0,
    "react-hooks/rules-of-hooks": 0,
    "@typescript-eslint/no-non-null-asserted-optional-chain": 0,
    "react-hooks/exhaustive-deps": 0,
    "react/button-has-type": 0,
    "no-irregular-whitespace": 0,
    "global-require": 0,
    "import/no-extraneous-dependencies": 0
  }
}