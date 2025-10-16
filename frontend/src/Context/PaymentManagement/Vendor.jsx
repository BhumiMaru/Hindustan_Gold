import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData } from "../../utils/api";
import { API_BASE_URL, ENDPOINTS } from "../../constants/endpoints";

export const VendorContext = createContext();

// Custom Hook
export const useVendor = () => {
  return useContext(VendorContext);
};

// Vendor Provider
export const VendorProvider = ({ children }) => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });
  const [search, setSearch] = useState("");
  // --------------------------- Vendor -------------------------- //
  const [vendorList, setVendorList] = useState([]); //list
  const [vendorData, setVendorData] = useState({
    vendor_id: null,
    vendor_name: "",
    contact_person_name: "",
    email: "",
    mobile: "",
    address: "",
    gst_number: "",
    pan_number: "",
    msme_certificate: "",
    bank_name: "",
    account_no: "",
    ifsc_code: "",
    branch_name: "",
    total_invoice: null,
    status: null,
  }); //data
  const [vendorname, setVendorName] = useState("");
  const [vendorDetail, setVendorDetail] = useState();
  const [vendorFilter, setVendorFilter] = useState([]);
  const [vendorEditId, setVendorEditId] = useState(null);

  // --------------------------------- VENDOR -------------------------------------- //
  // Get Vendor List
  const getVendorList = async ({
    search = "",
    page = 1,
    perPage = 10,
    status,
  } = {}) => {
    try {
      const params = { search, page, per_page: perPage, status };
      const res = await getData(ENDPOINTS.VENDOR.LIST, params);

      const apiData = res.data;
      setVendorList(apiData.data || []);
      setPagination({
        currentPage: apiData.current_page,
        perPage: apiData.per_page,
        total: apiData.total,
      });
      return res.data.data;
    } catch (error) {
      toast.error("Error during Vendor List");
      console.error("Vendor List error:", error);
    }
  };

  //   Vendor Filter
  const getVendorFilter = async () => {
    try {
      const res = await getData(ENDPOINTS.VENDOR.FILTER);
      if (res.success) {
        setVendorFilter(res.data);
      }
    } catch (error) {
      toast.error("Error during Vendor Filter");
      console.error("Vendor Filter error:", error);
    }
  };

  // Create Vendor
  const createVendor = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.VENDOR.ADD_UPDATE, payload);
      if (res.success) {
        setVendorData(res.data.data);
        toast.success(res.message);
        getVendorList();
      }

      return res;
    } catch (error) {
      toast.error("Error during Vendor Create");
      console.error("Vendor Create error:", error);
    }
  };

  // Edit Vendor
  const EditVendor = async (id, payload) => {
    try {
      const res = await postData(ENDPOINTS.VENDOR.ADD_UPDATE, {
        id,
        ...payload,
      });

      if (res.success) {
        setVendorData(res.data.data);
        toast.success(res.message);
        getVendorList();
      }

      return res;
    } catch (error) {
      toast.error("Error during Vendor Edit");
      console.error("Vendor Edit error:", error);
    }
  };

  // Vendor Details - FIXED THIS FUNCTION
  //   Vendor Details
  // console.log(`${API_BASE_URL}${ENDPOINTS.VENDOR.DETAILS}`);
  const vendorDetails = async (id) => {
    try {
      const res = await postData(ENDPOINTS.VENDOR.DETAILS, {
        id,
      });

      if (res.success && res.data) {
        console.log("res ", res.data);
        const vendor = res.data; // ✅ Correct level
        setVendorDetail(vendor);
        console.log("vendorr", vendor);
        setVendorName(vendor?.vendor_name);

        // ✅ Prefill form fields
        setVendorData({
          vendor_id: vendor?.id || null,
          vendor_name: vendor?.vendor_name || "",
          contact_person_name: vendor?.contact_person_name || "",
          email: vendor?.email || "",
          mobile: vendor?.mobile || "",
          address: vendor?.address || "",
          gst_number: vendor?.gst_number || "",
          pan_number: vendor?.pan_number || "",
          msme_certificate: vendor?.msme_certificate || "",
          bank_name: vendor?.bank_name || "",
          account_no: vendor?.account_no || "",
          ifsc_code: vendor?.ifsc_code || "",
          branch_name: vendor?.branch_name || "",
          total_invoice: vendor?.total_invoice || null,
          status: vendor?.status,
        });

        return vendor; // ✅ return filled object
      }
    } catch (error) {
      toast.error("Error during Vendor Details");
      console.error("Vendor Details error:", error);
    }
  };

  console.log("vvv", vendorData);

  // Vendor Delete
  const vendorDelete = async (id) => {
    try {
      const res = await postData(ENDPOINTS.VENDOR.DELETE, { id: id });

      if (res.success) {
        toast.success(res.message);
      }
      getVendorList(); // Refresh vendor list after approval

      return res.data;
    } catch (error) {
      const backendMessage =
        error.response?.data?.message ||
        error.message ||
        "Error during Vendor Delete";
      toast.error(backendMessage);
      console.error("Vendor Delete error:", error);
    }
  };

  // Start Editing - FIXED THIS FUNCTION
  //   Start Editing
  // Enhanced startEditing function
  const startEditing = async (vendorId) => {
    try {
      console.log("Starting edit for vendor ID:", vendorId);

      // Fetch vendor details first
      await vendorDetails(vendorId);

      // Only set editId after data is fetched
      setVendorEditId(vendorId);
    } catch (error) {
      console.error("Error starting edit:", error);
    }
  };

  // Reset Vendor Data
  const resetVendorData = () => {
    setVendorData({
      vendor_id: null,
      vendor_name: "",
      contact_person_name: "",
      email: "",
      mobile: "",
      address: "",
      gst_number: "",
      pan_number: "",
      msme_certificate: "",
      bank_name: "",
      account_no: "",
      ifsc_code: "",
      branch_name: "",
      total_invoice: null,
      status: null,
    });
    setVendorEditId(null); // Also reset edit ID
  };

  // Vendor Approve
  const vendorApprove = async ({ vendor_id, pi_get_quate }) => {
    try {
      const res = await postData(ENDPOINTS.QUOTATIONDETAILS.VENDORAPPROVE, {
        vendor_id,
        pi_get_quate,
      });

      if (res.success) {
        toast.success(res.message);
      }
      getVendorList(); // Refresh vendor list after approval

      return res.data;
    } catch (error) {
      const backendMessage =
        error.response?.data?.message ||
        error.message ||
        "Error during Vendor Approve";
      toast.error(backendMessage);
      console.error("Vendor Approve error:", error);
    }
  };
  console.log("vendorEditId vendorEditId", vendorEditId);

  return (
    <VendorContext.Provider
      value={{
        // Vendor
        pagination,
        setPagination,
        search,
        setSearch,
        vendorData,
        setVendorData,
        vendorList,
        setVendorList,
        vendorEditId,
        vendorFilter,
        setVendorFilter,
        setVendorEditId,
        getVendorList,
        createVendor,
        EditVendor,
        getVendorFilter,
        vendorDetails,
        startEditing,
        resetVendorData,
        vendorApprove,
        vendorDetail,
        setVendorDetail,
        vendorDelete,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};
