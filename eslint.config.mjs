import eslint from "@eslint/js";
import tslint from "typescript-eslint";
import globals from "globals";
import jsxA11y from "eslint-plugin-jsx-a11y";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig(
    {
        ignores: [ ".next/*", "next-env.d.ts" ]
    },
    eslint.configs.recommended,
    tslint.configs.strict,
    tslint.configs.stylistic,
    jsxA11y.flatConfigs.recommended,
    stylistic.configs.recommended,
    {
        files: [ "**/utilities/env.ts" ],
        rules: {
            "@typescript-eslint/no-empty-object-type": "off"
        }
    },
    {
        plugins: {
            "@stylistic": stylistic
        },
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser
            },
            parserOptions: {
                project: [ "./tsconfig.json" ]
            }
        },
        rules: {
            "no-shadow": "off",
            "camelcase": [
                "error",
                {
                    properties: "never",
                    ignoreImports: true,
                    ignoreDestructuring: false
                }
            ],
            "no-unused-vars": "off",
            "no-param-reassign": [
                "error",
                {
                    props: false
                }
            ],
            "@stylistic/semi": [ "error", "always" ],
            "@stylistic/indent": [ "error", 4 ],
            "@stylistic/quotes": [ "error", "double" ],
            "@stylistic/brace-style": [
                "error",
                "allman",
                {
                    allowSingleLine: true
                }
            ],
            "@stylistic/arrow-parens": [ "error", "always" ],
            "@stylistic/comma-dangle": [
                "error",
                {
                    arrays: "never",
                    objects: "never",
                    imports: "never",
                    exports: "never",
                    functions: "never",
                    importAttributes: "never",
                    dynamicImports: "never"
                }
            ],
            "@stylistic/linebreak-style": [ "error", "unix" ],
            "@stylistic/object-curly-newline": [
                "error",
                {
                    ImportDeclaration: {
                        minProperties: 0
                    }
                }
            ],
            "@stylistic/comma-style": [ "error", "last" ],
            "@stylistic/space-in-parens": [ "error", "always" ],
            "@stylistic/jsx-indent-props": [ "error", "first" ],
            "@stylistic/multiline-ternary": [
                "error",
                "always-multiline",
                {
                    ignoreJSX: true
                }
            ],
            "@stylistic/array-bracket-spacing": [ "error", "always" ],
            "@stylistic/template-curly-spacing": [ "error", "always" ],
            "@stylistic/member-delimiter-style": [
                "error",
                {
                    overrides: {
                        interface: {
                            multiline: {
                                delimiter: "semi",
                                requireLast: true
                            }
                        }
                    }
                }
            ],
            "@stylistic/computed-property-spacing": [ "error", "always" ],
            "@stylistic/jsx-one-expression-per-line": "off",

            "@typescript-eslint/no-empty-function": "off"
        }
    }
);
