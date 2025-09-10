import { createContext, useContext, useState, useEffect } from "react";
import { getData, postData, deleteData } from "../../utils/api";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../../constants/endpoints";

const ZoneContext = createContext();

// CUSTOM HOOK
export const useZone = () => {
  return useContext(ZoneContext);
};

// PROVIDER
export const ZoneProvider = ({ children }) => {
  const [zones, setZones] = useState([]);
  const [zoneFilter, setZoneFilter] = useState([]);
  const [zoneName, setZoneName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [editId, setEditId] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // ✅ Fetch Zones (GET)
  const fetchZones = async (search = "", page = 1, perPage = 10) => {
    try {
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
      const res = await postData(ENDPOINTS.ZONES.ADD_UPDATE, {
        zone_name: zoneName,
        color_code: colorCode,
      });
      toast.success("Zone added successfully");
      fetchZones();
      resetForm();
    } catch (err) {
      toast.error("Failed to add zone");
      console.error(err);
    }
  };

  // ✅ Update Zone (PUT / POST with ID in body)
  const updateZone = async () => {
    try {
      const res = await postData(ENDPOINTS.ZONES.ADD_UPDATE, {
        id: editId,
        zone_name: zoneName,
        color_code: colorCode,
      });
      toast.success("Zone updated successfully");
      fetchZones();
      setEditId(null);
      resetForm();
    } catch (err) {
      toast.error("Failed to update zone");
      console.error(err);
    }
  };

  // ✅ Delete Zone (POST with ID in body)
  const deleteZone = async (id) => {
    try {
      const res = await deleteData(`${ENDPOINTS.ZONES.DELETE}/${id}`); // 👈 delete uses body, not params

      toast.success("Zone deleted successfully");
      fetchZones();
    } catch (err) {
      toast.error("Failed to delete zone");
      console.error(err);
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
      }}
    >
      {children}
    </ZoneContext.Provider>
  );
};
