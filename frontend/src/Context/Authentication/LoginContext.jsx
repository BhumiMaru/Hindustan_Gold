import { createContext, useContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { decryptData } from "../../utils/decryptData";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_SECRET_IV);

  // ✅ Encrypt Function
  function encryptData(payload) {
    try {
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

  // ✅ Decrypt Function
  // function decryptData(encryptedData) {
  //   try {
  //     const bytes = CryptoJS.AES.decrypt(encryptedData, key, {
  //       iv,
  //       mode: CryptoJS.mode.CBC,
  //       padding: CryptoJS.pad.Pkcs7,
  //     });

  //     //   console.log("bytes", CryptoJS.enc.Utf8);
  //     //   console.log("bytes", bytes.toString());
  //     //   console.log("bytes", bytes.toString(CryptoJS.enc.Utf8));
  //     const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  //     //   console.log("🔓 Raw decrypted string:", decrypted);

  //     return JSON.parse(decrypted);
  //   } catch (err) {
  //     console.error("❌ Decryption failed:", err);
  //     toast.error("Failed to decrypt server response");
  //     return null;
  //   }
  // }

  const login = async (payload) => {
    try {
      // console.log("📤 Raw login form:", payload);

      // 🔐 Use reusable encrypt function
      const encrypted = encryptData(payload);
      if (!encrypted) return null;
      // console.log("encrypted", encrypted);

      const res = await postData(ENDPOINTS.AUTH.LOGIN, { data: encrypted });
      // console.log("📥 Raw login response:", res);

      if (res.status) {
        const decrypted = decryptData(res.data);
        // console.log("decrypted", decrypted);
        if (!decrypted) {
          toast.error("Invalid server response");
          return null;
        }

        setAuthData(decrypted);

        // 🔐 Encrypt before storing in sessionStorage
        const encryptedToStore = encryptData(decrypted);
        console.log("encryptedToStore", encryptedToStore);

        sessionStorage.setItem("authData", encryptedToStore);
        // toast.success(res.message || "Login successful ✅");

        return decrypted;
      } else {
        toast.error(res.message || "Login failed ❌");
        return null;
      }
    } catch (error) {
      console.error("❌ Login API error:", error);
      toast.error(error.response?.data?.message || error.message);
      return null;
    }
  };

  // ✅ Load authData from sessionStorage on refresh
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("authData");

    if (savedAuth) {
      try {
        // 🔓 decrypt session storage
        const decrypted = decryptData(savedAuth);
        // console.log("decrypted", decrypted);
        if (decrypted) {
          setAuthData(decrypted); // ✅ now it's the plain object {token, user}
        }
      } catch (e) {
        console.error("Failed to restore authData:", e);
        sessionStorage.removeItem("authData");
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authData, login, form, setForm, encryptData, decryptData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
