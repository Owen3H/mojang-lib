module.exports = {
    root: true,
    extends: ["eslint-recommended", "plugin:@typescript-eslint@recommended"],
    plugins: ["eslint-plugin-tsdoc"],
    rules: {
        "tsdoc/syntax": "warn"
    }
}