import fs from "fs";
import path from "path";

export const cwd = process.cwd();
export const srcDir = path.resolve(cwd, "./src");
export const targetDir = path.resolve(cwd, "./target");
export const bundledDir = path.resolve(cwd, "./target/bundled");
export const unbundledDir = path.resolve(cwd, "./target/unbundled");
export const zipDir = path.resolve(cwd, "./target/zip");

export const ensureDirs = (): null => {
  [srcDir, targetDir, bundledDir, unbundledDir, zipDir].forEach(
    (dir) => !fs.existsSync(dir) && fs.mkdirSync(dir)
  );

  return null;
};
