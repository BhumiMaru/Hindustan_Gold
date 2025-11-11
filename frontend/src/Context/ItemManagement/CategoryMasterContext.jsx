import { createContext, useContext, useState } from "react";
import { deleteData, getData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useUIContext } from "../UIContext";

export const CategoryMasterContext = createContext();

// Custom Hook for [CATEGORY MASTER]
export const useCategoryMaster = () => {
  return useContext(CategoryMasterContext);
};

// CATEGORY MASTER PROVIDER
export const CategoryMasterProvider = ({ children }) => {
  const { handleClose } = useUIContext();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({
    category_name: "",
    group_id: "",
    prefix_code: "",
    status: 1,
    // status: null,
  });
  const [categoryEditId, setCategoryEditId] = useState(null);
  const [filterCategory, setFilterCategory] = useState([]);
  //   Group Filter
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // ✅ Fetch All Categories
  const fetchCategories = async ({
    search = "",
    group_id = "",
    page = 1,
    perPage = 10,
  } = {}) => {
    try {
      setLoading(true);
      const res = await getData(ENDPOINTS.CATEGORY_MASTER.LIST, {
        search,
        group_id,
        page,
        per_page: perPage,
      });
      const apiData = res.data;
      setCategories(apiData.data);
      setPagination({
        currentPage: apiData.current_page,
        perPage: apiData.per_page,
        total: apiData.total,
      });
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(error.response.data.message);
      }
      // toast.error(`Category Fetch Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Category Master Filter
  const fetchCategoryFilter = async () => {
    try {
      const res = await getData(ENDPOINTS.CATEGORY_MASTER.FILTER);
      setFilterCategory(res.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      // toast.error("Failed to fetch Group Filter");
    }
  };

  // ✅ Create Category
  const createCategory = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.CATEGORY_MASTER.ADD_UPDATE, payload);
      // toast.success("Category Created Successfully");
      console.log("res", res);
      if (res.success) {
        setCategoryData(res.data.data);
        toast.success(res.message);
        setCategoryEditId(null);
        setCategoryData({
          categoryName: "",
          groupId: "",
          prefixCode: "",
          status: null,
        });
        handleClose("addNewCategory");
      }
      fetchCategories(); // refresh
      return res;
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      console.log(`Create Category Error: ${error.message}`, error);
      // toast.error(`Create Category Error: ${error.message}`);
    }
  };

  // ✅ Update Category
  const updateCategory = async (id, payload) => {
    try {
      const body = { id, ...payload };
      const res = await postData(ENDPOINTS.CATEGORY_MASTER.ADD_UPDATE, body);
      if (res.success) {
        setCategoryData(res.data.data);
        toast.success(res.message);
        setCategoryEditId(null);
        setCategoryData({
          categoryName: "",
          groupId: "",
          prefixCode: "",
          status: null,
        });
        handleClose("addNewCategory");
      }
      fetchCategories(); // refresh
      return res;
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      // toast.error(`Update Category Error: ${error.message}`);
    }
  };

  // Start Editing Category
  const startEditing = (category) => {
    if (!category) return;

    setCategoryEditId(category.id || null);
    setCategoryData({
      category_name: category.category_name || "",
      group_id: category.group_id || "",
      prefix_code: category.prefix_code || "",
      status: category.status ?? 1,
      //   status: category.status ?? null,
    });
  };

  //  Delete Category
  const deleteCategory = async (id) => {
    try {
      await deleteData(`${ENDPOINTS.CATEGORY_MASTER.DELETE}/${id}`);
      toast.success("Category Deleted Successfully");
      fetchCategories(); // refresh
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      // toast.error(`Delete Category Error: ${error.message}`);
    }
  };

  return (
    <CategoryMasterContext.Provider
      value={{
        categories,
        categoryData,
        setCategoryData,
        categoryEditId,
        setCategoryEditId,
        selectedGroup,
        setSelectedGroup,
        filterCategory,
        pagination,
        setPagination,

        fetchCategoryFilter,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        startEditing,
        loading,
        setLoading,
      }}
    >
      {children}
    </CategoryMasterContext.Provider>
  );
};
