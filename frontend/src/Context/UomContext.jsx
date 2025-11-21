import { createContext, useContext, useState } from "react";
import { ENDPOINTS } from "../constants/endpoints";
import { deleteData, getData, postData } from "../utils/api";
import { toast } from "react-toastify";
import { useUIContext } from "./UIContext";

export const UomContext = createContext();

// Custom Hook of uom(unit of measure)
export const useUOM = () => {
  return useContext(UomContext);
};

// uom provider
export const UOMProvider = ({ children }) => {
  const { handleClose } = useUIContext();
  // Data Loading
  const [loading, setLoading] = useState(false);
  // Btn Loading
  const [btnLoading, setBtnLoading] = useState(false);
  const [search, setSearch] = useState(""); //search
  const [uom, setUom] = useState([]); // List
  const [filterUom, setFilterUom] = useState([]); // Filter List
  const [uomData, setUomData] = useState({
    name: "",
  }); // store uom data
  const [editId, setEditId] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // Get UOM List
  const getUOMList = async ({ search = "", page = 1, perPage = 10 } = {}) => {
    try {
      setLoading(true);
      const res = await getData(ENDPOINTS.UOM.LIST, {
        search,
        page,
        per_page: perPage,
      });

      // Decrypt Response
      // const decryptRes = decryptData(res)

      const apiData = res.data;
      setUom(apiData.data);
      setPagination({
        currentPage: apiData.current_page,
        perPage: apiData.per_page,
        total: apiData.total,
      });
    } catch (error) {
      toast.error(error.message);
      console.log("get uom list error", error);
    } finally {
      setLoading(false);
    }
  };

  //   Filter uom
  const filterUomList = async () => {
    try {
      const res = await getData(ENDPOINTS.UOM.FILTER);

      // Decrypt Response
      // const decryptRes = decryptData(res)

      if (res.status) {
        setFilterUom(res.data);
      }
      return res.data;
    } catch (error) {
      toast.error(error.message);
      console.log("Create uom list error", error);
    }
  };

  // Create uom
  const createUOM = async (name) => {
    try {
      setBtnLoading(true);
      // Encryt Payload
      // const encryptPayload = encryptData({
      // name
      // });

      const res = await postData(
        ENDPOINTS.UOM.ADD_UPDATE,
        { name }
        // {
        //   data: encryptPayload,
        // }
      );

      console.log("rr", res);

      // Decrypt Response
      // const decryptRes = decryptData(res)

      if (res.status) {
        toast.success(res.message);
        setUomData(res.data.data);
        setEditId(null);
        setUomData({
          name: "",
        });
        handleClose("addNewUOM");
        getUOMList();
      }

      return res.data.data;
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

  //   Update Uom
  const EditUOM = async (payload) => {
    try {
      setBtnLoading(true);

      // Encryt Payload
      // const encryptPayload = encryptData(payload);

      const res = await postData(
        ENDPOINTS.UOM.ADD_UPDATE,
        payload

        // {
        //   data: encryptPayload,
        // }
      );

      // Decrypt Response
      // const decryptRes = decryptData(res)

      if (res.status) {
        toast.success(res.message);
        handleClose("addNewUOM");
        setUomData(res.data.data);
        setUomData({ name: "" });
        setEditId(null);
      }
      getUOMList();
      return res.data.data;
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

  //   Start Editing
  const startEditing = (id, name) => {
    setEditId(id);
    setUomData({ name });
  };

  //   Destroy uom
  const DestroyUom = async (id) => {
    try {
      const res = await deleteData(`${ENDPOINTS.UOM.DESTROY}/${id}`);
      if (res.status) {
        toast.success(res.message);
      }
      getUOMList();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <UomContext.Provider
      value={{
        search,
        setSearch,
        uom,
        setUom,
        filterUom,
        setFilterUom,
        uomData,
        setUomData,
        pagination,
        setPagination,
        editId,
        setEditId,
        getUOMList,
        filterUomList,
        createUOM,
        DestroyUom,
        EditUOM,
        startEditing,
        loading,
        setLoading,
        btnLoading,
        setBtnLoading,
      }}
    >
      {children}
    </UomContext.Provider>
  );
};
