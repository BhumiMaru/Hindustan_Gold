import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { deleteData, getData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { validateTextInput } from "../../utils/validation";
import { useUIContext } from "../UIContext";

const DepartmentContext = createContext();

// CUSTOM DEPARTMENT HOOK
export const useDepartment = () => {
  return useContext(DepartmentContext);
};

// DEPARTMENT PROVIDER
export const DepartmentProvider = ({ children }) => {
  // Data Loading
  const [loading, setLoading] = useState(false);
  // Btn Loading
  const [btnLoading, setBtnLoading] = useState(false);
  const { handleClose } = useUIContext();
  const [departments, setDepartments] = useState([]);
  const [deptFilter, setDeptFilter] = useState([]);
  const [deptName, setDeptName] = useState("");
  const [deptEditId, setDeptEditId] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // Fetch departments
  const fetchDepartments = async (search = "", page = 1, perPage = 10) => {
    try {
      setLoading(true);
      const res = await getData(ENDPOINTS.DEPARTMENTS.LIST, {
        search,
        page,
        per_page: perPage,
      }); // ✅ pass search as query param
      // if (res.status) {
      const apiData = res.data;
      setDepartments(apiData.data);
      // console.log("res.data", apiData.data);
      setPagination({
        currentPage: apiData.current_page,
        perPage: apiData.per_page,
        total: apiData.total,
      });
      // }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  // Fetch departments Filter
  const fetchDeptFilter = async () => {
    try {
      const res = await getData(ENDPOINTS.DEPARTMENTS.FILTER);
      setDeptFilter(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Department Filter");
    }
  };

  //  Add Department Function
  const addDepartment = async (deptName) => {
    try {
      setBtnLoading(true); // Start loader

      const response = await postData(ENDPOINTS.DEPARTMENTS.ADD_UPDATE, {
        department_name: deptName,
      });

      if (response?.success) {
        handleClose("addNewDepartment");
        toast.success(response?.message);
        // optionally reset input or refresh list here
      } else {
        toast.error(response?.message || "Failed to add department");
      }
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
      setBtnLoading(false); // Stop loader
    }
  };

  // const addDepartment = async (deptName) => {
  //   return await postData(ENDPOINTS.DEPARTMENTS.ADD_UPDATE, {
  //     department_name: deptName,
  //   });
  // };

  // ✅ Update Department (id in body, not params)
  // ✅ Update Department Function
  const updateDepartment = async (id, deptName) => {
    try {
      setBtnLoading(true); // Start loader

      const response = await postData(ENDPOINTS.DEPARTMENTS.ADD_UPDATE, {
        id, // 👈 id in body
        department_name: deptName,
      });

      if (response?.success) {
        handleClose("addNewDepartment");
        toast.success(response?.message);
        // Optionally: refresh list, close modal, or reset form
      } else {
        toast.error(response?.message || "Failed to update department");
      }
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
      setBtnLoading(false); // Stop loader
    }
  };

  // Delete Department (id in params)
  const deleteDepartment = async (id) => {
    try {
      const res = await deleteData(`${ENDPOINTS.DEPARTMENTS.DELETE}/${id}`);
      toast.success("Department deleted successfully");
      fetchDepartments(); // refresh list after delete
      return res;
    } catch (error) {
      toast.error("Failed to delete department");
      console.error(error);
    }
  };

  // ✅ Start editing
  const startEdit = (id, name) => {
    setDeptEditId(id);
    setDeptName(name);
  };

  return (
    <DepartmentContext.Provider
      value={{
        departments,
        deptName,
        setDeptName,
        deptFilter,
        pagination,
        setDeptFilter,

        fetchDeptFilter,
        fetchDepartments,
        addDepartment,
        updateDepartment,
        startEdit,
        deptEditId,
        deleteDepartment,
        setDeptEditId,
        // handleSave,
        loading,
        setLoading,
        btnLoading,
        setBtnLoading,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};
