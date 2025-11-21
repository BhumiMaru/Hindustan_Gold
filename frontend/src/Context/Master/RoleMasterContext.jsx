import { createContext, useContext, useState } from "react";
import { getData, postData, deleteData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useUIContext } from "../UIContext";

export const RoleMasterContext = createContext();

// Custom Hook For [ROLE MASTER]
export const useRoleMaster = () => {
  return useContext(RoleMasterContext);
};

// ROLE MASTER PROVIDER
export const RoleMasterProvider = ({ children }) => {
  const { handleClose } = useUIContext();
  // Data Loading
  const [loading, setLoading] = useState(false);
  // Btn Loading
  const [btnLoading, setBtnLoading] = useState(false);
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
      setLoading(true);
      const res = await getData(ENDPOINTS.ROLE_MASTER.LIST, {
        search,
        page,
        per_page: perPage,
      });

      // Decrypt Res
      // const decryptRes = decryptData(res);

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
    } finally {
      setLoading(false);
    }
  };

  // Fetch Role Filter
  const fetchRoleFilter = async () => {
    try {
      const res = await getData(ENDPOINTS.ROLE_MASTER.FILTER);

      // Decrypt Res
      // const decryptRes = decryptData(res);

      setFilterRole(res.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch Roles Filter");
    }
  };

  //   Create Role
  const createRole = async (role_name) => {
    try {
      setBtnLoading(true);

      // Encrypt Payload
      // const encryptPayload = encryptData(role_name);

      const res = await postData(
        ENDPOINTS.ROLE_MASTER.ADD_UPDATE,
        {
          role_name,
        }
        // {
        //   data: encryptPayload,
        // }
      );

      // Decrypt Response
      // const decryptRes = decryptData(res)

      if (res.success) {
        toast.success("Role Master Created Successfully");
        handleClose("addNewRole");
        setRoleEditId(null);
        setRoleName("");
      }
      fetchRoleData();
    } catch (error) {
      console.error("Invoice Create error:", error);

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

  // Update
  const updateRole = async (id, role_name) => {
    try {
      setBtnLoading(true);

      // Encrypt Payload
      // const encryptPayload = encryptData({
      //   id,
      //   role_name,
      // });

      const res = await postData(
        ENDPOINTS.ROLE_MASTER.ADD_UPDATE,
        {
          id,
          role_name,
        }
        // {
        //   data: encryptPayload,
        // }
      );

      // Decrypt Response
      // const decryptRes = decryptData(res)

      if (res.success) {
        toast.success("Role Master Created Successfully");
        handleClose("addNewRole");
        setRoleEditId(null);
        setRoleName("");
      }
      fetchRoleData();
    } catch (error) {
      console.error("Invoice Create error:", error);

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
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  // -----------------------Role Permission List--------------------------- //

  // Fetch Role Permission List
  // const fetchRolePermission = async (role_id) => {
  //   try {
  //     const res = await getData(
  //       `${ENDPOINTS.ROLE_MASTER.PERMISSION_LIST}?role_id=${role_id}`
  //     );

  //     // If the API returns a valid response
  //     if (res?.data?.data) {
  //       setPermission(res.data.data);
  //     } else {
  //       setPermission([]); // no data, but not an error
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     // ✅ Only show error if it’s not “no data”
  //     if (error?.response?.status !== 204 && error?.response?.status !== 404) {
  //       toast.error("Failed to fetch Role Permission List");
  //     } else {
  //       setPermission([]); // no data → treat as empty
  //     }
  //   }
  // };

  const fetchRolePermission = async (role_id) => {
    try {
      // console.log("role_id", role_id);
      const res = await getData(
        `${ENDPOINTS.ROLE_MASTER.PERMISSION_LIST}?role_id=${role_id}`
      );

      // Decrypt Res
      // const decryptRes = decryptData(res);

      // console.log("res", res?.data);
      const data = res?.data || [];
      // ✅ filter data by correct user id only
      const filtered = data?.filter((p) => {
        // console.log("p", p.role_id);
        return String(p.role_id) === String(role_id);
      });
      // console.log("✅ Filtered permission data:", filtered);
      setPermission(filtered);
    } catch (error) {
      console.error(" Error fetching permissions:", error);
      setPermission([]);
    }
  };

  // Add Role Permission
  const createRolePermission = async (payload) => {
    try {
      // Encrypt Payload
      // const encryptPayload = encryptData(payload);

      const res = await postData(
        ENDPOINTS.ROLE_MASTER.PERMISSION_ADD_UPDATE,
        payload
        // {
        //   data: encryptPayload,
        // }
      );

      // Decrypt Res
      // const decryptRes = decryptData(res);

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
        loading,
        setLoading,
        btnLoading,
        setBtnLoading,
      }}
    >
      {children}
    </RoleMasterContext.Provider>
  );
};
