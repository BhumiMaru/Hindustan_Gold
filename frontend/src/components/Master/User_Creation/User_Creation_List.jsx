import React, { useEffect, useState } from "react";
import SearchBar from "../../Common/SearchBar/SearchBar";
import User_Creation_Table from "./User_Creation_Table";
import Pagination from "../../Common/Pagination/Pagination";
import { Link } from "react-router-dom";
import CustomSelect from "../../Common/CustomSelect/CustomSelect";
import { useUserCreation } from "../../../Context/Master/UserCreationContext";

export default function User_Creation_List() {
  const [search, setSearch] = useState("");
  const { fetchUserCreationData } = useUserCreation();

  useEffect(() => {
    fetchUserCreationData(search);
  }, [search]);

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
                <SearchBar
                  placeholder="Search Users..."
                  value={search}
                  onChange={setSearch} // ✅ update state
                  onSubmit={(val) => setSearch(val)} // ✅ handle Enter key
                />
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
                  {/* <select
                    id="se"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="select3Basic"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <option value="AK" data-select2-id="2">
                      Select Role
                    </option>
                    <option value="HI">Manager</option>
                    <option value="CA">Plant Head</option>
                  </select> */}

                  <CustomSelect
                    id="selectRole"
                    label=""
                    options={[
                      { value: "Manager", label: "Manager" },
                      { value: "Plant Head", label: "Plant Head" },
                    ]}
                    // value={type}
                    // onChange={setType}
                    placeholder="Select Role"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="position-relative">
                  <CustomSelect
                    id="selectDepartment"
                    label=""
                    options={[
                      { value: "Manager", label: "Manager" },
                      { value: "Plant Head", label: "Plant Head" },
                    ]}
                    // value={type}
                    // onChange={setType}
                    placeholder="Select Department"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="position-relative">
                  <CustomSelect
                    id="selectZone"
                    label=""
                    options={[
                      { value: "Red", label: "Red" },
                      { value: "Green", label: "Green" },
                    ]}
                    // value={type}
                    // onChange={setType}
                    placeholder="Select Zone"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="position-relative">
                  <CustomSelect
                    id="selectStatus"
                    label=""
                    options={[
                      { value: "Active", label: "Active" },
                      { value: "Deactive", label: "Deactive" },
                    ]}
                    // value={type}
                    // onChange={setType}
                    placeholder="Select Status"
                    required
                  />
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
