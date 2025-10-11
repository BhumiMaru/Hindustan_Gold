import React, { useEffect } from "react";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import { useNavigate, useParams } from "react-router-dom";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import { useCompanyMaster } from "../../../../../Context/Master/CompanyMasterContext";
import { useRoleMaster } from "../../../../../Context/Master/RoleMasterContext";
import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";
import { useServiceLocation2Master } from "../../../../../Context/Master/ServiceLocation2MasterContext";
import { useServiceLocation3Master } from "../../../../../Context/Master/ServiceLocation3MasterContext";
import { useZone } from "../../../../../Context/Master/ZoneContext";
import { useDepartment } from "../../../../../Context/Master/DepartmentContext";
import User_Creation_Permission from "./User_Creation_Permission";

export default function User_Creation_Form() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    createUser,
    updateUser,
    isEditUserId,
    useCreationData,
    setUserCreationData,
    fetchUserFilter,
    filterUser,
    resetUserData,
    setIsEditUserId,
    fetchUserById,
  } = useUserCreation();
  const { fetchRoleFilter, filterRole } = useRoleMaster();
  const { fetchCompanyFilter, companyFilter } = useCompanyMaster();
  const { serviceL1, fetchSL1Filter } = useServiceLocation1Master();
  const { serviceL2, fetchSL2Filter } = useServiceLocation2Master();
  const { serviceL3, fetchSL3Filter } = useServiceLocation3Master();
  const { zoneFilter, fetchZoneFilter } = useZone();
  const { deptFilter, fetchDeptFilter } = useDepartment();
  // console.log("id", id);

  useEffect(() => {
    if (id) {
      // set edit id in context
      // console.log("id1", id);
      setIsEditUserId(id);
      fetchUserById(id);
    } else {
      // reset if no id in route
      setIsEditUserId(null);
      resetUserData();
    }
  }, [id]);

  useEffect(() => {
    fetchSL1Filter();
    fetchSL2Filter();
    fetchSL3Filter();
    fetchCompanyFilter();
    fetchDeptFilter();
    fetchZoneFilter();
    fetchUserFilter();
    fetchRoleFilter();
  }, []);

  // Save Data
  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...useCreationData };

    try {
      if (id) {
        console.log("before id", id, "payload", payload);
        await updateUser(id, payload);
        // resetUserData();
        // setIsEditUserId(null);
      } else {
        console.log("before payload", payload);
        const newUser = await createUser(payload); // ✅ get response
        if (newUser?.id) {
          navigate(`/super_admin/master/user-create/${newUser.id}`); // ✅ use real id
        }
      }

      console.log("submitting form", payload);
    } catch (error) {
      console.log(error);
    }
  };

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
                value={useCreationData?.name || ""}
                onChange={(e) =>
                  setUserCreationData({
                    ...useCreationData,
                    name: e.target.value,
                  })
                }
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
                value={useCreationData?.employee_id || ""}
                onChange={(e) =>
                  setUserCreationData({
                    ...useCreationData,
                    employee_id: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-sm-3 mb-4">
              <label htmlFor="emailid" className="form-label">
                Email ID
              </label>
              <input
                type="email"
                className="form-control"
                id="emailid"
                placeholder="Enter Email ID"
                value={useCreationData?.email || ""}
                onChange={(e) =>
                  setUserCreationData({
                    ...useCreationData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-sm-3 mb-4">
              <label htmlFor="phoneid" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneid"
                placeholder="Phone Number"
                value={useCreationData?.mobileno || ""}
                onChange={(e) =>
                  setUserCreationData({
                    ...useCreationData,
                    mobileno: e.target.value,
                  })
                }
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
                value={useCreationData?.password || ""}
                onChange={(e) =>
                  setUserCreationData({
                    ...useCreationData,
                    password: e.target.value,
                  })
                }
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
                  options={filterRole.map((roleFilter) => ({
                    value: roleFilter.id,
                    label: roleFilter.role_name,
                  }))}
                  placeholder="Select Role"
                  required
                  value={useCreationData?.role_id}
                  onChange={(selected) =>
                    setUserCreationData({
                      ...useCreationData,
                      role_id: Number(selected),
                    })
                  }
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
            <div className="col-sm-3 mb-4">
              {/* <label htmlFor="Zone" className="form-label">
                Zone
              </label> */}
              <div className="position-relative">
                <CustomSelect
                  id="selectZone"
                  label="Zone"
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

            {/* Service Location 1 */}
            <div className="col-sm-3 mb-4">
              <div className="position-relative">
                <CustomSelect
                  id="selectServiceLocation"
                  label="Service Location 1"
                  options={serviceL1.map((sl1) => {
                    return {
                      value: sl1.id,
                      label: sl1.service_location_name,
                    };
                  })}
                  value={useCreationData?.service_location_1_id}
                  onChange={(selected) => {
                    setUserCreationData({
                      ...useCreationData,
                      service_location_1_id: selected,
                    });
                  }}
                  placeholder="Select Service Location"
                  required
                />
              </div>
            </div>

            {/* Service Location 2 */}
            <div className="col-sm-3 mb-4">
              <div className="position-relative">
                <CustomSelect
                  id="selectServiceLocation2"
                  label="Service Location 2"
                  options={serviceL2.map((sl2) => ({
                    value: sl2.id,
                    label: sl2.service_location_2_name,
                  }))}
                  value={useCreationData?.service_location_2_id}
                  onChange={(selected) =>
                    setUserCreationData({
                      ...useCreationData,
                      service_location_2_id: selected,
                    })
                  }
                  placeholder="Select Service Location"
                  required
                />
              </div>
            </div>

            {/* Service Location 3 */}
            <div className="col-sm-3 mb-4">
              <div className="position-relative">
                <CustomSelect
                  id="selectServiceLocation3"
                  label="Service Location 3"
                  options={serviceL3.map((sl3) => ({
                    value: sl3.id,
                    label: sl3.service_location_3_name,
                  }))}
                  value={useCreationData?.service_location_3_id}
                  onChange={(selected) =>
                    setUserCreationData({
                      ...useCreationData,
                      service_location_3_id: selected,
                    })
                  }
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
                  options={companyFilter?.map((company) => ({
                    value: company.id,
                    label: company.company_name,
                  }))}
                  value={useCreationData?.company_id}
                  onChange={(selected) =>
                    setUserCreationData({
                      ...useCreationData,
                      company_id: Number(selected),
                    })
                  }
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
                  options={filterUser.map((user) => ({
                    value: user.id,
                    label: user.name,
                  }))}
                  value={useCreationData?.reporting_manager_1_id}
                  onChange={(selected) =>
                    setUserCreationData({
                      ...useCreationData,
                      reporting_manager_1_id: selected,
                    })
                  }
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
                  options={filterUser.map((user) => ({
                    value: user.id,
                    label: user.name,
                  }))}
                  value={useCreationData?.reporting_manager_2_id}
                  onChange={(selected) =>
                    setUserCreationData({
                      ...useCreationData,
                      reporting_manager_2_id: selected,
                    })
                  }
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
                      value: 1,
                      label: "Active",
                    },
                    {
                      value: 0,
                      label: "Deactive",
                    },
                  ]}
                  value={useCreationData?.status}
                  onChange={(selected) =>
                    setUserCreationData({
                      ...useCreationData,
                      status: selected,
                    })
                  }
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
                id="uploadid"
                placeholder="Enter Employee ID"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setUserCreationData({
                      ...useCreationData,
                      profile_photo_url: e.target.files[0], // ✅ file object
                    });
                  }
                }}
              />
            </div>
            <div className="col-lg-12 text-end">
              <button
                className="btn btn-primary waves-effect waves-light"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        {id && (
          <>
            <h3 className="mt-4">User Permissions</h3>
            <User_Creation_Permission />
          </>
        )}
      </div>

      {/* ------------------END USER CREATION FORM------------------- */}
    </>
  );
}
