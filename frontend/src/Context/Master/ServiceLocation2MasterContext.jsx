import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData, deleteData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { useUIContext } from "../UIContext";

const ServiceLocation2MasterContext = createContext();

// CUSTOM HOOK [SERVICE LOCATION 2 MASTER]
export const useServiceLocation2Master = () => {
  return useContext(ServiceLocation2MasterContext);
};

// [SERVICE LOCATION 2 MASTER] Provider
export const ServiceLocation2MasterProvider = ({ children }) => {
  const { handleClose } = useUIContext();
  // Data Loading
  const [loading, setLoading] = useState(false);
  // Btn Loading
  const [btnLoading, setBtnLoading] = useState(false);
  const [serviceLocation2, setServiceLocation2] = useState([]);
  const [serviceL2, setServiceL2] = useState([]);
  const [serviceLocation2Name, setServiceLocation2Name] = useState("");
  const [serviceLocation2EditId, setServiceLocation2EditId] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [filterSelectedOption, setFilterSelectedOption] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // Fetch All
  const fetchServiceLocations2 = async ({
    search = "",
    serviceLocation1Id = null,
    page = 1,
    perPage = 10,
  } = {}) => {
    try {
      setLoading(true);
      // If serviceLocation1Id is null, don't include it in the request
      const params = { search, page, per_page: perPage };
      // if (serviceLocation1Id !== null) {
      //   params.service_location_1_id = serviceLocation1Id;
      // }
      if (serviceLocation1Id) params.service_location_1_id = serviceLocation1Id;
      // console.log("serviceLocation1Id", serviceLocation1Id);

      const res = await getData(
        ENDPOINTS.SERVICES_LOCATION_2_MASTER.LIST,
        params
      );
      setServiceLocation2(res.data.data);

      // ✅ Update pagination
      setPagination((prev) => ({
        ...prev,
        currentPage: res.data.current_page || page,
        perPage: perPage,
        total: res.data.total || 0,
      }));
    } catch (error) {
      toast.error(`Service Location 2 Master Fetch Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch SL2 Filter
  const fetchSL2Filter = async () => {
    try {
      const res = await getData(ENDPOINTS.SERVICES_LOCATION_2_MASTER.FILTER);
      setServiceL2(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch SL2 Filter");
    }
  };

  // Create
  const createServiceLocation2 = async (
    service_location_2_name,
    parent_location_id
  ) => {
    try {
      setBtnLoading(true);
      const res = await postData(
        ENDPOINTS.SERVICES_LOCATION_2_MASTER.ADD_UPDATE,
        {
          service_location_2_name,
          service_location_1_id: parent_location_id, // relation with Location 1
        }
      );
      if (res.success) {
        toast.success(res.message);
        handleClose("addNewServiceLocation2");
      }
      fetchServiceLocations2();
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

  // Update
  const updateServiceLocation2 = async (
    id,
    service_location_2_name,
    parent_location_id
  ) => {
    try {
      setBtnLoading(true);
      const res = await postData(
        ENDPOINTS.SERVICES_LOCATION_2_MASTER.ADD_UPDATE,
        {
          id,
          service_location_2_name,
          service_location_1_id: parent_location_id,
        }
      );
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        handleClose("addNewServiceLocation2");
      }
      fetchServiceLocations2();
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
    setSelectedOption(service_location_1_id);
  };

  // Delete
  const deleteServiceLocation2 = async (id) => {
    try {
      await deleteData(`${ENDPOINTS.SERVICES_LOCATION_2_MASTER.DELETE}/${id}`);
      toast.success("Service Location 2 Master Deleted Successfully");
      fetchServiceLocations2();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
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
        serviceL2,
        filterSelectedOption,
        setFilterSelectedOption,
        pagination,
        setPagination,

        fetchSL2Filter,
        fetchServiceLocations2,
        createServiceLocation2,
        updateServiceLocation2,
        deleteServiceLocation2,
        startEditing,
        loading,
        setLoading,
        btnLoading,
        setBtnLoading,
      }}
    >
      {children}
    </ServiceLocation2MasterContext.Provider>
  );
};
