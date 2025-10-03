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
  const [PoData, setPoData] = useState({
    pi_get_quote_id: "",
    pi_get_quote_vendor_id: "",
    pi_request_id: "",
    po_number: "",
    po_date: null,
    default_rupees: null,
    total_discount: null,
    packing_charge: null,
    packing_gst: null,
    fright_charge: null,
    fright_gst: null,
    additional_charge_status: null,
    sub_total: null,
    gst_value: null,
    final_total: null,
    payment_status: null,
    taxes_pr: null,
    taxes_number: null,
    guarantee_and_warranty: "",
    loading_and_freight_charges: "",
    installation_at_site: "",
    delivery: "",
    introduction: "",
    items: [],
    additional_charges: [],
    payment_milestones: [],
  });
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // Po List
  const getPoList = async ({
    search: searchText = search,
    page = 1,
    perPage = 10,
  }) => {
    try {
      const params = {
        search: searchText || undefined,
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
      setPoData(res.data.data);
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
        getPoList();
      }
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
        getPoList();
      }
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
        PoData,
        setPoData,
        poDetails,
        setPoDetails,
        PoId,
        setPoId,
        pagination,
        setPagination,
        search,
        setSearch,
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
