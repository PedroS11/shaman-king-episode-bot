module.exports = {
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
            impliedStrict: true,
        },
    },
    parser: "@typescript-eslint/parser",
    env: {
        node: true,
        es2022: true,
    },
    plugins: ["@typescript-eslint", "unused-imports"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
    rules: {
        "no-console": 0,
        "@typescript-eslint/no-unused-vars": 1,
        "no-prototype-builtins": 0,
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/ban-ts-comment": 0,
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            {
                vars: "all",
                varsIgnorePattern: "^_",
                args: "after-used",
                argsIgnorePattern: "^_",
            },
        ],
    },
};
