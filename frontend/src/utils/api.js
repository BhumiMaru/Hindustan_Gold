// import axios from "axios";
// import { useAuth } from "../Context/Authentication/LoginContext";
// import { decryptData } from "./decryptData";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Generic GET
// export const getData = async (endPoint, params = {}) => {
//   try {
//     const savedAuth = sessionStorage.getItem("authData");
//     console.log("saved", savedAuth);
//     let token = null;

//     if (savedAuth) {
//       const decrypt = decryptData(savedAuth);
//       token = decrypt?.token || null;
//     }

//     const response = await api.get(endPoint, {
//       params,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }), // ✅ attach only if token exists
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("API GET Error:", error);
//     throw error; // rethrow so caller can handle
//   }
// };

// // Generic POST
// export const postData = async (endPoint, data, config = {}) => {
//   const response = await api.post(endPoint, data, config);
//   return response.data;
// };

// //Generic PUT
// export const putData = async (endPoint, data, config = {}) => {
//   const response = await api.put(endPoint, data, config);
//   return response.data;
// };

// //Generic Delete
// export const deleteData = async (endPoint, config = {}) => {
//   const response = await api.delete(endPoint, config);
//   return response.data;
// };

// export default api;

import axios from "axios";
import { decryptData } from "./decryptData";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   withCredentials: true,
// });

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    // Connection: "keep-alive",
    // Connection: "close",
  },
  withCredentials: true, // ✅ needed if backend supports cookies
});

// 🔑 Helper to get token
const getAuthHeader = () => {
  const savedAuth = sessionStorage.getItem("authData");
  if (!savedAuth) return {};

  try {
    const decrypt = decryptData(savedAuth);
    const token = decrypt?.token || null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (err) {
    console.error("❌ Token decryption failed:", err);
    return {};
  }
};

// ------------------- Generic Methods -------------------

// ✅ Generic GET
export const getData = async (endPoint, params = {}) => {
  try {
    const response = await api.get(endPoint, {
      params,
      headers: {
        ...getAuthHeader(),
        "Access-Control-Allow-Origin": "*",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
};

// ✅ Generic POST
export const postData = async (endPoint, data, config = {}) => {
  const response = await api.post(endPoint, data, {
    ...config,
    headers: {
      ...getAuthHeader(),
      ...(config.headers || {}),
      "Access-Control-Allow-Origin": "*",
    },
    credentials: "include",
  });
  return response.data;
};

// ✅ Generic PUT
export const putData = async (endPoint, data, config = {}) => {
  const response = await api.put(endPoint, data, {
    ...config,
    headers: {
      ...getAuthHeader(),
      ...(config.headers || {}),
    },
  });
  return response.data;
};

// ✅ Generic DELETE
export const deleteData = async (endPoint, config = {}) => {
  const response = await api.delete(endPoint, {
    ...config,
    headers: {
      ...getAuthHeader(),
      ...(config.headers || {}),
    },
  });
  return response.data;
};

export default api;
