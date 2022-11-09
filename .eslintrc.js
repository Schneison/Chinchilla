module.exports = {
    rules: {
        // A temporary hack related to IDE not resolving correct package.json
        "import/no-extraneous-dependencies": "off",
        "no-template-curly-in-string": "off",
        // Since React 17 and typescript 4.1 you can safely disable the rule
        "react/react-in-jsx-scope": "off",
        // override/add rules settings here, such as:
        "no-undef": "off",
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
        "prefer-template": "warn",
    },
    plugins: ["@typescript-eslint", "prettier", "react-hooks", "react"],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
        parser: "@typescript-eslint/parser",
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
    ],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".ts", ".tsx"],
            },
        },
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
    },
};
