import { createContext, useContext, useState } from "react";
import { deleteData, getData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { toast } from "react-toastify";

export const SubCategoryContext = createContext();

// Custom Hook for [SUB CATEGORY]
export const useSubCategory = () => {
  return useContext(SubCategoryContext);
};

// SUB CATEGORY PROVIDER
export const SubCategoryProvider = ({ children }) => {
  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState({
    sub_category_name: "",
    group_id: null,
    category_id: null,
    prefix_code: "",
    owners: [],
    type: "",
  });
  const [isSubEditId, setIsSubEditId] = useState(null);

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

  // Create SubCategory
  const createSubCategory = async (payload) => {
    try {
      const res = await postData(
        ENDPOINTS.SUBCATEGORY_MASTER.ADD_UPDATE,
        payload
      );
      setSubCategoryData(res.data.data);
      toast.success("SubCategory Add Successfully!");
      fetchSubCategoryData();
      ReserSubCategory();
    } catch (error) {
      console.log(error);
      toast.error("Failed to Create Sub Category");
    }
  };

  // Update SubCategory
  const EditSubCategory = async (id, payload) => {
    try {
      const res = await postData(ENDPOINTS.SUBCATEGORY_MASTER.ADD_UPDATE, {
        id,
        ...payload,
      });
      setSubCategoryData(res.data.data);
      toast.success("SubCategory Edit Successfully!");
      fetchSubCategoryData();
      setIsSubEditId(null);
      ReserSubCategory();
    } catch (error) {
      console.log(error);
      toast.error("Failed to Edit Sub Category");
    }
  };

  // Start Editing For Prefill Value
  const StartEditing = (id, subCategory) => {
    setIsSubEditId(id);

    // Normalize owners → extract user IDs
    const ownerIds = (subCategory.owners || [])
      .map((o) => o?.user?.id)
      .filter(Boolean);

    // Normalize type → lowercase to match select options
    const normalizedType = subCategory.type?.toLowerCase();

    setSubCategoryData({
      ...subCategory,
      type: normalizedType,
      owners: ownerIds,
    });
  };

  // Delete Sub Category
  const deleteSubCategory = async (id) => {
    try {
      const res = await deleteData(
        `${ENDPOINTS.SUBCATEGORY_MASTER.DELETE}/${id}`
      );
      toast.success("Delete SubCategory Successfully!");
      fetchSubCategoryData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete Sub Category");
    }
  };

  // Reset SubCategory
  const ReserSubCategory = () => {
    setSubCategoryData({
      sub_category_name: "",
      group_id: null,
      category_id: null,
      prefix_code: "",
      owners: [],
      type: "",
    });
    setIsSubEditId(null);
  };

  return (
    <SubCategoryContext.Provider
      value={{
        subCategory,
        subCategoryData,
        isSubEditId,
        setSubCategoryData,

        EditSubCategory,
        fetchSubCategoryData,
        createSubCategory,
        ReserSubCategory,
        StartEditing,
        deleteSubCategory,
      }}
    >
      {children}
    </SubCategoryContext.Provider>
  );
};
