import React from "react";
import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";
import { useUIContext } from "../../../../../Context/UIContext";

export default function View_Item_Request_Details() {
  const { handleClose } = useUIContext();
  const { itemRequestData } = useItemRequest();
  console.log("itemRequestData", itemRequestData);
  return (
    <>
      {/* ---------------------START VIEW ITEM REQUEST DETAILS----------------------- */}
      <div
        className="modal fade show"
        id="smallModal"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        style={{ display: "block", paddingLeft: 0 }}
      >
        <div
          className="modal-dialog modal-xl modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose("viewItemRequest")}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-7">
                  <h5 className="modal-title mb-3" id="exampleModalLabel2">
                    View Detail
                  </h5>
                  <div className="row">
                    <div className="col-lg-4">
                      <label className="form-label">Request&nbsp;ID</label>
                      <p>{itemRequestData?.item_request_id} </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Date</label>
                      <p>{itemRequestData?.item_request?.created_at}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Item&nbsp;Type</label>
                      <p>{itemRequestData?.item_request?.item_type}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Item&nbsp;Name</label>
                      <p>
                        {itemRequestData?.item_request?.item_master?.item_name}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Category</label>
                      <p> {itemRequestData?.item_request?.item_master?.c_id}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Subcategory</label>
                      <p>{itemRequestData?.item_request?.sub_c_id}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Item Code </label>
                      <p>{itemRequestData?.item_request?.item_code}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Service Location </label>
                      <p>
                        {itemRequestData?.item_request?.service_location_3_id}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Purpose </label>
                      <p>{itemRequestData?.item_request?.purpose}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">
                        Request&nbsp;Person&nbsp;Name
                      </label>
                      <p>{itemRequestData?.item_request?.request_user_id}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Quantity</label>
                      <p>{itemRequestData?.item_request?.quantity}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">UOM</label>
                      <p>{itemRequestData?.item_request?.uom}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Unit&nbsp;Price</label>
                      <p>{itemRequestData?.item_request?.unit_price}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Total&nbsp;Amount</label>
                      <p>{itemRequestData?.item_request?.total_amount}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Total&nbsp;Status</label>
                      <p>
                        <span className="badge bg-label-warning">
                          {itemRequestData?.item_request?.final_approve_status}
                        </span>
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Remarks</label>
                      <p>{itemRequestData?.item_request?.remarks}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Receiving Person</label>
                      <p>{itemRequestData?.item_request?.receiving_person}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">File </label>
                      <p>
                        <i className="icon-base ti tabler-file text-info icon-22px" />
                      </p>
                    </div>
                    <div className="col-lg-12">
                      <hr />
                      <div className="d-flex">
                        <div className="badge bg-label-danger rounded p-1_5">
                          <i className="icon-base ti tabler-ban icon-md" />
                        </div>
                        <h6 className="mb-0 ms-4 mt-1">Reject Reason</h6>
                      </div>
                      <p className="ms-6 ps-6">Qty Not Avaliable </p>
                    </div>
                    <div className="col-lg-12 text-center">
                      <button className="btn btn-success btn-sm waves-effect waves-light">
                        Service Received
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <h5 className="modal-title mb-3" id="exampleModalLabel3">
                    Request Flow
                  </h5>
                  <div className=" h-100">
                    <div className="card-body">
                      {/* <ul className="timeline mb-0">
                        <li className="timeline-item timeline-item-transparent">
                          <span className="timeline-point timeline-point-info" />
                          <div className="timeline-event">
                            <div className="timeline-header mb-3">
                              <h6 className="mb-0">Headover</h6>
                              <small className="text-body-secondary">
                                12-03-2025&nbsp;2:45&nbsp;PM
                              </small>
                            </div>
                            <p>Received By Akash Patel</p>
                            <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                              <div className="d-flex flex-wrap align-items-center mb-50">
                                <div className="avatar avatar-sm me-2">
                                  <img
                                    src="assets/img/avatars/1.png"
                                    alt="Avatar"
                                    className="rounded-circle"
                                  />
                                </div>
                                <div>
                                  <p className="mb-0 small fw-medium">
                                    Mitul Patel
                                  </p>
                                  <small>Store Head</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="timeline-item timeline-item-transparent">
                          <span className="timeline-point timeline-point-info" />
                          <div className="timeline-event">
                            <div className="timeline-header mb-3">
                              <h6 className="mb-0">Store Head Approval</h6>
                              <small className="text-body-secondary">
                                12-03-2025&nbsp;2:45&nbsp;PM
                              </small>
                            </div>
                            <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                              <div className="d-flex flex-wrap align-items-center mb-50">
                                <div className="avatar avatar-sm me-2">
                                  <img
                                    src="assets/img/avatars/1.png"
                                    alt="Avatar"
                                    className="rounded-circle"
                                  />
                                </div>
                                <div>
                                  <p className="mb-0 small fw-medium">
                                    Mitul Patel
                                  </p>
                                  <small>Store Head</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="timeline-item timeline-item-transparent">
                          <span className="timeline-point timeline-point-primary" />
                          <div className="timeline-event">
                            <div className="timeline-header mb-3">
                              <h6 className="mb-0">Category Head Approval</h6>
                              <small className="text-body-secondary">
                                12-03-2025&nbsp;2:45&nbsp;PM
                              </small>
                            </div>
                            <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                              <div className="d-flex flex-wrap align-items-center mb-50">
                                <div className="avatar avatar-sm me-2">
                                  <img
                                    src="assets/img/avatars/1.png"
                                    alt="Avatar"
                                    className="rounded-circle"
                                  />
                                </div>
                                <div>
                                  <p className="mb-0 small fw-medium">
                                    Mitul Patel
                                  </p>
                                  <small>Category Head</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="timeline-item timeline-item-transparent">
                          <span className="timeline-point timeline-point-success" />
                          <div className="timeline-event">
                            <div className="timeline-header mb-3">
                              <h6 className="mb-0">
                                Reporting Manager Approval
                              </h6>
                              <small className="text-body-secondary">
                                12-03-2025&nbsp;1:25&nbsp;PM
                              </small>
                            </div>
                            <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                              <div className="d-flex flex-wrap align-items-center mb-50">
                                <div className="avatar avatar-sm me-2">
                                  <img
                                    src="assets/img/avatars/1.png"
                                    alt="Avatar"
                                    className="rounded-circle"
                                  />
                                </div>
                                <div>
                                  <p className="mb-0 small fw-medium">
                                    Mitul Patel
                                  </p>
                                  <small>Plant Head</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="timeline-item timeline-item-transparent">
                          <span className="timeline-point timeline-point-info" />
                          <div className="timeline-event">
                            <div className="timeline-header mb-3">
                              <h6 className="mb-0">Create a new Request</h6>
                              <small className="text-body-secondary">
                                11-08-2025&nbsp;11:25&nbsp;AM
                              </small>
                            </div>
                            <p class="mb-2">6 team members in a project</p>
                            <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                              <div className="d-flex flex-wrap align-items-center mb-50">
                                <div className="avatar avatar-sm me-2">
                                  <img
                                    src="assets/img/avatars/1.png"
                                    alt="Avatar"
                                    className="rounded-circle"
                                  />
                                </div>
                                <div>
                                  <p className="mb-0 small fw-medium">
                                    Vishal Patel
                                  </p>
                                  <small>Staff User</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul> */}
                      <ul className="timeline mb-0">
                        {itemRequestData?.item_request?.workflows?.map(
                          (workflow) => {
                            const user =
                              workflow.assign_user || workflow.request_user; // fallback
                            return (
                              <li
                                className="timeline-item timeline-item-transparent"
                                key={workflow.id}
                              >
                                <span className="timeline-point timeline-point-info" />
                                <div className="timeline-event">
                                  <div className="timeline-header mb-3">
                                    <h6 className="mb-0">
                                      {workflow.status}{" "}
                                      {/* e.g., Approved / Pending */}
                                    </h6>
                                    <small className="text-body-secondary">
                                      {new Date(
                                        workflow.updated_at
                                      ).toLocaleString()}
                                    </small>
                                  </div>

                                  <p>
                                    {workflow.status === "Pending"
                                      ? "Waiting for approval"
                                      : `Approved by ${user?.name}`}
                                  </p>

                                  <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                                    <div className="d-flex flex-wrap align-items-center mb-50">
                                      <div className="avatar avatar-sm me-2">
                                        <img
                                          src={
                                            user?.profile_photo
                                              ? `/uploads/${user.profile_photo}`
                                              : "assets/img/avatars/1.png"
                                          }
                                          alt="Avatar"
                                          className="rounded-circle"
                                        />
                                      </div>
                                      <div>
                                        <p className="mb-0 small fw-medium">
                                          {user?.name}
                                        </p>
                                        <small>
                                          {workflow.task_level === 1
                                            ? "Reporting Manager"
                                            : workflow.task_level === 2
                                            ? "Store Head"
                                            : "Category Head"}
                                        </small>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>

      {/* ---------------------END VIEW ITEM REQUEST DETAILS----------------------- */}
    </>
  );
}
