import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import replace from "rollup-plugin-replace";
import pkg from "./package.json";
import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "src/index.js",
    external: ["react", "prop-types"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
    plugins: [
      postcss({
        extensions: [".css"]
      }),
      resolve(),
      babel({
        extensions: [".ts", ".js", ".tsx", ".jsx"]
      }),
      commonjs()
    ]
  },
  // UMD build with inline PropTypes
  {
    input: "src/index.js",
    external: ["react"],
    output: [
      {
        name: "ReactStripe",
        file: pkg.browser,
        format: "umd",
        globals: {
          react: "React"
        }
      }
    ],
    plugins: [
      postcss({
        extensions: [".css"]
      }),
      resolve(),
      babel({
        extensions: [".ts", ".js", ".tsx", ".jsx"]
      }),
      commonjs()
    ]
  },
  // Minified UMD Build without PropTypes
  {
    input: "src/index.js",
    external: ["react"],
    output: [
      {
        name: "ReactStripe",
        file: pkg["browser:min"],
        format: "umd",
        globals: {
          react: "React"
        }
      }
    ],
    plugins: [
      postcss({
        extensions: [".css"]
      }),
      resolve(),
      babel({
        extensions: [".ts", ".js", ".tsx", ".jsx"]
      }),
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      commonjs(),
      terser()
    ]
  }
];
