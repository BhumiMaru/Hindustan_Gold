import { createContext, useContext, useState } from "react";
import { getData, postData, deleteData } from "../../utils/api";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../../constants/endpoints";

export const UserCreationContext = createContext();

// Custom Hook For [USER CREATION]
export const useUserCreation = () => useContext(UserCreationContext);

// USER CREATION PROVIDER
export const UserCreationProvider = ({ children }) => {
  const [userCreations, setUserCreations] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [useCreationData, setUserCreationData] = useState({
    name: "",
    role_id: null,
    employee_id: null,
    department_id: null,
    zone_id: null,
    email: "",
    mobileno: "",
    password: "",
    company_id: null,
    service_location_1_id: null,
    service_location_2_id: null,
    service_location_3_id: null,
    reporting_manager_1_id: null,
    reporting_manager_2_id: null,
    status: null,
    register_date: "",
    profile_photo_url: "",
  });
  const [isEditUserId, setIsEditUserIdState] = useState(
    localStorage.getItem("editUserId") || null
  );
  const setIsEditUserId = (id) => {
    if (id) {
      localStorage.setItem("editUserId", id);
    } else {
      localStorage.removeItem("editUserId");
    }
    setIsEditUserIdState(id);
  };
  // console.log(isEditUserId);
  // Fetch Users
  const fetchUserCreationData = async (search = "") => {
    try {
      const res = await getData(ENDPOINTS.USER_CREATION.LIST, { search });
      setUserCreations(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    }
  };

  // Fetch User Filter
  const fetchUserFilter = async () => {
    try {
      const res = await getData(ENDPOINTS.USER_CREATION.FILTER);
      setFilterUser(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch User Filter");
    }
  };

  // Create User
  const createUser = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.USER_CREATION.ADD_UPDATE, payload);
      setUserCreationData(res.data.data);
      toast.success("User created successfully");
      fetchUserCreationData();
    } catch (error) {
      // ✅ Check if backend sent validation errors
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        Object.values(errors).forEach((errArray) => {
          errArray.forEach((msg) => toast.error(msg)); // Show all error messages
        });
      } else {
        toast.error(error.response?.data?.message || "Failed to create user");
      }
    }
  };

  // Update User
  const updateUser = async (id, payload) => {
    try {
      const res = await postData(ENDPOINTS.USER_CREATION.ADD_UPDATE, {
        id,
        ...payload,
      });
      setUserCreationData(res.data.data);
      toast.success("User updated successfully");
      fetchUserCreationData();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        Object.values(errors).forEach((errArray) => {
          errArray.forEach((msg) => toast.error(msg));
        });
      } else {
        toast.error(error.response?.data?.message || "Failed to update user");
      }
    }
  };
  // Start Editing
  const startEditing = (user) => {
    const userId = user.id || user.user_id || user._id;
    setIsEditUserId(userId);
    setUserCreationData({
      name: user?.name || "",
      role_id: user?.role_id || null,
      employee_id: user?.employee_id || "",
      department_id: user?.department_id || null,
      zone_id: user?.zone_id || null,
      email: user?.email || "",
      mobileno: user?.mobileno || "",
      password: "", // ✅ keep empty, don’t prefill passwords for security
      company_id: user?.company_id || null,
      service_location_1_id: user?.service_location_1_id || null,
      service_location_2_id: user?.service_location_2_id || null,
      service_location_3_id: user?.service_location_3_id || null,
      reporting_manager_1_id: user?.reporting_manager_1_id || null,
      reporting_manager_2_id: user?.reporting_manager_2_id || null,
      status: user?.status ?? null,
      register_date: user?.register_date || "",
      profile_photo_url: user?.profile_photo_url || "", // if backend gives a URL
    });
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      await deleteData(`${ENDPOINTS.USER_CREATION.DELETE}/${id}`);
      toast.success("User deleted successfully");
      fetchUserCreationData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  // Reset Data
  const resetUserData = () => {
    setUserCreationData({
      name: "",
      role_id: null,
      employee_id: null,
      department_id: null,
      zone_id: null,
      email: "",
      mobileno: "",
      password: "",
      company_id: null,
      service_location_1_id: null,
      service_location_2_id: null,
      service_location_3_id: null,
      reporting_manager_1_id: null,
      reporting_manager_2_id: null,
      status: null,
      register_date: "",
      profile_photo_url: "",
    });
  };

  return (
    <UserCreationContext.Provider
      value={{
        userCreations,
        isEditUserId,
        setIsEditUserId,
        useCreationData,
        setUserCreationData,
        filterUser,
        setFilterUser,

        fetchUserFilter,
        fetchUserCreationData,
        createUser,
        updateUser,
        deleteUser,
        resetUserData,
        startEditing,
      }}
    >
      {children}
    </UserCreationContext.Provider>
  );
};
