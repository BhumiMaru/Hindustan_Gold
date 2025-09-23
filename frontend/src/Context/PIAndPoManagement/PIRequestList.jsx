import { createContext, useContext, useState } from "react";
import { postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { toast } from "react-toastify";

export const PIRequestContext = createContext();

// Custom Hook
export const usePIRequest = () => {
  return useContext(PIRequestContext);
};

// PI And Material Management
export const PIRequestProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("my_request");
  const [piRequest, setPiRequest] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // Get All Pi Request
  const getPIRequest = async ({
    type = activeTab,
    page = 1,
    perPage = 10,
  } = {}) => {
    try {
      const payload = { type, page, per_page: perPage };
      const res = await postData(ENDPOINTS.PI_REQUEST.LIST, payload);

      const apiData = res.data;
      setPiRequest(apiData.data || []);
      setPagination({
        currentPage: apiData.current_page || 1,
        perPage: apiData.per_page || perPage,
        total: apiData.total || 0,
      });
    } catch (error) {
      console.log("pi request error:", error);
    }
  };

  // Create Pi Request
  const CreatePIRequest = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.PI_REQUEST.ADD_UPDATE, payload);
      if (res?.status) {
        toast.success(res.message || "PI Request saved successfully!");
        getPIRequest(); // refresh list
      }
      console.log("res", res);
      return res;
    } catch (error) {
      toast.error("Error saving PI Request");
      console.error("savePIRequest error:", error);
    }
  };

  return (
    <PIRequestContext.Provider
      value={{
        activeTab,
        piRequest,
        setPiRequest,
        getPIRequest,
        CreatePIRequest,
      }}
    >
      {children}
    </PIRequestContext.Provider>
  );
};
