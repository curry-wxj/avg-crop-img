// import babel from "rollup-plugin-babel";   区别tolist
import babel from "@rollup/plugin-babel";
// import { terser } from "rollup-plugin-terser";
// import { nodeResolve } from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";
const pkg = require("./package.json");

export default {
  input: "index.js",
  watch: {
    exclude: "node_modules/**",
  },
  output: [
    // exports: "default": 只有export default 默认导出
    { file: pkg.main, format: "cjs", exports: "default" },
    { file: pkg.module, format: "es" },
  ],
  plugins: [
    // nodeResolve(),
    // commonjs(),
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**",
    }),
    // isProduction && (await import('rollup-plugin-terser')).terser()
  ],
  external: [/@babel\/runtime/],
};
