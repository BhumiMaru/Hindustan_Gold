import { createContext, useContext, useState } from "react";
import { getData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";

export const SubCategoryContext = createContext();

// Custom Hook for [SUB CATEGORY]
export const useSubCategory = () => {
  return useContext(SubCategoryContext);
};

// SUB CATEGORY PROVIDER
export const SubCategoryProvider = ({ children }) => {
  const [subCategory, setSubCategory] = useState([]);

  //   Fetch user Creaions
  const fetchSubCategoryData = async (search = "") => {
    try {
      const res = await getData(ENDPOINTS.SUBCATEGORY_MASTER.LIST, { search });
      setSubCategory(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Sub Category");
    }
  };
  return (
    <SubCategoryContext.Provider value={{ subCategory, fetchSubCategoryData }}>
      {children}
    </SubCategoryContext.Provider>
  );
};
