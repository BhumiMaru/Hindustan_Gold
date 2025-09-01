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
  const [roleName, setRoleName] = useState("");
  const [roleEditId, setRoleEditId] = useState(null);

  //   Fetch Role
  const fetchRoleData = async (search = "") => {
    try {
      const res = await getData(ENDPOINTS.ROLE_MASTER.LIST, { search });
      setRoles(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Roles");
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
  return (
    <RoleMasterContext.Provider
      value={{
        roleEditId,
        setRoleEditId,
        roleName,
        setRoleName,
        roles,
        setRoles,

        fetchRoleData,
        createRole,
        updateRole,
        startEditing,
        deleteRole,
      }}
    >
      {children}
    </RoleMasterContext.Provider>
  );
};
