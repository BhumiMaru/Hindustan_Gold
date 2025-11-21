import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData, deleteData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { useUIContext } from "../UIContext";

const ServiceLocation1MasterContext = createContext();

// CUSTOM HOOK [SERVICE LOCATION 1 MASTER]
export const useServiceLocation1Master = () => {
  return useContext(ServiceLocation1MasterContext);
};

// [SERVICE LOCATION 1 MASTER] Provider
export const ServiceLocation1MasterProvider = ({ children }) => {
  const { handleClose } = useUIContext();
  // Data Loading
  const [loading, setLoading] = useState(false);
  // Btn Loading
  const [btnLoading, setBtnLoading] = useState(false);
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

      // Decrypt Res
      // const decryptRes = decryptData(res);

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

      // Decrypt Res
      // const decryptRes = decryptData(res);

      setServiceL1(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch SL1 Filter");
    }
  };

  // Create
  const createServiceLocation = async (service_location_name) => {
    try {
      setBtnLoading(true);

      // Encryt Payload
      // const encryptPayload = encryptData({
      //  service_location_name,
      // });

      const res = await postData(
        ENDPOINTS.SERVICES_LOCATION_1_MASTER.ADD_UPDATE,
        {
          service_location_name,
        }

        // {
        //   data: encryptPayload,
        // }
      );

      // Decrypt Response
      // const decryptRes = decryptData(res)

      if (res?.status || res?.success) {
        toast.success(res.message);
        handleClose("addNewServiceLocation1");
      }
      fetchServiceLocations();
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
  const updateServiceLocation = async (id, service_location_name) => {
    try {
      setBtnLoading(true);

      // Encryt Payload
      // const encryptPayload = encryptData({
      // id,
      //     service_location_name,
      // });

      const res = await postData(
        ENDPOINTS.SERVICES_LOCATION_1_MASTER.ADD_UPDATE,
        {
          id,
          service_location_name,
        }

        // {
        //   data: encryptPayload,
        // }
      );

      // Decrypt Response
      // const decryptRes = decryptData(res)

      if (res?.status || res?.success) {
        toast.success(res.message);
        handleClose("addNewServiceLocation1");
      }
      fetchServiceLocations();
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
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
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
        btnLoading,
        setBtnLoading,
      }}
    >
      {children}
    </ServiceLocation1MasterContext.Provider>
  );
};
