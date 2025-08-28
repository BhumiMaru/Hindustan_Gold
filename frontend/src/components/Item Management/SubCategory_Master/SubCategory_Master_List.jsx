import React from "react";
import SearchBar from "../../Common/SearchBar/SearchBar";
import Category_Master_Table from "./SubCategory_Master_Table";
import Pagination from "../../Common/Pagination/Pagination";
import SubCategory_Master_Table from "./SubCategory_Master_Table";

export default function SubCategory_Master_List() {
  return (
    <>
      {/* ---------------START CATEGORY MASTER LIST----------------- */}
      <>
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* DataTable with Buttons */}
          <div className="card">
            <div className="d-flex justify-content-between p-3">
              <div className="d-flex align-items-center ">
                {/*  <input type="search" className="form-control" placeholder="Search Subcategorys...">*/}
                <SearchBar />
              </div>
              <div className="d-flex gap-1">
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  data-bs-toggle="modal"
                  data-bs-target="#smallModal"
                >
                  <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                  Add New Subcategory
                </button>
              </div>
            </div>
            <div className="row px-3 pb-3">
              <div className="col-lg-3">
                <div className="position-relative">
                  <select
                    id="select6Basic"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="select6Basic"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <option value="AK" data-select2-id="2">
                      Select Type
                    </option>
                    <option value="HI">Material</option>
                    <option value="CA">Service</option>
                    <option value="NV">Asset</option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="1"
                    style={{ width: "240.5px" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabIndex="0"
                        aria-disabled="false"
                        aria-labelledby="select2-select6Basic-container"
                      >
                        {/* <span
                          className="select2-selection__rendered"
                          id="select2-select6Basic-container"
                          role="textbox"
                          aria-readonly="true"
                          title="Select Type"
                        >
                          Select Type
                        </span> */}
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
              </div>
              <div className="col-lg-3">
                <div className="position-relative">
                  <select
                    id="select7Basic"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="select7Basic"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <option value="AK" data-select2-id="4">
                      Select&nbsp;Grop
                    </option>
                    <option value="HI">Grop</option>
                    <option value="CA">Grop</option>
                    <option value="NV">Grop</option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="3"
                    style={{ width: "240.5px" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabIndex="0"
                        aria-disabled="false"
                        aria-labelledby="select2-select7Basic-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-select7Basic-container"
                          role="textbox"
                          aria-readonly="true"
                          title="Select&nbsp;Grop"
                        >
                          {/* Select&nbsp;Grop */}
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
              </div>
              <div className="col-lg-3">
                <div className="position-relative">
                  <select
                    id="select8Basic"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="select8Basic"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <option value="AK" data-select2-id="6">
                      Select&nbsp;Category
                    </option>
                    <option value="HI">Category</option>
                    <option value="CA">Category</option>
                    <option value="NV">Category</option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="5"
                    style={{ width: "240.5px" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabIndex="0"
                        aria-disabled="false"
                        aria-labelledby="select2-select8Basic-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-select8Basic-container"
                          role="textbox"
                          aria-readonly="true"
                          title="Select&nbsp;Category"
                        >
                          {/* Select&nbsp;Category */}
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
              </div>
              <div className="col-lg-3">
                <div className="position-relative">
                  <select
                    id="select8info1"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="select8info1"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <option value="1" data-select2-id="8">
                      Select Categary Owner
                    </option>
                    <option value="2">Option2</option>
                    <option value="3">Option3</option>
                    <option value="4">Option4</option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="7"
                    style={{ width: "240.5px" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabIndex="0"
                        aria-disabled="false"
                        aria-labelledby="select2-select8info1-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-select8info1-container"
                          role="textbox"
                          aria-readonly="true"
                          title="Select Categary Owner"
                        >
                          {/* Select Categary Owner */}
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
              </div>
            </div>

            <div className="card-datatable table-responsive pt-0">
              <SubCategory_Master_Table />
              <Pagination />
            </div>
          </div>
        </div>
      </>
      {/* ---------------END CATEGORY MASTER LIST----------------- */}
    </>
  );
}
