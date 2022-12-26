import fs from "fs";
import path from "path";
import { cwd } from "./paths";

export interface Config {
  region: string;
  target: string;
  architectures: ("arm64" | "x86_64")[];
}

const readConfig = async (): Promise<Config> => {
  const configPath = path.resolve(cwd, "./sls.config.json");
  try {
    const configRaw = await fs.promises.readFile(configPath, "utf-8");
    const config = JSON.parse(configRaw) as Config;
    if (!config) {
      throw new Error(`config was not an object got ${JSON.stringify(config)}`);
    }
    if (typeof config.region !== "string") {
      throw new Error(
        `config.region !== "string" got ${JSON.stringify(config.region)}`
      );
    }
    if (typeof config.target !== "string") {
      throw new Error(
        `config.target !== "string" got ${JSON.stringify(config.target)}`
      );
    }
    const invalidArch = config.architectures.find(
      (v) => v !== "arm64" && v !== "x86_64"
    );
    if (invalidArch) {
      throw new Error(
        `config.architectures contains a value which is not "arm64" or "x86_64" got ${JSON.stringify(
          invalidArch
        )}`
      );
    }

    return {
      target: config.target,
      region: config.region,
      architectures: config.architectures,
    };
  } catch (err) {
    throw new Error(`error reading config file: ${err.message}`);
  }
};

export default readConfig;
