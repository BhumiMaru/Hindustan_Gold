import { createContext, useContext, useState } from "react";
import { getData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { toast } from "react-toastify";

export const POCreateContext = createContext();

// Custom Hook fo PO Create
export const usePOCreate = () => {
  return useContext(POCreateContext);
};

// PO PROVIDER
export const POProvider = ({ children }) => {
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
    default_rupees: "",
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
  const [status, setStatus] = useState("");
  const [itemName, setItemName] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [vendor, setVendor] = useState(null);

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
  const getPoList = async ({
    search: searchText = search,
    status: filterStatus = status,
    poType = selectedType,
    item = itemName,
    vendor = null,
    start_date = startDate,
    end_date = endDate,
    page = 1,
    perPage = 10,
  }) => {
    try {
      const params = {
        search: searchText || undefined,
        status: filterStatus || undefined,
        po_type: poType || undefined,
        item: item || undefined,
        vendor: vendor || undefined,
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
    }
  };

  // Po Details
  const getPoDetails = async (po_id) => {
    try {
      const res = await getData(`${ENDPOINTS.POCREATE.DETAILS}?po_id=${po_id}`);
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
    } catch (error) {
      console.error("PO creation failed:", error);
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
      }
      getPoList();
    } catch (error) {
      toast.error("PO Approve error");
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
      toast.error("PO Reject error");
      console.error("PO Reject error:", error);
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
      }}
    >
      {children}
    </POCreateContext.Provider>
  );
};
