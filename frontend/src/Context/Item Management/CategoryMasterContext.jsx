import { createContext, useContext, useState } from "react";
import { deleteData, getData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { toast } from "react-toastify";

export const CategoryMasterContext = createContext();

// Custom Hook for [CATEGORY MASTER]
export const useCategoryMaster = () => {
  return useContext(CategoryMasterContext);
};

// CATEGORY MASTER PROVIDER
export const CategoryMasterProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({
    category_name: "",
    group_id: "",
    prefix_code: "",
    status: 1,
    // status: null,
  });
  const [categoryEditId, setCategoryEditId] = useState(null);
  //   Group Filter
  const [selectedGroup, setSelectedGroup] = useState(null);

  // ✅ Fetch All Categories
  const fetchCategories = async (search = "", group_id = "") => {
    try {
      const res = await getData(ENDPOINTS.CATEGORY_MASTER.LIST, {
        search,
        group_id,
      });
      setCategories(res.data.data); // `data.data` based on your API
    } catch (error) {
      toast.error(`Category Fetch Error: ${error.message}`);
    }
  };

  // ✅ Create Category
  const createCategory = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.CATEGORY_MASTER.ADD_UPDATE, payload);
      toast.success("Category Created Successfully");
      fetchCategories(); // refresh
      return res;
    } catch (error) {
      toast.error(`Create Category Error: ${error.message}`);
    }
  };

  // ✅ Update Category
  const updateCategory = async (id, payload) => {
    try {
      const body = { id, ...payload };
      const res = await postData(ENDPOINTS.CATEGORY_MASTER.ADD_UPDATE, body);
      toast.success("Category Updated Successfully");
      fetchCategories(); // refresh
      return res;
    } catch (error) {
      toast.error(`Update Category Error: ${error.message}`);
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
      toast.error(`Delete Category Error: ${error.message}`);
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

        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        startEditing,
      }}
    >
      {children}
    </CategoryMasterContext.Provider>
  );
};
