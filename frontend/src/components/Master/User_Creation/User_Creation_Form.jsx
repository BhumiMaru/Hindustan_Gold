import React from "react";
import User_Creation_Permission from "./User_Creation_Permission";
import CustomSelect from "../../Common/CustomSelect/CustomSelect";

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
              {/* <label htmlFor="Role" className="form-label">
                Role
              </label> */}
              <div className="position-relative">
                <CustomSelect
                  id="selectRole"
                  label="Role"
                  options={[
                    { value: "Manager", label: "Manager" },
                    { value: "Stoer Manager", label: "Stoer Manager" },
                    { value: "Plant Head", label: "Plant Head" },
                  ]}
                  // value={type}
                  // onChange={setType}
                  placeholder="Select Role"
                  required
                />
              </div>
            </div>
            <div className="col-sm-3 mb-4">
              {/* <label htmlFor="Department" className="form-label">
                Department
              </label> */}
              <div className="position-relative">
                <CustomSelect
                  id="selectDepartment"
                  label="Department"
                  options={[
                    { value: "Department 1", label: "Department 1" },
                    { value: "Department 2", label: "Department 2" },
                  ]}
                  // value={type}
                  // onChange={setType}
                  placeholder="Select Department"
                  required
                />
              </div>
            </div>
            <div className="col-sm-3 mb-4">
              {/* <label htmlFor="Zone" className="form-label">
                Zone
              </label> */}
              <div className="position-relative">
                <CustomSelect
                  id="selectZone"
                  label="Zone"
                  options={[
                    { value: "Zone 1", label: "Zone 1" },
                    { value: "Zone 2", label: "Zone 2" },
                  ]}
                  // value={type}
                  // onChange={setType}
                  placeholder="Select Zone"
                  required
                />
              </div>
            </div>

            <div className="col-sm-3 mb-4">
              {/* <label htmlFor="ServiceLocation" className="form-label">
                Service Location
              </label> */}
              <div className="position-relative">
                {/* <select
                  id="ServiceLocation"
                  className="select2 form-select select2-hidden-accessible"
                  data-select2-id="ServiceLocation"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <option value="AK" data-select2-id="8">
                    Service Location 1
                  </option>
                  <option value="HI">Service Location 2</option>
                </select> */}
                <CustomSelect
                  id="selectServiceLocation"
                  label="Service Location"
                  options={[
                    {
                      value: "Service Location 1",
                      label: "Service Location 1",
                    },
                    {
                      value: "Service Location 2",
                      label: "Service Location 2",
                    },
                  ]}
                  // value={type}
                  // onChange={setType}
                  placeholder="Select Service Location"
                  required
                />
              </div>
            </div>

            <div className="col-sm-3 mb-4">
              {/* <label htmlFor="Company" className="form-label">
                Company
              </label> */}
              <div className="position-relative">
                <CustomSelect
                  id="selectCompany"
                  label="Company"
                  options={[
                    {
                      value: "Company 1",
                      label: "Company 1",
                    },
                    {
                      value: "Company 2",
                      label: "Company 2",
                    },
                  ]}
                  // value={type}
                  // onChange={setType}
                  placeholder="Select Company"
                  // data-select2-id="10"
                  required
                />
              </div>
            </div>

            <div className="col-sm-3 mb-4">
              {/* <label htmlFor="ReportingManager1" className="form-label">
                Reporting Manager 1
              </label> */}
              <div className="position-relative">
                <CustomSelect
                  id="selectReportingManager1"
                  label="Reporting Manager 1"
                  options={[
                    {
                      value: "User 1",
                      label: "User 1",
                    },
                    {
                      value: "User 2",
                      label: "User 2",
                    },
                  ]}
                  // value={type}
                  // onChange={setType}
                  placeholder="Select User"
                  // data-select2-id="10"
                  required
                />
              </div>
            </div>
            <div className="col-sm-3 mb-4">
              {/* <label htmlFor="ReportingManager2" className="form-label">
                Reporting Manager 2
              </label> */}
              <div className="position-relative">
                <CustomSelect
                  id="selectReportingManager2"
                  label="Reporting Manager 2"
                  options={[
                    {
                      value: "User 1",
                      label: "User 1",
                    },
                    {
                      value: "User 2",
                      label: "User 2",
                    },
                  ]}
                  // value={type}
                  // onChange={setType}
                  placeholder="Select User"
                  // data-select2-id="10"
                  required
                />
              </div>
            </div>
            <div className="col-sm-3 mb-4">
              <div className="position-relative">
                <CustomSelect
                  id="selectStatus"
                  label="Status"
                  options={[
                    {
                      value: "Active",
                      label: "Active",
                    },
                    {
                      value: "Deactive",
                      label: "Deactive",
                    },
                  ]}
                  // value={type}
                  // onChange={setType}
                  placeholder="Select Status"
                  // data-select2-id="10"
                  required
                />
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
