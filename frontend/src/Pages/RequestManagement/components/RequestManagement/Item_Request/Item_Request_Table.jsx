import React, { useEffect } from "react";
import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";
import { Link, useNavigate } from "react-router-dom";
import { useUIContext } from "../../../../../Context/UIContext";
import Loader from "../../../../../components/Common/Loader/Loader";

export default function Item_Request_Table({ search }) {
  const navigate = useNavigate();
  const { handleOpen } = useUIContext();
  const {
    itemRequest,
    fetchItemRequestById,
    deleteItemRequest,
    setItemRequestData,
    activeTab,
    loading,
    approveRequest,
    handOverRequest,
    serviceReceived,
    startEditing,
    pagination,
  } = useItemRequest();

  // Initialize Bootstrap tooltips
  useEffect(() => {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, [itemRequest]);

  // console.log("itemRequest itemRequest", itemRequest);

  // 🔎 Filter table data locally based on search
  const filteredData = itemRequest.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item?.item_request?.item_type?.toLowerCase().includes(searchLower) ||
      item?.item_request?.item_name?.toLowerCase().includes(searchLower) ||
      item?.item_request?.workflows.some((user) =>
        user?.request_user?.name?.toLowerCase().includes(searchLower)
      ) ||
      item?.item_request?.item_request_id?.toString().includes(searchLower)
    );
  });

  return (
    <>
      {/* -----------------START ITEM REQUEST TABLE---------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr className="align-items-center">
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-4">Sr#</div>
            </th>
            <th scope="col">Request&nbsp;ID</th>
            <th scope="col">Date</th>
            <th scope="col">Item&nbsp;Type</th>
            <th scope="col">Item&nbsp;Name</th>
            {activeTab === "approval_request" && (
              <th scope="col">Request&nbsp;Person&nbsp;Name</th>
            )}
            <th scope="col">Quantity</th>
            <th scope="col">UOM</th>
            {/* <th scope="col">Unit&nbsp;Price</th> */}
            <th scope="col">Total&nbsp;Amount</th>

            <th scope="col">Status</th>
            <th scope="col" style={{ minWidth: "160px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="11">
                <Loader />
              </td>
            </tr>
          ) : (
            filteredData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="ms-4">
                      {" "}
                      {(pagination.currentPage - 1) * pagination.perPage +
                        (index + 1)}
                    </div>
                  </td>
                  <td>{item.item_request_id}</td>
                  <td>
                    {item?.item_request?.created_at
                      ? new Date(item.item_request.created_at)
                          .toISOString()
                          .split("T")[0]
                      : ""}
                  </td>

                  <td>{item?.item_request?.item_type}</td>
                  <td>{item?.item_request?.item_master?.item_name}</td>
                  {activeTab === "approval_request" && (
                    <td>
                      <div className="d-flex justify-content-start align-items-center user-name">
                        <div className="avatar-wrapper">
                          <div className="avatar me-2">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9lRck6miglY0SZF_BZ_sK829yiNskgYRUg&s"
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </div>
                        </div>
                        {/* <div className="d-flex flex-column">
                      <span className="emp_name text-truncate text-heading fw-medium">
                        {item?.item_request?.workflows.map((user) => {
                          return user?.request_user?.name;
                        })}
                      </span>
                      {item?.item_request?.workflows.map((user) => {
                        return (
                          <small className="emp_post text-truncate">
                            {user?.request_user?.role_id}
                          </small>
                        );
                      })}
                    </div> */}
                        <div className="d-flex flex-column">
                          <span className="emp_name text-truncate text-heading fw-medium">
                            {item?.item_request?.workflows?.[0]?.request_user
                              ?.name || "-"}
                          </span>
                          <small className="emp_post text-truncate">
                            {item?.item_request?.workflows?.[0]?.request_user
                              ?.role_id || "-"}
                          </small>
                        </div>
                      </div>
                    </td>
                  )}

                  <td>{item?.item_request?.quantity}</td>
                  <td>{item?.item_request?.uom}</td>
                  {/* <td>{item?.item_request?.unit_price}</td> */}
                  <td>{item?.item_request?.total_amount}</td>
                  <td>
                    <span
                      className={`badge ${
                        item?.final_approve_status === "Approve" ||
                        item?.final_approve_status === "Completed"
                          ? "bg-label-success"
                          : item?.final_approve_status === "Pending" ||
                            item?.final_approve_status === "Reject"
                          ? "bg-label-warning"
                          : "bg-label-secondary"
                      }`}
                    >
                      {item?.final_approve_status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      {activeTab === "my_request" && (
                        <div className="d-inline-flex gap-2">
                          <a
                            className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="icon-base ti tabler-dots-vertical icon-20px"></i>
                          </a>
                          <div className="d-inline-block">
                            <div className="dropdown-menu dropdown-menu-end m-0">
                              <button
                                key={item.id}
                                className={`dropdown-item waves-effect ${
                                  item?.task_level === 2 &&
                                  item?.status === "Approve"
                                    ? "d-none"
                                    : ""
                                }`}
                                onClick={() => {
                                  // FIXED: Pass the correct ID (item_request_id instead of workflow_id)
                                  const itemRequestId = item.id; // This should be the item_request_id
                                  console.log(
                                    "Editing item request ID:",
                                    itemRequestId
                                  );

                                  // Use the correct function to start editing
                                  startEditing(itemRequestId);

                                  navigate(
                                    `/user/request/request-create/${item?.item_request?.item_type}/${itemRequestId}`
                                  );
                                }}
                              >
                                Edit
                              </button>

                              <a
                                href="#"
                                className="dropdown-item waves-effect"
                                data-bs-toggle="modal"
                                data-bs-target="#grnCreateModel"
                                onClick={() => {
                                  handleOpen("viewItemRequest");
                                  setItemRequestData(item);
                                }}
                              >
                                View
                              </a>

                              {/* <a
                            href="#"
                            className="dropdown-item waves-effect"
                            data-bs-toggle="modal"
                            data-bs-target="#grnCreateModel"
                            onClick={() => {
                              handleOpen("viewApprove");
                              // setItemRequestData(item);
                            }}
                          >
                            Approve
                          </a>

                          <a
                            href="#"
                            className="dropdown-item waves-effect"
                            data-bs-toggle="modal"
                            data-bs-target="#grnCreateModel"
                            onClick={() => {
                              handleOpen("viewReject");
                              // setItemRequestData(item);
                            }}
                          >
                            Reject
                          </a> */}

                              <div
                                className={`dropdown-divider ${
                                  item?.task_level === 2 &&
                                  item?.status === "Approve"
                                    ? "d-none"
                                    : ""
                                }`}
                              ></div>
                              <a
                                className={`dropdown-item text-danger delete-record waves-effect ${
                                  item?.task_level === 2 &&
                                  item?.status === "Approve"
                                    ? "d-none"
                                    : ""
                                }`}
                                onClick={() =>
                                  deleteItemRequest(item?.item_request_id)
                                }
                              >
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "approval_request" && (
                        <div className="d-inline-flex gap-2">
                          {item?.status === "Approve" &&
                            item?.final_approve_status === "Approve" && (
                              <button
                                className={`btn btn-success btn-sm waves-effect waves-light ${
                                  item?.status === "Approve" ? "d-none" : ""
                                }`}
                                data-bs-toggle="modal"
                                data-bs-target="#servicesModal"
                                onClick={() => {
                                  // const workflow_id = item?.id;
                                  const workflow_id =
                                    item?.item_request?.workflows[0]?.id;
                                  if (
                                    item.item_type === "service" &&
                                    item?.task_level === 4
                                  ) {
                                    handleOpen("viewApprove");
                                  } else {
                                    approveRequest(workflow_id);
                                  }
                                }}
                              >
                                Approve
                              </button>
                            )}

                          {item?.status === "Reject" &&
                            item?.final_approve_status === "Reject" && (
                              <button
                                className={`btn btn-danger btn-sm waves-effect waves-light ${
                                  item?.status === "Reject" ? "d-none" : ""
                                }`}
                                data-bs-toggle="modal"
                                data-bs-target="#rejectRemarkModal"
                                onClick={() => {
                                  handleOpen("viewReject");
                                  setItemRequestData(item);
                                }}
                              >
                                Reject
                              </button>
                            )}

                          {item?.final_approve_status === "Reject" && (
                            <button
                              type="button"
                              className="btn btn-text-danger rounded-pill btn-icon waves-effect"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              aria-label={item?.item_request?.reject_reason}
                              data-bs-original-title={
                                item?.item_request?.reject_reason
                              }
                              aria-describedby="tooltip578088"
                            >
                              <i className="icon-base ti tabler-info-circle text-danger  icon-20px" />
                            </button>
                          )}

                          {item?.status === "Approve" &&
                            item?.task_level === 5 &&
                            item?.final_approve_status === "Approve" && (
                              <button
                                className="btn btn-info btn-sm waves-effect waves-light"
                                onClick={() => {
                                  const item_id = item?.item_request_id;
                                  // const item_request_id = item?.item_request_id;
                                  handOverRequest(item_id);
                                }}
                              >
                                Handover
                              </button>
                            )}

                          {item?.task_level === 4 &&
                            item?.status === "Pending" &&
                            item?.final_approve_status === "Approve" && (
                              <button
                                className="btn btn-success btn-sm waves-effect waves-light"
                                onClick={() =>
                                  serviceReceived(item?.item_request_id)
                                }
                              >
                                Service Received
                              </button>
                            )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}

          {/* <tr>
            <td>
              <div className="ms-4">3</div>
            </td>
            <td>REQ_000003</td>
            <td>03-08-2025</td>
            <td>Material</td>
            <td>Mouse</td>
            <td>
              <div className="d-flex justify-content-start align-items-center user-name">
                <div className="avatar-wrapper">
                  <div className="avatar me-2">
                    <img
                      src="https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png"
                      alt="Avatar"
                      className="rounded-circle"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <span className="emp_name text-truncate text-heading fw-medium">
                    Evangelina Carnock
                  </span>
                  <small className="emp_post text-truncate">
                    Cost Accountant
                  </small>
                </div>
              </div>
            </td>
            <td>10</td>
            <td>NOS</td>
            <td>500</td>
            <td>5000</td>

            <td>
              <span className="badge bg-label-warning">Pending</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <button
                  className="btn btn-success btn-sm waves-effect waves-light"
                  data-bs-toggle="modal"
                  data-bs-target="#servicesModal"
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger btn-sm waves-effect waves-light"
                  data-bs-toggle="modal"
                  data-bs-target="#rejectRemarkModal"
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ms-4">4</div>
            </td>
            <td>REQ_000001</td>
            <td>03-08-2025</td>
            <td>Material</td>
            <td>Mouse</td>
            <td>
              <div className="d-flex justify-content-start align-items-center user-name">
                <div className="avatar-wrapper">
                  <div className="avatar me-2">
                    <img
                      src="https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png"
                      alt="Avatar"
                      className="rounded-circle"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <span className="emp_name text-truncate text-heading fw-medium">
                    Evangelina Carnock
                  </span>
                  <small className="emp_post text-truncate">
                    Cost Accountant
                  </small>
                </div>
              </div>
            </td>
            <td>10</td>
            <td>NOS</td>
            <td>500</td>
            <td>5000</td>
            <td>
              <span className="badge bg-label-success">Approve</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <button className="btn btn-info btn-sm waves-effect waves-light">
                  Handover
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ms-4">5</div>
            </td>
            <td>REQ_000001</td>
            <td>03-08-2025</td>
            <td>Material</td>
            <td>Mouse</td>
            <td>
              <div className="d-flex justify-content-start align-items-center user-name">
                <div className="avatar-wrapper">
                  <div className="avatar me-2">
                    <img
                      src="https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png"
                      alt="Avatar"
                      className="rounded-circle"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <span className="emp_name text-truncate text-heading fw-medium">
                    Evangelina Carnock
                  </span>
                  <small className="emp_post text-truncate">
                    Cost Accountant
                  </small>
                </div>
              </div>
            </td>
            <td>10</td>
            <td>NOS</td>
            <td>500</td>
            <td>5000</td>
            <td>
              <span className="badge bg-label-success">Approve</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <button className="btn btn-success btn-sm waves-effect waves-light">
                  Service Received
                </button>
              </div>
            </td>
          </tr> */}
        </tbody>
      </table>
      {/* -----------------END ITEM REQUEST TABLE---------------- */}
    </>
  );
}
