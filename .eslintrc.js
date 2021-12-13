module.exports = {
  env: {
    commonjs: true,
    node: true,
  },
  parserOptions: {
    sourceType: "module", // Default script
    ecmaVersion: "latest",
  },
  extends: ["eslint:recommended", "prettier"],
  rules: {},
};
