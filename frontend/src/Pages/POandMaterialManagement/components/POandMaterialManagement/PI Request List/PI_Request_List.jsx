import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import PI_Request_Table from "./PI_Request_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import { usePIRequest } from "../../../../../Context/PIAndPoManagement/PIRequestList";

export default function PI_Request_List() {
  const [search, setSearch] = useState("");
  const {
    getPIRequest,
    activeTab,
    pagination,
    setPagination,
    setActiveTab,
    piRequest,
  } = usePIRequest();

  useEffect(() => {
    getPIRequest({
      type: activeTab,
      page: pagination.currentPage,
      perPage: pagination.perPage,
    });
  }, [activeTab, pagination.currentPage, pagination.perPage]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (size) => {
    setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
  };

  return (
    <>
      {/* ------------------START PI REUEST LIST-------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          <div className="row px-3 pt-2 pb-2">
            <div className="col-lg-5 mb-1 ">
              <ul
                className="nav nav-pills nav-fill border rounded bg-label-primary"
                role="tablist"
              >
                <li className="nav-item mb-1 mb-sm-0" role="presentation">
                  <button
                    type="button"
                    className={`nav-link waves-effect waves-light ${
                      activeTab === "my_request" ? "active" : ""
                    }`}
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-pills-justified-home"
                    aria-controls="navs-pills-justified-home"
                    aria-selected="true"
                    onClick={() => setActiveTab("my_request")}
                  >
                    <span className="d-none d-sm-inline-flex align-items-center">
                      <i className="icon-base ti tabler-home icon-sm me-1_5" />
                      My Request
                    </span>
                    <i className="icon-base ti tabler-home icon-sm d-sm-none" />
                  </button>
                </li>
                <li className="nav-item mb-1 mb-sm-0" role="presentation">
                  <button
                    type="button"
                    className={`nav-link waves-effect waves-light ${
                      activeTab === "approval_request" ? "active" : ""
                    }`}
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-pills-justified-profile"
                    aria-controls="navs-pills-justified-profile"
                    aria-selected="false"
                    tabIndex={-1}
                    onClick={() => setActiveTab("approval_request")}
                  >
                    <span className="d-none d-sm-inline-flex align-items-center">
                      <i className="icon-base ti tabler-user icon-sm me-1_5" />
                      Approvel Request
                    </span>
                    {activeTab === "approval_request" && (
                      // (loading ? (
                      //   <span className="h-px-20 w-px-20 d-flex align-items-center justify-content-center">
                      //     <Loader />
                      //   </span>
                      // ) : (
                      <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-danger ms-1_5">
                        {piRequest.length}
                      </span>
                    )}
                    <i className="icon-base ti tabler-user icon-sm d-sm-none" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-between px-3 pb-2">
            <div className="d-flex align-items-center ">
              {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
              <SearchBar
                placeholder="Search Request..."
                value={search}
                onChange={setSearch}
                onSubmit={(val) => setSearch(val)}
              />
            </div>
            <div className="d-flex gap-2">
              <Link
                to="/po-material/pi-request-create/material"
                className="btn btn-primary waves-effect waves-light"
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Material PI
              </Link>
              <Link
                to="/po-material/pi-request-create/service"
                className="btn btn-info waves-effect waves-light"
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Services PI
              </Link>
              <button
                className="btn buttons-collection btn-label-secondary  waves-effect"
                type="button"
              >
                <span>
                  <span className=" d-sm-block d-lg-flex align-items-center gap-1">
                    <i className="icon-base ti tabler-upload icon-xs" />
                    <span className="d-sm-inline-block">Export</span>
                  </span>
                </span>
              </button>
            </div>
          </div>
          <div className="row px-3 pb-2 ">
            <div className="col-lg-3">
              <div className="position-relative">
                <select
                  id="select10Basic"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="select10Basic"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id={2}>
                    Select&nbsp;Type
                  </option>
                  <option value="HI">Material</option>
                  <option value="CA">Services</option>
                  <option value="NV">Asset</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="position-relative">
                <select
                  id="select7Basic"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="select7Basic"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id={4}>
                    Select&nbsp;Item
                  </option>
                  <option value="HI">Item 1</option>
                  <option value="CA">Item 2</option>
                  <option value="NV">Item 3</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="position-relative">
                <select
                  id="select12Basic"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="select12Basic"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id={6}>
                    Select&nbsp;Department
                  </option>
                  <option value="HI">Department</option>
                  <option value="CA">Department</option>
                  <option value="NV">Department</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 ">
              <div className="position-relative">
                <select
                  id="select11Basic"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="select11Basic"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id={8}>
                    Select&nbsp;Created By
                  </option>
                  <option value="HI">Created</option>
                  <option value="CA">Created</option>
                  <option value="NV">Created</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 mt-2">
              <div className="position-relative">
                <select
                  id="select9Basic"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="select9Basic"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id={10}>
                    Select&nbsp;Status
                  </option>
                  <option value="HI">Active</option>
                  <option value="CA">Deactive</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 mt-2">
              <input
                type="date"
                id="bs-rangepicker-range"
                className="form-control"
              />
            </div>
          </div>
          <div className="card-datatable">
            <PI_Request_Table />
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

      {/* ------------------END PI REUEST LIST-------------------- */}
    </>
  );
}
