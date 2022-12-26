module.exports = {
  extends: ["airbnb-typescript/base"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["import"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "error",
    "sort-imports": "error",
  },
};
