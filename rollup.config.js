import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./src/index.js",
    output: [
      {
        file: "dist/index.es.js",
        format: "es",
      },
      {
        file: "dist/index.js",
        format: "cjs",
      },
    ],
    plugins: [
      external(),
      commonjs(),
      resolve(),
      postcss(),
      babel({
        presets: [
          [
            "@babel/preset-react",
            {
              runtime: "automatic",
            },
          ],
        ],
        exclude: "**/node_modules/**",
      }),
      image(),
      json(),
      // terser(),
    ],
  },
];
