import axios from "axios";
import { useAuth } from "../Context/Authentication/LoginContext";
import { decryptData } from "./decryptData";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic GET
export const getData = async (endPoint, params = {}) => {
  try {
    const savedAuth = sessionStorage.getItem("authData");
    console.log("saved", savedAuth);
    let token = null;

    if (savedAuth) {
      const decrypt = decryptData(savedAuth);
      token = decrypt?.token || null;
    }

    const response = await api.get(endPoint, {
      params,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // ✅ attach only if token exists
      },
    });

    return response.data;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error; // rethrow so caller can handle
  }
};

// Generic POST
export const postData = async (endPoint, data, config = {}) => {
  const response = await api.post(endPoint, data, config);
  return response.data;
};

//Generic PUT
export const putData = async (endPoint, data, config = {}) => {
  const response = await api.put(endPoint, data, config);
  return response.data;
};

//Generic Delete
export const deleteData = async (endPoint, config = {}) => {
  const response = await api.delete(endPoint, config);
  return response.data;
};

export default api;
