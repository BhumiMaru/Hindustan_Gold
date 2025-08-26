import React from "react";
import PO_List_Table from "./PO_List_Table";
import Pagination from "../../Common/Pagination/Pagination";
import SearchBar from "../../Common/SearchBar/SearchBar";

export default function PO_List_List() {
  return (
    <>
      {/* -----------------START PO LIST ------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          <div className="row px-3 pt-2">
            <div className="col-lg-5 mb-1 ">
              <ul
                className="nav nav-pills nav-fill border rounded bg-label-primary"
                role="tablist"
              >
                <li className="nav-item mb-1 mb-sm-0" role="presentation">
                  <button
                    type="button"
                    className="nav-link active waves-effect waves-light"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-pills-justified-home"
                    aria-controls="navs-pills-justified-home"
                    aria-selected="true"
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
                    className="nav-link waves-effect waves-light"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-pills-justified-profile"
                    aria-controls="navs-pills-justified-profile"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    <span className="d-none d-sm-inline-flex align-items-center">
                      <i className="icon-base ti tabler-user icon-sm me-1_5" />
                      Approvel Request
                    </span>
                    <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-danger ms-1_5">
                      3
                    </span>
                    <i className="icon-base ti tabler-user icon-sm d-sm-none" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-between px-3 pt-1">
            <div className="d-flex align-items-center ">
              {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
              <SearchBar />
            </div>
            <div>
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
              {/*  <a href="request-list.html" className="btn btn-primary waves-effect waves-light"
                            >
                                <span className="icon-xs icon-base ti tabler-plus me-2"></span>Create Request
                            </a>*/}
            </div>
          </div>
          <div className="row px-3 pb-2 pt-2">
            <div className="col-lg-3">
              <select id="select10Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Type</option>
                <option value="HI">Item</option>
                <option value="CA">Services</option>
                <option value="NV">Asset</option>
              </select>
            </div>
            <div className="col-lg-3">
              <select id="select11Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Item</option>
                <option value="HI">Item 1</option>
                <option value="CA">Item 2</option>
                <option value="NV">Item 3</option>
              </select>
            </div>
            <div className="col-lg-3">
              <select id="select7Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Vendor</option>
                <option value="HI">Category</option>
                <option value="CA">Category</option>
                <option value="NV">Category</option>
              </select>
            </div>
            <div className="col-lg-3">
              <select id="select9Basic" className="select2 form-select">
                <option value="AK">Select&nbsp;Status</option>
                <option value="HI">Pending</option>
                <option value="CA">Completed</option>
              </select>
            </div>
            <div className="col-lg-3 mt-2">
              <input
                type="date"
                id="bs-rangepicker-range"
                className="form-control"
              />
            </div>
          </div>
          <div className="card-datatable table-responsive pt-0">
            <PO_List_Table />
            <Pagination />
          </div>
        </div>
      </div>

      {/* -----------------END PO LIST ------------------- */}
    </>
  );
}
