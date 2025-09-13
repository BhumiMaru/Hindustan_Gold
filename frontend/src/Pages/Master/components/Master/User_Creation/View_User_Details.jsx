import React from "react";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import { useUIContext } from "../../../../../Context/UIContext";

export default function View_User_Details() {
  const { handleClose } = useUIContext();
  const { useCreationData } = useUserCreation();
  return (
    <>
      {/* ----------START VIEW USER DETAILS-------- */}
      <div
        className="modal fade show"
        id="smallModal"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        style={{ display: "block", paddingLeft: 0 }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose("viewUserDetails")}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <h5 className="modal-title mb-3" id="exampleModalLabel2">
                    View Detail
                  </h5>
                  <div className="row">
                    <div className="col-lg-4">
                      <label className="form-label">User Name</label>
                      <p>{useCreationData.name} </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Employe ID</label>
                      <p>{useCreationData.employee_id}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Email ID</label>
                      <p>{useCreationData.email}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Phone Number</label>
                      <p>{useCreationData.email}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Role</label>
                      <p>{useCreationData?.role.role_name} </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Department</label>
                      <p>{useCreationData?.department.department_name} </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Zone</label>
                      <p>{useCreationData?.zone.zone_name} </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Service Location 1</label>
                      <p>
                        {
                          useCreationData?.servicelocation1
                            ?.service_location_name
                        }
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Service Location 2</label>
                      <p>
                        {" "}
                        {
                          useCreationData?.servicelocation2
                            ?.service_location_2_name
                        }{" "}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Service Location 3</label>
                      <p>
                        {" "}
                        {
                          useCreationData?.servicelocation3
                            ?.service_location_3_name
                        }{" "}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Company</label>
                      <p>{useCreationData.type} </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Reporting Manager 1</label>
                      <p> {useCreationData?.reportingmanager1.name} </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Reporting Manager 2</label>
                      <p> {useCreationData?.reportingmanager2.name}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Registration Date</label>
                      <p>{useCreationData.register_date} </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Status</label>
                      <p>
                        {useCreationData.status === 1 ? "Active" : "Deactive"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* ----------END VIEW USER DETAILS-------- */}
    </>
  );
}
