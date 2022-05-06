type Malloc = (a: number) => number;
type Realloc = (a: number, b: number, c: number) => number;
type Free = (a: number, b: number) => void;
type AddToStackPointer = (a: number) => number;
type Memory8bit = Uint8Array | null;
type Memory32bit = Int32Array | null;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly parse: (a: number, b: number, c: number) => void;
  readonly exports: unknown;
  readonly __wbindgen_add_to_stack_pointer: AddToStackPointer;
  readonly __wbindgen_malloc: Malloc;
  readonly __wbindgen_realloc: Realloc;
  readonly __wbindgen_free: Free;
}

let wasm: InitOutput;

let WASM_VECTOR_LEN = 0;

let cachegetUint8Memory0: Memory8bit = null;

function getUint8Memory0() {
  if (
    cachegetUint8Memory0 === null ||
    cachegetUint8Memory0.buffer !== wasm.memory.buffer
  ) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}

const cachedTextEncoder = new TextEncoder();

const functionEncoder = (arg: string, view: Uint8Array) =>
  cachedTextEncoder.encodeInto(arg, view);
const stringEncoder = (arg: string, view: Uint8Array) => {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length,
  };
};
const encodeString =
  (typeof cachedTextEncoder.encodeInto === "function"
    ? functionEncoder
    : stringEncoder);

function passStringToWasm0(arg: string, malloc: Malloc, realloc: Realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length);
    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len);

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

let cachegetInt32Memory0: Memory32bit = null;

function getInt32Memory0() {
  if (
    cachegetInt32Memory0 === null ||
    cachegetInt32Memory0.buffer !== wasm.memory.buffer
  ) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}

const cachedTextDecoder = new TextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true,
});

cachedTextDecoder.decode();

function getStringFromWasm0(ptr: number, len: number): string {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

export function parse(input: string): string {
  let r0;
  let r1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(
      input,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    wasm.parse(retptr, ptr0, WASM_VECTOR_LEN);
    r0 = getInt32Memory0()![retptr / 4];
    r1 = getInt32Memory0()![retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    // @ts-ignore
    wasm.__wbindgen_free(r0, r1);
  }
}

async function load(module: WebAssembly.Module, imports: WebAssembly.Imports) {
  const instance = await WebAssembly.instantiate(module, imports);

  if (instance instanceof WebAssembly.Instance) {
    return { instance, module };
  } else {
    return instance;
  }
}

async function init(input: Uint8Array): Promise<InitOutput> {
  if (wasm) {
    return wasm;
  }

  const imports = {};
  const { instance, module } = await load(await input, imports);
  // @ts-ignore
  wasm = instance.exports;
  // @ts-ignore
  init.__wbindgen_wasm_module = module;

  return wasm;
}

export default init;
