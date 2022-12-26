import fs from "fs";
import path from "path";
import { bundledDir, srcDir, unbundledDir, zipDir } from "./paths";

export interface Lambda {
  src: string;
  bundled: string;
  unbundled: string;
  zip: string;
  scriptName: string;
}

const findLambdas = async (): Promise<Lambda[]> => {
  const rawFiles = await fs.promises.readdir(srcDir);

  return rawFiles
    .filter((rawFile) => rawFile.endsWith(".lambda.ts"))
    .map((rawFile) => {
      const endingRe = /\.lambda\.ts$/;
      const scriptName = rawFile.replace(endingRe, "");
      const jsFile = rawFile.replace(endingRe, ".js");
      const zipFile = rawFile.replace(endingRe, ".zip");

      return {
        src: path.resolve(srcDir, rawFile),
        bundled: path.resolve(bundledDir, jsFile),
        unbundled: path.resolve(unbundledDir, jsFile),
        zip: path.resolve(zipDir, zipFile),
        scriptName,
      };
    });
};

export default findLambdas;
