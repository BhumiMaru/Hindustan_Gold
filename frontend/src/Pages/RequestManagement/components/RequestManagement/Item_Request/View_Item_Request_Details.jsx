import React, { useEffect } from "react";
import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";
import { useUIContext } from "../../../../../Context/UIContext";
import { Link } from "react-router-dom";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const fileUrl = import.meta.env.VITE_FILE_URL;

export default function View_Item_Request_Details() {
  const { handleClose } = useUIContext();
  const {
    itemRequestData,
    serviceReceived,
    wholeItemRequestData,
    fetchItemRequestById,
    itemRequestId,
  } = useItemRequest();

  useEffect(() => {
    fetchItemRequestById(itemRequestId);
  }, [itemRequestId]);

  // console.log("wholeItemRequestData", wholeItemRequestData);
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
                      <p>{wholeItemRequestData?.item_request_id} </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Date</label>
                      <p>
                        {
                          wholeItemRequestData?.item_request?.created_at.split(
                            "T"
                          )[0]
                        }
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Item&nbsp;Type</label>
                      <p>{wholeItemRequestData?.item_request?.item_type}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Item&nbsp;Name</label>
                      <p>
                        {wholeItemRequestData?.item_request?.item?.item_name}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Category</label>
                      <p>
                        {" "}
                        {
                          wholeItemRequestData?.item_request?.item?.subcategory
                            ?.category?.category_name
                        }
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Subcategory</label>
                      <p>
                        {
                          wholeItemRequestData?.item_request?.item?.subcategory
                            ?.sub_category_name
                        }
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Item Code </label>
                      <p>
                        {wholeItemRequestData?.item_request?.item?.item_code}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Service Location </label>
                      <p>
                        {
                          wholeItemRequestData?.item_request?.item
                            ?.storage_locations[0]?.service_location3
                            ?.service_location_3_name
                        }
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Purpose </label>
                      <p>{wholeItemRequestData?.item_request?.purpose}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">
                        Request&nbsp;Person&nbsp;Name
                      </label>
                      <p>
                        {wholeItemRequestData?.item_request?.request_user_id}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Quantity</label>
                      <p>{wholeItemRequestData?.item_request?.quantity}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">UOM</label>
                      <p>{wholeItemRequestData?.item_request?.item?.uom}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Unit&nbsp;Price</label>
                      <p>
                        {wholeItemRequestData?.item_request?.item?.unit_price}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Total&nbsp;Amount</label>
                      <p>{wholeItemRequestData?.item_request?.total_amount}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Total&nbsp;Status</label>
                      <p>
                        <span
                          className={`badge ${
                            wholeItemRequestData?.item_request
                              ?.final_approve_status === "Completed" ||
                            wholeItemRequestData?.item_request
                              ?.final_approve_status === "Approve"
                              ? "bg-label-success"
                              : wholeItemRequestData?.item_request
                                  ?.final_approve_status === "Pending"
                              ? "bg-label-warning"
                              : "bg-label-danger"
                          }`}
                        >
                          {
                            wholeItemRequestData?.item_request
                              ?.final_approve_status
                          }
                        </span>
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Remarks</label>
                      <p>{wholeItemRequestData?.item_request?.remarks}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Receiving Person</label>
                      <p>
                        {wholeItemRequestData?.item_request?.receiving_person}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">File </label>
                      <p>
                        <Link
                          to={`${fileUrl}/storage/item_request_file/${wholeItemRequestData?.item_request?.item_request_file}`}
                          target="_blank"
                        >
                          <i className="icon-base ti tabler-file text-info icon-22px" />
                        </Link>
                      </p>
                    </div>
                    <div className="col-lg-12">
                      <hr />
                      {wholeItemRequestData?.item_request?.reject_reason && (
                        <>
                          <div className="d-flex">
                            <div className="badge bg-label-danger rounded p-1_5">
                              <i className="icon-base ti tabler-ban icon-md" />
                            </div>
                            <h6 className="mb-0 ms-4 mt-1">Reject Reason</h6>
                          </div>
                          <p className="ms-6 ps-6">
                            {wholeItemRequestData?.item_request?.reject_reason}{" "}
                          </p>
                        </>
                      )}
                    </div>
                    {wholeItemRequestData?.item_type === "service" && (
                      <div className="col-lg-12 text-center">
                        <button
                          className="btn btn-success btn-sm waves-effect waves-light"
                          onClick={() =>
                            serviceReceived(
                              wholeItemRequestData?.item_request_id
                            )
                          }
                        >
                          Service Received
                        </button>
                      </div>
                    )}
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
                            <p className="mb-2">6 team members in a project</p>
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
                      {/* {console.log(
                        "wholeItemRequestData",
                        wholeItemRequestData
                      )} */}
                      <ul className="timeline mb-0">
                        {wholeItemRequestData?.item_request?.workflows
                          // ?.slice()
                          // ?.reverse()
                          ?.map((workflow, index) => {
                            const step = [
                              "Create a new Request",
                              "Reporting Manager Approval",
                              "Category Head Approval",
                              "Store Head Approval",
                              "Headover",
                            ];
                            const user = workflow.assign_user; // fallback

                            // console.log("user", user);
                            return (
                              <li
                                className="timeline-item timeline-item-transparent"
                                key={workflow.id}
                              >
                                <span
                                  className={`timeline-point ${
                                    workflow?.status === "Completed" ||
                                    workflow?.status === "Approve"
                                      ? "timeline-point-success"
                                      : workflow?.status === "Pending"
                                      ? "timeline-point-warning"
                                      : "timeline-point-danger"
                                  }`}
                                />
                                <div className="timeline-event">
                                  <div className="timeline-header mb-3">
                                    <h6 className="mb-0">
                                      {/* {workflow.status}{" "} */}
                                      {step[index]}
                                      {/* e.g., Approved / Pending */}
                                    </h6>
                                    <div className="d-flex flex-column">
                                      {/* 🕒 Date */}
                                      <small className="text-body-secondary">
                                        {new Date(
                                          workflow.updated_at
                                        ).toLocaleString()}
                                      </small>

                                      {/* ✅ Status (displayed below date) */}
                                      <small
                                        // className="text-primary fw-semibold"
                                        className={`badge ${
                                          workflow?.status === "Completed" ||
                                          workflow?.status === "Approve"
                                            ? "bg-label-success"
                                            : workflow?.status === "Pending"
                                            ? "bg-label-warning"
                                            : "bg-label-danger"
                                        }`}
                                      >
                                        {workflow?.status}
                                      </small>
                                    </div>
                                  </div>

                                  {/* {console.log(workflow.profile_photo)} */}
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
                                              ? `${fileUrl}/storage/users/${user?.profile_photo}`
                                              : `${publicUrl}assets/img/avatars/user.png`
                                          }
                                          alt="Avatar"
                                          className="rounded-circle"
                                        />
                                      </div>
                                      <div>
                                        <p className="mb-0 small fw-medium">
                                          {user?.name}
                                        </p>
                                        {/* <small>
                                          {workflow.task_level === 1
                                            ? "Reporting Manager"
                                            : workflow.task_level === 2
                                            ? "Store Head"
                                            : "Category Head"}
                                        </small> */}
                                        <small>
                                          {
                                            workflow?.request_user?.role
                                              ?.role_name
                                          }
                                        </small>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
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
