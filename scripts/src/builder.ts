import dotenv from "dotenv";
import typechecker from "./typechecker";
import linter from "./linter";
import { checkEnv } from "./env";
import { ensureDirs } from "./paths";
import findLambdas from "./findLambdas";
import renderUnbundled from "./renderUnbundled";
import bundler from "./bundler";
import zip from "./zip";
dotenv.config();

const builder = async (): Promise<null> => {
  await typechecker();
  await linter();
  await checkEnv();
  ensureDirs();
  const lambdas = await findLambdas();

  for (const lambda of lambdas) {
    await renderUnbundled(lambda);
    await bundler(lambda);
    await zip(lambda);
  }

  return null;
};

export default builder;
