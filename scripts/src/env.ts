import fs from "fs";
import path from "path";
import { Plugin, transform } from "esbuild";
import { globby } from "globby";
import { parse } from "acorn";
import { simple } from "acorn-walk";
import { cwd, srcDir } from "./paths";

export const envPlugin: Plugin = {
  name: "@env",
  setup: (build) => {
    build.onResolve({ filter: /^@env$/ }, (args) => ({
      path: args.path,
      namespace: "@env",
    }));

    build.onLoad({ filter: /.*/, namespace: "@env" }, () => ({
      contents: JSON.stringify(process.env),
      loader: "json",
    }));
  },
};

interface Err {
  start: number;
  end: number;
  reason: string;
}

export const checkEnv = async (): Promise<null> => {
  const allFiles = await globby(path.resolve(cwd, srcDir, "./**/*.ts"));

  for (const tsFile of allFiles) {
    const { code: jsFile } = await transform(
      await fs.promises.readFile(tsFile, "utf-8"),
      { loader: "ts", format: "esm" }
    );

    const ast = parse(jsFile, { ecmaVersion: "latest", sourceType: "module" });

    let importRef: null | string = null;
    const errs: Err[] = [];
    simple(ast, {
      ImportDeclaration: (node) => {
        const decl: any = node;
        if (decl?.source?.value === "@env") {
          importRef = decl.specifiers.find(
            (sp: any) => sp.type === "ImportDefaultSpecifier"
          ).local.name;
        }
      },
      MemberExpression: (node) => {
        const expr: any = node;
        if (expr?.object?.name !== importRef) {
          return;
        }
        if (expr.property.type !== "Identifier") {
          errs.push({
            reason: "invalid property on @env object",
            start: expr.property.start,
            end: expr.property.end,
          });
          return;
        }
        if (typeof process.env[expr.property.name] !== "string") {
          errs.push({
            reason: `unknown property on @env object "${expr.property.name}"`,
            start: expr.property.start,
            end: expr.property.end,
          });
        }
      },
    });

    for (const err of errs) {
      const lineNumber =
        (jsFile.slice(0, err.start).match(/\n/g)?.length || 0) + 1;
      const allLines = jsFile.split("\n");
      const line = allLines[lineNumber - 1];

      const errStr = `${err.reason}\n\n[${lineNumber}] - ${line}`;

      throw new Error(errStr);
    }
  }

  return null;
};
