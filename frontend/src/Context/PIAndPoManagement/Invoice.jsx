import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";

export const InvoiceContext = createContext();

// custom hook
export const useInvoice = () => {
  return useContext(InvoiceContext);
};

// Invoice Provider
export const InvoiceProvider = ({ children }) => {
  const [invoice, setInvoice] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    grn_id: "",
    sub_cat_id: "",
    vendor_id: "",
    invoice_date: "",
    taxable_amount: "",
    tds_amount: "",
    paid_amount: "",
    remarks: "",
    invoice_type: "",
    item_name: "",
  });
  const [invoiceDetail, setInvoiceDetail] = useState(null);
  const [type, setType] = useState(null);
  const [invoiceId, setInvoiceId] = useState(null);
  // Filteration
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [vendorName, setVendorName] = useState("all");
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // payment
  const [paymentData, setPaymentData] = useState({
    // id:
    invoice_id: null,
    amount: null,
    payment_date: "",
    remark: "",
    type_of_payment: null,
  });

  // Invoice List
  const invoiceList = async ({
    status,
    search,
    selectedType,
    vendorName,
    startDate,
    endDate,
    page = pagination.currentPage,
    perPage = pagination.perPage,
  } = {}) => {
    try {
      const params = {
        status: status !== "all" ? status : undefined,
        search: search || undefined,
        type: selectedType !== "all" ? selectedType : undefined,
        vendor_name: vendorName !== "all" ? vendorName : undefined,
        start_date: startDate || dateRange.start || undefined,
        end_date: endDate || dateRange.end || undefined,
        page,
        per_page: perPage,
      };

      const res = await getData(ENDPOINTS.INVOICE.LIST, params);

      // Support both paginated and non-paginated API
      const apiData = res.data;
      setInvoice(apiData.data || apiData || []);

      setPagination({
        currentPage: apiData.current_page || page,
        perPage: apiData.per_page || perPage,
        total: apiData.total || 0,
      });
    } catch (error) {
      toast.error("Error during Invoice List Fetch");
      console.error("Invoice List error:", error);
    }
  };

  //   Invoice Create
  const createInvoice = async (formData) => {
    try {
      const res = await postData(ENDPOINTS.INVOICE.ADD_UPDATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.status === true) {
        toast.success(res.message || "Invoice created successfully");
        setInvoiceData(res.data);
        console.log("res.data", res.data);
      } else {
        toast.error(res?.message || "Failed to create invoice");
      }
      invoiceList(); // refresh list
      setInvoiceData({
        grn_id: null,
        sub_cat_id: null,
        vendor_id: null,
        invoice_date: null,
        taxable_amount: null,
        tds_amount: null,
        paid_amount: null,
        remarks: "",
        invoice_type: null,
      });
    } catch (error) {
      console.error("Invoice Create error:", error);
      toast.error("Error while creating invoice");
    }
  };

  // Invoice details
  const invoiceDetails = async (id) => {
    try {
      const res = await getData(`${ENDPOINTS.INVOICE.DETAILS}?id=${id}`);
      setInvoiceDetail(res.data);
    } catch (error) {
      console.error("Invoice Create error:", error);
      toast.error("Error while creating invoice");
    }
  };

  // Approve
  const InvoiceApprove = async (id) => {
    try {
      const res = await postData(ENDPOINTS.INVOICE.APPROVE, id);
      if (res.status) {
        toast.success(res.message);
      }
      invoiceList();
    } catch (error) {
      toast.error("Error during Approve invoice");
      console.error("Approve invoice error:", error);
    }
  };

  // GRN Reject
  const InvoiceReject = async ({ id, reject_remark }) => {
    try {
      const res = await postData(ENDPOINTS.INVOICE.REJECT, {
        id,
        reject_remark,
      });
      if (res.status) {
        toast.success(res.message);
      }
      invoiceList();
    } catch (error) {
      toast.error("Error during Reject invoice");
      console.error("Reject invoice error:", error);
    }
  };

  // Payment Partial
  const paymentPartial = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.INVOICE.PAYMENT, payload);
      setPaymentData(res.data);
    } catch (error) {
      toast.error("Error during paymentPartial");
      console.error("paymentPartial error:", error);
    }
  };

  return (
    <InvoiceContext.Provider
      value={{
        type,
        setType,
        invoice,
        setInvoice,
        invoiceData,
        setInvoiceData,
        search,
        setSearch,
        selectedType,
        setSelectedType,
        vendorName,
        setVendorName,
        status,
        setStatus,
        dateRange,
        setDateRange,
        pagination,
        setPagination,
        invoiceDetail,
        setInvoiceDetail,
        invoiceList,
        createInvoice,
        invoiceDetails,
        setInvoiceId,
        InvoiceReject,
        InvoiceApprove,

        // Payment
        paymentData,
        setPaymentData,
        paymentPartial,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
