declare module "@env" {
  const record: Record<string, string>;
  export = record;
}

declare module "@lambda" {
  import { APIGatewayEvent, Context } from "aws-lambda";
  export type Lambda<T> = (
    event: APIGatewayEvent,
    context: Context
  ) => Promise<T>;
}
