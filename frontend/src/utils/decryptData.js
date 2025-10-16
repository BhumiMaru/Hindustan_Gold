import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

export function decryptData(encryptedData) {
  // console.log(import.meta.env.VITE_AES_SECRET_KEY);
  // console.log(import.meta.env.VITE_AES_SECRET_IV);
  const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_SECRET_IV);
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // console.log("bytes", CryptoJS.enc.Utf8);
    // console.log("bytes", bytes.toString());
    // console.log("bytes", bytes.toString(CryptoJS.enc.Utf8));
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    //   console.log("🔓 Raw decrypted string:", decrypted);

    return JSON.parse(decrypted);
  } catch (err) {
    console.error("❌ Decryption failed:", err);
    toast.error("Failed to decrypt server response");
    return null;
  }
}
