import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";

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
  const [vendorFilter, setVendorFilter] = useState([]);
  const [vendorEditId, setVendorEditId] = useState(null);

  // --------------------------------- VENDOR -------------------------------------- //
  // Get Vendor List
  const getVendorList = async ({
    search = "",
    page = 1,
    perPage = 10,
  } = {}) => {
    try {
      const params = { search, page, per_page: perPage };
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
        // console.log("rrr", res);
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
        // console.log("res", res);
        setVendorData(res.data.data);
        toast.success(res.message);
        getVendorList();
      }

      return res.data.data;
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

      return res.data.data;
    } catch (error) {
      toast.error("Error during Vendor Edit");
      console.error("Vendor Edit error:", error);
    }
  };

  //   Vendor Details
  const vendorDetails = async (id) => {
    try {
      // console.log("mm", id);
      const res = await postData(ENDPOINTS.VENDOR.DETAILS, {
        id: id,
      });
      if (res.success) {
        // console.log("res res", res);
        const vendorData = res.data;

        setVendorData({
          vendor_name: vendorData.vendor_name || "",
          contact_person_name: vendorData.contact_person_name || "",
          email: vendorData.email || "",
          mobile: vendorData.mobile || "",
          address: vendorData.address || "",
          gst_number: vendorData.gst_number || "",
          pan_number: vendorData.pan_number || "",
          msme_certificate: vendorData.msme_certificate || "",
          bank_name: vendorData.bank_name || "",
          account_no: vendorData.account_no || "",
          ifsc_code: vendorData.ifsc_code || "",
          branch_name: vendorData.branch_name || "",
          total_invoice: vendorData.total_invoice || null,
          status: vendorData.status || null,
        });
      }
      return res.data;
    } catch (error) {
      toast.error("Error during Vendor Details");
      console.error("Vendor Details error:", error);
    }
  };

  //   Start Editing
  const startEditing = (vendorId) => {
    // console.log("vendorId", vendorId);
    // console.log("typeof vendorId", typeof vendorId);
    setVendorEditId(vendorId);
    vendorDetails(vendorId);
  };

  //   Reset Vendor Data
  const resetVendorData = () => {
    setVendorData({
      vendor_id: "",
      vendor_name: "",
      contact_person_name: "",
      email: "",
      mobile: "",
      address: "",
      gst_number: "",
      pan_number: "",
      msme_certificate: "",
      bank_name: "",
      account_no: null,
      ifsc_code: "",
      branch_name: "",
      total_invoice: null,
      status: null,
    });
  };

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
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};
