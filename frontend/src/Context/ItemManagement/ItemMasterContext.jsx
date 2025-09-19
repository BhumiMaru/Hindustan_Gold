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
    item_type: "",
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
  const [itemSubCategoryId, setItemSubCategoryId] = useState(null);

  // Get All Item Master Data
  const fetchItemMaster = async ({
    search = "",
    type = "",
    c_id = null,
    sub_c_id = null,
    status = null,
  } = {}) => {
    try {
      const res = await getData(ENDPOINTS.ITEM_MASTER.LIST, {
        type,
        c_id,
        sub_c_id,
        status,
      });

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
      const sanitizedPayload = {
        ...payload,
        is_movable: payload.is_movable !== null ? payload.is_movable : 0, // default to 0
        stock: payload.stock ? Number(payload.stock) : 0,
        stock_value: payload.stock_value ? Number(payload.stock_value) : 0,
        minimum_stock: payload.minimum_stock
          ? Number(payload.minimum_stock)
          : 0,
      };

      const res = await postData(
        ENDPOINTS.ITEM_MASTER.ADD_UPDATE,
        sanitizedPayload
      );
      // console.log("res", res.data);
      setItemMasterData(res.data.data);

      return res.data.data;
    } catch (error) {
      console.log("item master create error:", error);
      toast.error("item master create error");
    }
  };

  // Edit Item Master
  const EditItemMaster = async (item_id, payload) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_MASTER.ADD_UPDATE, {
        id: item_id,
        ...payload,
      });

      // console.log("res", res);
      setItemMasterData(res.data.data);
      // toast.success("Item Updated Successfully!");
      // fetchItemMaster();
    } catch (error) {
      console.log("Failed to Edit Item", error);
      toast.error("Failed to Edit Item");
    }
  };

  const fetchitemById = async (id) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_MASTER.DETAILS, { id });
      const item = res.data;

      setItemMasterData({
        item_code: item?.item_code || "",
        item_type: item?.item_type || "",
        type: item?.type || "",
        item_name: item?.item_name || "",
        c_id: item?.c_id || null,
        c_name: item?.category?.category_name || "", // ✅ for Category display
        sub_c_id: item?.sub_c_id ? Number(item.sub_c_id) : null,
        sub_c_name: item?.subcategory?.sub_category_name || "", // ✅ for Subcategory
        group_id: item?.group_id || null,
        group_name: item?.group?.group_name || "", // ✅ for Group
        uom: item?.uom || "",
        description: item?.description || "",
        is_purpose_required: Number(item?.is_purpose_required) ?? 0,
        is_approval_required: Number(item?.is_approval_required) ?? 0,
        is_movable: Number(item?.is_movable) ?? 0,
        service_location_1_id: item?.service_location_1_id || null,
        service_location_2_id: item?.service_location_2_id || null,
        service_location_3_id: Array.isArray(item?.service_location_3_id)
          ? item.service_location_3_id.map(Number)
          : item?.service_location_3_id
          ? [Number(item.service_location_3_id)]
          : [],

        zone_id: Array.isArray(item?.zone_id)
          ? item.zone_id.map(Number)
          : item?.zone_id
          ? [Number(item.zone_id)]
          : [],
        stock: item?.stock ?? 0,
        stock_value: item?.stock_value ?? 0,
        minimum_stock: item?.minimum_stock ?? 0,
        purchase_date: item?.purchase_date || "",
        warranty_expiry: item?.warranty_expiry || "",
        status: Number(item?.status) ?? 1,
      });
    } catch (error) {
      console.log("fetchitemById error:", error);
    }
  };

  // Start Editing
  const StartEditing = (item_id) => {
    // console.log("StartEditing called with:", item_id);
    setItemEditId(item_id);
    fetchitemById(item_id);
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

  // Item Type
  const ItemType = {
    material: "material",
    service: "service",
    asset: "asset",
  };

  // Get Category , Group And Item code from Sub category id
  const getCategoryGroupAndItemCodeBySubCategoryId = async (type, sub_c_id) => {
    try {
      // console.log("ItemType", ItemType);
      const mappedType = ItemType[type];

      // console.log("🔹 Payload sending to API:", {
      //   item_type: mappedType,
      //   sub_c_id,
      // });

      const res = await postData(ENDPOINTS.ITEM_MASTER.CODEGET, {
        item_type: mappedType, // Changed from 'type' to 'item_type'
        sub_c_id,
      });

      if (res.data) {
        const { item_code, category, group, subcategory } = res.data;

        // auto update itemMasterData with category, group, and item_code
        setItemMasterData((prev) => ({
          ...prev,
          item_code: item_code,
          c_id: category?.id,
          c_name: category?.category_name,
          group_id: group?.id,
          group_name: group?.group_name,
          sub_c_id: sub_c_id,
          sub_c_name: subcategory?.sub_category_name,
          item_type: mappedType, // ✅ also update item_type in state
        }));

        return res.data; // return full data in case needed
      } else {
        toast.error(res.data.message || "Failed to generate item code");
        return null;
      }
    } catch (error) {
      console.log(
        "item master getCategoryGroupAndItemCodeBySubCategoryId error:",
        error
      );
      toast.error("Failed to generate item code");
      return null;
    }
  };

  return (
    <ItemMasterContext.Provider
      value={{
        itemMaster,
        isItemEditId,
        itemMasterData,
        setItemMaster,
        setItemMasterData,
        itemSubCategoryId,
        setItemSubCategoryId,
        fetchitemById,

        getCategoryGroupAndItemCodeBySubCategoryId,
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
