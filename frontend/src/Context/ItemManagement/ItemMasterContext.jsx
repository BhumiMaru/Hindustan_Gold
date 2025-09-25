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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  const [itemSubCategoryId, setItemSubCategoryId] = useState(null);

  // Get All Item Master Data
  const fetchItemMaster = async ({
    search = "",
    type = "",
    c_id = null,
    sub_c_id = null,
    status = null,
    page = 1,
    perPage = 10,
  } = {}) => {
    try {
      const res = await getData(ENDPOINTS.ITEM_MASTER.LIST, {
        search,
        type,
        c_id,
        sub_c_id,
        status,
        page,
        per_page: perPage,
      });

      if (res.data && res.data.status === false) {
        setItemMaster([]);
        setPagination({
          currentPage: 1,
          perPage,
          total: 0,
        });
      } else {
        const apiData = res.data;
        setItemMaster(apiData.data || []);
        setPagination({
          currentPage: apiData.current_page,
          perPage: apiData.per_page,
          total: apiData.total,
        });
      }
    } catch (error) {
      console.error("item master fetch error:", error);
      toast.error("Failed to fetch item master");
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

  // const fetchitemById = async (id) => {
  //   try {
  //     const res = await postData(ENDPOINTS.ITEM_MASTER.DETAILS, { id });
  //     const item = res.data;
  //     console.log("item master", item);

  //     setItemMasterData({
  //       item_code: item?.item_code || "",
  //       item_type: item?.item_type || "",
  //       type: item?.type || "",
  //       item_name: item?.item_name || "",
  //       c_id: item?.c_id || null,
  //       c_name: item?.category?.category_name || "", // ✅ for Category display
  //       // sub_c_id: item?.sub_c_id ? Number(item.sub_c_id) : null,
  //       sub_c_id: item?.subcategory?.id ? Number(item?.subcategory?.id) : null,
  //       sub_c_name: item?.subcategory?.sub_category_name || "", // ✅ for Subcategory
  //       group_id: item?.group_id || null,
  //       group_name: item?.group?.group_name || "", // ✅ for Group
  //       uom: item?.uom || "",
  //       description: item?.description || "",
  //       is_purpose_required: Number(item?.is_purpose_required) ?? 0,
  //       is_approval_required: Number(item?.is_approval_required) ?? 0,
  //       is_movable: Number(item?.is_movable) ?? 0,
  //       service_location_1_id: item?.service_location_1_id || null,
  //       service_location_2_id: item?.service_location_2_id || null,
  //       service_location_3_id: Array.isArray(item?.service_location_3_id)
  //         ? item.service_location_3_id.map(Number)
  //         : item?.service_location_3_id
  //         ? [Number(item.service_location_3_id)]
  //         : [],

  //       zone_id: Array.isArray(item?.zone_id)
  //         ? item.zone_id.map(Number)
  //         : item?.zone_id
  //         ? [Number(item.zone_id)]
  //         : [],
  //       stock: item?.stock ?? 0,
  //       stock_value: item?.stock_value ?? 0,
  //       minimum_stock: item?.minimum_stock ?? 0,
  //       purchase_date: item?.purchase_date || "",
  //       warranty_expiry: item?.warranty_expiry || "",
  //       status: Number(item?.status) ?? 1,
  //     });
  //   } catch (error) {
  //     console.log("fetchitemById error:", error);
  //   }
  // };

  // Start Editing

  // const fetchitemById = async (id) => {
  //   try {
  //     const res = await postData(ENDPOINTS.ITEM_MASTER.DETAILS, { id });
  //     const item = res.data;
  //     console.log("item master", item);

  //     // Initialize arrays
  //     const sl1Ids = [];
  //     const sl2Ids = [];
  //     const sl3Ids = [];
  //     const sl1Names = [];
  //     const sl2Names = [];
  //     const sl3Names = [];

  //     // Process storage_locations if they exist
  //     if (Array.isArray(item?.storage_locations)) {
  //       item.storage_locations.forEach((storage) => {
  //         console.log("storage", storage);
  //         // Service Location 1
  //         if (
  //           storage?.service_location1?.id &&
  //           !sl1Ids.includes(storage.service_location1.id)
  //         ) {
  //           sl1Ids.push(storage.service_location1.id);
  //           sl1Names.push(storage.service_location1.service_location_name);
  //         }

  //         // Service Location 2
  //         if (
  //           storage?.service_location2?.id &&
  //           !sl2Ids.includes(storage.service_location2.id)
  //         ) {
  //           sl2Ids.push(storage.service_location2.id);
  //           sl2Names.push(storage.service_location2.service_location_name);
  //         }

  //         // Service Location 3
  //         if (
  //           storage?.service_location3?.id &&
  //           !sl3Ids.includes(Number(storage.service_location3.id))
  //         ) {
  //           sl3Ids.push(Number(storage.service_location3.id));
  //           sl3Names.push(storage.service_location3.service_location_name);
  //         }
  //       });
  //     }

  //     setItemMasterData({
  //       item_code: item?.item_code || "",
  //       item_type: item?.item_type || "",
  //       type: item?.type || "",
  //       item_name: item?.item_name || "",
  //       c_id: item?.c_id || null,
  //       c_name: item?.category?.category_name || "", // ✅ Category
  //       sub_c_id: item?.subcategory?.id ? Number(item?.subcategory?.id) : null,
  //       sub_c_name: item?.subcategory?.sub_category_name || "", // ✅ Subcategory
  //       group_id: item?.group_id || null,
  //       group_name: item?.group?.group_name || "", // ✅ Group
  //       uom: item?.uom || "",
  //       description: item?.description || "",
  //       is_purpose_required: Number(item?.is_purpose_required) ?? 0,
  //       is_approval_required: Number(item?.is_approval_required) ?? 0,
  //       is_movable: Number(item?.is_movable) ?? 0,

  //       // ✅ Multiple Service Locations
  //       service_location_1_id: sl1Ids,
  //       service_location_1_name: sl1Names,
  //       service_location_2_id: sl2Ids,
  //       service_location_2_name: sl2Names,
  //       service_location_3_id: sl3Ids,
  //       service_location_3_name: sl3Names,

  //       // ✅ Zones
  //       zone_id: Array.isArray(item?.zones)
  //         ? item.zones.map((z) => Number(z.zone?.id))
  //         : [],

  //       stock: item?.stock ?? 0,
  //       stock_value: item?.stock_value ?? 0,
  //       minimum_stock: item?.minimum_stock ?? 0,
  //       purchase_date: item?.purchase_date || "",
  //       warranty_expiry: item?.warranty_expiry || "",
  //       status: Number(item?.status) ?? 1,
  //     });
  //   } catch (error) {
  //     console.log("fetchitemById error:", error);
  //   }
  // };

  const fetchitemById = async (id) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_MASTER.DETAILS, { id });
      const item = res.data;
      // console.log("item master", item);

      // Based on the nested structure, adjust the mapping accordingly
      const getServiceLocationData = () => {
        if (!Array.isArray(item?.storage_locations)) {
          return {
            sl1: { ids: [], names: [] },
            sl2: { ids: [], names: [] },
            sl3: { ids: [], names: [] },
          };
        }

        const sl1Ids = [],
          sl1Names = [];
        const sl2Ids = [],
          sl2Names = [];
        const sl3Ids = [],
          sl3Names = [];

        item.storage_locations.forEach((storage) => {
          // console.log("Processing storage:", storage);

          // Service Location 3 - Top level in the nested structure
          if (storage?.service_location3?.id) {
            const sl3 = storage.service_location3;
            const sl3Id = Number(sl3.id);
            const sl3Name = sl3.service_location_3_name;

            if (!sl3Ids.includes(sl3Id)) {
              sl3Ids.push(sl3Id);
              sl3Names.push(sl3Name || "");
            }

            // Service Location 2 - Nested inside service_location3
            if (sl3?.service_location2?.id) {
              const sl2 = sl3.service_location2;
              const sl2Id = sl2.id;
              const sl2Name = sl2.service_location_2_name;

              if (!sl2Ids.includes(sl2Id)) {
                sl2Ids.push(sl2Id);
                sl2Names.push(sl2Name || "");
              }

              // Service Location 1 - Nested inside service_location2
              if (sl2?.service_location1?.id) {
                const sl1 = sl2.service_location1;
                const sl1Id = sl1.id;
                const sl1Name = sl1.service_location_name;

                if (!sl1Ids.includes(sl1Id)) {
                  sl1Ids.push(sl1Id);
                  sl1Names.push(sl1Name || "");
                }
              }
            }
          }
        });

        return {
          sl1: { ids: sl1Ids, names: sl1Names },
          sl2: { ids: sl2Ids, names: sl2Names },
          sl3: { ids: sl3Ids, names: sl3Names },
        };
      };

      const serviceLocations = getServiceLocationData();
      // console.log("Extracted service locations:", serviceLocations);

      const itemData = {
        item_code: item?.item_code || "",
        item_type: item?.item_type || "",
        type: item?.type || "",
        item_name: item?.item_name || "",
        c_id: item?.c_id || null,
        c_name: item?.category?.category_name || "",
        sub_c_id: item?.subcategory?.id ? Number(item?.subcategory?.id) : null,
        sub_c_name: item?.subcategory?.sub_category_name || "",
        group_id: item?.group_id || null,
        group_name: item?.group?.group_name || "",
        uom: item?.uom || "",
        description: item?.description || "",
        is_purpose_required: Number(item?.is_purpose_required) ?? 0,
        is_approval_required: Number(item?.is_approval_required) ?? 0,
        is_movable: Number(item?.is_movable) ?? 0,

        // ✅ Corrected Service Locations mapping with nested structure
        service_location_1_id: serviceLocations.sl1.ids,
        service_location_1_name: serviceLocations.sl1.names,
        service_location_2_id: serviceLocations.sl2.ids,
        service_location_2_name: serviceLocations.sl2.names,
        service_location_3_id: serviceLocations.sl3.ids,
        service_location_3_name: serviceLocations.sl3.names,

        // ✅ Zones
        zone_id: Array.isArray(item?.zones)
          ? item.zones.map((z) => Number(z.zone?.id)).filter(Boolean)
          : [],

        stock: item?.stock ?? 0,
        stock_value: item?.stock_value ?? 0,
        minimum_stock: item?.minimum_stock ?? 0,
        purchase_date: item?.purchase_date || "",
        warranty_expiry: item?.warranty_expiry || "",
        status: Number(item?.status) ?? 1,
      };

      setItemMasterData(itemData);

      // ✅ AUTO-POPULATE: If we have a subcategory ID and type, automatically get category, group, and item code
      if (itemData.sub_c_id && itemData.type) {
        // console.log(
        //   "Auto-populating category, group, and item code for edit mode",
        //   itemData.sub_c_id,
        //   itemData.type
        // );
        await getCategoryGroupAndItemCodeBySubCategoryId(
          itemData.type,
          itemData.sub_c_id
        );
      }
    } catch (error) {
      console.log("fetchitemById error:", error);
    }
  };

  const fetchItemSubCategoryById = async (id) => {
    try {
      const res = await postData(ENDPOINTS.ITEM_MASTER.DETAILS, { id });
      const item = res.data;

      // Only return subcategory info
      const subCategoryData = item?.subcategory?.id
        ? {
            sub_c_id: Number(item.subcategory.id),
            sub_c_name: item.subcategory.sub_category_name || "",
          }
        : { sub_c_id: null, sub_c_name: "" };

      return subCategoryData;
    } catch (error) {
      console.log("fetch subcategory error:", error);
      return { sub_c_id: null, sub_c_name: "" };
    }
  };

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
        pagination,
        setPagination,

        getCategoryGroupAndItemCodeBySubCategoryId,
        fetchItemMaster,
        createItemMaster,
        deleteItemMaster,
        ResetItemMaster,
        EditItemMaster,
        StartEditing,
        fetchItemSubCategoryById,
      }}
    >
      {children}
    </ItemMasterContext.Provider>
  );
};
