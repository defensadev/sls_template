import type { Lambda } from "./findLambdas";
import fs from "fs";
import archiver from "archiver";

const zip = async (lambda: Lambda): Promise<null> => {
  return new Promise((res, rej) => {
    const output = fs.createWriteStream(lambda.zip);
    const archive = archiver("zip", {
      zlib: { level: 6 },
    });

    output.on("close", () => res(null));

    archive.on("warning", (err) => rej(err));

    archive.on("error", (err) => rej(err));

    archive.pipe(output);

    archive.append(fs.createReadStream(lambda.bundled), { name: "index.js" });

    archive.finalize();
  });
};

export default zip;
