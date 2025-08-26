import React from "react";
import SearchBar from "../../Common/SearchBar/SearchBar";
import Group_Master_Table from "./Group_Master_Table";
import Pagination from "../../Common/Pagination/Pagination";

export default function Group_Master_List() {
  return (
    <>
      {/* -------------------START GROUP MASTER LIST---------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* <!-- DataTable with Buttons --> */}
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center ">
              {/* <!--  <input type="search" className="form-control" placeholder="Search Groups...">--> */}
              <SearchBar />
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
                data-bs-toggle="modal"
                data-bs-target="#smallModal"
              >
                <span className="icon-xs icon-base ti tabler-plus me-2"></span>Add
                New Group
              </button>
            </div>
          </div>
          <div className="card-datatable table-responsive pt-0">
            <Group_Master_Table />
            <Pagination />
          </div>
        </div>
      </div>
      {/* -------------------END GROUP MASTER LIST---------------------- */}
    </>
  );
}
