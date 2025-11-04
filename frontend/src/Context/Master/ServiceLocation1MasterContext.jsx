import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData, deleteData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";

const ServiceLocation1MasterContext = createContext();

// CUSTOM HOOK [SERVICE LOCATION 1 MASTER]
export const useServiceLocation1Master = () => {
  return useContext(ServiceLocation1MasterContext);
};

// [SERVICE LOCATION 1 MASTER] Provider
export const ServiceLocation1MasterProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [serviceLocation, setServiceLocation] = useState([]);
  const [serviceL1, setServiceL1] = useState([]);
  const [serviceLocationName, setServiceLocationName] = useState("");
  const [serviceLocation1EditId, setServiceLocation1EditId] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // Fetch All
  const fetchServiceLocations = async (search = "", page = 1, perPage = 10) => {
    try {
      setLoading(true);
      const res = await getData(ENDPOINTS.SERVICES_LOCATION_1_MASTER.LIST, {
        search,
        page,
        per_page: perPage,
      });
      const apiData = res.data;
      setServiceLocation(apiData.data);
      setPagination({
        currentPage: apiData.current_page,
        perPage: apiData.per_page,
        total: apiData.total,
      });
    } catch (error) {
      toast.error(`Service Location 1 Master Fetch Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch SL1 Filter
  const fetchSL1Filter = async () => {
    try {
      const res = await getData(ENDPOINTS.SERVICES_LOCATION_1_MASTER.FILTER);
      setServiceL1(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch SL1 Filter");
    }
  };

  // Create
  const createServiceLocation = async (service_location_name) => {
    try {
      await postData(ENDPOINTS.SERVICES_LOCATION_1_MASTER.ADD_UPDATE, {
        service_location_name,
      });
      toast.success("Service Location 1 Master Created Successfully");
      fetchServiceLocations();
    } catch (error) {
      toast.error(`Service Location 1 Master Create Error: ${error.message}`);
    }
  };

  // Update
  const updateServiceLocation = async (id, service_location_name) => {
    try {
      await postData(ENDPOINTS.SERVICES_LOCATION_1_MASTER.ADD_UPDATE, {
        id,
        service_location_name,
      });
      toast.success("Service Location 1 Master Updated Successfully");
      fetchServiceLocations();
    } catch (error) {
      toast.error(`Service Location 1 Master Update Error: ${error.message}`);
    }
  };

  //   Start Editing
  const startEditing = (id, service_location_name) => {
    setServiceLocation1EditId(id);
    setServiceLocationName(service_location_name);
  };

  // Delete
  const deleteServiceLocation = async (id) => {
    try {
      await deleteData(`${ENDPOINTS.SERVICES_LOCATION_1_MASTER.DELETE}/${id}`);
      toast.success("Service Location 1 Master Deleted Successfully");
      fetchServiceLocations();
    } catch (error) {
      toast.error(`Service Location 1 Master Delete Error: ${error.message}`);
    }
  };

  return (
    <ServiceLocation1MasterContext.Provider
      value={{
        serviceLocation,
        serviceLocation1EditId,
        setServiceLocation1EditId,
        serviceL1,
        fetchSL1Filter,
        pagination,
        fetchServiceLocations,
        createServiceLocation,
        updateServiceLocation,
        deleteServiceLocation,
        setServiceLocationName,
        serviceLocationName,
        startEditing,
        loading,
        setLoading,
      }}
    >
      {children}
    </ServiceLocation1MasterContext.Provider>
  );
};
