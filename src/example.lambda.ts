import type { Lambda } from "@lambda";
import type { Result } from "ts-results";
import { Ok } from "ts-results";

const example: Lambda<Result<string, string>> = async () => {
  return Ok("Hello World!");
};

export default example;
