import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../../constants/endpoints";
import { deleteData, getData, postData } from "../../utils/api";

export const ItemMasterContext = createContext();

// Item Category Custom Hook
export const useItemMaster = () => {
  return useContext(ItemMasterContext);
};

// Item Category Provider
export const ItemMasterProvider = ({ children }) => {
  const [itemMaster, setItemMaster] = useState([]);
  const [isItemEditId, setItemEditId] = useState(null);
  const [itemMasterData, setItemMasterData] = useState({
    item_code: "",
    type: "",
    item_name: "",
    c_id: null,
    sub_c_id: null,
    group_id: null,
    uom: "",
    description: "",
    is_purpose_required: null,
    is_approval_required: null,
    service_location_1_id: null,
    service_location_2_id: null,
    service_location_3_id: null,
    stock: null,
    stock_value: null,
    minimum_stock: null,
    is_movable: null,
    purchase_date: "",
    warranty_expiry: null,
    service_location2: null,
    service_location3: null,
    status: null,
  });

  // Get All Item Master Data
  const fetchItemMaster = async ({
    search = "",
    type = "",
    category_id = null,
    subcategory_id = null,
    status = null,
  }) => {
    try {
      const res = await getData(
        `${ENDPOINTS.ITEM_MASTER.LIST}?search=${search}`,
        {
          type,
          category_id,
          subcategory_id,
          status,
        }
      );

      if (res.data && res.data.status === false) {
        // Backend says no data
        setItemMaster([]);
        console.warn(res.data.message); // "No items found."
        // Optional: show toast.info instead of error
        // toast.info(res.data.message);
      } else {
        setItemMaster(res.data.data || []);
      }
    } catch (error) {
      console.error("item master fetch error:", error);
      // toast.error("Failed to fetch item master");
    }
  };

  // Create Item Master
  const createItemMaster = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_MASTER.ADD_UPDATE, payload);
      setItemMasterData(res.data.data);
      toast.success("Item Created Successfully!");
      fetchItemMaster();
    } catch (error) {
      console.log("item master create error:", error);
      toast.error("item master create error");
    }
  };

  // Edit Item Master
  const EditItemMaster = async (item_id, payload) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_MASTER.ADD_UPDATE, {
        item_id,
        ...payload,
      });
      setItemMasterData(res.data.data);
      toast.success("Item Updated Successfully!");
      fetchItemMaster();
    } catch (error) {
      console.log("Failed to Edit Item", error);
      toast.error("Failed to Edit Item");
    }
  };

  // Start Editing
  const StartEditing = (item_id, item) => {
    setItemEditId(item_id);
    setItemMasterData(item);
  };

  // Delete Item Master
  const deleteItemMaster = async (item_id) => {
    try {
      const res = await deleteData(
        `${ENDPOINTS.ITEM_MASTER.DELETE}/${item_id}`
      );
      fetchItemMaster();
      toast.success("Item Delete Successfully!");
    } catch (error) {
      console.log("item master Delete error:", error);
      toast.error("item master Delete error");
    }
  };

  // Reset Item Master
  const ResetItemMaster = () => {
    setItemEditId(null);
    setItemMasterData({
      item_code: "",
      type: "",
      item_name: "",
      c_id: null,
      sub_c_id: null,
      group_id: null,
      uom: "",
      description: "",
      zone_id: null,
      is_purpose_required: null,
      is_approval_required: null,
      service_location_1_id: null,
      service_location_2_id: null,
      service_location_3_id: null,
      stock: null,
      stock_value: null,
      minimum_stock: null,
      is_movable: null,
      purchase_date: "",
      warranty_expiry: null,
      service_location2: null,
      service_location3: null,
      status: null,
    });
  };

  return (
    <ItemMasterContext.Provider
      value={{
        itemMaster,
        isItemEditId,
        itemMasterData,
        setItemMasterData,

        fetchItemMaster,
        createItemMaster,
        deleteItemMaster,
        ResetItemMaster,
        EditItemMaster,
        StartEditing,
      }}
    >
      {children}
    </ItemMasterContext.Provider>
  );
};
