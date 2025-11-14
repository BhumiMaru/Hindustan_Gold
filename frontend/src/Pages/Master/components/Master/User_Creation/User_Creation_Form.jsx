import React, { useEffect } from "react";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import { useCompanyMaster } from "../../../../../Context/Master/CompanyMasterContext";
import { useRoleMaster } from "../../../../../Context/Master/RoleMasterContext";
import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";
import { useServiceLocation2Master } from "../../../../../Context/Master/ServiceLocation2MasterContext";
import { useServiceLocation3Master } from "../../../../../Context/Master/ServiceLocation3MasterContext";
import { useZone } from "../../../../../Context/Master/ZoneContext";
import { useDepartment } from "../../../../../Context/Master/DepartmentContext";
import User_Creation_Permission from "./User_Creation_Permission";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const fileUrl = import.meta.env.VITE_FILE_URL;

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
    btnLoading,
  } = useUserCreation();
  const { fetchRoleFilter, filterRole } = useRoleMaster();
  const { fetchCompanyFilter, companyFilter } = useCompanyMaster();
  const { serviceL1, fetchSL1Filter, fetchServiceLocations, serviceLocation } =
    useServiceLocation1Master();
  const {
    serviceL2,
    fetchSL2Filter,
    fetchServiceLocations2,
    serviceLocation2,
  } = useServiceLocation2Master();
  const {
    serviceL3,
    fetchSL3Filter,
    fetchServiceLocations3,
    serviceLocation3,
  } = useServiceLocation3Master();
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
    // fetchSL1Filter();
    // fetchSL2Filter();
    // fetchSL3Filter();
    fetchServiceLocations();
    fetchServiceLocations2();
    fetchServiceLocations3();
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
        // console.log("before id", id, "payload", payload);
        await updateUser(id, payload);
        // resetUserData();
        // setIsEditUserId(null);
      } else {
        // console.log("before payload", payload);
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

  // Save Data
  // const handleSave = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData();

  //     Object.entries(useCreationData).forEach(([key, value]) => {
  //       if (key === "profile_photo") {
  //         if (value instanceof File) {
  //           formData.append("profile_photo", value); // ✅ new file
  //         }
  //       } else {
  //         formData.append(key, value ?? "");
  //       }
  //     });

  //     // Always append existing filename for backend to retain old file
  //     if (useCreationData.existing_profile_photo) {
  //       formData.append(
  //         "existing_profile_photo",
  //         useCreationData.existing_profile_photo
  //       );
  //     }

  //     const payload = {
  //       ...useCreationData,
  //       formData,
  //     };

  //     if (id) {
  //       await updateUser(id, payload);
  //     } else {
  //       const newUser = await createUser(payload);
  //       if (newUser?.id) {
  //         navigate(`/super_admin/master/user-create/${newUser.id}`);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Save error:", error);
  //   }
  // };

  return (
    <>
      {/* ------------------START USER CREATION FORM------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card mt-3">
          <div className="row p-3">
            <div className="col-sm-3 mb-4">
              <label htmlFor="username" className="form-label">
                User Name <span className="text-danger">*</span>
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
                required
              />
            </div>
            <div className="col-sm-3 mb-4">
              <label htmlFor="employid" className="form-label">
                Employee ID <span className="text-danger">*</span>
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
                required
              />
            </div>

            <div className="col-sm-3 mb-4">
              <label htmlFor="emailid" className="form-label">
                Email ID <span className="text-danger">*</span>
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
                required
              />
            </div>
            <div className="col-sm-3 mb-4">
              <label htmlFor="phoneid" className="form-label">
                Phone Number <span className="text-danger">*</span>
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
                required
              />
            </div>
            <div className="col-sm-3 mb-4">
              <label htmlFor="password" className="form-label">
                Password <span className="text-danger">*</span>
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
                required
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
                  isTextRequired
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
                  isTextRequired
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
                  isTextRequired
                />
              </div>
            </div>

            {/* Service Location 1 */}
            <div className="col-sm-3 mb-4">
              <CustomSelect
                id="selectServiceLocation1"
                label="Service Location 1"
                options={serviceLocation.map((sl1) => ({
                  value: sl1.id,
                  label: sl1.service_location_name,
                }))}
                value={useCreationData?.service_location_1_id || ""}
                onChange={(selected) => {
                  setUserCreationData({
                    ...useCreationData,
                    service_location_1_id: selected,
                    service_location_2_id: "",
                    service_location_3_id: "",
                  });
                  fetchServiceLocations2({ serviceLocation1Id: selected });
                }}
                placeholder="Select Service Location 1"
                required
                isTextRequired
              />
            </div>

            {/* Service Location 2 */}
            <div className="col-sm-3 mb-4">
              <CustomSelect
                id="selectServiceLocation2"
                label="Service Location 2"
                options={
                  serviceLocation2
                    ?.filter((sl2) => {
                      // console.log("sl2", typeof sl2.service_location_1_id);
                      // console.log(
                      //   "useCreationData?.service_location_1_id",
                      //   typeof useCreationData?.service_location_1_id
                      // );
                      // console.log(
                      //   "bb",
                      //   sl2.service_location_1_id ===
                      //     useCreationData?.service_location_1_id
                      // );
                      return (
                        sl2.service_location_1_id ==
                        useCreationData?.service_location_1_id
                      );
                    })
                    .map((sl2) => ({
                      value: sl2.id,
                      label: sl2.service_location_2_name,
                    })) || []
                }
                value={useCreationData?.service_location_2_id || ""}
                onChange={(selected) => {
                  setUserCreationData({
                    ...useCreationData,
                    service_location_2_id: selected,
                    service_location_3_id: "",
                  });
                  fetchServiceLocations3({
                    serviceLocation1Id: useCreationData?.service_location_1_id,
                    serviceLocation2Id: selected,
                  });
                }}
                placeholder="Select Service Location 2"
                required
                disabled={!useCreationData?.service_location_1_id}
                isTextRequired
              />
            </div>

            {/* Service Location 3 */}
            <div className="col-sm-3 mb-4">
              <CustomSelect
                id="selectServiceLocation3"
                label="Service Location 3"
                options={
                  serviceLocation3
                    ?.filter((sl3) => {
                      // Compare numbers to numbers
                      // console.log("sl1", typeof sl3.service_location_1_id);
                      // console.log("sl2", typeof sl3.service_location_2_id);
                      return (
                        sl3.service_location_1_id ==
                          Number(useCreationData?.service_location_1_id) &&
                        sl3.service_location_2_id ==
                          Number(useCreationData?.service_location_2_id)
                      );
                    })
                    .map((sl3) => ({
                      value: sl3.id,
                      label: sl3.service_location_3_name,
                    })) || []
                }
                value={useCreationData?.service_location_3_id || ""}
                onChange={(selected) => {
                  setUserCreationData({
                    ...useCreationData,
                    service_location_3_id: selected, // ✅ set SL3, not SL2
                  });

                  fetchServiceLocations3(
                    "",
                    Number(useCreationData?.service_location_1_id), // ensure number
                    Number(useCreationData?.service_location_2_id) // ensure number
                  );
                }}
                placeholder="Select Service Location 3"
                required
                disabled={!useCreationData?.service_location_2_id}
                isTextRequired
              />
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
                  isTextRequired
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
                  placeholder="Select Reporting Manager 1"
                  // data-select2-id="10"
                  required
                  isTextRequired
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
                  placeholder="Select Reporting Manager 2"
                  // data-select2-id="10"
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
                  isTextRequired
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
                name="profile_photo"
                // value={useCreationData?.profile_photo}
                placeholder="Enter Employee ID"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setUserCreationData((prev) => ({
                      ...prev,
                      profile_photo: file, // single file object
                    }));

                    // setUserCreationData({
                    //   ...useCreationData,
                    //   profile_photo: e.target.files[0], // ✅ file object
                    // });
                  }
                }}
              />
              {/* {console.log("useCreationData", useCreationData)}
              <span>File: {useCreationData?.profile_photo}</span> */}
              {/* {console.log(
                "useCreationData?.profile_photo",
                useCreationData?.profile_photo
              )} */}
              {id ? (
                useCreationData?.profile_photo ? (
                  <Link
                    to={`${fileUrl}/storage/users/${useCreationData?.profile_photo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`${publicUrl}assets/img/icons/misc/doc.png`}
                      alt="Document"
                      width={15}
                      className="me-2"
                    />
                    <span className="h6 mb-0 text-info">
                      {/* {invoiceDetail.invoice_file} */}
                      View
                    </span>
                    {console.log(
                      `${fileUrl}/storage/users/${useCreationData?.profile_photo}`
                    )}
                  </Link>
                ) : (
                  <div className="d-flex align-items-center text-muted">
                    {/* <img
                    src={`${publicUrl}assets/img/icons/misc/no-file.png`}
                    alt="No file"
                    width={15}
                    className="me-2 opacity-75"
                  /> */}

                    <span className="h6 mb-0">No file uploaded</span>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-12 text-end">
              <button
                className="btn btn-primary waves-effect waves-light"
                onClick={handleSave}
                disabled={btnLoading}
              >
                {btnLoading && (
                  <div
                    className="spinner-border spinner-white me-2"
                    role="status"
                  ></div>
                )}
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
