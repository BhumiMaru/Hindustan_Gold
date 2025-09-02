import { createContext, useContext, useState } from "react";
import { getData } from "../../utils/api";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../../constants/endpoints";

export const UserCreationContext = createContext();

// Custom Hook For [USER CREATION]
export const useUserCreation = () => {
  return useContext(UserCreationContext);
};

// USER CREATION PROVIDER
export const UserCreationProvider = ({ children }) => {
  const [userCreaions, setUserCreation] = useState([]);

  //   Fetch user Creaions
  const fetchUserCreationData = async (search = "") => {
    try {
      const res = await getData(ENDPOINTS.USER_CREATION.LIST, { search });
      setUserCreation(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch User Creation");
    }
  };

  return (
    <UserCreationContext.Provider
      value={{ userCreaions, fetchUserCreationData }}
    >
      {children}
    </UserCreationContext.Provider>
  );
};
