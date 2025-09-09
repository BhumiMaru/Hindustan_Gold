import { createContext, useContext, useState } from "react";
import { getData, postData, deleteData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { toast } from "react-toastify";

export const RoleMasterContext = createContext();

// Custom Hook For [ROLE MASTER]
export const useRoleMaster = () => {
  return useContext(RoleMasterContext);
};

// ROLE MASTER PROVIDER
export const RoleMasterProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [filterRole, setFilterRole] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [roleEditId, setRoleEditId] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // role Permission List
  const [permission, setPermission] = useState([]);
  const [rolePermissionData, setRolePermissionData] = useState({
    role_id: null,
    module_name: "",
    type: "",
    permission: "",
  });

  //   Fetch Role
  // Fetch Role Data with pagination
  const fetchRoleData = async (search = "", page = 1, perPage = 10) => {
    try {
      const res = await getData(ENDPOINTS.ROLE_MASTER.LIST, {
        search,
        page,
        per_page: perPage,
      });

      const apiData = res.data; // 👈 your API response structure
      setRoles(apiData.data); // table data

      setPagination({
        currentPage: apiData.current_page,
        perPage: perPage,
        total: apiData.total,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Roles");
    }
  };

  // Fetch Role Filter
  const fetchRoleFilter = async () => {
    try {
      const res = await getData(ENDPOINTS.ROLE_MASTER.FILTER);
      setFilterRole(res.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch Roles Filter");
    }
  };

  //   Create Role
  const createRole = async (role_name) => {
    try {
      await postData(ENDPOINTS.ROLE_MASTER.ADD_UPDATE, {
        role_name,
      });
      toast.success("Role Master Created Successfully");
      fetchRoleData();
    } catch (error) {
      toast.error(`Role Master Create Error: ${error.message}`);
    }
  };

  // Update
  const updateRole = async (id, role_name) => {
    try {
      await postData(ENDPOINTS.ROLE_MASTER.ADD_UPDATE, {
        id,
        role_name,
      });
      toast.success("Role Master Updated Successfully");
      fetchRoleData();
    } catch (error) {
      toast.error(`Role Master Update Error: ${error.message}`);
    }
  };

  //   Start Editing
  const startEditing = (id, role_name) => {
    setRoleEditId(id);
    setRoleName(role_name);
  };

  // Delete
  const deleteRole = async (id) => {
    try {
      await deleteData(`${ENDPOINTS.ROLE_MASTER.DELETE}/${id}`);
      toast.success("Role Master Deleted Successfully");
      fetchRoleData();
    } catch (error) {
      toast.error(`Role Master Delete Error: ${error.message}`);
    }
  };

  // -----------------------Role Permission List--------------------------- //

  // Fetch Role Permission List
  const fetchRolePermission = async (role_id) => {
    try {
      const res = await getData(
        `${ENDPOINTS.ROLE_MASTER.PERMISSION_LIST}?role_id=${role_id}`
      );

      // If the API returns a valid response
      if (res?.data?.data) {
        setPermission(res.data.data);
      } else {
        setPermission([]); // no data, but not an error
      }
    } catch (error) {
      console.log(error);

      // ✅ Only show error if it’s not “no data”
      if (error?.response?.status !== 204 && error?.response?.status !== 404) {
        toast.error("Failed to fetch Role Permission List");
      } else {
        setPermission([]); // no data → treat as empty
      }
    }
  };

  // Add Role Permission
  const createRolePermission = async (payload) => {
    try {
      const res = await postData(
        ENDPOINTS.ROLE_MASTER.PERMISSION_ADD_UPDATE,
        payload
      );
      toast.success("Role Permission Created/Updated Successfully");
      setRolePermissionData(res.data.data);

      if (payload.role_id) {
        fetchRolePermission(payload.role_id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Create Role Permission List");
    }
  };

  return (
    <RoleMasterContext.Provider
      value={{
        roleEditId,
        setRoleEditId,
        roleName,
        setRoleName,
        roles,
        setRoles,
        filterRole,
        setFilterRole,
        permission,
        pagination,
        setPagination,

        fetchRoleData,
        fetchRoleFilter,
        createRole,
        updateRole,
        startEditing,
        deleteRole,

        fetchRolePermission,
        createRolePermission,
      }}
    >
      {children}
    </RoleMasterContext.Provider>
  );
};
