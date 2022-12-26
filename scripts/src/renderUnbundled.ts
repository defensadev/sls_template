import type { Lambda } from "./findLambdas";
import fs from "fs";
import path from "path";
import { cwd } from "./paths";

const renderUnbundled = async (lambda: Lambda): Promise<null> => {
  const templatePath = path.resolve(cwd, "./scripts/unbundled.template");
  const templateCode = await fs.promises.readFile(templatePath, "utf-8");
  const rendered = templateCode.replace("#src", lambda.src);
  await fs.promises.writeFile(lambda.unbundled, rendered);
  return null;
};

export default renderUnbundled;
