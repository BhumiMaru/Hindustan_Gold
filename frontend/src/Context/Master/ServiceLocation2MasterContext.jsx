import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData, deleteData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";

const ServiceLocation2MasterContext = createContext();

// CUSTOM HOOK [SERVICE LOCATION 2 MASTER]
export const useServiceLocation2Master = () => {
  return useContext(ServiceLocation2MasterContext);
};

// [SERVICE LOCATION 2 MASTER] Provider
export const ServiceLocation2MasterProvider = ({ children }) => {
  const [serviceLocation2, setServiceLocation2] = useState([]);
  const [serviceLocation2Name, setServiceLocation2Name] = useState("");
  const [serviceLocation2EditId, setServiceLocation2EditId] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // Fetch All
  const fetchServiceLocations2 = async (
    search = "",
    serviceLocation1Id = null
  ) => {
    try {
      const res = await getData(ENDPOINTS.SERVICES_LOCATION_2_MASTER.LIST, {
        search,
        service_location_1_id: serviceLocation1Id,
      });
      setServiceLocation2(res.data.data);
    } catch (error) {
      toast.error(`Service Location 2 Master Fetch Error: ${error.message}`);
    }
  };

  // Create
  const createServiceLocation2 = async (
    service_location_2_name,
    parent_location_id
  ) => {
    try {
      await postData(ENDPOINTS.SERVICES_LOCATION_2_MASTER.ADD_UPDATE, {
        service_location_2_name,
        service_location_1_id: parent_location_id, // relation with Location 1
      });
      toast.success("Service Location 2 Master Created Successfully");
      fetchServiceLocations2();
    } catch (error) {
      toast.error(`Service Location 2 Master Create Error: ${error.message}`);
      console.log(error);
    }
  };

  // Update
  const updateServiceLocation2 = async (
    id,
    service_location_2_name,
    parent_location_id
  ) => {
    try {
      await postData(ENDPOINTS.SERVICES_LOCATION_2_MASTER.ADD_UPDATE, {
        id,
        service_location_2_name,
        service_location_1_id: parent_location_id,
      });
      toast.success("Service Location 2 Master Updated Successfully");
      fetchServiceLocations2();
    } catch (error) {
      toast.error(`Service Location 2 Master Update Error: ${error.message}`);
    }
  };

  // Start Editing
  const startEditing = (
    id,
    service_location_2_name,
    service_location_1_id,
    service_location1Name
  ) => {
    setServiceLocation2EditId(id);
    setServiceLocation2Name(service_location_2_name);

    // prefill dropdown
    setSelectedOption({
      value: service_location_1_id,
      label: service_location1Name || "N/A",
    });
  };

  // Delete
  const deleteServiceLocation2 = async (id) => {
    try {
      await deleteData(`${ENDPOINTS.SERVICES_LOCATION_2_MASTER.DELETE}/${id}`);
      toast.success("Service Location 2 Master Deleted Successfully");
      fetchServiceLocations2();
    } catch (error) {
      toast.error(`Service Location 2 Master Delete Error: ${error.message}`);
    }
  };

  return (
    <ServiceLocation2MasterContext.Provider
      value={{
        serviceLocation2,
        serviceLocation2Name,
        setServiceLocation2Name,
        serviceLocation2EditId,
        setServiceLocation2EditId,
        selectedOption,
        setSelectedOption,

        fetchServiceLocations2,
        createServiceLocation2,
        updateServiceLocation2,
        deleteServiceLocation2,
        startEditing,
      }}
    >
      {children}
    </ServiceLocation2MasterContext.Provider>
  );
};
