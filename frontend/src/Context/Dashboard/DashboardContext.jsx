import { createContext, useContext, useState } from "react";
import { getData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";

export const DashboardContext = createContext();

// custom hook for dashboard context
export const useDashboard = () => {
  return useContext(DashboardContext);
};

// Dashboard Provider
export const DashboardProvider = ({ children }) => {
  const [dashboardList, setDashboardList] = useState([]);
  const [dashboardData, setDashboardData] = useState();

  // Dashboard List
  const getDashboardList = async () => {
    try {
      const res = await getData(ENDPOINTS.DASBOARD.LIST);
      //   console.log("res dashboard", res);
      setDashboardList(res.data);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      console.log("Dashboard List Error:", error);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        dashboardList,
        getDashboardList,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
