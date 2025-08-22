import React from "react";
import SearchBar from "../../Common/SearchBar/SearchBar";
import ServiceLocation_1_Master_Table from "./ServiceLocation_1_Master_Table";
import Pagination from "../../Common/Pagination/Pagination";
import ServiceLocation_1_Master_Form from "./ServiceLocation_1_Master_Form";

export default function ServiceLocation_1_Master_List() {
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
                <SearchBar />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  data-bs-toggle="modal"
                  data-bs-target="#smallModal"
                >
                  <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                  Add New Service Location 1
                </button>
              </div>
            </div>
            <div className="card-datatable table-responsive pt-0">
              <ServiceLocation_1_Master_Table />
              <Pagination />
            </div>
          </div>
          {/* {showForm && <ServiceLocation_1_Master_Form />} */}
        </div>
      </>
      {/* -----------------END SERVICE LOCATION 1 MASTER List-------------------- */}
    </>
  );
}
