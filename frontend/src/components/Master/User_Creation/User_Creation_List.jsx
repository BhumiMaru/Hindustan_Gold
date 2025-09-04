import React, { useEffect, useState } from "react";
import SearchBar from "../../Common/SearchBar/SearchBar";
import User_Creation_Table from "./User_Creation_Table";
import Pagination from "../../Common/Pagination/Pagination";
import { Link } from "react-router-dom";
import CustomSelect from "../../Common/CustomSelect/CustomSelect";
import { useUserCreation } from "../../../Context/Master/UserCreationContext";
import { useDepartment } from "../../../Context/Master/DepartmentContext";
import { useZone } from "../../../Context/Master/ZoneContext";
import { useRoleMaster } from "../../../Context/Master/RoleMasterContext";

export default function User_Creation_List() {
  const [search, setSearch] = useState("");
  const { fetchUserCreationData, setUserCreationData, useCreationData } =
    useUserCreation();
  const { zoneFilter, fetchZoneFilter } = useZone();
  const { deptFilter, fetchDeptFilter } = useDepartment();
  const { filterRole, fetchRoleFilter } = useRoleMaster();

  useEffect(() => {
    fetchRoleFilter();
    fetchDeptFilter();
    fetchZoneFilter();
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
                    options={filterRole.map((role) => ({
                      value: role.id,
                      label: role.role_name,
                    }))}
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
                    options={deptFilter.map((dept) => ({
                      value: dept.id,
                      label: dept.department_name,
                    }))}
                    value={useCreationData?.department_id}
                    onChange={(selected) =>
                      setUserCreationData({
                        ...useCreationData,
                        department_id: selected,
                      })
                    }
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
                    options={zoneFilter.map((zone) => ({
                      value: zone.id,
                      label: zone.zone_name,
                    }))}
                    value={useCreationData?.zone_id}
                    onChange={(selected) =>
                      setUserCreationData({
                        ...useCreationData,
                        zone_id: selected,
                      })
                    }
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
                      { value: 1, label: "Active" },
                      { value: 0, label: "Deactive" },
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
              <User_Creation_Table search={search} />
              <Pagination />
            </div>
          </div>
        </div>
      </>
      {/* ------------------END USER CREATION LIST------------------- */}
    </>
  );
}
