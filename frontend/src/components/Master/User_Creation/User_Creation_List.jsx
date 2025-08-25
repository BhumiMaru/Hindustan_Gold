import React from "react";
import SearchBar from "../../Common/SearchBar/SearchBar";
import User_Creation_Table from "./User_Creation_Table";
import Pagination from "../../Common/Pagination/Pagination";
import { Link } from "react-router-dom";

export default function User_Creation_List() {
  return (
    <>
      {/* ------------------START USER CREATION LIST------------------- */}
      <>
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* DataTable with Buttons */}
          <div className="card">
            <div className="d-flex justify-content-between p-3">
              <div className="d-flex align-items-center ">
                {/*  <input type="search" className="form-control" placeholder="Search Users...">*/}
                <SearchBar />
              </div>
              <div className="d-flex gap-1">
                <Link
                  to="/master/user-create"
                  className="btn btn-primary waves-effect waves-light"
                >
                  <span className="icon-xs icon-base ti tabler-plus me-2"></span>
                  Add New User
                </Link>
              </div>
            </div>
            <div className="row px-3 mb-2">
              <div className="col-lg-3">
                <div className="position-relative">
                  <select
                    id="select3Basic"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="select3Basic"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <option value="AK" data-select2-id="2">
                      Select Role
                    </option>
                    <option value="HI">Manager</option>
                    <option value="CA">Plant Head</option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="1"
                    style={{ width: "236.75px" }}
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
                          title="Select Role"
                        >
                          {/* Select Role */}
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
                    id="select4Basic"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="select4Basic"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <option value="AK" data-select2-id="4">
                      Select Department
                    </option>
                    <option value="HI">Finance</option>
                    <option value="CA">Marketing</option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="3"
                    style={{ width: "236.75px" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabindex="0"
                        aria-disabled="false"
                        aria-labelledby="select2-select4Basic-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-select4Basic-container"
                          role="textbox"
                          aria-readonly="true"
                          title="Select Department"
                        >
                          {/* Select Department */}
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
                    id="select14Basic"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="select14Basic"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <option value="AK" data-select2-id="6">
                      Select Zone
                    </option>
                    <option value="HI">Red</option>
                    <option value="CA">Green</option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="5"
                    style={{ width: "236.75px" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabindex="0"
                        aria-disabled="false"
                        aria-labelledby="select2-select14Basic-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-select14Basic-container"
                          role="textbox"
                          aria-readonly="true"
                          title="Select Zone"
                        >
                          {/* Select Zone */}
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
                    id="select5Basic"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="select5Basic"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <option value="AK" data-select2-id="8">
                      Select Status
                    </option>
                    <option value="HI">Active</option>
                    <option value="CA">Deactive</option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="7"
                    style={{ width: "236.75px" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabindex="0"
                        aria-disabled="false"
                        aria-labelledby="select2-select5Basic-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-select5Basic-container"
                          role="textbox"
                          aria-readonly="true"
                          title="Select Status"
                        >
                          {/* Select Status */}
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
              <User_Creation_Table />
              <Pagination />
            </div>
          </div>
        </div>
      </>
      {/* ------------------END USER CREATION LIST------------------- */}
    </>
  );
}
