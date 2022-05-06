const announce = (stage: string): void => console.log(`\n=== ${stage}`);

announce("Building");
const buildProcess = Deno.run({
  cmd: ["wasm-pack", "build", "--target", "web", "--release"],
});
await buildProcess.status();

announce("Writing wasm file to plaintext");
await Deno.mkdir("dist", { recursive: true });
const content = await Deno.readFile("./pkg/hcl_deno_bg.wasm");
const file = `export const wasm = new Uint8Array(JSON.parse("${
  JSON.stringify([...content.values()])
}"));`;
await Deno.writeTextFile("./dist/binary.ts", file);
console.log("done");
