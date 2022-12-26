import type { Lambda } from "@lambda";

const example: Lambda<string> = async () => {
  return "Hello SLS!";
};

export default example;
