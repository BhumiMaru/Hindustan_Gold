import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import { useZone } from "../../../../../Context/Master/ZoneContext";
import { useDepartment } from "../../../../../Context/Master/DepartmentContext";
import { useRoleMaster } from "../../../../../Context/Master/RoleMasterContext";
import SearchBar from "../../../../../components/Common/SearchBar/SearchBar";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import Pagination from "../../../../../components/Common/Pagination/Pagination";
import User_Creation_Table from "./User_Creation_Table";
import View_User_Details from "./View_User_Details";
import { useUIContext } from "../../../../../Context/UIContext";

export default function User_Creation_List() {
  const { modal } = useUIContext();
  const [search, setSearch] = useState("");
  const [roleId, setRoleId] = useState(null);
  const [deptId, setDeptId] = useState(null);
  const [zoneId, setZoneId] = useState(null);
  const [status, setStatus] = useState(null);

  const { fetchUserCreationData, pagination, setPagination } =
    useUserCreation();
  const { zoneFilter, fetchZoneFilter } = useZone();
  const { deptFilter, fetchDeptFilter } = useDepartment();
  const { filterRole, fetchRoleFilter } = useRoleMaster();

  // Fetch filters + user data
  useEffect(() => {
    fetchRoleFilter();
    fetchDeptFilter();
    fetchZoneFilter();
  }, []);

  // Fetch table data whenever filter/search changes
  useEffect(() => {
    fetchUserCreationData({
      search,
      role_id: roleId,
      department_id: deptId,
      zone_id: zoneId,
      status,
      page: pagination.currentPage,
      perPage: pagination.perPage,
    });
  }, [
    search,
    roleId,
    deptId,
    zoneId,
    status,
    pagination.currentPage,
    pagination.perPage,
  ]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleItemsPerPageChange = (size) => {
    setPagination((prev) => ({ ...prev, perPage: size, currentPage: 1 }));
  };

  // Create options with "All" option
  const roleOptions = [
    { value: "all", label: "All" },
    ...(filterRole?.map((role) => ({
      value: role.id,
      label: role.role_name,
    })) || []),
  ];

  // Create options with "All" option
  const deptOptions = [
    { value: "all", label: "All" },
    ...(deptFilter?.map((dept) => ({
      value: dept.id,
      label: dept.department_name,
    })) || []),
  ];

  // Create options with "All" option
  const zoneOptions = [
    { value: "all", label: "All" },
    ...(zoneFilter?.map((zone) => ({
      value: zone.id,
      label: zone.zone_name,
    })) || []),
  ];

  // Create options with "All" option
  // const roleOptions = [
  //   { value: "all", label: "All" },
  //   ...(filterRole?.map((role) => ({
  //     value: role.id,
  //     label: role.role_name,
  //   })) || []),
  // ];

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <div className="d-flex justify-content-between p-3">
            <div className="d-flex align-items-center">
              <SearchBar
                placeholder="Search Users..."
                value={search}
                onChange={setSearch}
                onSubmit={(val) => setSearch(val)}
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

          {/* Filters */}
          <div className="row px-3 mb-2">
            <div className="col-lg-3">
              <CustomSelect
                id="selectRole"
                options={roleOptions}
                value={roleId}
                onChange={(option) =>
                  setRoleId(option === "all" ? null : option)
                }
                placeholder="Select Role"
                styles={{
                  container: (base) => ({
                    ...base,
                    width: "250px",
                  }),
                }}
              />
            </div>
            <div className="col-lg-3">
              <CustomSelect
                id="selectDepartment"
                options={deptOptions}
                value={deptId}
                onChange={(option) =>
                  setDeptId(option === "all" ? null : option)
                }
                placeholder="Select Department"
                styles={{
                  container: (base) => ({
                    ...base,
                    width: "250px",
                  }),
                }}
              />
            </div>
            <div className="col-lg-3">
              <CustomSelect
                id="selectZone"
                options={zoneOptions}
                value={zoneId}
                onChange={(option) =>
                  setZoneId(option === "all" ? null : option)
                }
                placeholder="Select Zone"
                styles={{
                  container: (base) => ({
                    ...base,
                    width: "250px",
                  }),
                }}
              />
            </div>
            <div className="col-lg-3">
              <CustomSelect
                id="selectStatus"
                options={[
                  { value: 1, label: "Active" },
                  { value: 0, label: "Deactive" },
                ]}
                value={status}
                onChange={setStatus}
                placeholder="Select Status"
                styles={{
                  container: (base) => ({
                    ...base,
                    width: "250px",
                  }),
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="card-datatable table-responsive pt-0">
            <User_Creation_Table search={search} />
            <Pagination
              currentPage={pagination.currentPage}
              totalItems={pagination.total}
              itemsPerPage={pagination.perPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>
      {modal.viewUserDetails && (
        <>
          <View_User_Details />
        </>
      )}
    </>
  );
}
