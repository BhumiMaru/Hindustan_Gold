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
  const [loading, setLoading] = useState(false);
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
      const res = await postData(ENDPOINTS.UOM.ADD_UPDATE, { name });

      console.log("rr", res);

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
      toast.error(error.message);
      console.log("Create uom list error", error);
    }
  };

  //   Update Uom
  const EditUOM = async (payload) => {
    try {
      const res = await postData(ENDPOINTS.UOM.ADD_UPDATE, payload);
      if (res.status) {
        toast.success(res.message);
        setUomData(res.data.data);
        getUOMList();
      }
      setUomData({ name: "" });
      setEditId(null);
      return res.data.data;
    } catch (error) {
      toast.error(error.message);
      console.log("Edit uom list error", error);
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
      toast.error(error.message);
      console.log("Destroy uom list error", error);
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
      }}
    >
      {children}
    </UomContext.Provider>
  );
};
