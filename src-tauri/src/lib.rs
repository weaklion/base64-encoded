// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use base64::{prelude::BASE64_STANDARD, Engine};
use tauri::command;

#[command]
fn encode_base64(input: String) -> String {
    BASE64_STANDARD.encode(input)
}

#[command]
fn decode_base64(encoded: String) -> Result<String, String> {
    match BASE64_STANDARD.decode(&encoded) {
        Ok(bytes) => match String::from_utf8(bytes) {
            Ok(decoded_str) => Ok(decoded_str),
            Err(_) => Err("UTF-8 디코딩 변환 중 에러가 발생했습니다".to_string()),
        },
        Err(_) => Err("Base64 디코딩 변환 중 에러가 발생했습니다".to_string()),
    }
}
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![encode_base64, decode_base64])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
