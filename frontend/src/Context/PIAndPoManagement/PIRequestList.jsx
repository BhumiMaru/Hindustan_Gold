import { createContext, useContext, useState } from "react";
import api, { deleteData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useItemMaster } from "../ItemManagement/ItemMasterContext";

export const PIRequestContext = createContext();
export const usePIRequest = () => useContext(PIRequestContext);

export const PIRequestProvider = ({ children }) => {
  const itemMasterContext = useItemMaster();
  const itemMaster = itemMasterContext?.itemMaster || [];
  const [loading, setLoading] = useState(false);
  // const [activeTab, setActiveTab] = useState("my_request");
  const [activeTab, setActiveTab] = useState(() => {
    // ✅ Initialize from sessionStorage if exists
    return sessionStorage.getItem("activeTab") || "my_request";
  });

  const [piRequest, setPiRequest] = useState([]);
  const [items, setItems] = useState([
    {
      id: 1,
      requestedItem: "",
      category: "",
      subcategory: "",
      qty: "0",
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

  // Select Checkbox
  const [selectedItems, setSelectedItems] = useState([]);
  // Filteration state
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [itemName, setItemName] = useState("all");
  const [department, setDepartment] = useState("all");
  const [orderBy, setOrderBy] = useState("all");
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Store selected items per PI row
  const [selectedItemsMap, setSelectedItemsMap] = useState({});
  const [selectAllMap, setSelectAllMap] = useState({});

  // Toggle single item
  // const handleSelectItem = (piId, itemId) => {
  //   setSelectedItemsMap((prev) => {
  //     const rowSelections = prev[piId] || [];
  //     return {
  //       ...prev,
  //       [piId]: rowSelections.includes(itemId)
  //         ? rowSelections.filter((id) => id !== itemId) // uncheck
  //         : [...rowSelections, itemId], // check
  //     };
  //   });
  // };

  // // Toggle all items of a PI
  // const handleSelectAll = (piId, piItems) => {
  //   const itemIds = piItems.map((item) => item.id);

  //   setSelectedItemsMap((prev) => {
  //     const rowSelections = prev[piId] || [];
  //     const isAllSelected = itemIds.every((id) => rowSelections.includes(id));

  //     return {
  //       ...prev,
  //       [piId]: isAllSelected
  //         ? rowSelections.filter((id) => !itemIds.includes(id)) // Uncheck all
  //         : [...new Set([...rowSelections, ...itemIds])], // Check all
  //     };
  //   });
  // };

  // ✅ Toggle single item
  // const handleSelectItem = (piId, itemId) => {
  //   console.log("before piId", piId);
  //   console.log("before itemId", itemId);
  //   setSelectedItemsMap((prev) => {
  //     const rowSelections = prev[piId] || [];
  //     const updated = rowSelections.includes(itemId)
  //       ? rowSelections.filter((id) => id !== itemId)
  //       : [...rowSelections, itemId];

  //     const newMap = { ...prev, [piId]: updated };

  //     // flatten all selected items into a single array for global use
  //     const allSelected = Object.values(newMap).flat();
  //     setSelectedItems(allSelected);

  //     return newMap;
  //   });
  // };

  // ✅ Toggle all items of a PI
  // const handleSelectAll = (piId, piItems) => {
  //   console.log("after piId", piId);
  //   console.log("after piItems", piItems);
  //   const itemIds = piItems.map((item) => item.id);
  //   console.log("after itemIds", itemIds);

  //   setSelectedItemsMap((prev) => {
  //     const rowSelections = prev[piId] || [];
  //     const isAllSelected = itemIds.every((id) => rowSelections.includes(id));

  //     const updated = isAllSelected
  //       ? rowSelections.filter((id) => !itemIds.includes(id))
  //       : [...new Set([...rowSelections, ...itemIds])];

  //     const newMap = { ...prev, [piId]: updated };

  //     // flatten all selected items into a single array
  //     const allSelected = Object.values(newMap).flat();
  //     setSelectedItems(allSelected);

  //     return newMap;
  //   });
  // };

  // Select individual item
  // const handleSelectItem = (piIndex, itemId) => {
  //   setSelectedItemsMap((prev) => {
  //     const existing = prev[piIndex] || [];
  //     const updated = existing.includes(itemId)
  //       ? existing.filter((id) => id !== itemId)
  //       : [...existing, itemId];
  //     return { ...prev, [piIndex]: updated };
  //   });
  // };

  // Select all / unselect all
  // const handleSelectAll = (piIndex, piItems) => {
  //   setSelectAllMap((prev) => {
  //     const newValue = !prev[piIndex];
  //     // Sync selected items with "select all"
  //     setSelectedItemsMap((prevSelected) => ({
  //       ...prevSelected,
  //       [piIndex]: newValue ? piItems.map((item) => item.id) : [],
  //     }));
  //     return { ...prev, [piIndex]: newValue };
  //   });
  // };
  // ✅ Handle selecting an individual item
  const handleSelectItem = (piIndex, itemId) => {
    setSelectedItemsMap((prev) => {
      const existing = prev[piIndex] || [];
      const updated = existing.includes(itemId)
        ? existing.filter((id) => id !== itemId)
        : [...existing, itemId];
      return { ...prev, [piIndex]: updated };
    });

    // Optional: auto-update "Select All" checkbox state for this PI
    setSelectAllMap((prev) => ({
      ...prev,
      [piIndex]:
        (selectedItemsMap[piIndex] || []).length + 1 ===
        (selectedItemsMap[piIndex]?.includes(itemId)
          ? (selectedItemsMap[piIndex]?.length ?? 0) - 1
          : (selectedItemsMap[piIndex]?.length ?? 0) + 1),
    }));
  };

  // ✅ Handle selecting / unselecting all items
  const handleSelectAll = (piIndex, piItems) => {
    setSelectedItemsMap((prev) => {
      const alreadyAllSelected =
        (prev[piIndex] || []).length === piItems.length;
      const newSelectedItems = alreadyAllSelected
        ? []
        : piItems.map((item) => item.id);

      return {
        ...prev,
        [piIndex]: newSelectedItems,
      };
    });

    setSelectAllMap((prev) => ({
      ...prev,
      [piIndex]: !(prev[piIndex] ?? false),
    }));
  };

  // Get All PI Requests
  const getPIRequest = async ({
    // type = activeTab,
    // pi_type,
    // item_id,
    // departmant_id,
    // order_by,
    // status,
    // search,
    // page = 1,
    // perPage = 10,
    type = activeTab,
    pi_type = selectedType,
    item_id = itemName,
    departmant_id = department,
    order_by = orderBy,
    status: statusFilter = status,
    search: searchText = search,
    start_date = startDate,
    end_date = endDate,
    page = 1,
    perPage = 10,
  } = {}) => {
    try {
      // const payload = {
      //   type,
      //   pi_type,
      //   item_id,
      //   departmant_id,
      //   order_by,
      //   status,
      //   search,
      //   page,
      //   per_page: perPage,
      // };
      setLoading(true);
      const payload = {
        type,
        pi_type: pi_type !== "all" ? pi_type : undefined,
        item_id: item_id !== "all" ? item_id : undefined,
        departmant_id: departmant_id !== "all" ? departmant_id : undefined,
        order_by: order_by !== "all" ? orderBy : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        search: searchText || undefined,
        start_date: start_date || undefined,
        end_date: end_date || undefined,
        page,
        per_page: perPage,
      };
      const res = await postData(ENDPOINTS.PI_REQUEST.LIST, payload);
      const apiData = res.data;
      // console.log("apiData", apiData.data);
      setPiRequest(apiData.data || []);
      setPagination({
        currentPage: apiData.current_page || 1,
        perPage: apiData.per_page || perPage,
        total: apiData.total || 0,
      });
    } catch (error) {
      console.log("pi request error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create
  const CreatePIRequest = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.PI_REQUEST.ADD_UPDATE, payload);
      // console.log("res", res);
      if (res?.status) {
        toast.success(res.message || "PI Request saved successfully!");
      }
      getPIRequest();
      return res;
    } catch (error) {
      // if (error.response && error.response.data && error.response.data.errors) {
      //   const errors = error.response.data.errors;

      //   // Flatten all error messages into a single array
      //   const messages = Object.values(errors).flat();

      //   // Show each message in toast
      //   messages.forEach((msg) => toast.error(msg));
      // }
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }

      console.error("savePIRequest error:", error);
    }
  };

  // Update
  const editPiRequest = async (id, payload) => {
    try {
      const res = await postData(ENDPOINTS.PI_REQUEST.ADD_UPDATE, payload);
      if (res?.status) {
        toast.success(res.message || "PI Request updated successfully!");
      }
      getPIRequest();
      return res;
    } catch (error) {
      // if (error.response && error.response.data && error.response.data.errors) {
      //   const errors = error.response.data.errors;

      //   // Flatten all error messages into a single array
      //   const messages = Object.values(errors).flat();

      //   // Show each message in toast
      //   messages.forEach((msg) => toast.error(msg));
      // }
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      console.error("Editing PIRequest error:", error);
    }
  };

  // // Prefill helper
  const setItemDetailsFromMaster = (itemId, itemData, itemMaster) => {
    const selectedItem = itemMaster.find((itm) => itm.id === Number(itemId));
    if (!selectedItem) return itemData;
    // console.log("selectedItem selectedItem", selectedItem);

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

    // console.log({
    //   ...itemData,
    //   item_name: selectedItem?.item_name || "",
    //   category: selectedItem?.category?.category_name || "",
    //   subcategory: selectedItem?.subcategory?.sub_category_name || "",
    //   uom: selectedItem?.uom || "KG",
    //   zone: zoneName || "",
    //   serviceLocation1,
    //   serviceLocation2,
    //   serviceLocation3,
    // });

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

  // // Fetch by ID
  const findById = async (id) => {
    try {
      const res = await postData(ENDPOINTS.PI_REQUEST.DETAILS, { id });
      if (res?.status) {
        const piRequestData = res.data.piitems;
        // console.log("pi request", piRequestData);
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
      // if (error.response && error.response.data && error.response.data.errors) {
      //   const errors = error.response.data.errors;

      //   // Flatten all error messages into a single array
      //   const messages = Object.values(errors).flat();

      //   // Show each message in toast
      //   messages.forEach((msg) => toast.error(msg));
      // }
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
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
      }
      getPIRequest();
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      console.error("Delete PIRequest error:", error);
    }
  };

  // --------------------Request ----------------------- //

  // Single Approve
  const singleApprove = async (pi_request_item_id) => {
    try {
      const payload = { pi_request_item_id }; // ✅ send pi_request_id
      const res = await postData(ENDPOINTS.PI_REQUEST.SINGLEAPPROVE, payload);

      if (res?.status) {
        toast.success(res.message || "PI Request approved successfully!");
      } else {
        toast.error(res.message || "Failed to approve PI Request");
      }
      getPIRequest(); // ✅ refresh after approve
      return res;
    } catch (error) {
      // if (error.response && error.response.data && error.response.data.errors) {
      //   const errors = error.response.data.errors;

      //   // Flatten all error messages into a single array
      //   const messages = Object.values(errors).flat();

      //   // Show each message in toast
      //   messages.forEach((msg) => toast.error(msg));
      // }
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      console.error("Single Approve PIRequest error:", error);
    }
  };

  // Bulk Approve
  const bulkApprove = async (payload) => {
    try {
      // const payload = {
      //   pi_request_item_ids,
      //   pi_request_id,
      // }; // ✅ usually backend expects array of ids
      const res = await postData(ENDPOINTS.PI_REQUEST.BULKAPPROVE, payload);

      if (res?.status) {
        toast.success(res.message || "Bulk approval successful!");
      } else {
        toast.error(res.message || "Bulk approval failed");
      }
      getPIRequest();
      return res;
    } catch (error) {
      // if (error.response && error.response.data && error.response.data.errors) {
      //   const errors = error.response.data.errors;

      //   // Flatten all error messages into a single array
      //   const messages = Object.values(errors).flat();

      //   // Show each message in toast
      //   messages.forEach((msg) => toast.error(msg));
      // }
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      console.error("Bulk Approve PIRequest error:", error);
    }
  };

  //  Single Reject
  const singleReject = async (payload) => {
    try {
      // const payload = { pi_request_item_id, pi_request_id };
      const res = await postData(ENDPOINTS.PI_REQUEST.SINGLEREJECT, payload);
      if (res?.status) {
        toast.success(res.message || "Single Reject successful!");
      } else {
        toast.error(res.message || "Single Reject failed");
      }
      getPIRequest();
      return res;
    } catch (error) {
      // if (error.response && error.response.data && error.response.data.errors) {
      //   const errors = error.response.data.errors;

      //   // Flatten all error messages into a single array
      //   const messages = Object.values(errors).flat();

      //   // Show each message in toast
      //   messages.forEach((msg) => toast.error(msg));
      // }
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      console.error("Single Reject PIRequest error:", error);
    }
  };

  // Bulk Reject
  const bulkReject = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.PI_REQUEST.BULKREJECT, payload);

      if (res?.status) {
        toast.success(res.message || "Bulk Reject successful!");
      } else {
        toast.error(res.message || "Bulk Reject failed");
      }
      getPIRequest();
      return res;
    } catch (error) {
      // if (error.response && error.response.data && error.response.data.errors) {
      //   const errors = error.response.data.errors;

      //   // Flatten all error messages into a single array
      //   const messages = Object.values(errors).flat();

      //   // Show each message in toast
      //   messages.forEach((msg) => toast.error(msg));
      // }
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      console.error("Bulk Reject PIRequest error:", error);
    }
  };

  return (
    // <ItemMasterProvider>
    <PIRequestContext.Provider
      value={{
        activeTab,
        piRequest,
        pagination,
        selectedItems,
        selectedType,
        setSelectedType,
        setSelectedItems,
        setPagination,
        setItems,
        items,
        itemName,
        setItemName,
        department,
        setDepartment,
        orderBy,
        setOrderBy,
        status,
        setStatus,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        search,
        setSearch,
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
        handleSelectItem,
        handleSelectAll,
        singleReject,
        bulkReject,
        selectedItemsMap,
        setSelectedItemsMap,
        items,
        setItems,
        loading,
        setLoading,
      }}
    >
      {children}
    </PIRequestContext.Provider>
    // </ItemMasterProvider>
  );
};
