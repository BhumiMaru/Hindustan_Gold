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
  const { handleClose } = useUIContext();
  const [departments, setDepartments] = useState([]);
  const [deptFilter, setDeptFilter] = useState([]);
  const [deptName, setDeptName] = useState("");
  const [deptEditId, setDeptEditId] = useState(null);

  // Fetch departments
  const fetchDepartments = async (search = "") => {
    try {
      const res = await getData(ENDPOINTS.DEPARTMENTS.LIST, { search }); // ✅ pass search as query param
      // if (res.status) {
      setDepartments(res);
      // }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch departments");
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

  // ✅ Add Department
  const addDepartment = async (deptName) => {
    return await postData(ENDPOINTS.DEPARTMENTS.ADD_UPDATE, {
      department_name: deptName,
    });
  };

  // ✅ Update Department (id in body, not params)
  const updateDepartment = async (id, deptName) => {
    return await postData(ENDPOINTS.DEPARTMENTS.ADD_UPDATE, {
      id, // 👈 id in body
      department_name: deptName,
    });
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

        fetchDeptFilter,
        fetchDepartments,
        addDepartment,
        updateDepartment,
        startEdit,
        deptEditId,
        deleteDepartment,
        setDeptEditId,
        // handleSave,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};
