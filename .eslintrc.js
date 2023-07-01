module.exports = {
    "env": {
    "browser": true,
    "react-native/react-native": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true,
                "jest/globals": true,
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "ecmaFeatures": {
                    "jsx": true
                 } 
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native",
        "jest"
    ],
    "rules": {
        // "react/prop-types": ["error", { "ignore": ["navigation", "route"] }],
        "react/prop-types": 0,
        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
        "react-native/no-inline-styles": 2,
        "react-native/no-color-literals": 2,
        "react-native/no-raw-text": 2,
    }
}
