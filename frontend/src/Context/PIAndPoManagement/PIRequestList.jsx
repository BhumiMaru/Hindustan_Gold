import { createContext, useContext, useState } from "react";
import { deleteData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { toast } from "react-toastify";

export const PIRequestContext = createContext();

// Custom Hook
export const usePIRequest = () => {
  return useContext(PIRequestContext);
};

// PI And Material Management
export const PIRequestProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("my_request");
  const [piRequest, setPiRequest] = useState([]);
  const [items, setItems] = useState([
    {
      id: 1,
      requestedItem: "",
      category: "Category 1",
      subcategory: "Subcategory 1",
      qty: "",
      uom: "KG",
      serviceLocation: "Location 1",
      zone: "Zone 1",
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

  // Get All Pi Request
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

  // Create Pi Request
  const CreatePIRequest = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.PI_REQUEST.ADD_UPDATE, payload);
      if (res?.status) {
        toast.success(res.message || "PI Request saved successfully!");
        getPIRequest(); // refresh list
        setItems(res.data.data);
      }
      console.log("res", res);
      return res;
    } catch (error) {
      toast.error("Error saving PI Request");
      console.error("savePIRequest error:", error);
    }
  };

  // update Pi Request
  const editPiRequest = async (id, payload) => {
    try {
      const res = await postData(ENDPOINTS.PI_REQUEST.ADD_UPDATE, payload);
      if (res?.status) {
        toast.success(res.message || "PI Request saved successfully!");
        setItems(res.data.data);
        getPIRequest(); // refresh list
      }
    } catch (error) {
      toast.error("Error Editing PI Request");
      console.error("Editing PIRequest error:", error);
    }
  };

  // Prefill Data
  // Prefill Data
  const findById = async (id) => {
    try {
      const res = await postData(ENDPOINTS.PI_REQUEST.DETAILS, { id });
      console.log("res id", res);

      if (res?.status) {
        const piRequestData = res.data.items;
        console.log("pi data", piRequestData);

        // setItems(
        //   piRequestData.map((it, index) => ({
        //     id: index + 1, // frontend form id
        //     dbId: it.id, // <-- store actual DB id here
        //     existing: true,
        //     requestedItem: it.item_id,
        //     item_name: it.item_name || "",
        //     category: it.category?.category_name || "",
        //     subcategory: it.subcategory?.sub_category_name || "",
        //     qty: it.qty,
        //     uom: it.uom,
        //     serviceLocation: it.service_location_name || "",
        //     zone: it.zone_name || "",
        //     purpose: it.purpose,
        //     priority: it.priority,
        //     requestDate: it.request_date,
        //     remarks: it.remark,
        //     tentative_consumption_day: it.tentative_consumption_day,
        //     file: null,
        //     status: it.status || "pending",
        //   }))
        // );

        setItems(
          piRequestData.map((it, index) => ({
            id: index + 1,
            dbId: it?.id, // real DB id
            existing: true,
            requestedItem: it?.item_id,
            item_name: it?.item_name || "",
            category: it?.category?.category_name || "",
            subcategory: it?.subcategory?.sub_category_name || "",
            qty: it?.qty,
            uom: it?.uom || "KG", // fallback
            serviceLocation: it?.service_location_name || "",
            zone: it?.zone_name || "",
            purpose: it?.purpose,
            priority: it?.priority,
            requestDate: it?.request_date,
            remarks: it?.remark,
            tentative_consumption_day: it?.tentative_consumption_day,
            file: null,
            status: it?.status || "pending",
          }))
        );
      }

      return res.data;
    } catch (error) {
      toast.error("Error fetching PI Request for edit");
      console.error("Find by id PIRequest error:", error);
    }
  };

  // StartEditing
  const StartEditing = (piId) => {
    setEditId(piId);
    findById(piId);
    console.log("pi id", piId);
  };

  // Delete Pi Request
  const DeletePiRequest = async (id) => {
    try {
      const res = await deleteData(`${ENDPOINTS.PI_REQUEST.DELETE}/${id}`);
      if (res.status) {
        toast.success(res.message);
        getPIRequest();
      }
    } catch (error) {
      if ((res.status = false)) {
        toast.error(res.message);
      }
      console.error("Delete PIRequest error:", error);
    }
  };

  // --------------------pi request approve------------------------ //
  // single approve
  // const singleApprove = async () => {
  //   try {
  //     const res = await postData(en)
  //   } catch (error) {
  //     if ((res.status = false)) {
  //       toast.error(res.message);
  //     }
  //     console.error("Single Approve PIRequest error:", error);
  //   }
  // };

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
      }}
    >
      {children}
    </PIRequestContext.Provider>
  );
};
