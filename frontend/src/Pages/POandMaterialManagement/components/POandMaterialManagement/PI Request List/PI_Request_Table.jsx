import React, { useState } from "react";
import { usePIRequest } from "../../../../../Context/PIAndPoManagement/PIRequestList";

export default function PI_Request_Table() {
  const { piRequest } = usePIRequest();
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  console.log("piRequest", piRequest);
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
            <th style={{ width: 180 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {piRequest.map((pi, index) => (
            <React.Fragment key={index}>
              <tr key={pi.id}>
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
                <td>{index + 1}</td>
                <td>{pi.pi_date}</td>
                <td>{pi.pi_type}</td>
                <td>Ronak Patel</td>
                <td>Electrical</td>
                <td>{pi.total_item}</td>
                <td>10</td>
                <td>{pi.po_total}</td>
                <td>
                  <span className="badge bg-label-success">
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
                    >
                      <i className="icon-base ti tabler-edit icon-22px" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-22px" />
                    </button>
                  </div>
                </td>
              </tr>

              {expandedRows[pi.id] && pi?.items.length > 0 && (
                <tr>
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
                                style={{
                                  width: "1rem !important",
                                  height: "1rem !important",
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
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pi?.items?.map((piItem) => (
                          <tr>
                            <td className="dt-select">
                              <div className="ms-4">
                                <input
                                  aria-label="Select row"
                                  className="form-check-input"
                                  type="checkbox"
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
                            <td>
                              <div className="d-inline-flex gap-2">
                                <div className="badge rounded bg-label-success p-1_5">
                                  <i className="icon-base ti tabler-circle-check icon-md" />
                                </div>
                                <div className="badge bg-label-danger rounded p-1_5">
                                  <i className="icon-base ti tabler-xbox-x icon-md" />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="text-center w-100">
                      <a
                        href="pi-request-get-quote.html"
                        className="btn btn-primary btn-sm mt-2 mb-2 waves-effect waves-light"
                      >
                        Get Quotation
                      </a>
                      <div className="d-inline-flex gap-2 ms-1">
                        <button
                          className="btn btn-success btn-sm waves-effect waves-light"
                          data-bs-toggle="modal"
                          data-bs-target="#servicesModal"
                        >
                          Balk Item Approve
                        </button>
                        <button className="btn btn-danger btn-sm waves-effect waves-light">
                          Balk Item Reject
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
                        <button
                          className="btn btn-info btn-sm waves-effect waves-light"
                          tabIndex={0}
                          aria-controls="DataTables_Table_0"
                          type="button"
                        >
                          <span>
                            <i className="icon-base icon-18px ti tabler-circle-check me-md-2" />
                            <span className="d-md-inline-block d-none">
                              {" "}
                              Service Recived
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {/* ----------------END PI REQUEST TABLE------------------ */}
    </>
  );
}
