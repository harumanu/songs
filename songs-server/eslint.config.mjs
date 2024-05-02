import globals from "globals";
import pluginJs from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";

export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: {...globals.nodeBuiltin, ...jestPlugin.globals} }},
  {plugins: { jest: jestPlugin }},
  pluginJs.configs.recommended,
];