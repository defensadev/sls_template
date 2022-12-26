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

## Available Scripts

In the project directory, you can run:

### `yarn build`

Builds the app for production to the `target` folder.\

- /target/zip - Contains the zip files to upload to AWS Lambda.
- /target/bundled - Contains the bundled version of your code.
- /target/unbundled - Contains the unbundled build artifacts.

The build is minified and designed to run on AWS Lambda ARM64 Node 18.

### `yarn deploy [script_name]`

Deploys the script to AWS lambda using the ARN value provided in the .env file.
