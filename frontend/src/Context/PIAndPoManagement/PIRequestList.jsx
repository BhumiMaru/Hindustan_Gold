// ================= PIRequestContext.js =================
import { createContext, useContext, useState } from "react";
import { deleteData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useItemMaster } from "../ItemManagement/ItemMasterContext";

export const PIRequestContext = createContext();
export const usePIRequest = () => useContext(PIRequestContext);

export const PIRequestProvider = ({ children }) => {
  const { itemMaster } = useItemMaster();

  const [activeTab, setActiveTab] = useState("my_request");
  const [piRequest, setPiRequest] = useState([]);
  const [items, setItems] = useState([
    {
      id: 1,
      requestedItem: "",
      category: "",
      subcategory: "",
      qty: "",
      uom: "KG",
      serviceLocation1: "",
      serviceLocation2: "",
      serviceLocation3: "",
      zone: "",
      purpose: "",
      priority: "",
      requestDate: "",
      remarks: "",
      file: null,
      tentative_consumption_day: "",
    },
  ]);
  const [editId, setEditId] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // Get All PI Requests
  const getPIRequest = async ({
    type = activeTab,
    page = 1,
    perPage = 10,
  } = {}) => {
    try {
      const payload = { type, page, per_page: perPage };
      const res = await postData(ENDPOINTS.PI_REQUEST.LIST, payload);
      const apiData = res.data;
      setPiRequest(apiData.data || []);
      setPagination({
        currentPage: apiData.current_page || 1,
        perPage: apiData.per_page || perPage,
        total: apiData.total || 0,
      });
    } catch (error) {
      console.log("pi request error:", error);
    }
  };

  // Create
  const CreatePIRequest = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.PI_REQUEST.ADD_UPDATE, payload);
      if (res?.status) {
        toast.success(res.message || "PI Request saved successfully!");
        getPIRequest();
      }
      return res;
    } catch (error) {
      toast.error("Error saving PI Request");
      console.error("savePIRequest error:", error);
    }
  };

  // Update
  const editPiRequest = async (id, payload) => {
    try {
      const res = await postData(ENDPOINTS.PI_REQUEST.ADD_UPDATE, payload);
      if (res?.status) {
        toast.success(res.message || "PI Request updated successfully!");
        getPIRequest();
      }
    } catch (error) {
      toast.error("Error Editing PI Request");
      console.error("Editing PIRequest error:", error);
    }
  };

  // Prefill helper
  const setItemDetailsFromMaster = (itemId, itemData, itemMaster) => {
    const selectedItem = itemMaster.find((itm) => itm.id === Number(itemId));
    if (!selectedItem) return itemData;
    console.log("selectedItem selectedItem", selectedItem);

    const storage = selectedItem?.storage_locations?.[0];
    let serviceLocation1 = "";
    let serviceLocation2 = "";
    let serviceLocation3 = "";

    if (storage) {
      serviceLocation1 =
        storage?.service_location3?.service_location2?.service_location1
          ?.service_location_name || "";
      serviceLocation2 =
        storage?.service_location3?.service_location2
          ?.service_location_2_name || "";
      serviceLocation3 =
        storage?.service_location3?.service_location_3_name || "";
    }

    // ✅ extract zone safely
    const zoneName =
      selectedItem?.zones?.length > 0
        ? selectedItem.zones[0]?.zone?.zone_name
        : "";

    console.log({
      ...itemData,
      item_name: selectedItem?.item_name || "",
      category: selectedItem?.category?.category_name || "",
      subcategory: selectedItem?.subcategory?.sub_category_name || "",
      uom: selectedItem?.uom || "KG",
      zone: zoneName || "",
      serviceLocation1,
      serviceLocation2,
      serviceLocation3,
    });

    return {
      ...itemData,
      item_name: selectedItem?.item_name || "",
      category: selectedItem?.category?.category_name || "",
      subcategory: selectedItem?.subcategory?.sub_category_name || "",
      uom: selectedItem?.uom || "KG",
      zone: zoneName || "",
      serviceLocation1,
      serviceLocation2,
      serviceLocation3,
    };
  };

  // Fetch by ID
  const findById = async (id) => {
    try {
      const res = await postData(ENDPOINTS.PI_REQUEST.DETAILS, { id });
      if (res?.status) {
        const piRequestData = res.data.piitems;
        console.log("pi request", piRequestData);
        setItems(
          piRequestData?.map((it, index) =>
            setItemDetailsFromMaster(
              it.item_id,
              {
                id: index + 1,
                dbId: it.id,
                existing: true,
                requestedItem: it.item_id,
                qty: it.qty,
                purpose: it.purpose,
                priority: it.priority,
                requestDate: it.request_date,
                remarks: it.remark,
                tentative_consumption_day: it.tentative_consumption_day,
                file: null,
                status: it.status || "pending",
              },
              itemMaster
            )
          )
        );
      }
    } catch (error) {
      toast.error("Error fetching PI Request for edit");
      console.error("Find by id PIRequest error:", error);
    }
  };

  const StartEditing = (piId) => {
    setEditId(piId);
    findById(piId);
  };

  // Delete
  const DeletePiRequest = async (id) => {
    try {
      const res = await deleteData(`${ENDPOINTS.PI_REQUEST.DELETE}/${id}`);
      if (res.status) {
        toast.success(res.message);
        getPIRequest();
      }
    } catch (error) {
      toast.error("Error deleting PI Request");
      console.error("Delete PIRequest error:", error);
    }
  };

  // --------------------Request ----------------------- //

  // Single Approve
  // Single Approve
  const singleApprove = async (pi_request_item_id) => {
    try {
      const payload = { pi_request_item_id }; // ✅ send pi_request_id
      const res = await postData(ENDPOINTS.PI_REQUEST.SINGLEAPPROVE, payload);

      if (res?.status) {
        toast.success(res.message || "PI Request approved successfully!");
        getPIRequest(); // ✅ refresh after approve
      } else {
        toast.error(res.message || "Failed to approve PI Request");
      }
      return res;
    } catch (error) {
      toast.error("Error approving PI Request");
      console.error("Single Approve PIRequest error:", error);
    }
  };

  // Bulk Approve
  const bulkApprove = async (pi_request_item_ids) => {
    try {
      const payload = { pi_request_item_id: pi_request_item_ids }; // ✅ usually backend expects array of ids
      const res = await postData(ENDPOINTS.PI_REQUEST.BULKAPPROVE, payload);

      if (res?.status) {
        toast.success(res.message || "Bulk approval successful!");
        getPIRequest();
      } else {
        toast.error(res.message || "Bulk approval failed");
      }
      return res;
    } catch (error) {
      toast.error("Error during bulk approval");
      console.error("Bulk Approve PIRequest error:", error);
    }
  };

  return (
    <PIRequestContext.Provider
      value={{
        activeTab,
        piRequest,
        pagination,
        setPagination,
        setItems,
        items,
        setPiRequest,
        getPIRequest,
        CreatePIRequest,
        findById,
        StartEditing,
        editPiRequest,
        DeletePiRequest,
        setActiveTab,
        singleApprove,
        bulkApprove,
      }}
    >
      {children}
    </PIRequestContext.Provider>
  );
};
