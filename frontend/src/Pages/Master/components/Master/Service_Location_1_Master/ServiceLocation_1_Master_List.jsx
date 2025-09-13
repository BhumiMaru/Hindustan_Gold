import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import ServiceLocation_1_Master_Table from "./ServiceLocation_1_Master_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import ServiceLocation_1_Master_Form from "./ServiceLocation_1_Master_Form";

export default function ServiceLocation_1_Master_List() {
  const { handleOpen, modal } = useUIContext();
  const { fetchServiceLocations, pagination } = useServiceLocation1Master();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchServiceLocations(search, pagination.currentPage, pagination.perPage);
  }, [search]);

  const handlePageChange = (page) => {
    fetchServiceLocations(search, page, pagination.perPage);
  };

  const handleItemsPerPageChange = (size) => {
    fetchServiceLocations(search, 1, size); // reset to page 1 when changing size
  };

  return (
    <>
      {/* -----------------START SERVICE LOCATION 1 MASTER List-------------------- */}
      <>
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* DataTable with Buttons */}
          <div className="card">
            <div className="d-flex justify-content-between p-3">
              <div className="d-flex align-items-center ">
                {/*  <input type="search" className="form-control" placeholder="Search Service Location 1s...">*/}
                <SearchBar
                  placeholder="Search Service Location 1..."
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
                  onClick={() => handleOpen("addNewServiceLocation1")}
                >
                  <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                  Add New Service Location 1
                </button>
              </div>
            </div>
            <div className="card-datatable table-responsive pt-0">
              <ServiceLocation_1_Master_Table />
              <Pagination
                currentPage={pagination.currentPage}
                totalItems={pagination.total}
                itemsPerPage={pagination.perPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          </div>
          {modal.addNewServiceLocation1 && <ServiceLocation_1_Master_Form />}
        </div>
      </>
      {/* -----------------END SERVICE LOCATION 1 MASTER List-------------------- */}
    </>
  );
}
