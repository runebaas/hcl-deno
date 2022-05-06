use serde_json::Value;
use wasm_bindgen::prelude::*;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn parse(input: &str) -> String {
  println!("{:?}", input);

  let val = hcl::from_str::<Value>(input)
    .unwrap_or_default()
    .to_string();

  if val == Value::default() {
    "err".to_string()
  } else {
    val
  }
}
