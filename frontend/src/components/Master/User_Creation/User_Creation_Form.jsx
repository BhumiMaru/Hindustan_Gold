import React from "react";
import User_Creation_Permission from "./User_Creation_Permission";

export default function User_Creation_Form() {
  return (
    <>
      {/* ------------------START USER CREATION FORM------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card mt-3">
          <div className="row p-3">
            <div className="col-sm-3 mb-4">
              <label htmlFor="username" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter User Name"
              />
            </div>
            <div className="col-sm-3 mb-4">
              <label htmlFor="employid" className="form-label">
                Employee ID
              </label>
              <input
                type="text"
                className="form-control"
                id="employid"
                placeholder="Enter Employee ID"
              />
            </div>

            <div className="col-sm-3 mb-4">
              <label htmlFor="emailid" className="form-label">
                Email ID
              </label>
              <input
                type="text"
                className="form-control"
                id="emailid"
                placeholder="Enter Email ID"
              />
            </div>
            <div className="col-sm-3 mb-4">
              <label htmlFor="emailid" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="emailid"
                placeholder="Phone Number"
              />
            </div>
            <div className="col-sm-3 mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="password"
                placeholder="Enter password"
              />
            </div>
            <div className="col-sm-3 mb-4">
              <label htmlFor="Role" className="form-label">
                Role
              </label>
              <div className="position-relative">
                <select
                  id="Role"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="Role"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id="2">
                    Manager
                  </option>
                  <option value="HI">Stoer Manager</option>
                  <option value="HI">Plant Manager</option>
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
                      aria-labelledby="select2-Role-container"
                    >
                      <span
                        className="select2-selection__rendered"
                        id="select2-Role-container"
                        role="textbox"
                        aria-readonly="true"
                        title="Manager"
                      >
                        Manager
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
            </div>
            <div className="col-sm-3 mb-4">
              <label htmlFor="Department" className="form-label">
                Department
              </label>
              <div className="position-relative">
                <select
                  id="Department"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="Department"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id="4">
                    Department 1
                  </option>
                  <option value="HI">Department 2</option>
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
                      aria-labelledby="select2-Department-container"
                    >
                      <span
                        className="select2-selection__rendered"
                        id="select2-Department-container"
                        role="textbox"
                        aria-readonly="true"
                        title="Department 1"
                      >
                        Department 1
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
            </div>
            <div className="col-sm-3 mb-4">
              <label htmlFor="Zone" className="form-label">
                Zone
              </label>
              <div className="position-relative">
                <select
                  id="Zone"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="Zone"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id="6">
                    Zone 1
                  </option>
                  <option value="HI">Zone 2</option>
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
                      aria-labelledby="select2-Zone-container"
                    >
                      <span
                        className="select2-selection__rendered"
                        id="select2-Zone-container"
                        role="textbox"
                        aria-readonly="true"
                        title="Zone 1"
                      >
                        Zone 1
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
            </div>

            <div className="col-sm-3 mb-4">
              <label htmlFor="ServiceLocation" className="form-label">
                Service Location
              </label>
              <div className="position-relative">
                <select
                  id="ServiceLocation"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="ServiceLocation"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id="8">
                    Service Location 1
                  </option>
                  <option value="HI">Service Location 2</option>
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
                      aria-labelledby="select2-ServiceLocation-container"
                    >
                      <span
                        className="select2-selection__rendered"
                        id="select2-ServiceLocation-container"
                        role="textbox"
                        aria-readonly="true"
                        title="Service Location 1"
                      >
                        Service Location 1
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
            </div>

            <div className="col-sm-3 mb-4">
              <label htmlFor="Company" className="form-label">
                Company
              </label>
              <div className="position-relative">
                <select
                  id="Company"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="Company"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id="10">
                    Company 1
                  </option>
                  <option value="HI">Company 2</option>
                </select>
                <span
                  className="select2 select2-container select2-container--default"
                  dir="ltr"
                  data-select2-id="9"
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
                      aria-labelledby="select2-Company-container"
                    >
                      <span
                        className="select2-selection__rendered"
                        id="select2-Company-container"
                        role="textbox"
                        aria-readonly="true"
                        title="Company 1"
                      >
                        Company 1
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
            </div>

            <div className="col-sm-3 mb-4">
              <label htmlFor="ReportingManager1" className="form-label">
                Reporting Manager 1
              </label>
              <div className="position-relative">
                <select
                  id="ReportingManager1"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="ReportingManager1"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id="12">
                    User 1
                  </option>
                  <option value="HI">User 2</option>
                </select>
                <span
                  className="select2 select2-container select2-container--default"
                  dir="ltr"
                  data-select2-id="11"
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
                      aria-labelledby="select2-ReportingManager1-container"
                    >
                      <span
                        className="select2-selection__rendered"
                        id="select2-ReportingManager1-container"
                        role="textbox"
                        aria-readonly="true"
                        title="User 1"
                      >
                        User 1
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
            </div>
            <div className="col-sm-3 mb-4">
              <label htmlFor="ReportingManager2" className="form-label">
                Reporting Manager 2
              </label>
              <div className="position-relative">
                <select
                  id="ReportingManager2"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="ReportingManager2"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id="14">
                    User 1
                  </option>
                  <option value="HI">User 2</option>
                </select>
                <span
                  className="select2 select2-container select2-container--default"
                  dir="ltr"
                  data-select2-id="13"
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
                      aria-labelledby="select2-ReportingManager2-container"
                    >
                      <span
                        className="select2-selection__rendered"
                        id="select2-ReportingManager2-container"
                        role="textbox"
                        aria-readonly="true"
                        title="User 1"
                      >
                        User 1
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
            </div>
            <div className="col-sm-3 mb-4">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <div className="position-relative">
                <select
                  id="status"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="status"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id="16">
                    Active
                  </option>
                  <option value="HI">Deactive</option>
                </select>
                <span
                  className="select2 select2-container select2-container--default"
                  dir="ltr"
                  data-select2-id="15"
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
                      aria-labelledby="select2-status-container"
                    >
                      <span
                        className="select2-selection__rendered"
                        id="select2-status-container"
                        role="textbox"
                        aria-readonly="true"
                        title="Active"
                      >
                        Active
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
            </div>
            <div className="col-sm-3 mb-4">
              <label htmlFor="status" className="form-label">
                Upload Photo
              </label>
              <input
                type="file"
                className="form-control"
                id="employid"
                placeholder="Enter Employee ID"
              />
            </div>
            <div className="col-lg-12 text-end">
              <button className="btn btn-primary waves-effect waves-light">
                Save
              </button>
            </div>
          </div>
        </div>
        <h3 className="mt-4">User Permissions</h3>
        <User_Creation_Permission />
      </div>
      {/* ------------------END USER CREATION FORM------------------- */}
    </>
  );
}
