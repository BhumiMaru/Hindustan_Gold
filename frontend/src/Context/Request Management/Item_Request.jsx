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
  const [itemRequest, setItemRequest] = useState([]);
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

  // Get All Item Request Data
  const getItemRequestData = async () => {
    try {
      const res = await postData(ENDPOINTS.ITEM_REQUEST.LIST, {
        type: "my_request",
      });
      setItemRequest(res.data.data);
    } catch (error) {
      console.log("item request error:", error);
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

  // Create Item Request
  const createItemRequest = async () => {
    try {
      const res = await postData(
        ENDPOINTS.ITEM_REQUEST.ADD_UPDATE,
        itemRequestData
      );
      if (res.data.success) {
        // console.log("Item Request Created:", res.data.data);
        getItemRequestData(); // refresh list after create
      }
      // console.log("res", res.data);
      if (res.data) {
        setItemRequestData(res.data);
        toast.success("Created Successfully");
      }
    } catch (error) {
      console.log("Create Item Request Error:", error);
    }
  };

  // Prefill Data while edit [workflowid , item request id]
  const fetchItemRequestById = async (id, workflowId) => {
    try {
      const res = await postData(`${ENDPOINTS.ITEM_REQUEST.DETAILS}?id=${id}`, {
        workflowId: workflowId,
      });
      // console.log("res", res);
      if (res.data) {
        const data = res?.data.item_request; // Adjust depending on response shape
        // console.log("data", data);
        // Map your response fields to itemRequestData structure
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
          // any other needed fields...
        }));
      }
    } catch (error) {
      console.error("fetchItemRequestById error", error);
    }
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

  return (
    <ItemRequestContext.Provider
      value={{
        itemRequest,
        itemRequestData,
        setItemRequestData,
        getItemRequestData,
        createItemRequest,
        fetchItemRequestById,
        editItemRequest,
        deleteItemRequest,
      }}
    >
      {children}
    </ItemRequestContext.Provider>
  );
};
