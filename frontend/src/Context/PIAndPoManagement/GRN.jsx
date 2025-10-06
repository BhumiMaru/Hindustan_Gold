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

  //   GRN List
  const GRNList = async () => {
    try {
      const res = await getData(ENDPOINTS.GRN.LIST);
      setGrnList(res.data.data);
    } catch (error) {
      toast.error("Error during Get GRN List");
      console.error("Get GRN List error:", error);
    }
  };

  // GRN Create
  const CreateGRN = async (payload = grnData) => {
    try {
      const formData = new FormData();

      // Append all non-array fields
      Object.entries(payload).forEach(([key, value]) => {
        if (key !== "items") {
          formData.append(key, value ?? "");
        }
      });

      // Append items array properly
      payload.items?.forEach((item, index) => {
        Object.entries(item).forEach(([k, v]) => {
          formData.append(`items[${index}][${k}]`, v ?? "");
        });
      });

      const res = await postData(ENDPOINTS.GRN.ADD_UPDATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

      // Append all non-array fields
      Object.entries(payload).forEach(([key, value]) => {
        if (key !== "items") {
          formData.append(key, value ?? "");
        }
      });

      // Append items array properly
      payload.items?.forEach((item, index) => {
        Object.entries(item).forEach(([k, v]) => {
          formData.append(`items[${index}][${k}]`, v ?? "");
        });
      });

      const res = await postData(ENDPOINTS.GRN.ADD_UPDATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status) {
        toast.success(res.message);
        // Update local state if needed
        setGrnData(res.data.data);
        GRNList(); // refresh list
      }
    } catch (error) {
      toast.error("Error during Edit GRN");
      console.error("Edit GRN error:", error);
    }
  };

  //   Start Editing
  const startEditing = (id) => {
    setEditId(id);

    // Find GRN from existing grnList
    const grn = grnList.find((g) => g.id === id);

    if (grn) {
      setGrnData({
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
            po_item_id: item.po_item_id,
            item_name: item.item_name,
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

  return (
    <GRNContext.Provider
      value={{
        grnList,
        setGrnList,
        grnData,
        setGrnData,
        editId,
        setEditId,
        GRNList,
        CreateGRN,
        EditGRN,
        startEditing,
      }}
    >
      {children}
    </GRNContext.Provider>
  );
};
