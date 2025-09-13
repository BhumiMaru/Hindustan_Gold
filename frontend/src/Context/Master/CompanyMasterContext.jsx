import { toast } from "react-toastify";
import { deleteData, getData, postData } from "../../utils/api";
import { ENDPOINTS } from "../../constants/endpoints";
import { createContext, useContext, useState } from "react";

const CompanyMasterContext = createContext();

// Custome Hook [Company Master]
export const useCompanyMaster = () => {
  return useContext(CompanyMasterContext);
};

// Company Provider
export const CompanyMasterProvider = ({ children }) => {
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
      console.log(error);
      toast.error("Failed to fetch Company");
    }
  };

  // Fetch Company Filter
  const fetchCompanyFilter = async () => {
    try {
      const res = await getData(ENDPOINTS.COMPANY_MASTER.FILTER);
      setCompanyFilter(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Company Filter");
    }
  };

  //   Create Company
  const createCompany = async (company_name) => {
    try {
      await postData(ENDPOINTS.COMPANY_MASTER.ADD_UPDATE, {
        company_name,
      });
      toast.success("Company Master Created Successfully");
      fetchCompanyData();
    } catch (error) {
      toast.error(`Company Master Create Error: ${error.message}`);
    }
  };

  // Update
  const updateCompany = async (id, company_name) => {
    try {
      await postData(ENDPOINTS.COMPANY_MASTER.ADD_UPDATE, {
        id,
        company_name,
      });
      toast.success("Company Master Updated Successfully");
      fetchCompanyData();
    } catch (error) {
      toast.error(`Company Master Update Error: ${error.message}`);
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
      toast.error(`Company Master Delete Error: ${error.message}`);
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
      }}
    >
      {children}
    </CompanyMasterContext.Provider>
  );
};
