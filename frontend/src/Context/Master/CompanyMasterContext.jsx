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
  const [companyName, setCompanyName] = useState("");
  const [companyEditId, setCompanyEditId] = useState(null);

  //   Fetch Company
  const fetchCompanyData = async (search = "") => {
    try {
      const res = await getData(ENDPOINTS.COMPANY_MASTER.LIST, { search });
      setCompanies(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Company");
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
        companyName,
        setCompanyName,
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
