module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint", // Typescript support
    "unicorn",  // More usefull checks
    "import",  // Import related checks
    "prettier" // Beautifull formatting
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:unicorn/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "airbnb-typescript/base",
    "plugin:eslint-comments/recommended",
    "prettier", // eslint-config-prettier, disables conflicting eslint riles
    "plugin:prettier/recommended",
    "plugin:eslint-comments/recommended" // ensures that disabled checks are enabled again
  ],
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "project": "tsconfig.json"
  },
  "env": {
    "es6": true,
    "node": true
  },
  "rules": {
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "no-console": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "max-classes-per-file": "off",
    "radix": "off",
    "no-restricted-syntax": "off",
    "@typescript-eslint/no-loop-func": "off",
    "no-return-assign": "off"
  }
}
