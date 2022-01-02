import { wasm } from "@rollup/plugin-wasm";
import typescript from "@rollup/plugin-typescript";

const roll  = (fmt, plateform) => ({
  input: `src/main/index_${plateform}.ts`,
  output: {
    dir: `dist/${plateform}/${fmt}`,
    format: fmt
  },
  plugins: [wasm(), typescript({outDir: `dist/${plateform}/${fmt}`})]
});



export default [
  roll("cjs", "browser"),
  roll("es", "browser"),
  roll("cjs", "node"),
  roll("es", "node"),
];
