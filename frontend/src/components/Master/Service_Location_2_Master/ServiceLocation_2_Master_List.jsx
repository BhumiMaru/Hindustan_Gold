import React from "react";
import SearchBar from "../../Common/SearchBar/SearchBar";
import Pagination from "../../Common/Pagination/Pagination";
import ServiceLocation_2_Master_Table from "./ServiceLocation_2_Master_Table";

export default function ServiceLocation_2_Master_List() {
  return (
    <>
      {/* -----------------START SERVICE LOCATION 2 MASTER List-------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center ">
              {/*  <input type="search" className="form-control" placeholder="Search Service Location 2s...">*/}
              <SearchBar />
            </div>
            <div className="d-flex gap-1">
              <div className="position-relative">
                <select
                  id="select3Basic"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="select3Basic"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id="2">
                    Service Location 1
                  </option>
                  <option value="HI">Service Location 1</option>
                  <option value="CA">Service Location 1</option>
                  <option value="NV">Service Location 1</option>
                </select>
                <span
                  className="select2 select2-container select2-container--default"
                  dir="ltr"
                  data-select2-id="1"
                  style={{ width: "183px" }}
                >
                  <span className="selection">
                    <span
                      className="select2-selection select2-selection--single"
                      role="combobox"
                      aria-haspopup="true"
                      aria-expanded="false"
                      tabindex="0"
                      aria-disabled="false"
                      aria-labelledby="select2-select3Basic-container"
                    >
                      <span
                        className="select2-selection__rendered"
                        id="select2-select3Basic-container"
                        role="textbox"
                        aria-readonly="true"
                        title="Service Location 1"
                      >
                        {/* Service Location 1 */}
                      </span>
                      <span
                        className="select2-selection__arrow"
                        role="presentation"
                      >
                        <b role="presentation"></b>
                      </span>
                    </span>
                  </span>
                  <span className="dropdown-wrapper" aria-hidden="true"></span>
                </span>
              </div>

              <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
                data-bs-toggle="modal"
                data-bs-target="#smallModal"
              >
                <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                Add New Service Location 2
              </button>
            </div>
          </div>
          <div className="card-datatable table-responsive pt-0">
            <ServiceLocation_2_Master_Table />
            <Pagination />
          </div>
        </div>
      </div>
      {/* -----------------END SERVICE LOCATION 2 MASTER List-------------------- */}
    </>
  );
}
