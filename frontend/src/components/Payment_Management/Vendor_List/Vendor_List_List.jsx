import React from "react";
import SearchBar from "../../Common/SearchBar/SearchBar";
import Vendor_List_Table from "./Vendor_List_Table";
import Pagination from "../../Common/Pagination/Pagination";

export default function Vendor_List_List() {
  return (
    <>
      {/* ------------------START VENDOR LIST----------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center ">
              {/*  <input type="search" class="form-control" placeholder="Search Users...">*/}
              <SearchBar />
            </div>
            <div className="d-flex">
              <div className="row">
                <div className="position-relative">
                  <select
                    id="select9Basic"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="select9Basic"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <option value="AK" data-select2-id={2}>
                      Select&nbsp;Status
                    </option>
                    <option value="HI">Active</option>
                    <option value="CA">Deactive</option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id={1}
                    style={{ width: 152 }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabIndex={0}
                        aria-disabled="false"
                        aria-labelledby="select2-select9Basic-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-select9Basic-container"
                          role="textbox"
                          aria-readonly="true"
                          title="Select Status"
                        >
                          {/* Select&nbsp;Status */}
                        </span>
                        <span
                          className="select2-selection__arrow"
                          role="presentation"
                        >
                          <b role="presentation" />
                        </span>
                      </span>
                    </span>
                    <span className="dropdown-wrapper" aria-hidden="true" />
                  </span>
                </div>
              </div>
              <a
                href="#"
                className="btn btn-primary waves-effect waves-light ms-2"
                data-bs-toggle="modal"
                data-bs-target="#vendorAddModel"
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Create Vendor
              </a>
            </div>
          </div>
          <div className="card-datatable table-responsive pt-0">
            <Vendor_List_Table />
            <Pagination />
          </div>
        </div>
      </div>

      {/* ------------------END VENDOR LIST----------------------- */}
    </>
  );
}
