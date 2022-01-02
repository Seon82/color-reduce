import { wasm } from "@rollup/plugin-wasm";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";
import path from "path";
import { execSync } from "child_process";
import os from "os";
import fs from "fs";

const roll_browser  = (fmt) => ({
  input: 'src/main/index_browser.ts',
  output: {
    dir: `dist/browser/${fmt}`,
    format: fmt
  },
  plugins: [wasm(), typescript({outDir: `dist/browser/${fmt}`})]
});


const roll_node = (fmt) => ({
  input: `src/main/index_node.ts`,
  output: {
    dir: `dist/node/${fmt}`,
    format: fmt,
  },
  external: ["os"],
  plugins: [
    typescript({ outDir: `dist/node/${fmt}` }),
    {
      name: "custom",
      generateBundle() {
        if (fmt === "cjs" && platform === "node") {
          distributeSharedNode();
        }
      },
    },
  ],
});

const releaseArtifact = (app) => {
  switch (os.platform()) {
    case "darwin":
      return `lib${app}.dylib`;
    case "win32":
      return `${app}.dll`;
    default:
      return `lib${app}.so`;
  }
};

const defaultTriple = () => {
  const out = execSync("rustup show active-toolchain").toString("utf-8");
  const prec = out.split(" ", 2)[0];
  return prec.substring(prec.indexOf("-") + 1);
};

const distributeSharedNode = () => {
  const artifact = releaseArtifact(pkg.name);
  const input = path.resolve(
    __dirname,
    `src/native/target/${process.env.TARGET || ""}/release/${artifact}`
  );
  const output = path.resolve(
    __dirname,
    "dist/node/color_reduce_native.node"
  );
  fs.mkdirSync(path.resolve(__dirname, "dist/node"), { recursive: true });
  fs.copyFileSync(input, output);
};


export default [
  //roll_node("cjs"),
  roll_node("es")
];
