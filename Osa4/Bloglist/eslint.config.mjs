import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node, // <-- use Node globals
      sourceType: "module", // ES Modules, change if using CommonJS
    },
    ignores: ["tests/**", "dist/**", "utils/list_helper.js"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node, // <-- Node globals for backend JS
      sourceType: "commonjs",
    },
    ignores: ["tests/**", "dist/**", "utils/list_helper.js"],
  },
]);
