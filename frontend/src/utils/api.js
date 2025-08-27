import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic GET
export const getData = async (endPoint, params = {}) => {
  const response = await api.get(endPoint, { params });
  return response.data;
};

// Generic POST
export const postData = async (endPoint, data) => {
  const response = await api.post(endPoint, data);
  return response.data;
};

//Generic PUT
export const putData = async (endPoint, data) => {
  const response = await api.put(endPoint, data);
  return response.data;
};

//Generic Delete
export const deleteData = async (endPoint) => {
  const response = await api.delete(endPoint);
  return response.data;
};

export default api;
