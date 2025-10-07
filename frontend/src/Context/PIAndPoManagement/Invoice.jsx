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
    //     grn_id:null,
    // sub_cat_id:null,
    // vendor_id:null,
    // invoice_date:2025-10-06
    // taxable_amount:25000
    // tds_amount:500
    // paid_amount:20000
    // remarks:Invoice for October batch
    // invoice_type:1
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // Invoice List
  const invoiceList = async () => {
    try {
      const res = await getData(ENDPOINTS.INVOICE.LIST);
      setInvoice(res.data.data || []);
      setPagination({
        currentPage: res.data.current_page || page,
        perPage: res.data.per_page || perPage,
        total: res.data.total || 0,
      });
    } catch (error) {
      toast.error("Error during Invoice List");
      console.error("Invoice List error:", error);
    }
  };

  //   Invoice Create
  const createInvoice = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.INVOICE.ADD_UPDATE, payload);
      if (res.status) {
        toast.success(res.message);
        setInvoiceData(res.data);
      }
    } catch (error) {
      toast.error("Error during Invoice List");
      console.error("Invoice List error:", error);
    }
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoice,
        setInvoice,
        invoiceData,
        setInvoiceData,
        pagination,
        setPagination,
        invoiceList,
        createInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
