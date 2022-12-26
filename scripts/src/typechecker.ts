import path from "path";
import { Project } from "ts-morph";
import { cwd } from "./paths";

const typechecker = async (): Promise<null> => {
  const project = new Project({
    tsConfigFilePath: path.resolve(cwd, "./tsconfig.json"),
  });

  const diagnostics = project.getPreEmitDiagnostics();
  const msg = project.formatDiagnosticsWithColorAndContext(diagnostics);
  if (msg.trim().length > 0) {
    throw new Error(msg);
  }

  return null;
};

export default typechecker;
