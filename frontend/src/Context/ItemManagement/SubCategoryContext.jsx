import { createContext, useContext, useState } from "react";
import { deleteData, getData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useUIContext } from "../UIContext";

export const SubCategoryContext = createContext();

// Custom Hook for [SUB CATEGORY]
export const useSubCategory = () => {
  return useContext(SubCategoryContext);
};

// SUB CATEGORY PROVIDER
export const SubCategoryProvider = ({ children }) => {
  const { handleClose } = useUIContext();
  // Data Loading
  const [loading, setLoading] = useState(false);
  // Btn Loading
  const [btnLoading, setBtnLoading] = useState(false);
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
  const [filterSubCategory, setFilterSubCategory] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  //   Fetch Sub Categories
  const fetchSubCategoryData = async ({
    search = "",
    page = 1,
    perPage = 10,
    type = "",
    group_id = "",
    category_id = "",
    user_id = "",
  } = {}) => {
    try {
      setLoading(true);
      const params = {
        search,
        page,
        per_page: perPage,
        type,
        group_id,
        category_id,
        user_id,
      };

      // Decrypt Response
      // const decryptRes = decryptData(res)

      // console.log("params", params);
      const res = await getData(ENDPOINTS.SUBCATEGORY_MASTER.LIST, params);
      const apiData = res.data;
      setSubCategory(apiData.data);
      setPagination({
        currentPage: apiData.current_page,
        perPage: apiData.per_page,
        total: apiData.total,
      });
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        console.error(error.response.data.message);
      }
      // toast.error("Failed to fetch Sub Category");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Category Master Filter
  const fetchSubCategoryFilter = async () => {
    try {
      const res = await getData(ENDPOINTS.SUBCATEGORY_MASTER.FILTER);

      // Decrypt Response
      // const decryptRes = decryptData(res)

      setFilterSubCategory(res.data);
    } catch (error) {
      console.log(error);
      // toast.error("Failed to fetch SubCat Filter");
    }
  };

  // Create SubCategory
  const createSubCategory = async (payload) => {
    try {
      setBtnLoading(true);
      // Encryt Payload
      // const encryptPayload = encryptData(payload);

      const res = await postData(
        ENDPOINTS.SUBCATEGORY_MASTER.ADD_UPDATE,
        payload

        // {
        //   data: encryptPayload,
        // }
      );
      // console.log("rr", res);

      // Decrypt Response
      // const decryptRes = decryptData(res)

      if (res.success) {
        handleClose("addNewSubCategory");
        toast.success(res.message);
        setSubCategoryData(res.data.data);
        ReserSubCategory();
        fetchSubCategoryData();
      }
      // console.log("payload", payload);
    } catch (error) {
      console.error(error);

      // FIXED: Properly display validation errors
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        // Handle validation errors (422)
        if (errorData.errors) {
          // Display each validation error
          Object.values(errorData.errors).forEach((errorArray) => {
            errorArray.forEach((errorMessage) => {
              toast.error(errorMessage);
            });
          });
        } else {
          // Handle other API errors
          toast.error(errorData.message || "An error occurred");
        }
      } else {
        toast.error("Network error occurred");
      }
    } finally {
      setBtnLoading(false);
    }
  };

  // Update SubCategory
  const EditSubCategory = async (id, payload) => {
    try {
      setBtnLoading(true);

      // Encryt Payload
      // const encryptPayload = encryptData(payload);

      const res = await postData(
        ENDPOINTS.SUBCATEGORY_MASTER.ADD_UPDATE,
        {
          id,
          ...payload,
        }
        // {
        //   data: encryptPayload,
        // }
      );

      // Decrypt Response
      // const decryptRes = decryptData(res)

      if (res.success) {
        handleClose("addNewSubCategory");
        toast.success(res.message);
        setSubCategoryData(res.data.data);
        ReserSubCategory();
        setIsSubEditId(null);
        fetchSubCategoryData();
      }
      // setSubCategoryData(res.data.data);
      // toast.success("SubCategory Edit Successfully!");
      // fetchSubCategoryData();
      // setIsSubEditId(null);
      // ReserSubCategory();
    } catch (error) {
      console.error(error);

      // FIXED: Properly display validation errors
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        // Handle validation errors (422)
        if (errorData.errors) {
          // Display each validation error
          Object.values(errorData.errors).forEach((errorArray) => {
            errorArray.forEach((errorMessage) => {
              toast.error(errorMessage);
            });
          });
        } else {
          // Handle other API errors
          toast.error(errorData.message || "An error occurred");
        }
      } else {
        toast.error("Network error occurred");
      }
    } finally {
      setBtnLoading(false);
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
      console.log("Error:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
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
        filterSubCategory,
        pagination,
        setPagination,

        EditSubCategory,
        fetchSubCategoryData,
        createSubCategory,
        ReserSubCategory,
        StartEditing,
        deleteSubCategory,
        fetchSubCategoryFilter,
        loading,
        setLoading,
        btnLoading,
      }}
    >
      {children}
    </SubCategoryContext.Provider>
  );
};
