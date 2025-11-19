import { createContext, useContext, useState } from "react";
import { getData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const POCreateContext = createContext();

// Custom Hook fo PO Create
export const usePOCreate = () => {
  return useContext(POCreateContext);
};

// PO PROVIDER
export const POProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [PoList, setPoList] = useState([]); //List
  const [poDetails, setPoDetails] = useState({}); // Details
  const [PoId, setPoId] = useState(null);
  // const [PoData, setPoData] = useState({
  //   pi_get_quote_id: "",
  //   pi_get_quote_vendor_id: "",
  //   pi_request_id: "",
  //   po_number: "",
  //   po_date: null,
  //   default_rupees: null,
  //   total_discount: null,
  //   packing_charge: null,
  //   packing_gst: null,
  //   fright_charge: null,
  //   fright_gst: null,
  //   additional_charge_status: null,
  //   sub_total: null,
  //   gst_value: null,
  //   final_total: null,
  //   payment_status: null,
  //   taxes_pr: null,
  //   taxes_number: null,
  //   guarantee_and_warranty: "",
  //   loading_and_freight_charges: "",
  //   installation_at_site: "",
  //   delivery: "",
  //   introduction: "",
  //   items: [],
  //   additional_charges: [],
  //   payment_milestones: [],
  // });
  const [formData, setFormData] = useState({
    id: null,
    po_date: new Date().toISOString().split("T")[0],
    default_rupees: "INR",
    total_discount: "0",
    packing_charge: "",
    packing_gst: "",
    fright_charge: "",
    fright_gst: "",
    additional_charge_status: "1",
    sub_total: "0",
    gst_value: "0",
    final_total: "0",
    payment_status: "1",
    taxes_pr: "",
    taxes_number: "",
    guarantee_and_warranty: "",
    loading_and_freight_charges: "",
    installation_at_site: "",
    delivery: "",
    introduction: "",
    is_payment_advance_or_partial: "No",
    currency: "INR",
    items: [],
    additional_charges: [],
    payment_milestones: [],
    total_item: null,
  });
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });
  const [status, setStatus] = useState("all");
  const [poPendingGenerate, setPoPendingGenerate] = useState("all");
  const [itemName, setItemName] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [vendor, setVendor] = useState("all");
  // const [status, setStatus] = useState("all");
  // const [itemName, setItemName] = useState("all");
  // const [selectedType, setSelectedType] = useState("all");
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const [vendor, setVendor] = useState("all");

  // PO Details Workflow
  const [poWorkflowDetails, setPoWorkflowDetails] = useState();

  // Po List
  // const getPoList = async ({
  //   search: searchText = search,
  //   status,
  //   page = 1,
  //   perPage = 10,
  // }) => {
  //   try {
  //     const params = {
  //       search: searchText || undefined,
  //       status,
  //       page,
  //       per_page: perPage,
  //     };
  //     const res = await getData(ENDPOINTS.POCREATE.LIST, params);
  //     const apiData = res.data;
  //     setPoList(apiData.data || []);
  //     setPagination({
  //       currentPage: apiData.current_page || 1,
  //       perPage: apiData.per_page || perPage,
  //       total: apiData.total || 0,
  //     });
  //   } catch (error) {
  //     console.error("PO List failed:", error);
  //   }
  // };

  // Po List
  // const getPoList = async ({
  //   search: searchText = search,
  //   status: filterStatus = status,
  //   poType = selectedType,
  //   item = itemName,
  //   vendor: vendorFilter = vendor,
  //   start_date = startDate,
  //   end_date = endDate,
  //   page = 1,
  //   perPage = 10,
  // } = {}) => {
  //   try {
  //     setLoading(true);

  //     const params = {
  //       search: searchText || undefined,
  //       status:
  //         filterStatus && filterStatus !== "all" ? filterStatus : undefined,
  //       po_type: poType && poType !== "all" ? poType : undefined,
  //       item: item && item !== "all" ? item : undefined,
  //       vendor:
  //         vendorFilter && vendorFilter !== "all" ? vendorFilter : undefined,
  //       start_date: start_date && start_date !== "all" ? start_date : undefined,
  //       end_date: end_date && end_date !== "all" ? end_date : undefined,
  //       page,
  //       per_page: perPage,
  //     };

  //     const res = await getData(ENDPOINTS.POCREATE.LIST, params);
  //     const apiData = res.data;

  //     setPoList(apiData.data || []);
  //     setPagination({
  //       currentPage: apiData.current_page || 1,
  //       perPage: apiData.per_page || perPage,
  //       total: apiData.total || 0,
  //     });
  //   } catch (error) {
  //     console.error("PO List failed:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const getPoList = async ({
  //   search: searchText = search,
  //   status: filterStatus = status,
  //   poType = selectedType,
  //   item_id = itemName,
  //   vendor = null,
  //   start_date = startDate,
  //   end_date = endDate,
  //   page = 1,
  //   perPage = 10,
  // } = {}) => {
  //   try {
  //     setLoading(true);

  //     const params = {
  //       search: searchText || undefined,
  //       status: filterStatus || undefined,
  //       po_type: poType && poType !== "all" ? poType : undefined, // ✅ FIXED
  //       item_id: item_id && item_id !== "all" ? item_id : undefined,
  //       vendor: vendor || undefined,
  //       start_date: start_date || undefined,
  //       end_date: end_date || undefined,
  //       page,
  //       per_page: perPage,
  //     };

  //     const res = await getData(ENDPOINTS.POCREATE.LIST, params);
  //     const apiData = res.data;

  //     setPoList(apiData.data || []);
  //     setPagination({
  //       currentPage: apiData.current_page || 1,
  //       perPage: apiData.per_page || perPage,
  //       total: apiData.total || 0,
  //     });
  //   } catch (error) {
  //     console.error("PO List failed:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // get Po List
  const getPoList = async ({
    search: searchText = search,
    status: filterStatus = status,
    poPendingGenerate: filterPendingPoGenerate = poPendingGenerate,
    poType = selectedType,
    item_id = itemName,
    vendor: vendorFilter = vendor,
    start_date = startDate,
    end_date = endDate,
    page = pagination.currentPage,
    perPage = pagination.perPage,
  } = {}) => {
    try {
      setLoading(true);

      const params = {
        search: searchText || undefined,
        status: filterStatus !== "all" ? filterStatus : undefined,
        poPendingGenerate:
          filterPendingPoGenerate !== "all"
            ? filterPendingPoGenerate
            : undefined,
        po_type: poType !== "all" ? poType : undefined,
        item_id: item_id !== "all" ? item_id : undefined,
        vendor: vendorFilter !== "all" ? vendorFilter : undefined,
        start_date: start_date || undefined,
        end_date: end_date || undefined,
        page,
        per_page: perPage,
      };

      const res = await getData(ENDPOINTS.POCREATE.LIST, params);
      const apiData = res.data;

      setPoList(apiData.data || []);
      setPagination({
        currentPage: apiData.current_page || 1,
        perPage: apiData.per_page || perPage,
        total: apiData.total || 0,
      });
    } catch (error) {
      console.error("PO List failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Po Details
  const getPoDetails = async (po_id) => {
    try {
      const res = await getData(
        `${ENDPOINTS.POCREATE.DETAILS}?po_id=${Number(po_id)}`
      );
      setPoDetails(res.data);
    } catch (error) {
      console.error("PO Details failed:", error);
    }
  };

  //   PO Create
  const PoCreate = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.POCREATE.ADD_UPDATE, payload);
      setFormData(res.data.data);
      if (res.status === true) {
        navigate(`/po-material/po-detail/${poDetails?.id}`);
      }
      return res;
    } catch (error) {
      // if (error.response) {
      //   const errorMessage = error.response.data?.message;
      //   toast.error(errorMessage);
      // }
      // console.error("PO creation failed:", error);
      console.log("Error:", error);

      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;

        // Show main message (e.g. "Validation error")
        // if (message) {
        //   toast.error(message);
        // }

        // Show field-specific validation errors
        if (errors && typeof errors === "object") {
          Object.entries(errors).forEach(([field, msgs]) => {
            if (Array.isArray(msgs)) {
              msgs.forEach((msg) => toast.error(`${field}: ${msg}`));
            } else {
              toast.error(`${field}: ${msgs}`);
            }
          });
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // PO Edit
  const PoEdit = async (id, payload) => {
    try {
      setLoading(true);

      // Combine ID + payload in body for update
      const bodyData = {
        id: id,
        ...payload,
      };

      const res = await postData(ENDPOINTS.POCREATE.ADD_UPDATE, bodyData);
      console.log("bodyData", bodyData);
      console.log("res", res);
      if (res.status === true) {
        toast.success(res.message);

        // Update formData state with the response
        setFormData(res.data.data);

        // Navigate to PO Detail page after successful edit
        navigate(`/po-material/po-detail/${id}`);
      }

      return res;
    } catch (error) {
      console.log("PO Edit Error:", error);

      // Error Handling
      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;

        // Show general message if exists
        if (message) toast.error(message);

        // Show specific field errors
        if (errors && typeof errors === "object") {
          Object.entries(errors).forEach(([field, msgs]) => {
            if (Array.isArray(msgs)) {
              msgs.forEach((msg) => toast.error(`${field}: ${msg}`));
            } else {
              toast.error(`${field}: ${msgs}`);
            }
          });
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // PO Approve
  const PoApprove = async (po_id) => {
    try {
      const res = await postData(ENDPOINTS.POCREATE.APPROVE, {
        po_id: po_id,
      });
      if (res.status) {
        toast.success(res.message);
        getPoDetails(po_id);
      }
      getPoList();
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data?.message;
        toast.error(errorMessage);
      }
      console.error("PO Approve error:", error);
    }
  };

  // PO Reject
  const PoReject = async (po_id, reject_reason) => {
    try {
      const res = await postData(ENDPOINTS.POCREATE.REJECT, {
        po_id: po_id,
        reject_reason,
      });
      if (res.status) {
        toast.success(res.message);
      }
      getPoList();
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data?.message;
        toast.error(errorMessage);
      }
      console.error("PO Reject error:", error);
    }
  };

  // PO Workflow
  const poWorkflow = async (po_id) => {
    try {
      const res = await postData(ENDPOINTS.POCREATE.WORKFLOW, {
        po_id: po_id,
      });

      if (res.status) {
        setPoWorkflowDetails(res.data); // Save workflow data
      } else {
        toast.error(res.message || "Failed to fetch workflow data");
      }
    } catch (error) {
      toast.error("Error during PO Workflow");
      console.error("IPOnvoice Workflow error:", error);
    }
  };

  return (
    <POCreateContext.Provider
      value={{
        PoList,
        setPoList,
        formData,
        setFormData,
        poDetails,
        setPoDetails,
        PoId,
        setPoId,
        pagination,
        setPagination,
        search,
        setSearch,
        status,
        setStatus,
        poPendingGenerate,
        setPoPendingGenerate,
        itemName,
        setItemName,
        selectedType,
        setSelectedType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        vendor,
        setVendor,
        PoCreate,
        getPoList,
        getPoDetails,
        PoApprove,
        PoReject,
        PoEdit,

        // PO WORKFLOW
        poWorkflowDetails,
        setPoWorkflowDetails,
        poWorkflow,
        loading,
        setLoading,
      }}
    >
      {children}
    </POCreateContext.Provider>
  );
};
