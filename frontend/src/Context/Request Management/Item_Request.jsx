// import { createContext, useContext, useState } from "react";
// import { ENDPOINTS } from "../../constants/endpoints";
// import { deleteData, getData, postData } from "../../utils/api";
// import { toast } from "react-toastify";

// export const ItemRequestContext = createContext();

// // Custom Item Request Provider
// export const useItemRequest = () => {
//   return useContext(ItemRequestContext);
// };

// // Item Request Provider
// export const ItemRequestProvider = ({ children }) => {
//   const [loading, setLoading] = useState(false);
//   const [itemList, setItemList] = useState([]); // separate state for items
//   const [itemRequest, setItemRequest] = useState([]);
//   const [activeTab, setActiveTab] = useState("my_request");
//   const [filterItem, setFilterItem] = useState(null);
//   const [editId, setEditId] = useState(null);
//   const [selectedType, setSelectedType] = useState("all"); // item type filter
//   const [itemRequestData, setItemRequestData] = useState({
//     type: "",
//     item_type: "",
//     c_id: null,
//     sub_c_id: null,
//     item_code: null,
//     service_location_1_id: null,
//     service_location_2_id: null,
//     service_location_3_id: null,
//     purpose: "",
//     quantity: null,
//     uom: null,
//     remarks: "",
//     workflowId: null,
//     receiving_person: "",
//   });
//   const [ItemRequestEditId, setItemRequestEditId] = useState(null);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     perPage: 10,
//     total: 0,
//   });

//   // Get All Item Request Data
//   const getItemRequestData = async ({
//     search = "",
//     item_type = "",
//     status = "",
//     page = 1,
//     perPage = 10,
//     type = activeTab, // default to current tab
//   } = {}) => {
//     try {
//       setItemRequest([]);
//       setLoading(true);

//       const payload = {
//         type,
//         search,
//         item_type,
//         status,
//         page,
//         per_page: perPage,
//       };

//       // console.log("Request payload:", payload);

//       const res = await postData(ENDPOINTS.ITEM_REQUEST.LIST, payload);

//       // console.log("Response:", res);

//       const apiData = res.data;
//       setItemRequest(apiData.data || []);
//       setPagination({
//         currentPage: apiData.current_page || 1,
//         perPage: apiData.per_page || perPage,
//         total: apiData.total || 0,
//       });
//     } catch (error) {
//       console.log("item request error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch item request Filter
//   const fetchItemFilter = async () => {
//     try {
//       const res = await postData(ENDPOINTS.ITEM_REQUEST.FILTER);
//       // console.log("res", res);
//       setFilterItem(res.data);
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to fetch Item Request Filter");
//     }
//   };

//   // Get Item Request Details for update prefill values
//   // const getItemRequestDetails = async (workflowId) => {
//   //   try {
//   //     const res = await postData(ENDPOINTS.ITEM_REQUEST.DETAILS, {
//   //       workflowId,
//   //     });
//   //     setItemRequest(res.data);
//   //     console.log("res", res.data);
//   //   } catch (error) {
//   //     console.log("item request error:", error);
//   //   }
//   // };

//   // Get Item_name and id

//   // const getItemNameAndId = async (itemType) => {
//   //   if (!itemType) return;
//   //   try {
//   //     const res = await postData(ENDPOINTS.ITEM_REQUEST.ITEMLIST, {
//   //       item_type: itemType,
//   //     });

//   //     // console.log("Item list response:", res.data);

//   //     if (res.message === "Data fetched successfully") {
//   //       setItemList(res.data); // ✅ store only data list
//   //     } else {
//   //       setItemList([]);
//   //     }
//   //   } catch (error) {
//   //     console.log("Get Item name Error:", error);
//   //     setItemList([]);
//   //   }
//   // };

//   const getItemNameAndId = async (itemType) => {
//     if (!itemType) return;
//     try {
//       const res = await postData(ENDPOINTS.ITEM_REQUEST.ITEMLIST, {
//         item_type: itemType,
//       });

//       // console.log("res", res);

//       if (res.status && res.data) {
//         setItemList(res.data); // ✅ safe
//       } else {
//         setItemList([]); // no items
//         toast.warn(res.message || "No items found");
//       }
//     } catch (error) {
//       console.log("Get Item name Error:", error);
//       setItemList([]);
//       // toast.error("Failed to fetch items");
//     }
//   };

//   // Create Item Request
//   const createItemRequest = async (payload) => {
//     // setLoading(true);
//     try {
//       const res = await postData(ENDPOINTS.ITEM_REQUEST.ADD_UPDATE, payload);
//       if (res.data.success) {
//         await getItemRequestData();
//       }
//       console.log("payload", payload);
//       if (res.data) {
//         console.log("res.data", res.data);
//         setItemRequestData(res.data);
//         toast.success("Created Successfully");
//       }
//     } catch (error) {
//       // resetData();
//       console.log("Create Item Request Error:", error);
//     }
//     // finally {
//     //   setLoading(false);
//     // }
//   };

//   // Prefill Data while edit [workflowid , item request id]
//   // In ItemRequestProvider
//   // const fetchItemRequestById = async (workflowId) => {
//   //   try {
//   //     const res = await postData(ENDPOINTS.ITEM_REQUEST.DETAILS, {
//   //       workflowId,
//   //     });

//   //     if (res.data) {
//   //       const data = res.data; // adjust if backend wraps response

//   //       setItemRequestData((prev) => ({
//   //         ...prev,
//   //         item_id: data.item_id,
//   //         item_type: data.item_type,
//   //         c_id: data.c_id,
//   //         sub_c_id: data.sub_c_id,
//   //         item_code: data.item_code,
//   //         service_location_1_id: data.service_location_1_id,
//   //         service_location_2_id: data.service_location_2_id,
//   //         service_location_3_id: data.service_location_3_id,
//   //         purpose: data.purpose,
//   //         quantity: data.quantity,
//   //         uom: data.uom,
//   //         remarks: data.remarks,
//   //         receiving_person: data.receiving_person,
//   //       }));
//   //     }
//   //   } catch (error) {
//   //     console.error("fetchItemRequestById error", error);
//   //   }
//   // };

//   const fetchItemRequestById = async (workflowId) => {
//     try {
//       const res = await postData(ENDPOINTS.ITEM_REQUEST.DETAILS, {
//         workflowId,
//       });

//       console.log("res request", res);
//       console.log("res request workflowId", workflowId);

//       if (res.status && res.data) {
//         const data = res.data;
//         setItemRequestData((prev) => ({
//           ...prev,
//           item_id: data.item_id,
//           item_type: data.item_type,
//           c_id: data.c_id,
//           sub_c_id: data.sub_c_id,
//           item_code: data.item_code,
//           service_location_1_id: data.service_location_1_id,
//           service_location_2_id: data.service_location_2_id,
//           service_location_3_id: data.service_location_3_id,
//           purpose: data.purpose,
//           quantity: data.quantity,
//           uom: data.uom,
//           remarks: data.remarks,
//           receiving_person: data.receiving_person,
//         }));
//       } else {
//         toast.error(res.message || "Item request not found");
//       }
//     } catch (error) {
//       console.error("fetchItemRequestById error", error);
//       toast.error("Failed to fetch item request");
//     }
//   };

//   const startEditing = (itemid) => {
//     setEditId(itemid);
//     fetchItemRequestById(itemid);
//   };

//   // Create or Update Item Request
//   const editItemRequest = async (id, payload) => {
//     try {
//       const res = await postData(ENDPOINTS.ITEM_REQUEST.ADD_UPDATE, {
//         id,
//         ...payload,
//       });

//       // console.log("res", res.data);
//       if (res.data) {
//         setItemRequestData(res.data);
//         toast.success("Edited Successfully");
//       }
//     } catch (error) {
//       console.log("Edit Error:", error);
//     }
//   };

//   // Delete Item Request
//   const deleteItemRequest = async (id) => {
//     try {
//       await deleteData(`${ENDPOINTS.ITEM_REQUEST.DELETE}/${id}`);
//       toast.success("User deleted successfully");
//       getItemRequestData();
//     } catch (error) {
//       console.log("delete Error", error);
//     }
//   };

//   const resetData = () => {
//     setItemRequestData({
//       type: "",
//       item_type: "",
//       c_id: null,
//       sub_c_id: null,
//       item_code: null,
//       service_location_1_id: null,
//       service_location_2_id: null,
//       service_location_3_id: null,
//       purpose: "",
//       quantity: null,
//       uom: null,
//       remarks: "",
//       workflowId: null,
//       receiving_person: "",
//     });
//   };

//   // ---------------- Request Management [Approve, HandOver, Reject] -------------------- //

//   // Approve request
//   const approveRequest = async (workflow_id) => {
//     try {
//       const res = await postData(ENDPOINTS.ITEM_REQUEST.APPROVE, {
//         workflow_id, // send as object
//       });
//       // console.log("workflow", res);

//       if (res.status) {
//         toast.success(res.message);
//         getItemRequestData(); // refresh list
//       }
//     } catch (error) {
//       console.error("approve Request error:", error);
//       toast.error("Failed to approve request");
//     }
//   };

//   // HandOver request
//   const handOverRequest = async (id) => {
//     try {
//       const res = await postData(ENDPOINTS.ITEM_REQUEST.HANDOVER, {
//         id,
//       });

//       if (res.status) {
//         toast.success(res.message);
//         getItemRequestData(); // refresh list
//       }
//     } catch (error) {
//       console.error("handOver Request error:", error);
//       toast.error("Failed to handover request");
//     }
//   };

//   // Reject Request
//   const rejectRequest = async (item_request_id, workflow_id, reject_reason) => {
//     try {
//       const res = await postData(ENDPOINTS.ITEM_REQUEST.REJECT, {
//         item_request_id,
//         workflow_id,
//         reject_reason,
//       });

//       if (res.status) {
//         toast.success(res.message);
//         getItemRequestData(); // refresh list
//       }
//     } catch (error) {
//       console.error("Reject Request error:", error);
//       toast.error("Failed to reject request");
//     }
//   };

//   // Service Received
//   const serviceReceived = async (id) => {
//     try {
//       const res = await postData(ENDPOINTS.ITEM_REQUEST.SERVICERECEIVE, { id });
//       if (res.status) {
//         toast.success(res.message);
//         getItemRequestData(); // refresh list
//       }
//     } catch (error) {
//       console.error("Service Received Request error:", error);
//       toast.error("Failed to Service Received");
//     }
//   };

//   return (
//     <ItemRequestContext.Provider
//       value={{
//         itemRequest,
//         itemRequestData,
//         pagination,
//         itemList,
//         activeTab,
//         loading,
//         filterItem,
//         selectedType,
//         setSelectedType,
//         setFilterItem,
//         setLoading,
//         setActiveTab,
//         setItemList,
//         setPagination,
//         setItemRequestData,
//         getItemRequestData,
//         createItemRequest,
//         fetchItemRequestById,
//         editItemRequest,
//         deleteItemRequest,
//         approveRequest,
//         handOverRequest,
//         rejectRequest,
//         serviceReceived,
//         getItemNameAndId,
//         resetData,
//         fetchItemFilter,
//         startEditing,
//         setEditId,
//       }}
//     >
//       {children}
//     </ItemRequestContext.Provider>
//   );
// };

//////////////

import { createContext, useContext, useState } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { deleteData, getData, postData } from "../../utils/api";
import { toast } from "react-toastify";

export const ItemRequestContext = createContext();

export const useItemRequest = () => {
  return useContext(ItemRequestContext);
};

export const ItemRequestProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [itemRequest, setItemRequest] = useState([]);
  const [activeTab, setActiveTab] = useState("my_request");
  const [filterItem, setFilterItem] = useState(null);
  const [editId, setEditId] = useState(null);
  const [selectedType, setSelectedType] = useState("all");
  const [itemRequestData, setItemRequestData] = useState({
    type: "",
    item_type: "",
    c_id: null,
    category_name: "",
    sub_c_id: null,
    sub_category_name: "",
    item_code: null,
    service_location_1_id: null,
    service_location_1_name: "",
    service_location_2_id: null,
    service_location_2_name: "",
    service_location_3_id: null,
    service_location_3_name: "",
    purpose: "",
    quantity: null,
    uom: null,
    remarks: "",
    workflowId: null,
    receiving_person: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Get All Item Request Data
  const getItemRequestData = async ({
    search = "",
    item_type = "",
    status = "",
    page = 1,
    perPage = 10,
    type = activeTab,
    from_date = "",
    to_date = "",
  } = {}) => {
    try {
      setItemRequest([]);
      setLoading(true);

      const payload = {
        type,
        search,
        item_type,
        status,
        page,
        per_page: perPage,
        from_date: from_date || undefined, // only send if exists
        to_date: to_date || undefined,
      };

      const res = await postData(ENDPOINTS.ITEM_REQUEST.LIST, payload);

      const apiData = res.data;
      setItemRequest(apiData.data || []);
      setPagination({
        currentPage: apiData.current_page || 1,
        perPage: apiData.per_page || perPage,
        total: apiData.total || 0,
      });
    } catch (error) {
      console.log("item request error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get Item_name and id
  const getItemNameAndId = async (itemType) => {
    if (!itemType) return;
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.ITEMLIST, {
        item_type: itemType,
      });

      if (res.status && res.data) {
        setItemList(res.data);
      } else {
        setItemList([]);
        toast.warn(res.message || "No items found");
      }
    } catch (error) {
      console.log("Get Item name Error:", error);
      setItemList([]);
    }
  };

  // Create Item Request
  const createItemRequest = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.ADD_UPDATE, payload);
      if (res.data.success) {
        await getItemRequestData();
      }
      if (res.data) {
        setItemRequestData(res.data);
        toast.success("Created Successfully");
      }
    } catch (error) {
      console.log("Create Item Request Error:", error);
    }
  };

  // FIXED: Prefill Data while edit - Use item_request_id instead of workflowId
  // const fetchItemRequestById = async (itemRequestId) => {
  //   try {
  //     console.log("Fetching item request with ID:", itemRequestId);

  //     const res = await postData(ENDPOINTS.ITEM_REQUEST.DETAILS, {
  //       workflowId: itemRequestId,
  //     });

  //     console.log("API Response:", res);

  //     if (res.status && res.data) {
  //       const data = res.data;
  //       setItemRequestData((prev) => ({
  //         ...prev,
  //         item_id: data.item_id,
  //         item_type: data.item_type,
  //         c_id: data.item_request.c_id,
  //         sub_c_id: data.item_request.sub_c_id,
  //         item_code: data.item_request.item_code,
  //         service_location_1_id: data.item_request.service_location_1_id,
  //         service_location_2_id: data.item_request.service_location_2_id,
  //         service_location_3_id: data.item_request.service_location_3_id,
  //         purpose: data.item_request.purpose,
  //         quantity: data.item_request.quantity,
  //         uom: data.item_request.uom,
  //         remarks: data.item_request.remarks,
  //         receiving_person: data.item_request.receiving_person,
  //       }));
  //       toast.success("Item request loaded successfully");
  //     } else {
  //       toast.error(res.message || "Item request not found");
  //     }
  //   } catch (error) {
  //     console.error("fetchItemRequestById error", error);
  //     if (error.response?.status === 404) {
  //       toast.error("Item request not found. Please check the ID.");
  //     } else {
  //       toast.error("Failed to fetch item request");
  //     }
  //   }
  // };

  const fetchItemRequestById = async (itemRequestId) => {
    try {
      // console.log("Fetching item request with ID:", itemRequestId);

      const res = await postData(ENDPOINTS.ITEM_REQUEST.DETAILS, {
        workflowId: itemRequestId,
      });

      // console.log("API Response:", res);

      if (res.status && res.data) {
        const data = res.data;
        const itemRequest = data.item_request;
        const item = itemRequest?.item;
        const storageLocation = item?.storage_locations?.[0];

        // Set the form data with proper mapping
        setItemRequestData({
          // IDs for storage
          id: data.id,
          request_id: data.request_id,
          item_id: data.item_id,
          item_type: data.item_type,

          // Category and Subcategory
          c_id: itemRequest?.c_id,
          sub_c_id: itemRequest?.sub_c_id,

          // Item details
          item_code: itemRequest?.item_code,
          uom: itemRequest?.uom,

          // Service Locations - IDs
          service_location_1_id: itemRequest?.service_location_1_id,
          service_location_2_id: itemRequest?.service_location_2_id,
          service_location_3_id: itemRequest?.service_location_3_id,

          // Request details
          purpose: itemRequest?.purpose,
          quantity: itemRequest?.quantity,
          remarks: itemRequest?.remarks,
          receiving_person: itemRequest?.receiving_person,

          // Display names for showing in form
          category_name:
            itemRequest?.item?.subcategory?.category?.category_name || "",
          sub_category_name:
            itemRequest?.item?.subcategory?.sub_category_name || "",
          service_location_1_name:
            storageLocation?.service_location3?.service_location2
              ?.service_location1?.service_location_name || "",
          service_location_2_name:
            storageLocation?.service_location3?.service_location2
              ?.service_location_2_name || "",
          service_location_3_name:
            storageLocation?.service_location3?.service_location_3_name || "",
          item_name: data.item_name || "",
        });

        // toast.success("Item request loaded successfully");
        return true;
      } else {
        toast.error(res.message || "Item request not found");
        return false;
      }
    } catch (error) {
      console.error("fetchItemRequestById error", error);
      toast.error("Failed to fetch item request");
      return false;
    }
  };

  const startEditing = (itemRequestId) => {
    setEditId(itemRequestId);
    fetchItemRequestById(itemRequestId);
  };

  // FIXED: Edit Item Request
  const editItemRequest = async (id, payload) => {
    try {
      // console.log("Editing item request with ID:", id);
      // console.log("Payload:", payload);

      const res = await postData(ENDPOINTS.ITEM_REQUEST.ADD_UPDATE, {
        id: id, // Ensure ID is included
        ...payload,
      });

      // console.log("Edit Response:", res);

      if (res.status) {
        setItemRequestData(res.data);
        toast.success("Updated Successfully");
        getItemRequestData(); // Refresh the list
      } else {
        toast.error(res.message || "Failed to update item request");
      }
    } catch (error) {
      console.log("Edit Error:", error);
      toast.error("Error updating item request");
    }
  };

  // Delete Item Request
  const deleteItemRequest = async (id) => {
    try {
      await deleteData(`${ENDPOINTS.ITEM_REQUEST.DELETE}/${id}`);
      toast.success("Item request deleted successfully");
      getItemRequestData();
    } catch (error) {
      console.log("delete Error", error);
    }
  };

  // Approve request
  const approveRequest = async (workflow_id) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.APPROVE, {
        workflow_id,
      });

      if (res.status) {
        toast.success(res.message);
        getItemRequestData();
      }
    } catch (error) {
      console.error("approve Request error:", error);
      toast.error("Failed to approve request");
    }
  };

  // Other functions remain the same...
  const handOverRequest = async (id) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.HANDOVER, { id });
      if (res.status) {
        toast.success(res.message);
        getItemRequestData();
      }
    } catch (error) {
      console.error("handOver Request error:", error);
      toast.error("Failed to handover request");
    }
  };

  const rejectRequest = async (item_request_id, workflow_id, reject_reason) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.REJECT, {
        item_request_id,
        workflow_id,
        reject_reason,
      });
      if (res.status) {
        toast.success(res.message);
        getItemRequestData();
      }
    } catch (error) {
      console.error("Reject Request error:", error);
      toast.error("Failed to reject request");
    }
  };

  const serviceReceived = async (id) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.SERVICERECEIVE, { id });
      if (res.status) {
        toast.success(res.message);
        getItemRequestData();
      }
    } catch (error) {
      console.error("Service Received Request error:", error);
      toast.error("Failed to Service Received");
    }
  };

  const resetData = () => {
    setItemRequestData({
      type: "",
      item_type: "",
      c_id: null,
      sub_c_id: null,
      item_code: null,
      service_location_1_id: null,
      service_location_2_id: null,
      service_location_3_id: null,
      purpose: "",
      quantity: null,
      uom: null,
      remarks: "",
      workflowId: null,
      receiving_person: "",
    });
  };

  //   // Fetch item request Filter
  const fetchItemFilter = async (sub_c_id = null) => {
    try {
      const payload = sub_c_id ? { sub_c_id } : {}; // only send if provided
      const res = await postData(ENDPOINTS.ITEM_REQUEST.FILTER, payload);
      setFilterItem(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Item Request Filter");
    }
  };

  // const fetchItemFilter = async (sub_c_id) => {
  //   try {
  //     const res = await postData(ENDPOINTS.ITEM_REQUEST.FILTER, sub_c_id);
  //     // console.log("res", res);
  //     setFilterItem(res.data);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to fetch Item Request Filter");
  //   }
  // };

  return (
    <ItemRequestContext.Provider
      value={{
        itemRequest,
        itemRequestData,
        pagination,
        itemList,
        activeTab,
        loading,
        filterItem,
        selectedType,
        setSelectedType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        setFilterItem,
        setLoading,
        setActiveTab,
        setItemList,
        setPagination,
        setItemRequestData,
        getItemRequestData,
        createItemRequest,
        fetchItemRequestById,
        editItemRequest,
        deleteItemRequest,
        approveRequest,
        handOverRequest,
        rejectRequest,
        serviceReceived,
        getItemNameAndId,
        resetData,
        startEditing,
        setEditId,
        fetchItemFilter,
      }}
    >
      {children}
    </ItemRequestContext.Provider>
  );
};
