import { analyzeMetafile, build } from "esbuild";
import { envPlugin } from "./env";
import { Lambda } from "./findLambdas";

const bundler = async (lambda: Lambda): Promise<null> => {
  const { metafile } = await build({
    bundle: true,
    entryPoints: [lambda.unbundled],
    format: "cjs",
    legalComments: "none",
    metafile: true,
    minify: true,
    plugins: [envPlugin],
    outfile: lambda.bundled,
    treeShaking: true,
  });
  console.log(await analyzeMetafile(metafile, { color: true }));

  return null;
};

export default bundler;
