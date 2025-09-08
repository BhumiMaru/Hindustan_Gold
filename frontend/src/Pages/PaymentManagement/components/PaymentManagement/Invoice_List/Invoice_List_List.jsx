import React from "react";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import Invoice_List_Table from "./Invoice_List_Table";
import Pagination from "../../../../../components/Common/Pagination/Pagination";

export default function Invoice_List_List() {
  return (
    <>
      {/* ------------START INVOICE LIST----------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center ">
              {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
              <SearchBar />
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-info  waves-effect waves-light">
                Payment Request
              </button>
              <a
                href="#"
                className="btn btn-primary waves-effect waves-light"
                data-bs-toggle="modal"
                data-bs-target="#InvoiceModel"
              >
                <span className="icon-xs icon-base ti tabler-plus me-2" />
                Create Invoice
              </a>
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
          <div className="row px-3 pb-2">
            <div className="col-lg-3">
              <div className="position-relative">
                <select
                  id="select17Basic"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="select17Basic"
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
                <span
                  className="select2 select2-container select2-container--default"
                  dir="ltr"
                  data-select2-id={1}
                  style={{ width: "236.75px" }}
                >
                  <span className="selection">
                    <span
                      className="select2-selection select2-selection--single"
                      role="combobox"
                      aria-haspopup="true"
                      aria-expanded="false"
                      tabIndex={0}
                      aria-disabled="false"
                      aria-labelledby="select2-select17Basic-container"
                    >
                      <span
                        className="select2-selection__rendered"
                        id="select2-select17Basic-container"
                        role="textbox"
                        aria-readonly="true"
                        title="Select Type"
                      >
                        Select&nbsp;Type
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
                    Select&nbsp;Vendor
                  </option>
                  <option value="HI">Category</option>
                  <option value="CA">Category</option>
                  <option value="NV">Category</option>
                </select>
                <span
                  className="select2 select2-container select2-container--default"
                  dir="ltr"
                  data-select2-id={3}
                  style={{ width: "236.75px" }}
                >
                  <span className="selection">
                    <span
                      className="select2-selection select2-selection--single"
                      role="combobox"
                      aria-haspopup="true"
                      aria-expanded="false"
                      tabIndex={0}
                      aria-disabled="false"
                      aria-labelledby="select2-select7Basic-container"
                    >
                      <span
                        className="select2-selection__rendered"
                        id="select2-select7Basic-container"
                        role="textbox"
                        aria-readonly="true"
                        title="Select Vendor"
                      >
                        Select&nbsp;Vendor
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
            <div className="col-lg-3">
              <div className="position-relative">
                <select
                  id="select9Basic"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="select9Basic"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id={6}>
                    Select&nbsp;Status
                  </option>
                  <option value="HI">Pending</option>
                  <option value="CA">Completed</option>
                </select>
                <span
                  className="select2 select2-container select2-container--default"
                  dir="ltr"
                  data-select2-id={5}
                  style={{ width: "236.75px" }}
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
                        Select&nbsp;Status
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
            <div className="col-lg-3">
              <input
                type="date"
                id="bs-rangepicker-range"
                className="form-control"
              />
            </div>
          </div>
          <div className="card-datatable table-responsive pt-0">
            <Invoice_List_Table />
            <Pagination />
          </div>
        </div>
      </div>

      {/* ------------END INVOICE LIST----------- */}
    </>
  );
}
