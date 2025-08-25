import React from "react";

export default function PO_List_Table() {
  return (
    <>
      {/* ------------------START PO LIST TABLE------------------ */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr className="align-items-center">
            <th>
              <i className="icon-base ti tabler-chevron-down icon-20px" />
            </th>
            <th scope="col" style={{ width: 80 }}>
              Sr.No.
            </th>
            <th scope="col">PO ID</th>
            <th scope="col">Date</th>
            <th scope="col">PI ID</th>
            <th scope="col">Type</th>
            <th scope="col">Total Item</th>
            <th scope="col">Vendor</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <i className="icon-base ti tabler-chevron-down icon-20px" />
            </td>
            <td>1</td>
            <td>PO_000001</td>
            <td>03-08-2025</td>
            <td>PI_000001</td>
            <td>Material</td>
            <td>2</td>
            <td>
              <div className="d-flex justify-content-start align-items-center user-name">
                <div className="avatar-wrapper">
                  <div className="avatar me-2">
                    <img
                      src="assets/img/avatars/10.png"
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
            <td>₹2000000/-</td>
            <td>
              <span className="badge bg-label-warning">Pending</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <a
                  href="#"
                  type="button"
                  className="btn btn-text-success rounded-pill btn-icon waves-effect"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  aria-label="Download PO"
                  data-bs-original-title="Download PO"
                >
                  <i className="icon-base ti tabler-file-invoice text-success  icon-20px" />
                </a>
                <div className="d-inline-block">
                  <a
                    href="javascript:;"
                    className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                    data-bs-toggle="dropdown"
                    aria-expanded="true"
                  >
                    <i className="icon-base ti tabler-dots-vertical icon-20px" />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end m-0 "
                    data-popper-placement="bottom-end"
                    style={{
                      position: "absolute",
                      inset: "0px 0px auto auto",
                      margin: 0,
                      transform: "translate(-45px, 195px)",
                    }}
                  >
                    <a
                      href="po-detail.html"
                      className="dropdown-item waves-effect"
                    >
                      View
                    </a>
                    <a
                      href="javascript:;"
                      className="dropdown-item waves-effect"
                    >
                      Edit
                    </a>
                    <div className="dropdown-divider" />
                    <a
                      href="javascript:;"
                      className="dropdown-item text-danger delete-record waves-effect"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "\n                                        .table1 thead tr th {\n                                            padding-block: 0.5rem!important;\n                                            padding-inline-end: 1rem;\n                                        }\n                                        .table1 tbody tr {\n                                            background-color: #f9f9f9!important;\n                                        }\n                                    ",
              }}
            />
            <td colSpan={12} style={{ padding: 0 }}>
              <table className="table table1 datatables-basic align-middle w-100">
                <thead>
                  <tr className="bg-label-secondary">
                    <th>
                      <div className="ms-4">Item</div>{" "}
                    </th>
                    <th>Qty.</th>
                    <th>UOM</th>
                    <th>Received Qty.</th>
                    <th>Pending Qty.</th>
                    <th>Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {" "}
                      <div className="ms-4">ABCG- STCKER-CHARHER</div>
                    </td>
                    <td>500</td>
                    <td>Nos</td>
                    <td>200</td>
                    <td>300</td>
                    <td>2000/-</td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <div className="ms-4">ABCG- STCKER-CHARHER</div>
                    </td>
                    <td>500</td>
                    <td>Nos</td>
                    <td>200</td>
                    <td>300</td>
                    <td>2000/-</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <i className="icon-base ti tabler-chevron-down icon-20px" />
            </td>
            <td>3</td>
            <td>PO_000001</td>
            <td>03-08-2025</td>
            <td>PI_000001</td>
            <td>Material</td>
            <td>2</td>
            <td>
              <div className="d-flex justify-content-start align-items-center user-name">
                <div className="avatar-wrapper">
                  <div className="avatar me-2">
                    <img
                      src="assets/img/avatars/10.png"
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
            <td>₹2000000/-</td>
            <td>
              <span className="badge bg-label-warning">Pending</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <button className="btn btn-success btn-sm waves-effect waves-light">
                  Approve
                </button>
                <button className="btn btn-danger btn-sm waves-effect waves-light">
                  Reject
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <i className="icon-base ti tabler-chevron-down icon-20px" />
            </td>
            <td>4</td>
            <td>PO_000001</td>
            <td>03-08-2025</td>
            <td>PI_000001</td>
            <td>Material</td>
            <td>2</td>
            <td>
              <div className="d-flex justify-content-start align-items-center user-name">
                <div className="avatar-wrapper">
                  <div className="avatar me-2">
                    <img
                      src="assets/img/avatars/10.png"
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
            <td>₹2000000/-</td>
            <td>
              <span className="badge bg-label-success">Completed</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <a
                  href="#"
                  type="button"
                  className="btn btn-text-success rounded-pill btn-icon waves-effect"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  aria-label="Download PO"
                  data-bs-original-title="Download PO"
                >
                  <i className="icon-base ti tabler-file-invoice text-success  icon-20px" />
                </a>
                <div className="align-middle mt-1">
                  <button
                    className="btn btn-success btn-sm waves-effect waves-light"
                    data-bs-toggle="modal"
                    data-bs-target="#grnCreateModel"
                  >
                    Generate GRN
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <i className="icon-base ti tabler-chevron-down icon-20px" />
            </td>
            <td>1</td>
            <td>PO_000001</td>
            <td>03-08-2025</td>
            <td>PI_000001</td>
            <td>Services</td>
            <td>2</td>
            <td>
              <div className="d-flex justify-content-start align-items-center user-name">
                <div className="avatar-wrapper">
                  <div className="avatar me-2">
                    <img
                      src="assets/img/avatars/10.png"
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
            <td>₹2000000/-</td>
            <td>
              <span className="badge bg-label-warning">Pending</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <a
                  href="#"
                  type="button"
                  className="btn btn-text-success rounded-pill btn-icon waves-effect"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  aria-label="Download PO"
                  data-bs-original-title="Download PO"
                >
                  <i className="icon-base ti tabler-file-invoice text-success  icon-20px" />
                </a>
                <div className="align-middle mt-1">
                  <button
                    className="btn btn-success btn-sm waves-effect waves-light"
                    data-bs-toggle="modal"
                    data-bs-target="#grnCreateModel"
                  >
                    Generate GRN
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* ------------------END PO LIST TABLE------------------ */}
    </>
  );
}
