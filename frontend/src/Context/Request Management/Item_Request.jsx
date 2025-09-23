import { createContext, useContext, useState } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { deleteData, getData, postData } from "../../utils/api";
import { toast } from "react-toastify";

export const ItemRequestContext = createContext();

// Custom Item Request Provider
export const useItemRequest = () => {
  return useContext(ItemRequestContext);
};

// Item Request Provider
export const ItemRequestProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]); // separate state for items
  const [itemRequest, setItemRequest] = useState([]);
  const [activeTab, setActiveTab] = useState("my_request");
  const [filterItem, setFilterItem] = useState(null);
  const [editId, setEditId] = useState(null);
  const [itemRequestData, setItemRequestData] = useState({
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
  const [ItemRequestEditId, setItemRequestEditId] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // Get All Item Request Data
  const getItemRequestData = async ({
    search = "",
    item_type = "",
    status = "",
    page = 1,
    perPage = 10,
    type = activeTab, // default to current tab
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
      };

      // console.log("Request payload:", payload);

      const res = await postData(ENDPOINTS.ITEM_REQUEST.LIST, payload);

      // console.log("Response:", res);

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

  // Fetch item request Filter
  const fetchItemFilter = async () => {
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.FILTER);
      // console.log("res", res);
      setFilterItem(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Item Request Filter");
    }
  };

  // Get Item Request Details for update prefill values
  // const getItemRequestDetails = async (workflowId) => {
  //   try {
  //     const res = await postData(ENDPOINTS.ITEM_REQUEST.DETAILS, {
  //       workflowId,
  //     });
  //     setItemRequest(res.data);
  //     console.log("res", res.data);
  //   } catch (error) {
  //     console.log("item request error:", error);
  //   }
  // };

  // Get Item_name and id

  const getItemNameAndId = async (itemType) => {
    if (!itemType) return;
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.ITEMLIST, {
        item_type: itemType,
      });

      // console.log("Item list response:", res.data);

      if (res.message === "Data fetched successfully") {
        setItemList(res.data); // ✅ store only data list
      } else {
        setItemList([]);
      }
    } catch (error) {
      console.log("Get Item name Error:", error);
      setItemList([]);
    }
  };

  // Create Item Request
  const createItemRequest = async () => {
    // setLoading(true);
    try {
      const res = await postData(
        ENDPOINTS.ITEM_REQUEST.ADD_UPDATE,
        itemRequestData
      );
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
    // finally {
    //   setLoading(false);
    // }
  };

  // Prefill Data while edit [workflowid , item request id]
  // In ItemRequestProvider
  const fetchItemRequestById = async (workflowId) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.DETAILS, {
        workflowId,
      });

      if (res.data) {
        const data = res.data; // adjust if backend wraps response

        setItemRequestData((prev) => ({
          ...prev,
          item_id: data.item_id,
          item_type: data.item_type,
          c_id: data.c_id,
          sub_c_id: data.sub_c_id,
          item_code: data.item_code,
          service_location_1_id: data.service_location_1_id,
          service_location_2_id: data.service_location_2_id,
          service_location_3_id: data.service_location_3_id,
          purpose: data.purpose,
          quantity: data.quantity,
          uom: data.uom,
          remarks: data.remarks,
          receiving_person: data.receiving_person,
        }));
      }
    } catch (error) {
      console.error("fetchItemRequestById error", error);
    }
  };

  const startEditing = (itemid) => {
    setEditId(itemid);
    fetchItemRequestById(itemid);
  };

  // Create or Update Item Request
  const editItemRequest = async (id, payload) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.ADD_UPDATE, {
        id,
        ...payload,
      });

      // console.log("res", res.data);
      if (res.data) {
        setItemRequestData(res.data);
        toast.success("Edited Successfully");
      }
    } catch (error) {
      console.log("Edit Error:", error);
    }
  };

  // Delete Item Request
  const deleteItemRequest = async (id) => {
    try {
      await deleteData(`${ENDPOINTS.ITEM_REQUEST.DELETE}/${id}`);
      toast.success("User deleted successfully");
      getItemRequestData();
    } catch (error) {
      console.log("delete Error", error);
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

  // ---------------- Request Management [Approve, HandOver, Reject] -------------------- //

  // Approve request
  const approveRequest = async (workflow_id) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.APPROVE, {
        workflow_id, // send as object
      });
      // console.log("workflow", res);

      if (res.status) {
        toast.success(res.message);
        getItemRequestData(); // refresh list
      }
    } catch (error) {
      console.error("approve Request error:", error);
      toast.error("Failed to approve request");
    }
  };

  // HandOver request
  const handOverRequest = async (id) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.HANDOVER, {
        id,
      });

      if (res.status) {
        toast.success(res.message);
        getItemRequestData(); // refresh list
      }
    } catch (error) {
      console.error("handOver Request error:", error);
      toast.error("Failed to handover request");
    }
  };

  // Reject Request
  const rejectRequest = async (item_request_id, workflow_id, reject_reason) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.REJECT, {
        item_request_id,
        workflow_id,
        reject_reason,
      });

      if (res.status) {
        toast.success(res.message);
        getItemRequestData(); // refresh list
      }
    } catch (error) {
      console.error("Reject Request error:", error);
      toast.error("Failed to reject request");
    }
  };

  // Service Received
  const serviceReceived = async (id) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.SERVICERECEIVE, { id });
      if (res.status) {
        toast.success(res.message);
        getItemRequestData(); // refresh list
      }
    } catch (error) {
      console.error("Service Received Request error:", error);
      toast.error("Failed to Service Received");
    }
  };

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
        fetchItemFilter,
        startEditing,
      }}
    >
      {children}
    </ItemRequestContext.Provider>
  );
};
