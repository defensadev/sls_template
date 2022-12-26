import type { Lambda } from "./findLambdas";
import type { Config } from "./readConfig";
import { analyzeMetafile, build } from "esbuild";
import { envPlugin } from "./env";

const bundler = async (lambda: Lambda, config: Config): Promise<null> => {
  const { metafile } = await build({
    bundle: true,
    entryPoints: [lambda.unbundled],
    format: "cjs",
    legalComments: "none",
    metafile: true,
    minify: true,
    plugins: [envPlugin],
    outfile: lambda.bundled,
    target: config.target,
    treeShaking: true,
  });
  console.log(await analyzeMetafile(metafile, { color: true }));

  return null;
};

export default bundler;
