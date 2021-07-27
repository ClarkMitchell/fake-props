const { build } = require("esbuild");
const { dependencies, peerDependencies } = require("./package.json");

const shared = {
  entryPoints: ["src/index.js"],
  bundle: true,
  external: Object.keys(dependencies),
};

build({
  ...shared,
  outfile: "dist/index.js",
});

build({
  ...shared,
  outfile: "dist/index.esm.js",
  format: "esm",
});
