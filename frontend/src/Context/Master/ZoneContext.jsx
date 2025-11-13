import { createContext, useContext, useState, useEffect } from "react";
import { getData, postData, deleteData } from "../../utils/api";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../../constants/endpoints";
import { useUIContext } from "../UIContext";

const ZoneContext = createContext();

// CUSTOM HOOK
export const useZone = () => {
  return useContext(ZoneContext);
};

// PROVIDER
export const ZoneProvider = ({ children }) => {
  const { handleClose } = useUIContext();
  // Data Loading
  const [loading, setLoading] = useState(false);
  // Btn Loading
  const [btnLoading, setBtnLoading] = useState(false);
  const [zones, setZones] = useState([]);
  const [zoneFilter, setZoneFilter] = useState([]);
  const [zoneName, setZoneName] = useState("");
  const [colorCode, setColorCode] = useState("black");
  const [editId, setEditId] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // ✅ Fetch Zones (GET)
  const fetchZones = async (search = "", page = 1, perPage = 10) => {
    try {
      setLoading(true);
      const res = await getData(ENDPOINTS.ZONES.LIST, {
        search,
        page,
        per_page: perPage,
      });

      const apiData = res.data;
      setZones(apiData.data);
      setPagination({
        currentPage: apiData.current_page,
        perPage: apiData.per_page,
        total: apiData.total,
      });
    } catch (err) {
      toast.error("Failed to fetch zones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Zone Filter
  const fetchZoneFilter = async () => {
    try {
      const res = await getData(ENDPOINTS.ZONES.FILTER);
      setZoneFilter(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Zone Filter");
    }
  };

  // ✅ Add Zone (POST)
  const addZone = async () => {
    try {
      setBtnLoading(true);
      const res = await postData(ENDPOINTS.ZONES.ADD_UPDATE, {
        zone_name: zoneName,
        color_code: colorCode,
      });
      if (res?.status || res?.success) {
        toast.success(res?.message);
        handleClose("addNewZone");
        resetForm();
      }
      fetchZones();
    } catch (error) {
      console.error("Invoice Create error:", error);

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
      setBtnLoading(false); // Stop loader
    }
  };

  // ✅ Update Zone (PUT / POST with ID in body)
  const updateZone = async () => {
    try {
      setBtnLoading(true);
      const res = await postData(ENDPOINTS.ZONES.ADD_UPDATE, {
        id: editId,
        zone_name: zoneName,
        color_code: colorCode,
      });
      if (res?.status || res?.success) {
        toast.success(res?.message);
        handleClose("addNewZone");
        setEditId(null);
        resetForm();
      }
      fetchZones();
    } catch (error) {
      console.error("Invoice Create error:", error);

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
      setBtnLoading(false); // Stop loader
    }
  };

  // ✅ Delete Zone (POST with ID in body)
  const deleteZone = async (id) => {
    try {
      const res = await deleteData(`${ENDPOINTS.ZONES.DELETE}/${id}`); // 👈 delete uses body, not params
      if (res?.status || res?.success) {
        toast.success(res?.message);
      }
      fetchZones();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  //   Start Editing
  const startEdit = (zone) => {
    setZoneName(zone.zone_name);
    setColorCode(zone.color_code);
    setEditId(zone.id); // or zone._id depending on your backend
  };

  // ✅ Reset form
  const resetForm = () => {
    setZoneName("");
    setColorCode("");
    setEditId(null);
  };

  // Auto fetch on mount
  useEffect(() => {
    fetchZones();
  }, []);

  return (
    <ZoneContext.Provider
      value={{
        zones,
        zoneName,
        setZoneName,
        colorCode,
        setColorCode,
        editId,
        setEditId,
        zoneFilter,
        pagination,

        fetchZoneFilter,
        fetchZones,
        addZone,
        updateZone,
        deleteZone,
        startEdit,
        resetForm,
        loading,
        setLoading,
        btnLoading,
        setBtnLoading,
      }}
    >
      {children}
    </ZoneContext.Provider>
  );
};
