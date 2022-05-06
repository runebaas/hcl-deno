import init, { parse as parseHcl } from "./lib/wasm.ts";
import { wasm } from "./dist/binary.ts";
import { Hcl } from "./lib/hclTypes.ts";

export async function parse(input: string): Promise<Partial<Hcl>> {
  await init(wasm);
  const data = parseHcl(input);
  if (data === "err") {
    throw new Error("Failed to parse HCL");
  }
  return JSON.parse(data) as Hcl;
}
