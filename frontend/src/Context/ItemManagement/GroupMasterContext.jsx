import { createContext, useContext, useState } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { getData, postData, deleteData } from "../../utils/api";
import { toast } from "react-toastify";
import { useUIContext } from "../UIContext";

const GroupMasterContext = createContext();

// Custom Hook [GROUP MASTER]
export const useGroupMasterContext = () => {
  return useContext(GroupMasterContext);
};

// Group Master Provider
export const GroupMasterProvider = ({ children }) => {
  const { handleClose } = useUIContext();
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupEditId, setgroupEditId] = useState(null);
  const [filterGroup, setFilterGroup] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  //   Fetch Company
  const fetchGroupData = async (search = "", page = 1, perPage = 10) => {
    try {
      setLoading(true);
      const res = await getData(ENDPOINTS.GROUP_MASTER.LIST, {
        search,
        page,
        per_page: perPage,
      });
      const apiData = res.data;
      setGroups(apiData.data);
      setPagination({
        currentPage: apiData.current_page,
        perPage: apiData.per_page,
        total: apiData.total,
      });
    } catch (error) {
      console.log(error);
      // toast.error("Failed to fetch Group");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Group Filter
  const fetchGroupFilter = async () => {
    try {
      const res = await getData(ENDPOINTS.GROUP_MASTER.FILTER);
      setFilterGroup(res.data);
    } catch (error) {
      console.log(error);
      // toast.error("Failed to fetch Group Filter");
    }
  };

  //   Create Company
  const createGroup = async (group_name) => {
    try {
      const res = await postData(ENDPOINTS.GROUP_MASTER.ADD_UPDATE, {
        group_name,
      });
      console.log("res", res);
      if (res.success) {
        toast.success(res.message);
        setgroupEditId(null);
        setGroupName("");
        handleClose("addNewGroup");
      }
      fetchGroupData();
    } catch (error) {
      console.log("Error:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
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
      console.log("Error:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
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
      console.log("Error:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
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
        fetchGroupFilter,
        groupName,
        setGroupName,
        groups,
        groupEditId,
        setgroupEditId,
        filterGroup,
        pagination,
        loading,
        setLoading,
      }}
    >
      {children}
    </GroupMasterContext.Provider>
  );
};
