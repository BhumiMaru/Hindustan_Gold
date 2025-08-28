import { createContext, useContext, useState } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { getData, postData, deleteData } from "../../utils/api";
import { toast } from "react-toastify";

const GroupMasterContext = createContext();

// Custom Hook [GROUP MASTER]
export const useGroupMasterContext = () => {
  return useContext(GroupMasterContext);
};

// Group Master Provider
export const GroupMasterProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupEditId, setgroupEditId] = useState(null);

  //   Fetch Company
  const fetchGroupData = async (search = "") => {
    try {
      const res = await getData(ENDPOINTS.GROUP_MASTER.LIST, { search });
      setGroups(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Group");
    }
  };

  //   Create Company
  const createGroup = async (group_name) => {
    try {
      await postData(ENDPOINTS.GROUP_MASTER.ADD_UPDATE, {
        group_name,
      });
      toast.success("Group Master Created Successfully");
      fetchGroupData();
    } catch (error) {
      toast.error(`Group Master Create Error: ${error.message}`);
    }
  };

  // Update
  const updateGroup = async (id, group_name) => {
    try {
      await postData(ENDPOINTS.GROUP_MASTER.ADD_UPDATE, {
        id,
        group_name,
      });
      toast.success("Group Master Updated Successfully");
      fetchGroupData();
    } catch (error) {
      toast.error(`Group Master Update Error: ${error.message}`);
    }
  };

  //   Start Editing
  const startEditing = (id, group_name) => {
    setgroupEditId(id);
    setGroupName(group_name);
  };

  // Delete
  const deleteGroup = async (id) => {
    try {
      await deleteData(`${ENDPOINTS.GROUP_MASTER.DELETE}/${id}`);
      toast.success("Group Master Deleted Successfully");
      fetchGroupData();
    } catch (error) {
      toast.error(`Group Master Delete Error: ${error.message}`);
    }
  };
  return (
    <GroupMasterContext.Provider
      value={{
        startEditing,
        deleteGroup,
        updateGroup,
        createGroup,
        fetchGroupData,
        groupName,
        setGroupName,
        groups,
        groupEditId,
        setgroupEditId,
      }}
    >
      {children}
    </GroupMasterContext.Provider>
  );
};
