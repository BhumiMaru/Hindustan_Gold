import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useCompanyMaster } from "../../../../../Context/Master/CompanyMasterContext";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Company_Master_Table from "./Company_Master_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import Company_Master_Form from "./Company_Master_Form";

export default function Company_Master_List() {
  const { handleOpen, modal } = useUIContext();
  const [search, setSearch] = useState("");
  const { fetchCompanyData, pagination } = useCompanyMaster();

  useEffect(() => {
    fetchCompanyData(search, pagination.currentPage, pagination.perPage);
  }, [search]);

  const handlePageChange = (page) => {
    fetchCompanyData(search, page, pagination.perPage);
  };

  const handleItemsPerPageChange = (size) => {
    fetchCompanyData(search, 1, size); // reset to page 1 when changing size
  };

  return (
    <>
      {/* ---------------------START COMPANY MASTER LIST------------------------- */}
      <>
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* DataTable with Buttons */}
          <div className="card">
            <div className="d-flex justify-content-between p-3">
              <div className="d-flex align-items-center ">
                {/*  <input type="search" className="form-control" placeholder="Search Companys...">*/}
                <SearchBar
                  placeholder="Enter Companys..."
                  value={search}
                  onChange={setSearch} // ✅ update state
                  onSubmit={(val) => setSearch(val)} // ✅ handle Enter key
                />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  data-bs-toggle="modal"
                  data-bs-target="#smallModal"
                  onClick={() => {
                    handleOpen("addNewCompany");
                  }}
                >
                  <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                  Add New Company
                </button>
              </div>
            </div>
            <div className="card-datatable table-responsive pt-0">
              <Company_Master_Table />
              <Pagination
                currentPage={pagination.currentPage}
                totalItems={pagination.total}
                itemsPerPage={pagination.perPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          </div>
        </div>
        {modal.addNewCompany && <Company_Master_Form />}
      </>
      {/* ---------------------END COMPANY MASTER LIST------------------------- */}
    </>
  );
}
