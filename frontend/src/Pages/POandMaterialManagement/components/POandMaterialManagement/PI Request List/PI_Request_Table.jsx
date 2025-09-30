import React, { useState } from "react";
import { usePIRequest } from "../../../../../Context/PIAndPoManagement/PIRequestList";
import { Link, useNavigate, useParams } from "react-router-dom";
import Reject_Pi_request from "./Reject_Pi_request";
import { useUIContext } from "../../../../../Context/UIContext";
import { toast } from "react-toastify";
import { useGetQuote } from "../../../../../Context/PIAndPoManagement/GetQuote";

export default function PI_Request_Table() {
  const { type, id } = useParams();
  const {
    piRequest,
    StartEditing,
    DeletePiRequest,
    pagination,
    singleApprove,
    bulkApprove,
    selectedItems,
    handleSelectAll,
    handleSelectItem,
    activeTab,
    singleReject,
    bulkReject,
  } = usePIRequest();
  const { getQuoteCreate } = useGetQuote();
  const { modal, handleOpen } = useUIContext();
  const [expandedRows, setExpandedRows] = useState({});
  const navigate = useNavigate();

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* ----------------START PI REQUEST TABLE------------------ */}
      <table className="dt-responsive-child table table-bordered">
        <thead>
          <tr>
            <th />
            <th>id #</th>
            <th>PI Date</th>
            <th>PI Type</th>
            <th>Order By</th>
            <th>Department</th>
            <th>Total Item</th>
            <th>Get Quote</th>
            <th>PO</th>
            <th>Status</th>
            <th style={{ width: "180px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {piRequest?.map((pi, index) => (
            <React.Fragment key={`pi-${pi.id}`}>
              <tr key={`row-${pi.id}`}>
                <td
                  onClick={() => toggleRow(pi.id)}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className={`icon-base ti tabler-chevron-${
                      expandedRows[pi.id] ? "down" : "right"
                    } icon-22px`}
                  />
                </td>
                <td>
                  {" "}
                  {(pagination.currentPage - 1) * pagination.perPage +
                    (index + 1)}
                </td>
                <td>{pi.pi_date}</td>
                <td>{pi.pi_type}</td>
                <td>Ronak Patel</td>
                <td>Electrical</td>
                <td>{pi.total_item}</td>
                <td>10</td>
                <td>{pi.po_total}</td>
                <td>
                  <span
                    className={`badge ${
                      pi.final_approve_status === "Approved"
                        ? "bg-label-success"
                        : pi.final_approve_status === "InProgress"
                        ? "bg-label-warning"
                        : "bg-label-danger"
                    }`}
                  >
                    {pi.final_approve_status}
                  </span>
                </td>
                <td>
                  <div className="d-inline-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#smallModal"
                      onClick={() => {
                        navigate(
                          `/po-material/pi-request-create/${pi.pi_type}/${pi.id}`
                        );
                        StartEditing(pi.id);
                      }}
                    >
                      <i className="icon-base ti tabler-edit icon-22px" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => DeletePiRequest(pi.id)}
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-22px" />
                    </button>
                  </div>
                </td>
              </tr>

              {expandedRows[pi.id] && pi?.piitems.length > 0 && (
                <tr key={`expanded-${pi.id}`}>
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n                                        .table1 thead tr th {\n                                            padding-block: 0.5rem !important;\n                                            padding-inline-end: 1rem;\n                                        }\n\n                                        .table1 tbody tr {\n                                            background-color: #f9f9f9 !important;\n                                        }\n                                    ",
                    }}
                  />
                  <td colSpan={11} style={{ padding: 0 }}>
                    <table className="table table1 datatables-basic align-middle w-100">
                      <thead>
                        <tr className="bg-label-secondary">
                          <th>
                            <div className="ms-4">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                  pi.piitems.length > 0 &&
                                  pi.piitems.every((item) =>
                                    selectedItems.includes(item.id)
                                  )
                                }
                                onChange={() => handleSelectAll(pi.piitems)}
                                style={{
                                  width: "1rem",
                                  height: "1rem",
                                }}
                              />
                            </div>
                          </th>
                          <th>Item</th>
                          <th>Qty.</th>
                          <th>UOM</th>
                          <th>Priority</th>
                          <th>Purpose</th>
                          <th>Approval Date</th>
                          <th>Remarks</th>
                          <th>Status</th>
                          {activeTab === "approval_request" && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {pi?.piitems?.map((piItem) => (
                          <tr key={`piItem-${pi.id}-${piItem.id}`}>
                            <td className="dt-select">
                              <div className="ms-4">
                                <input
                                  aria-label="Select row"
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={selectedItems.includes(piItem.id)}
                                  onChange={() => handleSelectItem(piItem.id)}
                                />
                              </div>
                            </td>
                            <td>{piItem.item_name}</td>
                            <td>{piItem.qty}</td>
                            <td>{piItem.uom}</td>
                            <td>
                              <span
                                // className="badge badge-outline-danger"
                                className={`badge ${
                                  piItem.priority === "High" &&
                                  "badge-outline-danger"
                                } ${
                                  piItem.priority === "Critical" &&
                                  "badge-outline-info"
                                }`}
                              >
                                {piItem.priority}
                              </span>
                            </td>
                            <td>
                              <a
                                href="#"
                                type="button"
                                className=""
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                aria-label="Purpose"
                                data-bs-original-title="Purpose"
                              >
                                <i className="icon-base ti tabler-progress-help text-dark  icon-20px" />
                              </a>
                            </td>
                            <td>{piItem.approve_date || "N / A"}</td>
                            <td>
                              <a
                                href="#"
                                type="button"
                                className=""
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                aria-label="Remark"
                                data-bs-original-title="Remark"
                              >
                                <i className="icon-base ti tabler-info-circle text-dark  icon-20px" />
                              </a>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  piItem.status === "pending" &&
                                  "bg-label-warning"
                                } ${
                                  piItem.status === "approved" &&
                                  "bg-label-success"
                                }`}
                              >
                                {piItem.status}
                              </span>
                            </td>
                            {activeTab === "approval_request" && (
                              <td>
                                <div className="d-inline-flex gap-2">
                                  <div
                                    className={`badge rounded bg-label-success p-1_5 ${
                                      piItem.status === "approved"
                                        ? "d-none"
                                        : ""
                                    }`}
                                  >
                                    <i
                                      className="icon-base ti tabler-circle-check icon-md cursor-pointer"
                                      onClick={() => singleApprove(piItem.id)}
                                    />
                                  </div>
                                  <div
                                    className={`badge rounded bg-label-danger p-1_5 ${
                                      piItem.status === "approved"
                                        ? "d-none"
                                        : ""
                                    }`}
                                  >
                                    <i
                                      className="icon-base ti tabler-xbox-x icon-md cursor-pointer"
                                      onClick={() => {
                                        singleReject({
                                          pi_request_item_id: piItem.id,
                                          pi_request_id: piItem.pi_request_id,
                                        });
                                        // handleOpen("viewRejectPi");
                                      }}
                                    />
                                  </div>
                                </div>
                                {/* {console.log("pi", pi)}
                                {console.log("pi items", piItem)} */}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* {selectedItems.length > 0 && selectedItems && ( */}
                    <div className="text-center w-100">
                      {/* {activeTab === "approval_request" &&
                          selectedItems.length > 0 && ( */}
                      <>
                        <Link
                          to="/po-material/pi-request-get-quote/:id"
                          className="btn btn-primary btn-sm mt-2 mb-2 waves-effect waves-light"
                          onClick={async () => {
                            const res = await getQuoteCreate({
                              pi_request_id: pi.id,
                              pi_request_item_id: selectedItems,
                            });

                            // Optional: navigate directly to details page with ID
                            if (res?.data?.id) {
                              navigate(
                                `/po-material/pi-request-get-quote/${res.data.id}`
                              );
                            }
                          }}
                        >
                          Get Quotation
                        </Link>
                      </>
                      {/* )} */}
                      <div className="d-inline-flex gap-2 ms-1">
                        {/* {activeTab === "approval_request" &&
                            selectedItems.length > 0 && ( */}
                        <>
                          <button
                            className="btn btn-success btn-sm waves-effect waves-light"
                            data-bs-toggle="modal"
                            data-bs-target="#servicesModal"
                            onClick={() => {
                              // Make sure selectedItems is not empty and get pi_request_id from first selected item
                              if (selectedItems.length > 0) {
                                const firstItem = pi?.piitems?.find((item) => {
                                  return selectedItems.includes(item.id);
                                });

                                if (firstItem) {
                                  bulkApprove({
                                    pi_request_item_id: selectedItems,
                                    pi_request_id: firstItem.pi_request_id, // use the correct field
                                  });
                                } else {
                                  toast.error(
                                    "Cannot find PI Request ID for selected items"
                                  );
                                }
                              } else {
                                toast.error(
                                  "No items selected for bulk approve"
                                );
                              }
                            }}
                          >
                            Bulk Item Approve
                          </button>
                          <button
                            className="btn btn-danger btn-sm waves-effect waves-light"
                            onClick={() => {
                              // Make sure selectedItems is not empty and get pi_request_id from first selected item
                              if (selectedItems.length > 0) {
                                const firstItem = pi?.piitems?.find((item) => {
                                  return selectedItems.includes(item.id);
                                });

                                if (firstItem) {
                                  bulkReject({
                                    pi_request_item_id: selectedItems,
                                    pi_request_id: firstItem.pi_request_id, // use the correct field
                                  });
                                } else {
                                  toast.error(
                                    "Cannot find PI Request ID for selected items"
                                  );
                                }
                              } else {
                                toast.error(
                                  "No items selected for bulk reject"
                                );
                              }
                            }}
                          >
                            Bulk Item Reject
                          </button>
                          <button
                            className="btn btn-primary btn-sm waves-effect waves-light"
                            tabIndex={0}
                            aria-controls="DataTables_Table_0"
                            type="button"
                          >
                            <span>
                              <i className="icon-base icon-16px ti tabler-plus me-md-2" />
                              <span className="d-md-inline-block d-none">
                                Upload Invoice
                              </span>
                            </span>
                          </button>
                        </>
                        {/* )} */}

                        {/* {activeTab === "my_request" &&
                            selectedItems.length > 0 && ( */}
                        <div className="pt-1 pb-1">
                          <button
                            className="btn btn-info btn-sm waves-effect waves-light"
                            tabIndex={0}
                            aria-controls="DataTables_Table_0"
                            type="button"
                          >
                            <span>
                              <i className="icon-base icon-18px ti tabler-circle-check me-md-2" />
                              <span className="d-md-inline-block d-none">
                                Service Received
                              </span>
                            </span>
                          </button>
                        </div>
                        {/* )} */}
                      </div>
                    </div>
                    {/* )} */}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {modal.viewRejectPi && <Reject_Pi_request />}

      {/* ----------------END PI REQUEST TABLE------------------ */}
    </>
  );
}
