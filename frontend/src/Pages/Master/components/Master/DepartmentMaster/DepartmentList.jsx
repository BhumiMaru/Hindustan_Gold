import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useDepartment } from "../../../../../Context/Master/DepartmentContext";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import DepartmentTable from "./DepartmentTable";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import DepartmentForm from "./DepartmentForm";

export default function DepartmentList() {
  const { modal, handleOpen } = useUIContext();
  const { fetchDepartments, pagination, setPagination } = useDepartment();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDepartments(search, pagination.currentPage, pagination.perPage);
  }, [search]); // ✅ re-fetch when search changes

  const handlePageChange = (page) => {
    fetchDepartments(search, page, pagination.perPage);
  };

  const handleItemsPerPageChange = (size) => {
    fetchDepartments(search, 1, size); // reset to page 1 when changing size
  };

  return (
    <>
      {/* ---------------------Start DepartmentList --------------------- */}
      <>
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* DataTable with Buttons */}
          <div className="card">
            <div className="d-flex justify-content-between p-3">
              <div className="d-flex align-items-center ">
                {/*  <input type="search" className="form-control" placeholder="Search departments...">*/}
                <SearchBar
                  placeholder="Search departments..."
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
                  onClick={() => handleOpen("addNewDepartment")}
                >
                  <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                  Add New Department
                </button>
              </div>
            </div>
            <div className="card-datatable table-responsive pt-0">
              <DepartmentTable />
              <Pagination
                currentPage={pagination.currentPage}
                totalItems={pagination.total}
                itemsPerPage={pagination.perPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          </div>
          {modal.addNewDepartment && <DepartmentForm />}
        </div>
      </>
      {/* ---------------------End DepartmentList --------------------- */}
    </>
  );
}
