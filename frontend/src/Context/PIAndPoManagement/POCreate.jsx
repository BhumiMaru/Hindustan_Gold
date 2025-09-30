import { createContext, useContext, useState } from "react";
import { postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";

export const POCreateContext = createContext();

// Custom Hook fo PO Create
export const usePOCreate = () => {
  return useContext(POCreateContext);
};

// PO PROVIDER
export const POProvider = ({ children }) => {
  const [PoList, setPoList] = useState([]); //List
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

  //   PO Create
  const PoCreate = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.POCREATE.ADD_UPDATE, payload);
      setPoData(res.data.data);
    } catch (error) {
      console.error("PO creation failed:", error);
    }
  };

  return (
    <POCreateContext.Provider
      value={{ PoList, setPoList, PoData, setPoData, PoCreate }}
    >
      {children}
    </POCreateContext.Provider>
  );
};
