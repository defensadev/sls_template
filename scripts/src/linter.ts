import path from "path";
import { ESLint } from "eslint";
import { srcDir } from "./paths";

const linter = async (): Promise<null> => {
  const eslint = new ESLint({ fix: true });

  const results = await eslint.lintFiles([path.resolve(srcDir, "./**/*.ts")]);

  const formatter = await eslint.loadFormatter("stylish");
  const resultText = await formatter.format(results);

  if (
    results.some(
      (result) => result.errorCount > 0 || result.fatalErrorCount > 0
    )
  ) {
    throw new Error(resultText);
  }

  return null;
};

export default linter;
