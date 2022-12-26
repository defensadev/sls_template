# Getting Started with Serverless Template

This project was bootstrapped with [Serveless Template](https://github.com/defensadev/sls_template).

## Creating A New Lambda Function

Create a file in the **src** directory called "myNewFunction.lambda.ts"

#### **`myNewFunction.lambda.ts`**

```ts
import type { Lambda } from "@lambda";

const myNewFunction: Lambda<string> = async () => {
  return "Hello SLS!";
};

export default myNewFunction;
```

**_You can skip this part if you want to deploy manually to AWS_**

Create a file called ".env" inside the base directory and create a variable called "MYNEWFUNCTION_ARN"

#### **`.env`**

```
MYNEWFUNCTION_ARN=ARN_VALUE_FROM_AWS_LAMBDA
```

## Setting Up The Config File

The **_`sls.config.json`_** contains configuration related to the build and deployment process:

- region - Controls the region for aws deployments for example "us-east-1".
- target - Controls the node version target, as of Dec. 2022 the most recent supported node version on aws lambda is "Node18".
- architectures - Controls the architectures for aws lambda as of Dec. 2022 only "arm64" and "x86_64" are supported.

#### Types of fields

- region: string
- target: string
- architectures: string[]

An example config that is the default:

#### **_`sls.config.json`_**

```json
{
  "region": "us-east-1",
  "target": "node18",
  "architectures": ["arm64"]
}
```

## Available Scripts

In the project directory, you can run:

### `yarn build`

Builds the app for production to the `target` folder.

- /target/zip - Contains the zip files to upload to AWS Lambda.
- /target/bundled - Contains the bundled version of your code.
- /target/unbundled - Contains the unbundled build artifacts.

The build is minified and designed to run on AWS Lambda ARM64 Node 18.

### `yarn deploy [script_name]`

Deploys the script to AWS lambda using the ARN value provided in the .env file.
