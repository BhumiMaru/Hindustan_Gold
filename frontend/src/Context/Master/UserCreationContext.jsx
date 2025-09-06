import { createContext, useContext, useState } from "react";
import { getData, postData, deleteData } from "../../utils/api";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../../constants/endpoints";
import { useRoleMaster } from "./RoleMasterContext";

export const UserCreationContext = createContext();

// Custom Hook For [USER CREATION]
export const useUserCreation = () => useContext(UserCreationContext);

// USER CREATION PROVIDER
export const UserCreationProvider = ({ children }) => {
  const [userCreations, setUserCreations] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  // const { fetchRolePermission } = useRoleMaster();
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
  // const [isEditUserId, setIsEditUserIdState] = useState(
  //   localStorage.getItem("editUserId") || null
  // );
  // const setIsEditUserId = (id) => {
  //   if (id) {
  //     localStorage.setItem("editUserId", id);
  //   } else {
  //     localStorage.removeItem("editUserId");
  //   }
  //   setIsEditUserIdState(id);
  // };

  const [isEditUserId, setIsEditUserId] = useState(null);

  // user Permission List
  const [userPermission, setUserPermission] = useState([]);
  const [userPermissionData, setUserPermissionData] = useState({
    role_id: null,
    module_name: "",
    type: "",
    permission: "",
    status: null,
    user_id: null,
  });

  // console.log(isEditUserId);
  // Fetch Users
  const fetchUserCreationData = async ({
    search = "",
    role_id = null,
    department_id = null,
    zone_id = null,
    status = null,
  } = {}) => {
    try {
      const res = await getData(ENDPOINTS.USER_CREATION.LIST, {
        search,
        role_id,
        department_id,
        zone_id,
        status,
      });
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
  // const createUser = async (payload) => {
  //   try {
  //     const res = await postData(ENDPOINTS.USER_CREATION.ADD_UPDATE, payload);
  //     setUserCreationData(res.data.data);
  //     toast.success("User created successfully");
  //     fetchUserCreationData();
  //   } catch (error) {
  //     // ✅ Check if backend sent validation errors
  //     if (error.response && error.response.data && error.response.data.errors) {
  //       const errors = error.response.data.errors;
  //       Object.values(errors).forEach((errArray) => {
  //         errArray.forEach((msg) => toast.error(msg)); // Show all error messages
  //       });
  //     } else {
  //       toast.error(error.response?.data?.message || "Failed to create user");
  //     }
  //   }
  // };

  const createUser = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.USER.CREATE, payload);

      const newUserId = res.data.data.id; // assuming backend returns id
      toast.success("User created successfully");

      // Save form data + new user_id
      setUserCreationData({
        ...payload,
        id: newUserId,
      });

      // ✅ Immediately fetch permissions for this role
      // fetchRolePermission(payload.role_id);

      return res.data;
    } catch (error) {
      toast.error("Failed to create user");
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

  // Fetch Data By Id
  const fetchUserById = async (id) => {
    try {
      const res = await postData(ENDPOINTS.USER_CREATION.DETAILS, { id });
      // console.log("res", res.data);
      const user = res.data;
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
    } catch (error) {
      console.log(error);
    }
  };

  // Start Editing
  const startEditing = (userId) => {
    // const userId = user.id || user.user_id || user._id;
    // setIsEditUserId(userId);
    // console.log("userId", userId);
    // setUserCreationData({
    //   name: user?.name || "",
    //   role_id: user?.role_id || null,
    //   employee_id: user?.employee_id || "",
    //   department_id: user?.department_id || null,
    //   zone_id: user?.zone_id || null,
    //   email: user?.email || "",
    //   mobileno: user?.mobileno || "",
    //   password: "", // ✅ keep empty, don’t prefill passwords for security
    //   company_id: user?.company_id || null,
    //   service_location_1_id: user?.service_location_1_id || null,
    //   service_location_2_id: user?.service_location_2_id || null,
    //   service_location_3_id: user?.service_location_3_id || null,
    //   reporting_manager_1_id: user?.reporting_manager_1_id || null,
    //   reporting_manager_2_id: user?.reporting_manager_2_id || null,
    //   status: user?.status ?? null,
    //   register_date: user?.register_date || "",
    //   profile_photo_url: user?.profile_photo_url || "", // if backend gives a URL
    // });
    setIsEditUserId(userId);
    fetchUserById(userId);
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

  // -----------------------User Permission List--------------------------- //

  // Fetch User Permission List
  const fetchUserPermission = async (user_id) => {
    try {
      const res = await getData(
        `${ENDPOINTS.USER_CREATION.PERMISSION_LIST}?user_id=${user_id}`
      );

      // If the API returns a valid response
      if (res?.data?.data) {
        setUserPermission(res.data.data);
      } else {
        setUserPermission([]); // no data, but not an error
      }
    } catch (error) {
      console.log(error);

      // ✅ Only show error if it’s not “no data”
      if (error?.response?.status !== 204 && error?.response?.status !== 404) {
        toast.error("Failed to fetch User Permission List");
      } else {
        setUserPermission([]); // no data → treat as empty
      }
    }
  };

  // Add User Permission
  // const createUserPermission = async (payload) => {
  //   try {
  //     const res = await postData(
  //       ENDPOINTS.USER_CREATION.PERMISSION_ADD_UPDATE,
  //       payload
  //     );
  //     toast.success("User Permission Created/Updated Successfully");
  //     setUserPermissionData(res.data.data);
  //     if (payload.role_id) {
  //       fetchUserPermission(payload.role_id);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to Create User Permission List");
  //   }
  // };

  // Create / Update User Permission
  const createUserPermission = async (payload) => {
    try {
      await postData(ENDPOINTS.USER_CREATION.PERMISSION_ADD_UPDATE, payload);
      toast.success("Permission updated successfully");
      console.log("user ", payload);
      if (payload.user_id) {
        fetchUserPermission(payload.user_id);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach((errArray) =>
          errArray.forEach((msg) => toast.error(msg))
        );
      } else {
        toast.error("Failed to update permission");
        console.log("Failed to update permission", error);
      }
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
    setIsEditUserId(null);
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
        userPermission,

        fetchUserById,
        fetchUserFilter,
        fetchUserCreationData,
        createUser,
        updateUser,
        deleteUser,
        resetUserData,
        startEditing,
        fetchUserPermission,
        createUserPermission,
      }}
    >
      {children}
    </UserCreationContext.Provider>
  );
};
