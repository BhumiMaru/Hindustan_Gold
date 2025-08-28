import React from "react";
import SearchBar from "../../Common/SearchBar/SearchBar";
import Category_Master_Table from "./Category_Master_Table";
import Pagination from "../../Common/Pagination/Pagination";

export default function Category_Master_List() {
  return (
    <>
      {/* ---------------START CATEGORY MASTER LIST----------------- */}
      <>
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* DataTable with Buttons */}
          <div className="card">
            <div className="d-flex justify-content-between p-3">
              <div className="d-flex align-items-center ">
                {/*  <input type="search" className="form-control" placeholder="Search Categorys...">*/}
                <SearchBar />
              </div>
              <div className="d-flex gap-1">
                <div className="position-relative">
                  <select
                    id="select3Basic"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="select3Basic"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <option value="AK" data-select2-id="2">
                      Select Group
                    </option>
                    <option value="HI">Group</option>
                    <option value="CA">Group</option>
                    <option value="NV">Group</option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="1"
                    style={{ width: "149px" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabIndex="0"
                        aria-disabled="false"
                        aria-labelledby="select2-select3Basic-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-select3Basic-container"
                          role="textbox"
                          aria-readonly="true"
                          title="Select Group"
                        >
                          {/* Select Group */}
                        </span>
                        <span
                          className="select2-selection__arrow"
                          role="presentation"
                        >
                          <b role="presentation"></b>
                        </span>
                      </span>
                    </span>
                    <span
                      className="dropdown-wrapper"
                      aria-hidden="true"
                    ></span>
                  </span>
                </div>

                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  data-bs-toggle="modal"
                  data-bs-target="#smallModal"
                >
                  <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                  Add New Category
                </button>
              </div>
            </div>
            <div className="card-datatable table-responsive pt-0">
              <Category_Master_Table />
              <Pagination />
            </div>
          </div>
        </div>
      </>
      {/* ---------------END CATEGORY MASTER LIST----------------- */}
    </>
  );
}
