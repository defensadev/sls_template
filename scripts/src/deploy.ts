import fs from "fs";
import {
  LambdaClient,
  UpdateFunctionCodeCommand,
} from "@aws-sdk/client-lambda";
import dotenv from "dotenv";
import findLambdas from "./findLambdas";
import builder from "./builder";
dotenv.config();

const main = async (): Promise<null> => {
  await builder();

  const scriptName = process.argv[2] as string | undefined;
  const lambdas = await findLambdas();
  const sampleScripts = lambdas.map((lambda) => lambda.scriptName).join(", ");
  if (!scriptName) {
    throw new Error(
      `first argument must be the script name such as ${sampleScripts}`
    );
  }
  const script = lambdas.find((lambda) => lambda.scriptName === scriptName);
  if (!script) {
    throw new Error(
      `could not find script with name "${scriptName}", valid script names: ${sampleScripts}`
    );
  }
  const arn = process.env[scriptName.toUpperCase() + "_ARN"] as
    | string
    | undefined;
  if (!arn) {
    throw new Error(
      `script "${scriptName}" does not have an ARN in .env file, add a variable called ${scriptName.toUpperCase()}_ARN`
    );
  }

  const zipFile = await fs.promises.readFile(script.zip);

  const client = new LambdaClient({ region: "us-east-1" });
  const response = await client.send(
    new UpdateFunctionCodeCommand({
      FunctionName: arn,
      Architectures: ["arm64"],
      DryRun: false,
      ZipFile: zipFile,
    })
  );

  console.log(response);

  return null;
};

main().catch(console.error);
