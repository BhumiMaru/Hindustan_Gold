import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData, deleteData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";

const ServiceLocation3MasterContext = createContext();

// CUSTOM HOOK
export const useServiceLocation3Master = () => {
  return useContext(ServiceLocation3MasterContext);
};

// PROVIDER
export const ServiceLocation3MasterProvider = ({ children }) => {
  const [serviceLocation3, setServiceLocation3] = useState([]);
  const [serviceL3, setServiceL3] = useState([]);
  const [serviceLocation3Data, setServiceLocation3Data] = useState({
    serviceLocation3Name: "",
    selectedSl1: null,
    selectedSl2: null,
  });
  const [serviceLocation3EditId, setServiceLocation3EditId] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // Fetch All
  const fetchServiceLocations3 = async (
    search = "",
    serviceLocation1Id = null,
    serviceLocation2Id = null,
    page = 1,
    perPage = 10
  ) => {
    try {
      const res = await getData(ENDPOINTS.SERVICES_LOCATION_3_MASTER.LIST, {
        search,
        service_location_1_id: serviceLocation1Id,
        service_location_2_id: serviceLocation2Id,
        page,
        per_page: perPage,
      });
      const apiData = res.data;
      setServiceLocation3(apiData.data);
      setPagination({
        currentPage: apiData.current_page,
        perPage: apiData.per_page,
        total: apiData.total,
      });
    } catch (error) {
      toast.error(`Service Location 3 Master Fetch Error: ${error.message}`);
    }
  };

  // Fetch SL1 Filter
  const fetchSL3Filter = async () => {
    try {
      const res = await getData(ENDPOINTS.SERVICES_LOCATION_3_MASTER.FILTER);
      setServiceL3(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch SL3 Filter");
    }
  };

  // Create
  const createServiceLocation3 = async (
    service_location_3_name,
    service_location_1_id,
    service_location_2_id
  ) => {
    try {
      await postData(ENDPOINTS.SERVICES_LOCATION_3_MASTER.ADD_UPDATE, {
        service_location_3_name,
        service_location_1_id,
        service_location_2_id,
      });
      toast.success("Service Location 3 Created Successfully");
      fetchServiceLocations3();
    } catch (error) {
      toast.error(`Service Location 3 Create Error: ${error.message}`);
    }
  };

  // Update
  const updateServiceLocation3 = async (
    id,
    service_location_3_name,
    service_location_1_id,
    service_location_2_id
  ) => {
    try {
      await postData(ENDPOINTS.SERVICES_LOCATION_3_MASTER.ADD_UPDATE, {
        id,
        service_location_3_name,
        service_location_1_id,
        service_location_2_id,
      });
      toast.success("Service Location 3 Updated Successfully");
      fetchServiceLocations3();
    } catch (error) {
      toast.error(`Service Location 3 Update Error: ${error.message}`);
    }
  };

  // Start Editing
  const startEditing = (
    id,
    service_location_3_name,
    service_location_1_id,
    service_location_2_id,
    service_location1Name,
    service_location2Name
  ) => {
    setServiceLocation3EditId(id);
    setServiceLocation3Data({
      serviceLocation3Name: service_location_3_name,
      selectedSl1: {
        value: service_location_1_id,
        label: service_location1Name || "N/A",
      },
      selectedSl2: {
        value: service_location_2_id,
        label: service_location2Name || "N/A",
      },
    });
  };

  // Delete
  const deleteServiceLocation3 = async (id) => {
    try {
      await deleteData(`${ENDPOINTS.SERVICES_LOCATION_3_MASTER.DELETE}/${id}`);
      toast.success("Service Location 3 Deleted Successfully");
      fetchServiceLocations3();
    } catch (error) {
      toast.error(`Service Location 3 Delete Error: ${error.message}`);
    }
  };

  return (
    <ServiceLocation3MasterContext.Provider
      value={{
        serviceLocation3,
        serviceLocation3Data,
        setServiceLocation3Data,
        serviceLocation3EditId,
        setServiceLocation3EditId,
        serviceL3,
        pagination,

        fetchSL3Filter,
        fetchServiceLocations3,
        createServiceLocation3,
        updateServiceLocation3,
        deleteServiceLocation3,
        startEditing,
      }}
    >
      {children}
    </ServiceLocation3MasterContext.Provider>
  );
};
