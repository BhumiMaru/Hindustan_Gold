import { createContext, useContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { decryptData } from "../../utils/decryptData";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // Send otp
  const [email, setEmail] = useState("");

  const [sendOTPLoading, setSendOTPLoading] = useState(false);
  const [isOtpStep, setIsOtpStep] = useState(false);
  // verify otp
  const [otp, setOtp] = useState("");
  const [isVerifyOtp, setIsVerifyOtp] = useState(false);
  // Reset Passowrd
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResetPassword, setIsResetPassword] = useState(false);

  const navigate = useNavigate();

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

  // LOGIN
  const login = async (payload) => {
    try {
      console.log("📤 Raw login form:", payload);

      // 🔐 Use reusable encrypt function
      const encrypted = encryptData(payload);
      if (!encrypted) return null;
      console.log("encrypted", encrypted);

      const res = await postData(ENDPOINTS.AUTH.LOGIN, { data: encrypted });
      console.log("📥 Raw login response:", res);

      if (res.status) {
        const decrypted = decryptData(res.data);
        console.log("decrypted", decrypted);
        if (!decrypted) {
          toast.error("Invalid server response");
          return null;
        }

        setAuthData(decrypted);

        // 🔐 Encrypt before storing in sessionStorage
        const encryptedToStore = encryptData(decrypted);
        // console.log("encryptedToStore", encryptedToStore);

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

  // LOGOUT
  const logout = async () => {
    try {
      const res = await postData(ENDPOINTS.AUTH.LOGOUT);

      console.log("res", res);

      // const decryptRes = decryptData(res);

      if (res.status || res.success) {
        toast.success(res.message);
        sessionStorage.clear("authData");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  // SEND OTP
  const sendOTP = async (email) => {
    try {
      setSendOTPLoading(true);

      // encrypt data
      const encryptPayload = encryptData({
        email: email,
      });

      // Store encrypted email
      const encryptedEmail = encryptData(encryptPayload);
      sessionStorage.setItem("email", encryptedEmail);

      const res = await postData(ENDPOINTS.AUTH.SENDOTP, {
        data: encryptPayload,
      });

      console.log(ENDPOINTS.AUTH.SENDOTP);
      console.log("res", res);

      // const decryptRes = decryptData(res.data);
      // console.log("decryptRes", decryptRes);

      if (res.status || res.success) {
        toast.success(res.message);
        setEmail("");
        setIsOtpStep(true);
        // navigate("/auth-otp");
      }
    } catch (error) {
      console.log(error);
      // console.log("error.response", error.response.data.errors);
      // if (error.response && error.response.data) {
      //   toast.error(error.response.data.message);
      // }
      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;

        // Show main message (e.g. "Validation error")
        // if (message) {
        //   toast.error(message);
        // }

        // Show field-specific validation errors
        if (errors && typeof errors === "object") {
          Object.entries(errors).forEach(([field, msgs]) => {
            if (Array.isArray(msgs)) {
              msgs.forEach((msg) => toast.error(`${field}: ${msg}`));
            } else {
              toast.error(`${field}: ${msgs}`);
            }
          });
        }
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setSendOTPLoading(false);
    }
  };

  // Verify OTP
  // const verifyOTP = async ({ email, otp }) => {
  //   try {
  //     setIsVerifyOtp(true);

  //     console.log("Verify otp", {
  //       email: email,
  //       otp: otp,
  //     });

  //     // encrypt data
  //     const encryptPayload = encryptData({
  //       email: email,
  //       otp: otp,
  //     });

  //     console.log("encrypt verify", encryptPayload);

  //     const res = await postData(ENDPOINTS.AUTH.VERIFYOTP, {
  //       data: encryptPayload,
  //     });

  //     console.log(ENDPOINTS.AUTH.SENDOTP);
  //     console.log("res", res);

  //     const decryptRes = decryptData(res.data);
  //     console.log("decryptRes", decryptRes);

  //     if (res.status || res.success) {
  //       toast.success(res.message);
  //       setIsSendOTP(true);
  //       navigate("/auth-otp");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     if (error.response && error.response.data) {
  //       toast.error(error.response.data.message);
  //     }
  //   } finally {
  //     setIsVerifyOtp(false);
  //   }
  // };

  const verifyOTP = async ({ email, otp }) => {
    try {
      setIsVerifyOtp(true);
      console.log("verify ", { email, otp });

      const encryptPayload = encryptData({ email, otp });
      console.log("encryptPayload", encryptPayload);

      const res = await postData(ENDPOINTS.AUTH.VERIFYOTP, {
        data: encryptPayload,
      });

      console.log("verify res", res);

      const decryptRes = decryptData(res.data);
      console.log("decryptRes", decryptRes);

      if (res?.status || res?.success) {
        toast.success(res.message);
        setOtp("");
        navigate("/auth-reset-password"); // redirect to reset page
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setIsVerifyOtp(false);
    }
  };

  // Reset Password
  const resetPassword = async ({ email, newPassword }) => {
    try {
      setIsResetPassword(true);

      console.log("reset", { email, newPassword });

      // Encrypt Payload
      const encryptPayload = encryptData({
        email,
        newPassword,
      });

      console.log("encryptPayload", encryptPayload);

      const res = await postData(ENDPOINTS.AUTH.UPDATEPASSWORD, {
        data: encryptPayload,
      });

      console.log("reset res", res);

      // Decrypt response
      const decryptRes = decryptData(res.data);
      console.log("decryptRes", decryptRes);

      if (res.status || res.success) {
        toast.success(res.message);
        setNewPassword("");
        setConfirmPassword("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    } finally {
      setIsResetPassword(false);
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
      value={{
        authData,
        login,
        form,
        setForm,
        encryptData,
        decryptData,
        logout,
        sendOTP,
        sendOTPLoading,
        setSendOTPLoading,
        isOtpStep,
        setIsOtpStep,
        isVerifyOtp,
        setIsVerifyOtp,
        email,
        setEmail,
        otp,
        setOtp,
        verifyOTP,
        resetPassword,
        newPassword,
        setNewPassword,
        isResetPassword,
        setIsResetPassword,
        confirmPassword,
        setConfirmPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
