const path = require("path");
const { Project } = require("ts-morph");
const { build } = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

const typechecker = async () => {
  const cwd = process.cwd();

  const project = new Project({
    tsConfigFilePath: path.resolve(cwd, "./scripts/tsconfig.scripts.json"),
  });

  const diagnostics = project.getPreEmitDiagnostics();
  const msg = project.formatDiagnosticsWithColorAndContext(diagnostics);
  if (msg.trim().length > 0) {
    throw new Error(msg);
  }

  return null;
};

const main = async () => {
  const cwd = process.cwd();
  const entryPoints = ["build.ts", "deploy.ts"].map((rawFile) =>
    path.resolve(cwd, "./scripts/src", rawFile)
  );
  const outdir = path.resolve(cwd, "./scripts/dist");

  await typechecker();

  await build({
    bundle: true,
    entryPoints,
    outdir,
    platform: "node",
    plugins: [
      nodeExternalsPlugin({
        allowList: ["globby"],
      }),
    ],
  });
};

main().catch(console.error);
