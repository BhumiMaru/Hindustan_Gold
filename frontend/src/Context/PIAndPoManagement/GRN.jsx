import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";

export const GRNContext = createContext();

// CUSTOM HOOK FOR GRN CONTEXT
export const useGRN = () => {
  return useContext(GRNContext);
};

// GRN PRovider
export const GRNProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [grnList, setGrnList] = useState([]); //List
  const [grnData, setGrnData] = useState({
    grn_no: "",
    grn_date: "",
    po_id: "",
    date_of_receipt: "",
    total_grn_qty: 0,
    invoice_file: null,
    remark: "",
    items: [],
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [itemName, setItemName] = useState("all");
  const [vendorName, setVendorName] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });
  const [grnId, setGrnId] = useState(null);
  const [grnDetails, setGrnDetails] = useState({});
  // GRN Worlflow
  const [GRNWorkflowdetails, setGRNWorkflowdetails] = useState();

  //   GRN List
  const GRNList = async ({
    status,
    search,
    page = pagination.currentPage,
    perPage = pagination.perPage,
    po_id,
  } = {}) => {
    try {
      setLoading(true);
      const params = {
        status: status !== "all" ? status : undefined,
        search: search !== "" ? search : undefined,
        item_id: itemName !== "all" ? itemName : undefined,
        vendor: vendorName !== "all" ? vendorName : undefined,
        start_date: dateRange.start || undefined,
        end_date: dateRange.end || undefined,
        po_id,
        page,
        per_page: perPage,
      };

      const res = await getData(ENDPOINTS.GRN.LIST, params);

      setGrnList(res.data.data || []);
      setPagination({
        currentPage: res.data.current_page || page,
        perPage: res.data.per_page || perPage,
        total: res.data.total || 0,
      });
    } catch (error) {
      // toast.error("Error during Get GRN List");
      console.error("Get GRN List error:", error);
    } finally {
      setLoading(false);
    }
  };

  // GRN Create
  const CreateGRN = async (payload = grnData) => {
    try {
      const formData = new FormData();

      // Append all non-array fields
      Object.entries(payload).forEach(([key, value]) => {
        if (key !== "items") {
          // Send po_id as integer
          if (key === "po_id") {
            formData.append(key, value ? parseInt(value) : 0);
          } else {
            formData.append(key, value ?? "");
          }
        }
      });

      // console.log("payload", payload);

      // Append items array properly
      // payload.items?.forEach((item, index) => {
      //   formData.append(
      //     `items[${index}][po_item_id]`,
      //     parseInt(item.po_item_id) || 0
      //   );
      //   formData.append(
      //     `items[${index}][grn_qty]`,
      //     parseInt(item.grn_qty) || 0
      //   );
      // });
      // Append items array properly
      payload.items?.forEach((item, index) => {
        if (item.grn_item_id) {
          formData.append(
            `items[${index}][grn_item_id]`,
            parseInt(item.grn_item_id)
          );
        }
        formData.append(
          `items[${index}][po_item_id]`,
          parseInt(item.po_item_id) || 0
        );
        formData.append(
          `items[${index}][grn_qty]`,
          parseInt(item.grn_qty) || 0
        );
      });

      const res = await postData(ENDPOINTS.GRN.ADD_UPDATE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status) {
        toast.success(res.message);
        setGrnData(res.data.data);
        GRNList();
      }
    } catch (error) {
      toast.error("Error during Create GRN");
      console.error("Create GRN error:", error);
    }
  };

  // GRN Edit
  const EditGRN = async ({ id, payload }) => {
    try {
      const formData = new FormData();

      // Include the ID
      formData.append("id", id);

      // Append non-array fields
      Object.entries(payload).forEach(([key, value]) => {
        if (key !== "items") {
          if (key === "po_id") {
            formData.append(key, value ? parseInt(value) : 0);
          } else {
            formData.append(key, value ?? "");
          }
        }
      });

      // Append items array properly
      // payload.items?.forEach((item, index) => {
      //   formData.append(
      //     `items[${index}][po_item_id]`,
      //     parseInt(item.po_item_id) || 0
      //   );
      //   formData.append(
      //     `items[${index}][grn_qty]`,
      //     parseInt(item.grn_qty) || 0
      //   );
      // });
      // Append items array properly
      payload.items?.forEach((item, index) => {
        // Only append if it exists
        if (item.grn_item_id) {
          formData.append(
            `items[${index}][grn_item_id]`,
            parseInt(item.grn_item_id)
          );
        }
        formData.append(
          `items[${index}][po_item_id]`,
          parseInt(item.po_item_id) || 0
        );
        formData.append(
          `items[${index}][grn_qty]`,
          parseInt(item.grn_qty) || 0
        );
      });

      const res = await postData(ENDPOINTS.GRN.ADD_UPDATE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // console.log("res", res);

      if (res.status) {
        toast.success(res.message);
        setGrnData(res.data);
        GRNList();
      }
    } catch (error) {
      toast.error("Error during Edit GRN");
      console.error("Edit GRN error:", error);
    }
  };

  //   Start Editing
  // In your GRNContext, update the startEditing function:
  const startEditing = (id) => {
    setEditId(id);

    // Find GRN from existing grnList
    const grn = grnList.find((g) => g.id === id);
    // console.log("Found GRN:", grn);

    if (grn) {
      // console.log("GRN items:", grn.items);
      setGrnData({
        id: grn.id,
        grn_no: grn.grn_no || "",
        grn_date: grn.grn_date || new Date().toISOString().split("T")[0],
        po_id: grn.po_id || "",
        date_of_receipt:
          grn.date_of_receipt || new Date().toISOString().split("T")[0],
        total_grn_qty: grn.total_grn_qty || 0,
        invoice_file: null, // user can re-upload file
        remark: grn.remark || "",
        items:
          grn.items?.map((item) => ({
            grn_item_id: item.id, // ✅ This should be item.id (the actual GRN item ID)
            po_item_id: item.po_item_id,
            item_name: item.item_name || `Item ${item.item_id}`, // Fallback if item_name not available
            quantity: item.quantity,
            uom: item.uom,
            pending_qty: item.pending_qty,
            grn_qty: item.grn_qty || 0,
          })) || [],
      });
    } else {
      toast.error("GRN data not found in the list");
    }
  };

  // GRN Details
  const GRNDetails = async (grn_id) => {
    try {
      const res = await getData(`${ENDPOINTS.GRN.DETAILS}?grn_id=${grn_id}`);
      // console.log("res", res);
      if (res.success) {
        setGrnDetails(res.data);
      }
    } catch (error) {
      toast.error("Error during Details GRN");
      console.error("Details GRN error:", error);
    }
  };

  // -------------------- GRN Request --------------------- //
  const GRNApprove = async (grn_id) => {
    try {
      const res = await postData(ENDPOINTS.GRN.APPROVE, grn_id);
      if (res.status) {
        toast.success(res.message);
      }
      GRNList();
    } catch (error) {
      toast.error("Error during Approve GRN");
      console.error("Approve GRN error:", error);
    }
  };

  // GRN Reject
  const GRNReject = async ({ grn_id, reject_reason }) => {
    try {
      const res = await postData(ENDPOINTS.GRN.REJECT, {
        grn_id,
        reject_reason,
      });
      if (res.status) {
        toast.success(res.message);
      }
      GRNList();
    } catch (error) {
      toast.error("Error during Reject GRN");
      console.error("Reject GRN error:", error);
    }
  };

  // Invoice Workflow
  const grnWorkflow = async (grn_id) => {
    try {
      const res = await postData(`${ENDPOINTS.GRN.WORKFLOW}?grn_id=${grn_id}`);

      if (res.status) {
        setGRNWorkflowdetails(res.data); // Save workflow data
      } else {
        toast.error(res.message || "Failed to fetch workflow data");
      }
    } catch (error) {
      toast.error("Error during GRN Workflow");
      console.error("GRN Workflow error:", error);
    }
  };

  return (
    <GRNContext.Provider
      value={{
        grnList,
        setGrnList,
        grnData,
        setGrnData,
        editId,
        setEditId,
        search,
        setSearch,
        status,
        setStatus,
        itemName,
        setItemName,
        vendorName,
        setVendorName,
        dateRange,
        setDateRange,
        pagination,
        setPagination,
        GRNList,
        CreateGRN,
        EditGRN,
        startEditing,
        GRNApprove,
        GRNReject,
        grnId,
        setGrnId,
        grnDetails,
        setGrnDetails,
        GRNDetails,

        // grn workflow
        GRNWorkflowdetails,
        setGRNWorkflowdetails,
        grnWorkflow,
        loading,
        setLoading,
      }}
    >
      {children}
    </GRNContext.Provider>
  );
};
