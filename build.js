import esbuild from "esbuild";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { dependencies } = require("./package.json");

esbuild.build({
  entryPoints: ["src/index.js"],
  bundle: true,
  external: Object.keys(dependencies),
  outfile: "index.js",
  format: "cjs",
  platform: "node",
});
