import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended"), {
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.commonjs,
        },

        ecmaVersion: 12,
        sourceType: "commonjs",
    },

    rules: {
        "no-unused-vars": "warn",
        "no-console": "off",
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module', // Dies stellt sicher, dass ESLint den Code als ECMAScript-Modul behandelt
    },
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended'
    ],
}];