// @ts-check
const eslint = require("@eslint/js");
const {defineConfig} = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = defineConfig([
    {
        files : ["**/*.ts"],
        languageOptions : {
            parserOptions : {
                projectService : true,
                tsconfigRootDir : __dirname
            },
        },
        extends : [
            eslint.configs.recommended,
            tseslint.configs.recommended,
            tseslint.configs.stylistic,
            angular.configs.tsRecommended,
        ],
        processor : angular.processInlineTemplates,
        rules : {
            "@angular-eslint/prefer-on-push-component-change-detection": ["off"],
            "@angular-eslint/prefer-standalone": ["off"],
            "@typescript-eslint/no-require-imports" : ["off"],
            "@typescript-eslint/no-explicit-any" : ["off"],
            "@angular-eslint/directive-selector" : [
                "error",
                {
                    type : "attribute",
                    prefix : "lib",
                    style : "camelCase",
                },
            ],
            "@angular-eslint/component-selector" : [
                "error",
                {
                    type : "element",
                    prefix : ["lib", "app"],
                    style : "kebab-case",
                },
            ],
        },
    },
    {
        files : ["**/*.html"],
        extends : [
            angular.configs.templateRecommended,
            angular.configs.templateAccessibility,
        ],
        rules : {},
    }
]);
