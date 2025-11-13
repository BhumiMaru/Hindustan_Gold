import { toast } from "react-toastify";
import { deleteData, getData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { createContext, useContext, useState } from "react";
import { useUIContext } from "../UIContext";

const CompanyMasterContext = createContext();

// Custome Hook [Company Master]
export const useCompanyMaster = () => {
  return useContext(CompanyMasterContext);
};

// Company Provider
export const CompanyMasterProvider = ({ children }) => {
  const { handleClose } = useUIContext();
  // Data Loading
  const [loading, setLoading] = useState(false);
  // Btn Loading
  const [btnLoading, setBtnLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [companyFilter, setCompanyFilter] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [companyEditId, setCompanyEditId] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  //   Fetch Company
  const fetchCompanyData = async (search = "", page = 1, perPage = 10) => {
    try {
      setLoading(true);
      const res = await getData(ENDPOINTS.COMPANY_MASTER.LIST, {
        search,
        page,
        per_page: perPage,
      });
      const apiData = res.data;
      setCompanies(apiData.data);
      setPagination({
        currentPage: apiData.current_page,
        perPage: apiData.per_page,
        total: apiData.total,
      });
    } catch (error) {
      console.log("Failed to fetch Company", error);

      // toast.error("Error updating item request");
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch Company Filter
  const fetchCompanyFilter = async () => {
    try {
      const res = await getData(ENDPOINTS.COMPANY_MASTER.FILTER);
      setCompanyFilter(res.data);
    } catch (error) {
      console.log("Error:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  //   Create Company
  const createCompany = async (company_name) => {
    try {
      setBtnLoading(true);
      const res = await postData(ENDPOINTS.COMPANY_MASTER.ADD_UPDATE, {
        company_name,
      });
      if (res.success || res.status) {
        toast.success(res.message);
        handleClose("addNewCompany");
        setCompanyEditId(null);
        setCompanyName("");
      }
      fetchCompanyData();
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
  const updateCompany = async (id, company_name) => {
    try {
      setBtnLoading(true);
      const res = await postData(ENDPOINTS.COMPANY_MASTER.ADD_UPDATE, {
        id,
        company_name,
      });
      if (res.success || res.status) {
        toast.success(res.message);
        handleClose("addNewCompany");
        setCompanyEditId(null);
        setCompanyName("");
      }
      fetchCompanyData();
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
  const startEditing = (id, company_name) => {
    setCompanyEditId(id);
    setCompanyName(company_name);
  };

  // Delete
  const deleteCompany = async (id) => {
    try {
      await deleteData(`${ENDPOINTS.COMPANY_MASTER.DELETE}/${id}`);
      toast.success("Company Master Deleted Successfully");
      fetchCompanyData();
    } catch (error) {
      console.log("Error:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <CompanyMasterContext.Provider
      value={{
        pagination,
        companyName,
        setCompanyName,
        fetchCompanyFilter,
        companyFilter,
        updateCompany,
        createCompany,
        setCompanyEditId,
        deleteCompany,
        companyEditId,
        startEditing,
        fetchCompanyData,
        companies,
        loading,
        setLoading,
        btnLoading,
        setBtnLoading,
      }}
    >
      {children}
    </CompanyMasterContext.Provider>
  );
};
