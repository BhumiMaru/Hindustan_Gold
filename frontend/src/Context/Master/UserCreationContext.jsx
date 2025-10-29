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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

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

  // Fetch Users
  const fetchUserCreationData = async ({
    search = "",
    role_id = null,
    department_id = null,
    zone_id = null,
    status = null,
    page = 1,
    perPage = 10,
  } = {}) => {
    try {
      const params = { search, page, per_page: perPage };

      if (role_id) {
        params.role_id = role_id;
      }

      if (department_id) {
        params.department_id = department_id;
      }

      if (zone_id) {
        params.zone_id = zone_id;
      }

      const res = await getData(ENDPOINTS.USER_CREATION.LIST, params);
      const apiData = res.data;
      setUserCreations(apiData.data);
      setPagination({
        currentPage: apiData.current_page,
        perPage: apiData.per_page,
        total: apiData.total,
      });
    } catch (error) {
      // console.error(error);
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
      setUserCreationData(res.data);
      toast.success("User created successfully");
      return res.data;
      // fetchUserCreationData();
    } catch (error) {
      console.log("create errors", error);
      toast.error(error.response?.data?.message || "Failed to create user");
    }
  };

  //   const createUser = async (payload) => {
  //   try {
  //     const res = await postData(ENDPOINTS.USER_CREATION.ADD_UPDATE, payload);

  //     const newUser = res.data; // backend response should include id
  //     setUserCreationData(newUser);
  //     console.log(" newUser?.id", newUser?.id);
  //     if (res.success && newUser?.id) {
  //       setIsEditUserId(newUser.id);
  //     }

  //     toast.success("User created successfully");
  //     return newUser; // ✅ return created user object
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

  // const createUser = async (payload) => {
  //   try {
  //     const res = await postData(ENDPOINTS.USER_CREATION.ADD_UPDATE, payload);

  //     // const newUserId = res.data.data.id; // assuming backend returns id
  //     // toast.success("User created successfully");

  //     // Save form data + new user_id
  //     setUserCreationData({
  //       ...payload,
  //       id: newUserId,
  //     });

  //     // ✅ Immediately fetch permissions for this role
  //     // fetchRolePermission(payload.role_id);

  //     return res.data;
  //   } catch (error) {
  //     toast.error("Failed to create user");
  //     console.log("Failed to create user", error);
  //   }
  // };

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
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.values(errors).forEach((errItem) => {
          if (Array.isArray(errItem)) {
            errItem.forEach((msg) => toast.error(msg));
          } else if (typeof errItem === "string") {
            toast.error(errItem);
          }
        });
        console.log("update errors", errors);
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
      // console.log(error);
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
  // const fetchUserPermission = async (user_id) => {
  //   try {
  //     const res = await getData(
  //       `${ENDPOINTS.USER_CREATION.PERMISSION_LIST}?user_id=${user_id}`
  //     );

  //     // If the API returns a valid response
  //     if (res?.data?.data) {
  //       console.log("rrr", res.data.data);
  //       setUserPermission(res.data.data);
  //     } else {
  //       setUserPermission([]); // no data, but not an error
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     // ✅ Only show error if it’s not “no data”
  //     if (error?.response?.status !== 204 && error?.response?.status !== 404) {
  //       toast.error("Failed to fetch User Permission List");
  //     } else {
  //       setUserPermission([]); // no data → treat as empty
  //     }
  //   }
  // };

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
  // const createUserPermission = async (payload) => {
  //   try {
  //     const res = await postData(
  //       ENDPOINTS.USER_CREATION.PERMISSION_ADD_UPDATE,
  //       payload
  //     );
  //     console.log("payload", payload);
  //     console.log("res", res);
  //     toast.success("Permission updated successfully");
  //     if (payload.user_id) {
  //       await fetchUserPermission(payload.user_id);
  //     }

  //     if (res.message === "User permission already exists.") {
  //       toast.info(res.message);
  //     }
  //   } catch (error) {
  //     if (error.response?.data?.errors) {
  //       Object.values(error.response.data.errors).forEach((errArray) =>
  //         errArray.forEach((msg) => toast.error(msg))
  //       );
  //     } else {
  //       toast.error("Failed to update permission");
  //       console.log("Failed to update permission", error);
  //     }
  //   }
  // };

  // Fetch User Permission List
  // const fetchUserPermission = async (user_id) => {
  //   try {
  //     const res = await getData(
  //       `${ENDPOINTS.USER_CREATION.PERMISSION_LIST}?user_id=${user_id}`
  //     );
  //     console.log("🔍 Backend permission data:", res.data.data); // 👈 Add this

  //     if (res?.data?.data) {
  //       setUserPermission(res.data.data);
  //     } else {
  //       setUserPermission([]);
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     // Handle no data cases silently
  //     if (error?.response?.status !== 204 && error?.response?.status !== 404) {
  //       toast.error("Failed to fetch User Permission List");
  //     } else {
  //       setUserPermission([]);
  //     }
  //   }
  // };

  // Create / Update User Permission
  const createUserPermission = async (payload) => {
    try {
      const res = await postData(
        ENDPOINTS.USER_CREATION.PERMISSION_ADD_UPDATE,
        payload
      );

      // console.log("payload", payload);
      // console.log("res", res);

      // Handle "User permission already exists" message
      if (res.message === "User permission already exists.") {
        // toast.info(res.message);

        // If permission already exists and user is trying to check it again,
        // we need to update with status: 0 to uncheck it
        if (payload.status === 1) {
          const updatedPayload = { ...payload, status: 0 };
          await postData(
            ENDPOINTS.USER_CREATION.PERMISSION_ADD_UPDATE,
            updatedPayload
          );
          // toast.info("Permission unchecked as it already exists");
        }
      } else {
        toast.success("Permission updated successfully");
      }

      // Refresh permissions after update
      if (payload.user_id) {
        await fetchUserPermission(payload.user_id);
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

  const fetchUserPermission = async (user_id) => {
    try {
      const res = await getData(
        `${ENDPOINTS.USER_CREATION.PERMISSION_LIST}?user_id=${user_id}`
      );
      const data = res?.data || [];
      // console.log("res", res?.data);
      // ✅ filter data by correct user id only
      const filtered = data.filter(
        (p) => String(p.user_id) === String(user_id)
      );
      // console.log("✅ Filtered permission data:", filtered);
      setUserPermission(filtered);
    } catch (error) {
      console.error("❌ Error fetching permissions:", error);
      setUserPermission([]);
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
        pagination,
        setPagination,

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
