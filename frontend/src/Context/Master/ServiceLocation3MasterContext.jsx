import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getData, postData, deleteData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { useUIContext } from "../UIContext";
import { encryptData } from "../../utils/encryptData";

const ServiceLocation3MasterContext = createContext();

// CUSTOM HOOK
export const useServiceLocation3Master = () => {
  return useContext(ServiceLocation3MasterContext);
};

// PROVIDER
export const ServiceLocation3MasterProvider = ({ children }) => {
  const { handleClose } = useUIContext();
  // Data Loading
  const [loading, setLoading] = useState(false);
  // Btn Loading
  const [btnLoading, setBtnLoading] = useState(false);
  const [serviceLocation3, setServiceLocation3] = useState([]);
  const [serviceL3, setServiceL3] = useState([]);
  const [serviceLocation3Data, setServiceLocation3Data] = useState({
    service_location_3_name: "",
    selectedSl1: null,
    selectedSl2: null,
  });
  const [serviceLocation3EditId, setServiceLocation3EditId] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  const [filterSelectedSl1, setFilterSelectedSl1] = useState(null); // 🔹 separate state
  const [filterSelectedSl2, setFilterSelectedSl2] = useState(null);

  // Fetch All
  // const fetchServiceLocations3 = async (
  //   search = "",
  //   serviceLocation1Id = null,
  //   serviceLocation2Id = null,
  //   page = 1,
  //   perPage = 10
  // ) => {
  //   try {
  //     const params = { search };
  //     // if (params.serviceLocation1Id !== null) {
  //     //   params.service_location_1_id = serviceLocation1Id;
  //     // }
  //     // if (params.serviceLocation2Id !== null) {
  //     //   params.service_location_2_id = serviceLocation2Id;
  //     // }

  //     if (serviceLocation1Id) params.service_location_1_id = serviceLocation1Id;
  //     if (serviceLocation2Id) params.service_location_2_id = serviceLocation2Id;

  //     const res = await getData(
  //       ENDPOINTS.SERVICES_LOCATION_3_MASTER.LIST,
  //       params
  //     );

  //     const apiData = res.data;
  //     setServiceLocation3(apiData.data);
  //     setPagination({
  //       currentPage: apiData.current_page,
  //       perPage: apiData.per_page,
  //       total: apiData.total,
  //     });
  //   } catch (error) {
  //     toast.error(`Service Location 3 Master Fetch Error: ${error.message}`);
  //   }
  // };

  // Fetch Service Location 3
  const fetchServiceLocations3 = async (
    search = "",
    serviceLocation1Id = null,
    serviceLocation2Id = null,
    page = 1,
    perPage = 10
  ) => {
    try {
      setLoading(true);
      const params = { search, page, per_page: perPage };

      // Only include if it's a single numeric value
      if (serviceLocation1Id !== null && !Array.isArray(serviceLocation1Id)) {
        params.service_location_1_id = Number(serviceLocation1Id);
      }

      if (serviceLocation2Id !== null && !Array.isArray(serviceLocation2Id)) {
        params.service_location_2_id = Number(serviceLocation2Id);
      }

      const res = await getData(
        ENDPOINTS.SERVICES_LOCATION_3_MASTER.LIST,
        params
      );

      // Decrypt Response
      // const decryptRes = decryptData(res)

      // Ensure serviceLocation3 is always an array
      setServiceLocation3(res.data?.data || []);

      // Optional: set pagination if your UI uses it
      setPagination({
        currentPage: res.data?.current_page || 1,
        perPage: res.data?.per_page || 10,
        total: res.data?.total || 0,
      });
    } catch (error) {
      console.error(
        `Something went wrong while fetching Service Location 3 list. ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch SL1 Filter
  const fetchSL3Filter = async () => {
    try {
      const res = await getData(ENDPOINTS.SERVICES_LOCATION_3_MASTER.FILTER);
      // Decrypt Response
      // const decryptRes = decryptData(res)
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
      setBtnLoading(true);

      // Encryt Payload
      // const encryptPayload = encryptData({
      // service_location_3_name,
      //     service_location_1_id,
      //     service_location_2_id,
      // });

      const res = await postData(
        ENDPOINTS.SERVICES_LOCATION_3_MASTER.ADD_UPDATE,
        {
          service_location_3_name,
          service_location_1_id,
          service_location_2_id,
        }

        // {
        //   data:encryptPayload
        // }
      );

      console.log("res", res);

      // Decrypt Response
      // const decryptRes = decryptData(res)

      if (res.success) {
        toast.success(res.message);
        handleClose("addNewServiceLocation3");
        setServiceLocation3EditId(null);
        setServiceLocation3Data({
          service_location_3_name: "",
          selectedSl1: null,
          selectedSl2: null,
        });
      }
      fetchServiceLocations3();
    } catch (error) {
      // console.log(error);
      // if (error.response && error.response.data) {
      //   toast.error(error.response.data.message);
      // }
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
  // const updateServiceLocation3 = async (
  //   id,
  //   service_location_3_name,
  //   service_location_1_id,
  //   service_location_2_id
  // ) => {
  //   try {
  //     const res = await postData(
  //       ENDPOINTS.SERVICES_LOCATION_3_MASTER.ADD_UPDATE,
  //       {
  //         id,
  //         service_location_3_name,
  //         service_location_1_id,
  //         service_location_2_id,
  //       }
  //     );
  //     console.log("res", res);
  //     toast.success("Service Location 3 Updated Successfully");
  //     fetchServiceLocations3();
  //   } catch (error) {
  //     toast.error(`Service Location 3 Update Error: ${error.message}`);
  //   }
  // };
  const updateServiceLocation3 = async (id, payload) => {
    try {
      setBtnLoading(true);
      // ✅ include id inside payload
      const finalPayload = { id, ...payload };

      // Encrypt Payload
      // const encryptPayload = encryptData(finalPayload)

      const res = await postData(
        ENDPOINTS.SERVICES_LOCATION_3_MASTER.ADD_UPDATE,
        finalPayload

        // {
        //   data: encryptPayload,
        // }
      );

      // Decrypt Response
      // const decryptRes = decryptData(res)

      // console.log("res", response);
      if (res.success) {
        toast.success(res.message);
        handleClose("addNewServiceLocation3");
        setServiceLocation3EditId(null);
        setServiceLocation3Data({
          service_location_3_name: "",
          selectedSl1: null,
          selectedSl2: null,
        });
      }
      fetchServiceLocations3(); // refresh list
    } catch (error) {
      // console.log(error);
      // if (error.response && error.response.data) {
      //   toast.error(error.response.data.message);
      // }
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
    service_location_3_name,
    service_location_1_id,
    service_location_2_id,
    service_location1Name,
    service_location2Name
  ) => {
    setServiceLocation3EditId(id);
    setServiceLocation3Data({
      service_location_3_name: service_location_3_name,
      selectedSl1: service_location_1_id,
      selectedSl2: service_location_2_id,
    });
  };

  // Delete
  const deleteServiceLocation3 = async (id) => {
    try {
      await deleteData(`${ENDPOINTS.SERVICES_LOCATION_3_MASTER.DELETE}/${id}`);
      toast.success("Service Location 3 Deleted Successfully");
      fetchServiceLocations3();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <ServiceLocation3MasterContext.Provider
      value={{
        serviceLocation3,
        serviceLocation3Data,
        setServiceLocation3,
        setServiceLocation3Data,
        serviceLocation3EditId,
        setServiceLocation3EditId,
        serviceL3,
        pagination,
        setPagination,
        filterSelectedSl1,
        setFilterSelectedSl1,
        filterSelectedSl2,
        setFilterSelectedSl2,

        fetchSL3Filter,
        fetchServiceLocations3,
        createServiceLocation3,
        updateServiceLocation3,
        deleteServiceLocation3,
        startEditing,
        loading,
        setLoading,
        btnLoading,
        setBtnLoading,
      }}
    >
      {children}
    </ServiceLocation3MasterContext.Provider>
  );
};
