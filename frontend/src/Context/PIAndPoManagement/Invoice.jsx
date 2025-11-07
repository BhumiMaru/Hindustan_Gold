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
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    grn_id: "",
    sub_cat_id: null,
    sub_cat_name: "",
    vendor_id: null,
    vendor_name: "",
    invoice_date: "",
    taxable_amount: "",
    tds_amount: "",
    paid_amount: "",
    remarks: "",
    invoice_type: "",
    item_id: null,
    invoice_file: null,
    po_id: null,
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
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [itemName, setItemName] = useState(null);
  const [vendor, setVendor] = useState(null);
  // Invoice Workflow
  const [invoiceWorkflowDetails, setInvoiceWorkflowDetails] = useState();
  // Revert Invoice Status
  const [revertStatusData, setRevertStatusData] = useState();
  // sub category id , vendor id and grn id set via po and grn
  // const [subcategoryIdInvoice, setSubcategoryIdInvoice] = useState(null);
  // const [vendorIdInvoice, setVendorIdInvoice] = useState(null);
  // const [itemIdInvoice, setItemIdInvoice] = useState(null);

  // payment
  const [paymentData, setPaymentData] = useState({
    // id:
    invoice_id: null,
    amount: "",
    payment_date: "",
    remark: "",
    type_of_payment: "",
    invoice_file: null,
  });

  // Invoice List
  const invoiceList = async ({
    status,
    search,
    selectedType,
    vendorName,
    startDate,
    endDate,
    grn_id,
    page = pagination.currentPage,
    perPage = pagination.perPage,
  } = {}) => {
    try {
      setLoading(true);
      const params = {
        status: status !== "all" ? status : undefined,
        search: search || undefined,
        type: selectedType !== "all" ? selectedType : undefined,
        vendor_id: vendorName !== "all" ? vendorName : undefined,
        start_date: startDate || dateRange.start || undefined,
        end_date: endDate || dateRange.end || undefined,
        grn_id,
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
      // toast.error("Error during Invoice List Fetch");
      // if (error.response && error.response.data) {
      //   toast.error(error.response.data.message);
      // }
      console.error("Invoice List error:", error);
    } finally {
      setLoading(false);
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

      // console.log("res.data", res);
      console.log("formData", formData);
      setInvoiceData(res);
      if (res?.status === true) {
        toast.success(res.message || "Invoice created successfully");
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
        invoice_file: null,
      });
      setInvoiceId(null);
    } catch (error) {
      console.error("Invoice Create error:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Invoice Edit
  const editInvoice = async ({ id, formData }) => {
    try {
      // Append ID to FormData
      console.log("id id", id);
      console.log("id id typeof", typeof id);
      formData.append("id", id);

      const res = await postData(
        ENDPOINTS.INVOICE.ADD_UPDATE,
        formData, // send FormData with ID included
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res?.status === true) {
        toast.success(res.message || "Invoice Updated successfully");
        setInvoiceData(res.data);
      } else {
        toast.error(res?.message || "Failed to update invoice");
      }

      invoiceList(); // refresh list
      // resetPaymentData();
      // Reset form
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
        invoice_file: null,
      });
      setInvoiceId(null);
    } catch (error) {
      console.error("Invoice Update error:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Start Editing
  const startEditing = ({ id, payload }) => {
    // console.log("id , payload", id, payload);
    setInvoiceId(id);

    // Prefill fields
    setInvoiceData({
      id: payload.id,
      invoice_id: payload.invoice_id,
      grn_id: payload.grn_id,
      invoice_date: payload.invoice_date || "",
      invoice_type:
        payload.invoice_type !== null ? Number(payload.invoice_type) : null,
      sub_cat_id:
        payload.sub_cat_id !== null ? Number(payload.sub_cat_id) : null,
      sub_cat_name: payload.sub_cat_name || "",
      vendor_id: payload.vendor?.id !== null ? Number(payload.vendor.id) : null,
      vendor_name: payload.vendor?.vendor_name || "", // Make sure this is set
      item_id: payload.item_id !== null ? Number(payload.item_id) : null,
      taxable_amount:
        payload.taxable_amount !== null ? Number(payload.taxable_amount) : 0,
      tds_amount: payload.tds_amount !== null ? Number(payload.tds_amount) : 0,
      paid_amount:
        payload.paid_amount !== null ? Number(payload.paid_amount) : 0,
      remarks: payload.remarks || "",
      invoice_file: payload.invoice_file || "",
    });

    // Set selects - FIXED: Use the vendor ID from payload
    setVendor(payload.vendor?.id ? Number(payload.vendor.id) : null);
    setSubCategoryId(payload.sub_cat_id ? Number(payload.sub_cat_id) : null);
    setItemName(payload.item_id ? Number(payload.item_id) : null);
  };

  // Invoice details
  const invoiceDetails = async (id) => {
    try {
      const res = await getData(`${ENDPOINTS.INVOICE.DETAILS}?id=${id}`);
      setInvoiceDetail(res.data);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      toast.error("Error while creating invoice");
    }
  };

  // Approve
  // const InvoiceApprove = async (id) => {
  //   try {
  //     const res = await postData(ENDPOINTS.INVOICE.APPROVE, id);
  //     if (res.status) {
  //       toast.success(res.message);
  //     }
  //     invoiceList();
  //   } catch (error) {
  //     toast.error("Error during Approve invoice");
  //     console.error("Approve invoice error:", error);
  //   }
  // };

  const InvoiceApprove = async (id) => {
    try {
      const res = await postData(ENDPOINTS.INVOICE.APPROVE, id);

      // Check the response from API
      if (res.status) {
        toast.success(res.message);
        invoiceList(); // Refresh invoice list after success
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error during invoice approval");
      }
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
      } else {
        toast.error(res.message);
      }
      invoiceList();
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Payment Partial
  const paymentPartial = async (payload) => {
    try {
      const formData = new FormData();
      for (const key in payload) {
        formData.append(key, payload[key]);
      }

      const res = await postData(ENDPOINTS.INVOICE.PAYMENT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log("res", res);

      toast.success("Partial payment added successfully!");
      setPaymentData(res.data);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      console.log("payment error", error);
    }
  };

  const resetPaymentData = () => {
    setPaymentData({
      invoice_id: null,
      amount: "",
      payment_date: "",
      remark: "",
      type_of_payment: "",
      paymentslip: null,
    });
    setType(null);
  };

  // Invoice Workflow
  const InvoiceWorkflow = async (invoiceId) => {
    try {
      const res = await postData(
        `${ENDPOINTS.INVOICE.WORKFLOW}?invoice_id=${invoiceId}`
      );

      if (res.status) {
        invoiceDetails(invoiceId);
      } else {
        toast.error(res.message || "Failed to fetch workflow data");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      console.error("Invoice Workflow error:", error);
    }
  };

  // Revert Status
  const revertStatus = async (invoiceId) => {
    try {
      const res = await postData(ENDPOINTS.INVOICE.REVERT_STATUS, {
        invoice_id: invoiceId,
      });

      if (res.status) {
        setRevertStatusData(res.data); // Save workflow data
        invoiceDetails(invoiceId);
      } else {
        toast.error(res.message || "Failed to fetch Revert Status");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      console.error("Invoice Revert error:", error);
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
        invoiceId,
        setInvoiceId,
        invoiceList,
        createInvoice,
        editInvoice,
        invoiceDetails,
        setInvoiceId,
        InvoiceReject,
        InvoiceApprove,
        subCategoryId,
        setSubCategoryId,
        itemName,
        setItemName,
        vendor,
        setVendor,

        // Payment
        paymentData,
        setPaymentData,
        paymentPartial,
        resetPaymentData,
        startEditing,

        // Invoice workflow
        invoiceWorkflowDetails,
        setInvoiceWorkflowDetails,
        InvoiceWorkflow,

        // Revert Status
        revertStatusData,
        setRevertStatusData,
        revertStatus,
        loading,
        setLoading,

        ////sub category id , vendor id and grn id set via po and grn
        // subcategoryIdInvoice,
        // setSubcategoryIdInvoice,
        // vendorIdInvoice,
        // setVendorIdInvoice,
        // itemIdInvoice,
        // setItemIdInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
