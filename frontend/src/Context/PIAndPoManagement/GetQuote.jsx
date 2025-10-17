import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import axios from "axios";
const base_url = import.meta.env.VITE_API_BASE_URL;

export const GetQuoteContext = createContext();

// Get Quote custom hook
export const useGetQuote = () => {
  return useContext(GetQuoteContext);
};

// Get Quote Provider
export const GetQuoteProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [quote, setQuote] = useState([]);
  const [quoteData, setQuoteData] = useState(null); // create get quote
  const [quoteItems, setQuoteItems] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });
  const [itemType, setItemType] = useState("all");
  const [department, setDepartment] = useState("all");
  const [createdBy, setCreatedBy] = useState("all");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // ---------------------------- Get Quotation Details ------------------ //
  // const [quotationVendorList, setQuotationVendorList] = useState([]);
  const [newVendorList, setNewVendorList] = useState([]);
  const [newVendorId, setNewVendorId] = useState(null);
  const [newVendorData, setNewVendorData] = useState(null);
  const [oldVendorList, setOldVendorList] = useState([]);

  const [quotationVendorData, setQuotationVendorData] = useState({
    pi_get_quote_id: null,
    pi_id: null,
    vendor_id: null,
  });

  // Quote Data for Email
  const [quoteDataForEmail, setQuoteDataForEmail] = useState({});
  const [vendorEmailData, setVendorEmailData] = useState();

  //   Get Quote List
  const getQuoteList = async ({
    search = "",
    pi_type = itemType,
    department_id = department,
    order_by = createdBy,
    status: statusParam = status,
    pi_date_start_date = dateRange.start,
    pi_date_end_date = dateRange.end,
    page = pagination.currentPage,
    perPage = pagination.perPage || 10, // ✅ single default
  } = {}) => {
    try {
      const params = {
        search,
        pi_type: pi_type !== "all" ? pi_type : undefined,
        department_id: department_id !== "all" ? department_id : undefined,
        order_by: order_by !== "all" ? order_by : undefined,
        status: statusParam !== "all" ? statusParam : undefined,
        pi_date_start_date: pi_date_start_date || undefined,
        pi_date_end_date: pi_date_end_date || undefined,
        page,
        per_page: perPage,
      };

      const res = await postData(ENDPOINTS.GETQUOTE.LIST, params);
      const apiData = res.data;

      setQuote(apiData.data || []);
      setPagination({
        currentPage: apiData.current_page || 1,
        perPage: apiData.per_page || perPage,
        total: apiData.total || 0,
      });
    } catch (error) {
      toast.error("Error during Get Quote List");
      console.error("Get Quote List PIRequest error:", error);
    }
  };

  // GET QUOTE CREATE
  // const getQuoteCreate = async (payload) => {
  //   try {
  //     const res = await postData(ENDPOINTS.GETQUOTE.CREATE, payload);
  //     if (res?.status) {
  //       console.log("res", res.data);
  //       setQuoteData(res.data);
  //       toast.success(res.message || "Get Quote Create successful!");
  //       // getPIRequest();
  //     }
  //     return res.data;
  //   } catch (error) {
  //     toast.error("Error during Get Quote Create");
  //     console.error("Get Quote Create PIRequest error:", error);
  //   }
  // };

  // ---------------- GET QUOTE CREATE ----------------
  const getQuoteCreate = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.GETQUOTE.CREATE, payload);
      console.log("payload", payload);
      if (res?.status) {
        const newId = res.data.id;
        // toast.success(res.message || "Get Quote Create successful!");

        // Immediately fetch details of the new quote
        await getQuoteDetails(newId);
      }
      return res;
    } catch (error) {
      toast.error("Error during Get Quote Create");
      console.error("Get Quote Create error:", error);
    }
  };

  // ---------------- GET QUOTE DETAILS ----------------
  const getQuoteDetails = async (id) => {
    try {
      // console.log("before id typeof:", typeof id);
      // console.log("before id:", id);

      // Convert to number
      const QuoteId = Number(id);

      // console.log("after id typeof:", typeof QuoteId);
      // console.log("after id:", QuoteId);

      const res = await getData(`${ENDPOINTS.GETQUOTE.DETAILS}?id=${QuoteId}`);

      if (res?.status) {
        setQuoteData(res.data);
        setQuoteItems(res.data);
        // console.log("ddddd", res.data);
      }
      return res;
    } catch (error) {
      toast.error("Error fetching Get Quote Details");
      console.error("Get Quote Details error:", error);
    }
  };

  // ---------------------------- GET QUOATION DETAILS ------------------------------ //
  // Get Quote Vendors List
  const quoteVendorList = async ({ pi_get_quote_id, vendor_type }) => {
    try {
      const res = await getData(ENDPOINTS.QUOTATIONDETAILS.LIST, {
        pi_get_quote_id,
        vendor_type,
      });

      if (res.status) {
        // console.log("res", res);

        // Filter based on vendor_type since res.data is an array
        if (vendor_type === "new") {
          setNewVendorList(res.data || []);
        } else if (vendor_type === "old") {
          setOldVendorList(res.data || []);
        }
      }
    } catch (error) {
      toast.error("Error fetching Get Quote Vendors List");
      console.error("Get Quote Vendors List error:", error);
    }
  };

  // Get Quote Vendor List for Email
  // const quoteVendorListForEmail = async ({ getquoteid, vendorid }) => {
  //   try {
  //     const res = await axios.post(
  //       ENDPOINTS.QUOTATIONDETAILS.LIST,
  //       { getquoteid, vendorid },
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer 441|NCUKDm9rHVVDMwN5JswzPWS7j30BwtpEpxRRklzP6feb1058",
  //         },
  //       }
  //     );

  //     if (res.status) {
  //       setQuoteDataForEmail(res.data);
  //       console.log("res quote", res.data);
  //     } else {
  //       toast.error("Failed to fetch quote vendor");
  //     }
  //   } catch (error) {
  //     console.error("Get Quote Vendors error:", error);
  //     if (error.response?.data?.message) {
  //       toast.error(error.response.data.message);
  //     } else {
  //       toast.error("Network error: Failed to fetch quote vendor");
  //     }
  //   }
  // };

  const quoteVendorListForEmail = async ({
    pi_get_quote_id,
    vendor_id,
    token,
  }) => {
    try {
      // console.log(
      //   `${base_url}${ENDPOINTS.QUOTATIONDETAILS.VENDOREMAILDETAILS}?pi_get_quote_id=${pi_get_quote_id}&vendor_id=${vendor_id}`
      // );
      // console.log(
      //   "pi_get_quote_id",
      //   pi_get_quote_id,
      //   "vendor_id",
      //   vendor_id,
      //   "token",
      //   token
      // );

      const res = await axios.get(
        `${base_url}${ENDPOINTS.QUOTATIONDETAILS.VENDOREMAILDETAILS}?pi_get_quote_id=${pi_get_quote_id}&vendor_id=${vendor_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("API Response:", res);

      // ✅ Check proper success condition
      if (res.status) {
        // ✅ Set only the 'data' object from the response
        setVendorEmailData(res.data);
        setQuoteDataForEmail(res.data.data);
        // console.log("✅ Quote vendor data:", res.data.data);
      } else {
        toast.error(
          res.data?.message || "⚠️ Failed to fetch quote vendor list"
        );
      }
      return res.data;
    } catch (error) {
      console.error("❌ Get Quote Vendors error:", error);
      // const errorMessage =
      //   error.response?.data?.message ||
      //   error.message ||
      //   "Network error: Failed to fetch quote vendor list";
      // toast.error(errorMessage);
    }
  };

  // create quote
  const createQuoteVendor = async (pi_get_quote_id, pi_id, vendor_id) => {
    try {
      const res = await postData(
        ENDPOINTS.QUOTATIONDETAILS.ADD_UPDATE,
        pi_get_quote_id,
        pi_id,
        vendor_id
      );

      if (res.status) {
        toast.success(res.message);
        setQuotationVendorData(res.data);
      }
      return res.data;
    } catch (error) {
      // Handle network errors or other exceptions
      if (error.response) {
        // Server responded with error status
        const errorMessage =
          error.response.data?.message || "Error creating quote vendor";
        toast.error(errorMessage);
      } else {
        toast.error("Network error: Failed to create quote vendor");
      }
      console.error("Get Quote Vendors Create error:", error);
      throw error;
    }
  };

  // send request
  const sendRequest = async ({
    pi_get_quote_id,
    pi_get_quote_vendor_ids,
    // vendor_type, // Make vendor_type dynamic with default value
  }) => {
    console.log("pi_get_quote_id", pi_get_quote_id);
    console.log("pi_get_quote_vendor_ids", pi_get_quote_vendor_ids);
    try {
      // Ensure pi_get_quote_vendor_ids is always an array
      const vendorIds = Array.isArray(pi_get_quote_vendor_ids)
        ? pi_get_quote_vendor_ids
        : [pi_get_quote_vendor_ids];

      // Filter out any null/undefined values
      const validVendorIds = vendorIds.filter((id) => id != null);

      if (validVendorIds.length === 0) {
        toast.error("Please select at least one vendor");
        return;
      }

      const payload = {
        pi_get_quote_id: parseInt(pi_get_quote_id),
        pi_get_quote_vendor_ids: validVendorIds,
        // vendor_type: vendor_type, // Include vendor_type in payload if needed by API
      };

      // console.log("Sending request with payload:", payload);

      const res = await postData(
        ENDPOINTS.QUOTATIONDETAILS.SENDREQUEST,
        payload
      );

      // console.log("Sending request with response:", res);

      if (res.status) {
        toast.success(res.message || "Request sent successfully!");
        // Refresh vendor list after successful send with dynamic vendor_type
        // if (pi_get_quote_id) {
        //   await quoteVendorList(pi_get_quote_id, vendor_type);
        // }
        return res.data;
      } else {
        toast.error(res.message || "Failed to send request");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Error sending request";
        toast.error(errorMessage);
      } else {
        toast.error("Network error: Failed to send request");
      }
      console.error("Send Request error:", error);
      throw error;
    }
  };

  // ---------------- Vendor Rate Update ----------------
  const vendorRateUpdate = async ({
    pi_get_quote_id,
    pi_get_quote_vendor_id,
    items = [], // Expect an array of objects [{ id, rate }]
    file = null,
  }) => {
    try {
      if (!pi_get_quote_id || !pi_get_quote_vendor_id || items.length === 0) {
        toast.error("Missing required fields for rate update");
        return;
      }

      const formData = new FormData();
      formData.append("pi_get_quote_id", pi_get_quote_id);
      formData.append("pi_get_quote_vendor_id", pi_get_quote_vendor_id);

      // ✅ Append items as array, not string
      items.forEach((item, index) => {
        formData.append(`pi_get_quote_vendor_item_ids[${index}][id]`, item.id);
        formData.append(
          `pi_get_quote_vendor_item_ids[${index}][rate]`,
          Number(item.rate)
        );
      });

      if (file) {
        formData.append("vendor_quote_file", file);
      }

      const res = await postData(
        ENDPOINTS.QUOTATIONDETAILS.RATEUPDATE,
        formData
      );

      if (res.status) {
        toast.success(res.message || "Vendor rate updated successfully!");
        // quoteVendorList({
        //   pi_get_quote_id,
        //   vendor_type,
        // });
        return res.data;
      } else {
        toast.error(res.message || "Failed to update vendor rate");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Error updating vendor rate";
        toast.error(errorMessage);
      } else {
        toast.error("Network error: Failed to update vendor rate");
      }
      console.error("Vendor Rate Update error:", error);
      throw error;
    }
  };

  return (
    <GetQuoteContext.Provider
      value={{
        search,
        setSearch,
        itemType,
        setItemType,
        department,
        setDepartment,
        createdBy,
        setCreatedBy,
        status,
        setStatus,
        quote,
        setQuote,
        quoteData,
        setQuoteData,
        quoteItems,
        setQuoteItems,
        pagination,
        dateRange,
        setDateRange,
        setPagination,
        getQuoteCreate,
        getQuoteList,
        getQuoteDetails,

        // Quotation Details
        // quotationVendorList,
        // setQuotationVendorList,
        newVendorList,
        setNewVendorList,
        newVendorId,
        setNewVendorId,
        oldVendorList,
        setOldVendorList,
        quotationVendorData,
        setQuotationVendorData,
        quoteVendorList,
        createQuoteVendor,
        sendRequest,
        vendorRateUpdate,
        newVendorData,
        setNewVendorData,

        ///
        quoteVendorListForEmail,
        quoteDataForEmail,
        setQuoteDataForEmail,
        vendorEmailData,
        setVendorEmailData,
      }}
    >
      {children}
    </GetQuoteContext.Provider>
  );
};
