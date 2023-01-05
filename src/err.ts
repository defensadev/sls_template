import type { APIGatewayProxyResult } from "aws-lambda";

export default class Err extends Error {
  statusCode?: APIGatewayProxyResult["statusCode"];
  body?: APIGatewayProxyResult["body"];
  headers?: APIGatewayProxyResult["headers"];
  isBase64Encoded?: APIGatewayProxyResult["isBase64Encoded"];

  constructor(message?: string | undefined) {
    super(message);
  }

  response(response: APIGatewayProxyResult): Err {
    const err = new Err();
    err.statusCode = response.statusCode;
    err.body = response.body;
    err.headers = response.headers;
    err.isBase64Encoded = response.isBase64Encoded;

    return err;
  }
}
