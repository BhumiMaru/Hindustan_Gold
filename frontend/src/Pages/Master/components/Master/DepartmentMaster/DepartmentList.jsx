import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../Context/UIContext";
import { useDepartment } from "../../../Context/Master/DepartmentContext";
import DepartmentForm from "./DepartmentForm";
import DepartmentTable from "./DepartmentTable";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";

export default function DepartmentList() {
  const { modal, handleOpen } = useUIContext();
  const { fetchDepartments } = useDepartment();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDepartments(search);
  }, [search]); // ✅ re-fetch when search changes
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
              <Pagination />
            </div>
          </div>
          {modal.addNewDepartment && <DepartmentForm />}
        </div>
      </>
      {/* ---------------------End DepartmentList --------------------- */}
    </>
  );
}
