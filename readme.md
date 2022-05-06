# HCL2 parser for Deno

A Deno wrapper for [martinohmann/hcl-rs](https://github.com/martinohmann/hcl-rs)

## Usage

```ts
import { parse } from "https://raw.githubusercontent.com/runebaas/hcl-deno/master/mod.ts";

const hcl = `
resource "aws_instance" "web" {
  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"
}
`;

const res = await parse(hcl);
```

## Building

**Prerequisites**

- [Rust 1.60 or newer](https://www.rust-lang.org/)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/)
- [Deno](https://deno.land/)

**Building**

```shell
deno run --allow-read --allow-write --allow-run .\build.ts
```
