import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

export function encryptData(payload) {
  try {
    const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_SECRET_IV);

    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(payload), key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();

    //   console.log("🔒 Encrypted string:", encrypted);
    return encrypted;
  } catch (err) {
    console.error("❌ Encryption failed:", err);
    toast.error("Failed to encrypt data");
    return null;
  }
}
