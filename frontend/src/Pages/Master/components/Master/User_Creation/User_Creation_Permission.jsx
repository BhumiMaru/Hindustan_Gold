// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";

// export default function User_Creation_Permission() {
//   const { id } = useParams();
//   const {
//     fetchUserPermission,
//     userPermission,
//     createUserPermission,
//     useCreationData,
//     fetchUserById,
//   } = useUserCreation();

//   const [loadingStates, setLoadingStates] = useState({});
//   const [localPermissions, setLocalPermissions] = useState({});

//   useEffect(() => {
//     if (id) {
//       fetchUserById(id);
//       fetchUserPermission(id);
//     }
//   }, [id]);

//   // Convert userPermission array to a local state object for faster lookups
//   useEffect(() => {
//     if (userPermission && Array.isArray(userPermission)) {
//       const permissionMap = {};
//       userPermission.forEach((p) => {
//         if (String(p.user_id) === String(id)) {
//           const key = `${p.module_name}_${p.type}_${p.permission}`;
//           permissionMap[key] = p.status === 1;
//         }
//       });
//       setLocalPermissions(permissionMap);
//     }
//   }, [userPermission, id]);

//   // Improved permission checking function
//   const hasPermission = (module_name, type, permission) => {
//     const key = `${module_name}_${type}_${permission}`;
//     return localPermissions[key] || false;
//   };

//   // Handle checkbox change with immediate UI feedback
//   const handlePermissionChange = async (module_name, type, permission, e) => {
//     const isChecked = e.target.checked;
//     const checkboxKey = `${module_name}_${type}_${permission}`;

//     // Immediate UI update
//     setLocalPermissions((prev) => ({
//       ...prev,
//       [checkboxKey]: isChecked,
//     }));

//     setLoadingStates((prev) => ({
//       ...prev,
//       [checkboxKey]: true,
//     }));

//     const payload = {
//       user_id: Number(id),
//       role_id: useCreationData?.role_id ?? 0,
//       module_name,
//       type,
//       permission,
//       status: isChecked ? 1 : 0,
//     };

//     console.log("Updating permission:", payload);

//     try {
//       await createUserPermission(payload);
//       // Refresh permissions to sync with server
//       setTimeout(() => {
//         fetchUserPermission(id);
//       }, 100);
//     } catch (error) {
//       console.error("Error updating permission:", error);
//       // Revert on error
//       setLocalPermissions((prev) => ({
//         ...prev,
//         [checkboxKey]: !isChecked,
//       }));
//     } finally {
//       setLoadingStates((prev) => ({
//         ...prev,
//         [checkboxKey]: false,
//       }));
//     }
//   };

//   // Improved Checkbox Component
//   const PermissionCheckbox = ({
//     module,
//     type,
//     permission,
//     id: checkboxId,
//     invisible = false,
//   }) => {
//     const checkboxKey = `${module}_${type}_${permission}`;
//     const isLoading = loadingStates[checkboxKey];
//     const isChecked = hasPermission(module, type, permission);

//     if (invisible) {
//       return (
//         <div className="form-check d-flex justify-content-center invisible">
//           <input className="form-check-input" type="checkbox" disabled />
//         </div>
//       );
//     }

//     return (
//       <div className="form-check d-flex justify-content-center">
//         <input
//           className="form-check-input"
//           type="checkbox"
//           id={checkboxId}
//           checked={isChecked}
//           onChange={(e) => handlePermissionChange(module, type, permission, e)}
//           disabled={isLoading}
//           style={{
//             cursor: isLoading ? "not-allowed" : "pointer",
//           }}
//         />
//         {isLoading && (
//           <div className="spinner-border spinner-border-sm ms-2" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         )}
//       </div>
//     );
//   };

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";

export default function User_Creation_Permission() {
  const { id } = useParams();
  const {
    fetchUserPermission,
    userPermission,
    createUserPermission,
    useCreationData,
    fetchUserById,
  } = useUserCreation();

  const [loadingStates, setLoadingStates] = useState({});
  const [localPermissions, setLocalPermissions] = useState({});
  const [optimisticUpdates, setOptimisticUpdates] = useState({});

  useEffect(() => {
    if (id) {
      fetchUserById(id);
      fetchUserPermission(id);
    }
  }, [id]);

  // Convert userPermission array to a local state object
  // useEffect(() => {
  //   if (userPermission && Array.isArray(userPermission)) {
  //     const permissionMap = {};
  //     userPermission.forEach((p) => {
  //       if (String(p.user_id) === String(id)) {
  //         const key = `${p.module_name}_${p.type}_${p.permission}`;
  //         // Only update if there's no pending optimistic update
  //         if (!optimisticUpdates[key]) {
  //           permissionMap[key] = p.status === 1;
  //         }
  //       }
  //     });
  //     setLocalPermissions(permissionMap);
  //   }
  // }, [userPermission, id]);

  // Convert userPermission array to a local state object
  // useEffect(() => {
  //   if (userPermission && Array.isArray(userPermission)) {
  //     const permissionMap = {};
  //     userPermission.forEach((p) => {
  //       if (String(p.user_id) === String(id)) {
  //         const key = `${p.module_name}_${p.type}_${p.permission}`;
  //         // Only update if there's no optimistic update for this key
  //         if (!(key in optimisticUpdates)) {
  //           permissionMap[key] = p.status === 1;
  //         }
  //       }
  //     });
  //     setLocalPermissions(permissionMap);
  //   }
  // }, [userPermission, id, optimisticUpdates]); // Added optimisticUpdates dependency

  // Improved permission checking function that prioritizes optimistic updates
  // const hasPermission = (module_name, type, permission) => {
  //   const key = `${module_name}_${type}_${permission}`;

  //   // First check if there's an optimistic update
  //   if (optimisticUpdates[key] !== undefined) {
  //     return optimisticUpdates[key];
  //   }

  //   // Fall back to local permissions
  //   return localPermissions[key] || false;
  // };

  // const makePermissionKey = (module_name, type, permission) =>
  //   `${module_name?.trim()?.toLowerCase()}_${type
  //     ?.trim()
  //     ?.toLowerCase()}_${permission?.trim()?.toLowerCase()}`;

  // Improved permission checking function that prioritizes optimistic updates
  // const hasPermission = (module_name, type, permission) => {
  //   const key = makePermissionKey(module_name, type, permission);
  //   console.log("🔑 Checking permission key:", key);

  //   // Check optimistic updates first
  //   if (key in optimisticUpdates) {
  //     console.log("🟢 optimisticUpdates[key]:", optimisticUpdates[key]);
  //     return optimisticUpdates[key];
  //   }

  //   // Fallback to localPermissions
  //   console.log("🔵 localPermissions[key]:", localPermissions[key]);
  //   return localPermissions[key] || false;
  // };

  // Handle checkbox change with persistent optimistic updates
  // const handlePermissionChange = async (module_name, type, permission, e) => {
  //   const isChecked = e.target.checked;
  //   const checkboxKey = `${module_name}_${type}_${permission}`;

  //   // Set optimistic update immediately
  //   setOptimisticUpdates((prev) => ({
  //     ...prev,
  //     [checkboxKey]: isChecked,
  //   }));

  //   setLoadingStates((prev) => ({
  //     ...prev,
  //     [checkboxKey]: true,
  //   }));

  //   const payload = {
  //     user_id: Number(id),
  //     role_id: useCreationData?.role_id ?? 0,
  //     module_name,
  //     type,
  //     permission,
  //     status: isChecked ? 1 : 0,
  //   };

  //   console.log("Updating permission:", payload);

  //   try {
  //     await createUserPermission(payload);

  //     // Success - update local permissions to match optimistic update
  //     setLocalPermissions((prev) => ({
  //       ...prev,
  //       [checkboxKey]: isChecked,
  //     }));
  //   } catch (error) {
  //     console.error("Error updating permission:", error);
  //     // Error - revert the optimistic update
  //     setOptimisticUpdates((prev) => {
  //       const newState = { ...prev };
  //       delete newState[checkboxKey];
  //       return newState;
  //     });

  //     // Refresh from server to get correct state
  //     setTimeout(() => {
  //       fetchUserPermission(id);
  //     }, 100);
  //   } finally {
  //     setLoadingStates((prev) => ({
  //       ...prev,
  //       [checkboxKey]: false,
  //     }));

  //     // Clear optimistic update after a delay (only if successful)
  //     setTimeout(() => {
  //       setOptimisticUpdates((prev) => {
  //         const newState = { ...prev };
  //         delete newState[checkboxKey];
  //         return newState;
  //       });
  //     }, 1000);
  //   }
  // };

  // Utility to normalize keys
  // Normalize key
  const makePermissionKey = (module_name, type_name, permission) =>
    `${module_name?.trim()?.toLowerCase()}_${type_name
      ?.trim()
      ?.toLowerCase()}_${permission?.trim()?.toLowerCase()}`;

  // Determine if checkbox is checked
  const hasPermission = (module_name, type, permission) => {
    const key = makePermissionKey(module_name, type, permission);
    return key in optimisticUpdates
      ? optimisticUpdates[key]
      : localPermissions[key] || false;
  };

  // useEffect(() => {
  //   if (userPermission && userPermission.length > 0) {
  //     console.log("⚙️ Mapping permissions:", userPermission);

  //     const mappedPermissions = {};
  //     userPermission.forEach((perm) => {
  //       const key = makePermissionKey(
  //         perm.module_name,
  //         perm.type,
  //         perm.permission
  //       );
  //       mappedPermissions[key] = true; // status 1 or existing permission
  //       console.log("✅ localPermissions after map:", mappedPermissions[key]);
  //     });

  //     setLocalPermissions(mappedPermissions);
  //   }
  // }, [userPermission]);

  useEffect(() => {
    if (userPermission && userPermission.length > 0) {
      const mappedPermissions = {};

      userPermission.forEach((perm) => {
        if (!perm.module_name || !perm.type || !perm.permission) return;

        const key = makePermissionKey(
          perm.module_name,
          perm.type,
          perm.permission
        );

        // Checkbox is checked if record exists, ignore status
        mappedPermissions[key] = true;
      });

      setLocalPermissions(mappedPermissions);
    }
  }, [userPermission]);

  // Handle checkbox change --- old
  // const handlePermissionChange = async (
  //   module_name,
  //   type,
  //   permission,
  //   isChecked
  // ) => {
  //   const key = makePermissionKey(module_name, type, permission);

  //   // Optimistic update
  //   setOptimisticUpdates((prev) => ({ ...prev, [key]: isChecked }));
  //   setLoadingStates((prev) => ({ ...prev, [key]: true }));

  //   const payload = {
  //     user_id: Number(id),
  //     role_id: useCreationData?.role_id ?? 0,
  //     module_name,
  //     type,
  //     permission,
  //     status: isChecked ? 1 : 0,
  //   };

  //   console.log("payload", payload);

  //   try {
  //     await createUserPermission(payload);
  //     setLocalPermissions((prev) => ({ ...prev, [key]: isChecked }));
  //     fetchUserPermission(id);
  //   } catch (error) {
  //     console.error("Error updating permission:", error);
  //     setOptimisticUpdates((prev) => {
  //       const newState = { ...prev };
  //       delete newState[key];
  //       return newState;
  //     });
  //     fetchUserPermission(id); // refresh
  //   } finally {
  //     setLoadingStates((prev) => ({ ...prev, [key]: false }));
  //   }
  // };
  // Checkbox Component with persistent state
  // Checkbox component ---old
  // const PermissionCheckbox = ({ module, type, permission, id }) => {
  //   const key = makePermissionKey(module, type, permission);
  //   const isLoading = loadingStates[key];
  //   const isChecked =
  //     key in optimisticUpdates
  //       ? optimisticUpdates[key]
  //       : localPermissions[key] || false;

  //   // console.log("key", key, "ischecked", isChecked);

  //   return (
  //     <div className="form-check d-flex justify-content-center align-items-center">
  //       <input
  //         className="form-check-input"
  //         type="checkbox"
  //         id={id}
  //         checked={isChecked}
  //         onChange={(e) => {
  //           handlePermissionChange(module, type, permission, e.target.checked);
  //         }}
  //         disabled={isLoading}
  //       />
  //       {isLoading && (
  //         <span className="spinner-border spinner-border-sm ms-2"></span>
  //       )}
  //     </div>
  //   );
  // };

  // const handlePermissionChange = async (
  //   module_name,
  //   type,
  //   permission,
  //   isChecked
  // ) => {
  //   const key = makePermissionKey(module_name, type, permission);

  //   // Optimistic update (local UI)
  //   setOptimisticUpdates((prev) => ({ ...prev, [key]: isChecked }));
  //   setLoadingStates((prev) => ({ ...prev, [key]: true }));

  //   // const payload = {
  //   //   role_id: Number(id),
  //   //   module_name,
  //   //   type,
  //   //   permission,
  //   //   status: isChecked ? 1 : 0,
  //   // };

  //   // const payload = {
  //   //   user_id: Number(id),
  //   //   role_id: useCreationData?.role_id ?? 0,
  //   //   module_name,
  //   //   type,
  //   //   permission,
  //   //   status: isChecked ? 1 : 0,
  //   // };

  //   const payload = {
  //     user_id: id ? Number(id) : null,
  //     role_id: useCreationData?.role_id || null, // null if not set
  //     module_name,
  //     type,
  //     permission,
  //     status: isChecked ? 1 : 0,
  //   };
  //   console.log("payload", payload);

  //   try {
  //     // 1️⃣ Update current permission
  //     await createUserPermission(payload);
  //     setLocalPermissions((prev) => ({ ...prev, [key]: isChecked }));

  //     const normalizedType = type?.trim()?.toLowerCase();
  //     const normalizedPerm = permission?.trim()?.toLowerCase();

  //     // --- Helper function for auto-checks ---
  //     const ensurePermission = async (targetType, targetPerm) => {
  //       const targetKey = makePermissionKey(
  //         module_name,
  //         targetType,
  //         targetPerm
  //       );
  //       if (!localPermissions[targetKey]) {
  //         const newPayload = {
  //           user_id: Number(id),
  //           role_id: useCreationData?.role_id || null,
  //           module_name,
  //           type: targetType,
  //           permission: targetPerm,
  //           status: 1,
  //         };
  //         console.log("new payload", newPayload);
  //         setOptimisticUpdates((prev) => ({ ...prev, [targetKey]: true }));
  //         setLoadingStates((prev) => ({ ...prev, [targetKey]: true }));
  //         await createUserPermission(newPayload);
  //         setLocalPermissions((prev) => ({ ...prev, [targetKey]: true }));
  //         setLoadingStates((prev) => ({ ...prev, [targetKey]: false }));
  //       }
  //     };

  //     // --- Auto-check logic starts here ---
  //     if (isChecked && ["add", "generate"].includes(normalizedPerm)) {
  //       // ----------- start PO and Material Management Module ------ //

  //       // Case 1: For Get Quotation
  //       if (normalizedType === "get quotation") {
  //         await ensurePermission(type, "view"); // view same module
  //         await ensurePermission("PO Generation", "add"); // add PO Generation
  //         await ensurePermission("PO Generation", "view"); // view PO Generation
  //       }

  //       // Case 2: For GRN
  //       if (normalizedType === "grn") {
  //         await ensurePermission(type, "view");
  //       }

  //       // Case 3: For PO Generation
  //       if (normalizedType === "po generation") {
  //         await ensurePermission(type, "view");
  //       }

  //       // Case 4: For GRN
  //       if (normalizedType === "pi request") {
  //         await ensurePermission(type, "view");
  //       }
  //       // ----------- start PO and Material Management Module ------ //
  //       // -----------------------------------------------------------------------------------//
  //       // ----------- start Payment Management Module -------------- //
  //       // Case 2: For Pending Payment Vendor List
  //       if (normalizedType === "pending payment vendor list") {
  //         await ensurePermission(type, "view");
  //       }

  //       // Case 3: For Payment Request
  //       if (normalizedType === "payment request") {
  //         await ensurePermission(type, "view");
  //       }

  //       // Case 4: For Vendor Payment History
  //       if (normalizedType === "vendor payment history") {
  //         await ensurePermission(type, "view");
  //       }
  //       // ----------- start Payment Management Module -------------- //
  //       // -----------------------------------------------------------------------------------//
  //       // ----------- start Item Request Module -------------- //
  //       // Case 2: For Item Request
  //       if (normalizedType === "item request") {
  //         await ensurePermission(type, "view");
  //       }

  //       // Case 3: For Material Approval
  //       if (normalizedType === "material approval") {
  //         await ensurePermission(type, "view");
  //       }

  //       // Case 4: For Request History Report
  //       if (normalizedType === "request history report") {
  //         await ensurePermission(type, "view");
  //       }
  //       // ----------- start Item Request Module -------------- //
  //     }

  //     // Refresh backend after all changes
  //     fetchUserPermission(id);
  //   } catch (error) {
  //     console.error("Error updating permission:", error);
  //     setOptimisticUpdates((prev) => {
  //       const newState = { ...prev };
  //       delete newState[key];
  //       return newState;
  //     });
  //     fetchUserPermission(id);
  //   } finally {
  //     setLoadingStates((prev) => ({ ...prev, [key]: false }));
  //   }
  // };

  const handlePermissionChange = async (
    module_name,
    type,
    permission,
    isChecked
  ) => {
    const key = makePermissionKey(module_name, type, permission);

    // Optimistic update (local UI)
    setOptimisticUpdates((prev) => ({ ...prev, [key]: isChecked }));
    setLoadingStates((prev) => ({ ...prev, [key]: true }));

    const payload = {
      user_id: id ? Number(id) : null,
      role_id: useCreationData?.role_id || null,
      module_name,
      type,
      permission,
      status: isChecked ? 1 : 0,
    };
    console.log("payload", payload);

    try {
      // 1️⃣ Update current permission
      await createUserPermission(payload);
      setLocalPermissions((prev) => ({ ...prev, [key]: isChecked }));

      const normalizedType = type?.trim()?.toLowerCase();
      const normalizedPerm = permission?.trim()?.toLowerCase();

      // --- Helper function for auto-check ---
      const ensurePermission = async (targetType, targetPerm) => {
        const targetKey = makePermissionKey(
          module_name,
          targetType,
          targetPerm
        );
        if (!localPermissions[targetKey]) {
          const newPayload = {
            user_id: Number(id),
            role_id: useCreationData?.role_id || null,
            module_name,
            type: targetType,
            permission: targetPerm,
            status: 1,
          };
          console.log("auto-check payload", newPayload);
          setOptimisticUpdates((prev) => ({ ...prev, [targetKey]: true }));
          setLoadingStates((prev) => ({ ...prev, [targetKey]: true }));
          await createUserPermission(newPayload);
          setLocalPermissions((prev) => ({ ...prev, [targetKey]: true }));
          setLoadingStates((prev) => ({ ...prev, [targetKey]: false }));
        }
      };

      // --- Helper function for auto-uncheck ---
      const removeDependentPermission = async (targetType, targetPerm) => {
        const targetKey = makePermissionKey(
          module_name,
          targetType,
          targetPerm
        );
        if (localPermissions[targetKey]) {
          const newPayload = {
            user_id: Number(id),
            role_id: useCreationData?.role_id || null,
            module_name,
            type: targetType,
            permission: targetPerm,
            status: 0,
          };
          console.log("auto-uncheck payload", newPayload);
          setOptimisticUpdates((prev) => ({ ...prev, [targetKey]: false }));
          setLoadingStates((prev) => ({ ...prev, [targetKey]: true }));
          await createUserPermission(newPayload);
          setLocalPermissions((prev) => ({ ...prev, [targetKey]: false }));
          setLoadingStates((prev) => ({ ...prev, [targetKey]: false }));
        }
      };

      // --- Auto-check logic ---
      if (isChecked && ["add", "generate"].includes(normalizedPerm)) {
        // ----------- PO and Material Management Module ------ //
        if (normalizedType === "get quotation") {
          await ensurePermission(type, "view");
          await ensurePermission("PO Generation", "add");
          await ensurePermission("PO Generation", "view");
          await ensurePermission("PI Request", "view");
        }
        if (normalizedType === "GRN") {
          await ensurePermission(type, "view");
          await ensurePermission("PO Generation", "view");
        }
        if (normalizedType === "po generation") {
          await ensurePermission(type, "  view");
          await ensurePermission("get quotation", "view");
          await ensurePermission("get quotation", "add");
        }
        if (normalizedType === "pi request")
          await ensurePermission(type, "view");
        await ensurePermission("GRN", "view");
        // ----------- Payment Management Module -------------- //
        if (normalizedType === "pending payment vendor list")
          await ensurePermission(type, "view");
        if (normalizedType === "payment request")
          await ensurePermission(type, "view");
        if (normalizedType === "vendor payment history") {
          await ensurePermission(type, "view");
          // await ensurePermission(type, "download");
        }
        // ----------- Item Request Module -------------- //
        if (normalizedType === "item request")
          await ensurePermission(type, "view");
        if (normalizedType === "material approval")
          await ensurePermission(type, "view");
        if (normalizedType === "request history report")
          await ensurePermission(type, "view");
      }

      // --- Auto-uncheck logic ---
      if (!isChecked && normalizedPerm === "view") {
        const dependentPerms = ["add", "generate"];
        for (const dep of dependentPerms) {
          await removeDependentPermission(type, dep);
        }
      }

      // --- Auto-check 'view' when 'download' is checked ---
      if (isChecked && normalizedPerm === "download") {
        if (normalizedType === "vendor payment history") {
          await ensurePermission(type, "view");
        }
      }

      // --- Auto-check 'view' when 'Approve' is checked ---
      if (isChecked && normalizedPerm === "approve") {
        if (normalizedType === "PO Generation") {
          await ensurePermission(type, "view");
        }
      }

      // Refresh backend after all changes
      fetchUserPermission(id);
    } catch (error) {
      console.error("Error updating permission:", error);
      // Revert optimistic update
      setOptimisticUpdates((prev) => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
      fetchUserPermission(id);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [key]: false }));
    }
  };

  // Checkbox Component with persistent state ---new
  const PermissionCheckbox = ({ module, type, permission }) => {
    const key = makePermissionKey(module, type, permission);
    const isLoading = loadingStates[key];
    const isChecked =
      key in optimisticUpdates
        ? optimisticUpdates[key]
        : localPermissions[key] || false;

    const uniqueId = `${module}_${type}_${permission}`.replace(/\s+/g, "_");

    return (
      <div className="form-check d-flex justify-content-center align-items-center">
        <input
          className="form-check-input"
          type="checkbox"
          id={uniqueId}
          checked={isChecked}
          onChange={(e) =>
            handlePermissionChange(module, type, permission, e.target.checked)
          }
          disabled={isLoading}
        />
        {isLoading && (
          <span className="spinner-border spinner-border-sm ms-2"></span>
        )}
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          .form-check-input:checked[type=checkbox] {
            --bs-form-check-bg-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='17' viewBox='0 0 15 14' fill='none'%3E%3Cpath d='M3.41667 7L6.33333 9.91667L12.1667 4.08333' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            background-color: #ffab1d;
            border-color: #ffab1d;
          }
          .form-check-input:checked {
            border-color: #ffab1d;
            background-color: #ffab1d;
            box-shadow: 0 0 0 0.25rem rgba(255, 171, 29, 0.25);
          }
          .form-check-input[type=checkbox] {
            border-radius: 0.267em;
            width: 1.2em;
            height: 1.2em;
          }
          .form-check-input:focus {
            border-color: #ffab1d;
            box-shadow: 0 0 0 0.25rem rgba(255, 171, 29, 0.25);
          }
          .form-check-input:disabled {
            opacity: 0.6;
          }
          .form-check {
            min-height: auto;
            margin-bottom: 0;
          }
        `}
      </style>
      {/* DataTable with Buttons */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-6">
            <div className="card-body">
              {/* Item Management Module */}
              <h5 className="card-title mb-4">Item Management Module</h5>
              <div className="card shadow-none mb-6 border-0">
                <div className="table-responsive border border-top-0 rounded">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-nowrap w-50">Type</th>
                        <th className="text-nowrap text-center w-px-50"></th>
                        <th className="text-nowrap text-center w-px-50"></th>
                        <th className="text-nowrap text-center w-px-50"></th>
                        <th className="text-nowrap text-center w-px-50">
                          {" "}
                          All Rights
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Material Code
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <PermissionCheckbox invisible />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <PermissionCheckbox invisible />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <PermissionCheckbox invisible />
                          </div>
                        </td>
                        <td>
                          {/* <div className="form-check d-flex justify-content-center text-center"> */}
                          {/* <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_34"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "Item Management Module" &&
                                    p.type === "Material Code" &&
                                    p.permission === "allrights"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Item Management Module",
                                  "Material Code",
                                  "allrights",
                                  e
                                )
                              }
                            /> */}
                          <PermissionCheckbox
                            module="Item Management Module"
                            type="Material Code"
                            permission="allrights"
                            id="material_code_allrights"
                          />
                          {/* </div> */}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Service Code
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <PermissionCheckbox invisible />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <PermissionCheckbox invisible />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <PermissionCheckbox invisible />
                          </div>
                        </td>
                        <td>
                          {/* <div className="form-check d-flex justify-content-center"> */}
                          {/* <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_38"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "Item Management Module" &&
                                    p.type === "Service Code" &&
                                    p.permission === "allrights"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Item Management Module",
                                  "Service Code",
                                  "allrights",
                                  e
                                )
                              }
                            /> */}
                          <PermissionCheckbox
                            module="Item Management Module"
                            type="Service Code"
                            permission="allrights"
                            id="service_code_allrights"
                          />
                          {/* </div> */}
                        </td>
                      </tr>
                      <tr className="border-transparent">
                        <td className="text-nowrap text-heading">Asset Code</td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <PermissionCheckbox invisible />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <PermissionCheckbox invisible />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <PermissionCheckbox invisible />
                          </div>
                        </td>
                        <td>
                          {/* <div className="form-check d-flex justify-content-center"> */}
                          {/* <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_42"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "Item Management Module" &&
                                    p.type === "Asset Code" &&
                                    p.permission === "allrights"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Item Management Module",
                                  "Asset Code",
                                  "allrights",
                                  e
                                )
                              }
                            /> */}
                          <PermissionCheckbox
                            module="Item Management Module"
                            type="Asset Code"
                            permission="allrights"
                            id="asset_code_allrights"
                          />
                          {/* </div> */}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Item Request Module */}
              <h5 className="card-title mb-4">Item Request Module</h5>
              <div className="card shadow-none mb-6 border-0">
                <div className="table-responsive border border-top-0 rounded">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-nowrap w-50">Type</th>
                        <th className="text-nowrap text-center w-px-50">
                          View
                        </th>
                        <th className="text-nowrap text-center w-px-50">
                          Add/Generate
                        </th>
                        {/* <th className="text-nowrap text-center w-px-50">
                          Delete
                        </th> */}
                        <th className="text-nowrap text-center w-px-50">
                          Approval
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Item Request
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="Item Request Module"
                            type="Item Request"
                            permission="view"
                            id="defaultCheck_cust_43"
                          />
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="Item Request Module"
                            type="Item Request"
                            permission="add"
                            id="defaultCheck_cust_44"
                          />
                        </td>
                        {/* <td>
                          <PermissionCheckbox
                            module="Item Request Module"
                            type="Item Request"
                            permission="delete"
                            id="defaultCheck_cust_45"
                          />
                        </td> */}
                        <td></td>
                      </tr>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Material Approval
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="Item Request Module"
                            type="Material Approval"
                            permission="view"
                            id="defaultCheck_cust_46"
                          />
                        </td>
                        {/* <td></td> */}
                        <td></td>
                        <td>
                          <PermissionCheckbox
                            module="Item Request Module"
                            type="Material Approval"
                            permission="approve"
                            id="defaultCheck_cust_47"
                          />
                        </td>
                      </tr>
                      <tr className="border-transparent">
                        <td className="text-nowrap text-heading">
                          Request History Report
                        </td>
                        <td>
                          {/* <PermissionCheckbox
                            module="Item Request Module"
                            type="Request History Report"
                            permission="view"
                            id="defaultCheck_cust_48"
                          /> */}
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="Item Request Module"
                            type="Request History Report"
                            permission="add"
                            id="defaultCheck_cust_48"
                          />
                        </td>
                        <td></td>
                        {/* <td></td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PO and Material Management Module */}
              <h5 className="card-title mb-4">
                PO &amp; Material Management Module
              </h5>
              <div className="card shadow-none mb-6 border-0">
                <div className="table-responsive border border-top-0 rounded">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-nowrap w-50">Type</th>
                        <th className="text-nowrap text-center w-px-50">
                          View
                        </th>
                        <th className="text-nowrap text-center w-px-50">
                          Add/Generate
                        </th>
                        {/* <th className="text-nowrap text-center w-px-50">
                          Edit
                        </th> */}
                        {/* <th></th>
                        <th></th> */}
                        {/* <th className="text-nowrap text-center w-px-50">
                          Delete
                        </th> */}
                        <th className="text-nowrap text-center w-px-50">
                          Approve
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-nowrap text-heading">PI Request</td>
                        <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="PI Request"
                            permission="view"
                            id="defaultCheck_cust_49"
                          />
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="PI Request"
                            permission="add"
                            id="defaultCheck_cust_50"
                          />
                        </td>
                        {/* <td></td> */}
                        {/* <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="PI Request"
                            permission="delete"
                            id="defaultCheck_cust_9"
                          />
                        </td> */}
                        <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="PI Request"
                            permission="approve"
                            id="defaultCheck_cust_10"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Get Quotation
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="Get Quotation"
                            permission="view"
                            id="defaultCheck_cust_11"
                          />
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="Get Quotation"
                            permission="add"
                            id="defaultCheck_cust_12"
                          />
                        </td>
                        {/* <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="Get Quotation"
                            permission="edit"
                            id="defaultCheck_cust_13"
                          />
                        </td> */}
                        {/* <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="Get Quotation"
                            permission="delete"
                            id="defaultCheck_cust_14"
                          />
                        </td> */}
                        <td></td>
                      </tr>
                      <tr>
                        <td className="text-nowrap text-heading">
                          PO Generation
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="PO Generation"
                            permission="view"
                            id="defaultCheck_cust_15"
                          />
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="PO Generation"
                            permission="add"
                            id="defaultCheck_cust_16"
                          />
                        </td>
                        {/* <td></td>
                        <td></td> */}
                        <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="PO Generation"
                            permission="approve"
                            id="defaultCheck_cust_17"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="text-nowrap text-heading">GRN</td>
                        <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="GRN"
                            permission="view"
                            id="defaultCheck_cust_18"
                          />
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="GRN"
                            permission="add"
                            id="defaultCheck_cust_19"
                          />
                        </td>
                        {/* <td></td> */}
                        {/* <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="GRN"
                            permission="delete"
                            id="defaultCheck_cust_20"
                          />
                        </td> */}
                        <td>
                          {/* <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="GRN"
                            permission="approve"
                            id="defaultCheck_cust_21"
                          /> */}
                        </td>
                      </tr>
                      {/* <tr className="border-transparent">
                        <td className="text-nowrap text-heading">
                          Invoice Entry
                        </td>
                        <td></td>
                        <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="Invoice Entry"
                            permission="add"
                            id="defaultCheck_cust_22"
                          />
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="Invoice Entry"
                            permission="edit"
                            id="defaultCheck_cust_23"
                          />
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="PO and Material Management Module"
                            type="Invoice Entry"
                            permission="delete"
                            id="defaultCheck_cust_24"
                          />
                        </td>
                        <td></td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Management Module */}
              <h5 className="card-title mb-4">Payment Management Module</h5>
              <div className="card shadow-none mb-6 border-0">
                <div className="table-responsive border border-top-0 rounded">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-nowrap w-50">Type</th>
                        <th className="text-nowrap text-center w-px-50">
                          View
                        </th>
                        <th className="text-nowrap text-center w-px-50">Add</th>
                        <th className="text-nowrap text-center w-px-50">
                          Approve
                        </th>
                        <th className="text-nowrap text-center w-px-50">
                          Download
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Pending Payment Vendor List
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="Payment Management Module"
                            type="Pending Payment Vendor List"
                            permission="view"
                            id="defaultCheck_cust_25"
                          />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Payment Request
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="Payment Management Module"
                            type="Payment Request"
                            permission="view"
                            id="defaultCheck_cust_26"
                          />
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="Payment Management Module"
                            type="Payment Request"
                            permission="add"
                            id="defaultCheck_cust_27"
                          />
                        </td>
                        <td>
                          {" "}
                          <PermissionCheckbox
                            module="Payment Management Module"
                            type="Payment Request"
                            permission="approve"
                            id="defaultCheck_cust_28"
                          />
                        </td>
                        <td></td>
                      </tr>
                      {/* <tr>
                        <td className="text-nowrap text-heading">
                          Payment Approval
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                          <PermissionCheckbox
                            module="Payment Management Module"
                            type="Payment Approval"
                            permission="approve"
                            id="defaultCheck_cust_28"
                          />
                        </td>
                        <td></td>
                      </tr> */}
                      <tr>
                        <td className="text-nowrap text-heading">
                          Vendor Payment History
                        </td>
                        <td>
                          <PermissionCheckbox
                            module="Payment Management Module"
                            type="Vendor Payment History"
                            permission="view"
                            id="defaultCheck_cust_29"
                          />
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                          <PermissionCheckbox
                            module="Payment Management Module"
                            type="Vendor Payment History"
                            permission="download"
                            id="defaultCheck_cust_30"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------END USER CREATION PERMISSION------------------- */}
    </>
  );
}
