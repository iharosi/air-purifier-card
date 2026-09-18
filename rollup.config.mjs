import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

import { readFileSync } from "node:fs";

const { version } = JSON.parse(readFileSync("./package.json", "utf8"));

export default {
  input: "src/air-purifier-card.ts",
  output: {
    file: "dist/air-purifier-card.js",
    format: "es",
    banner: `/*! air-purifier-card v${version} | GPL-3.0-or-later | https://github.com/iharosi/air-purifier-card */`,
  },
  plugins: [
    resolve(),
    typescript({ outDir: "dist", declaration: false, exclude: ["**/*.test.ts"] }),
    terser({ format: { comments: /^!/ } }),
  ],
};
