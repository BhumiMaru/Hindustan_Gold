import { createContext, useContext, useState } from "react";
import { ENDPOINTS } from "../../constants/endpoints";
import { getData, postData } from "../../utils/api";

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
    receiving_person: "",
  });

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

  // Create Item Request
  const createItemRequest = async () => {
    try {
      const res = await postData(
        ENDPOINTS.ITEM_REQUEST.ADD_UPDATE,
        itemRequestData
      );
      if (res.data.success) {
        console.log("Item Request Created:", res.data.data);
        getItemRequestData(); // refresh list after create
      }
    } catch (error) {
      console.log("Create Item Request Error:", error);
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
      }}
    >
      {children}
    </ItemRequestContext.Provider>
  );
};
