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
  // Data Loading
  const [loading, setLoading] = useState(false);
  // Btn Loading
  const [btnLoading, setBtnLoading] = useState(false);
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
      setLoading(true);
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
      // toast.error("Error during Vendor List");
      console.error("Vendor List error:", error);
    } finally {
      setLoading(false);
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
      setBtnLoading(true);
      const res = await postData(ENDPOINTS.VENDOR.ADD_UPDATE, payload);

      console.log("res", res);

      if (res.success) {
        setVendorData(res.data.data);
        toast.success(res.message);
        getVendorList();
      }

      return res;
    } catch (error) {
      // console.log("Error:", error);

      // if (error.response && error.response.data && error.response.data.errors) {
      //   const errors = error.response.data.errors;

      //   // Loop through each error key and show all messages
      //   Object.keys(errors).forEach((key) => {
      //     const messages = errors[key];
      //     messages.forEach((msg) => toast.error(msg));
      //   });
      // } else {
      //   toast.error("Something went wrong. Please try again.");
      // }
      console.error(error);

      // FIXED: Properly display validation errors
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        // Handle validation errors (422)
        if (errorData.errors) {
          // Display each validation error
          Object.values(errorData.errors).forEach((errorArray) => {
            errorArray.forEach((errorMessage) => {
              toast.error(errorMessage);
            });
          });
        } else {
          // Handle other API errors
          toast.error(errorData.message || "An error occurred");
        }
      } else {
        toast.error("Network error occurred");
      }
    } finally {
      setBtnLoading(false);
    }
  };

  // Edit Vendor
  const EditVendor = async (id, payload) => {
    try {
      setBtnLoading(true);
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
      console.error(error);

      // FIXED: Properly display validation errors
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        // Handle validation errors (422)
        if (errorData.errors) {
          // Display each validation error
          Object.values(errorData.errors).forEach((errorArray) => {
            errorArray.forEach((errorMessage) => {
              toast.error(errorMessage);
            });
          });
        } else {
          // Handle other API errors
          toast.error(errorData.message || "An error occurred");
        }
      } else {
        toast.error("Network error occurred");
      }
    } finally {
      setBtnLoading(false);
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
        // console.log("res ", res.data);
        const vendor = res.data; // ✅ Correct level
        setVendorDetail(vendor);
        // console.log("vendorr", vendor);
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
      console.error(error);

      // FIXED: Properly display validation errors
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        // Handle validation errors (422)
        if (errorData.errors) {
          // Display each validation error
          Object.values(errorData.errors).forEach((errorArray) => {
            errorArray.forEach((errorMessage) => {
              toast.error(errorMessage);
            });
          });
        } else {
          // Handle other API errors
          toast.error(errorData.message || "An error occurred");
        }
      } else {
        toast.error("Network error occurred");
      }
    }
  };

  // console.log("vvv", vendorData);

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
      console.log("Error:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Start Editing - FIXED THIS FUNCTION
  //   Start Editing
  // Enhanced startEditing function
  const startEditing = async (vendorId) => {
    try {
      // console.log("Starting edit for vendor ID:", vendorId);

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
        // handleClose("vendorApprove");
        toast.success(res.message);
      }
      getVendorList(); // Refresh vendor list after approval

      return res;
    } catch (error) {
      console.log("Error:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };
  // console.log("vendorEditId vendorEditId", vendorEditId);

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
        loading,
        setLoading,
        btnLoading,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};
