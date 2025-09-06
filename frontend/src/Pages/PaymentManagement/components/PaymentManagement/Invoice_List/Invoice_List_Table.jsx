import React from "react";

export default function Invoice_List_Table() {
  return (
    <>
      {/* -------------------START INVOICE LIST TABLE------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr className="align-items-center">
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
            <th scope="col" style={{ width: 80 }}>
              Sr.No.
            </th>
            <th scope="col">Invoice Id</th>
            <th scope="col">Created</th>
            <th scope="col">Invoice Date</th>
            <th scope="col">Vendor</th>
            <th scope="col">Type</th>
            <th scope="col">Item</th>
            <th scope="col">Invoice Amount</th>
            <th scope="col">Paid Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
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
            <td>1</td>
            <td>INS_000001</td>
            <td>08-08-2025</td>
            <td>08-08-2025</td>
            <td>Vendor</td>
            <td>Material</td>
            <td>2</td>
            <td>20000/-</td>
            <td>20000/-</td>
            <td>
              <span className="badge bg-label-info">Pending</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <a
                  href="invoice-detail.html"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-eye icon-22px" />
                </a>
                <div className="d-inline-flex gap-2">
                  <div className="d-inline-block">
                    <a
                      href="javascript:;"
                      className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="icon-base ti tabler-dots-vertical icon-20px" />
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-end m-0"
                      style={{}}
                    >
                      <a
                        href="javascript:;"
                        className="dropdown-item waves-effect"
                        data-bs-toggle="modal"
                        data-bs-target="#grnCreateModel"
                      >
                        Download Invoice
                      </a>
                      <a
                        href="javascript:;"
                        className="dropdown-item waves-effect"
                        data-bs-toggle="modal"
                        data-bs-target="#grnCreateModel"
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
              </div>
            </td>
          </tr>
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
            <td>2</td>
            <td>INS_000001</td>
            <td>08-08-2025</td>
            <td>08-08-2025</td>
            <td>Vendor</td>
            <td>Material</td>
            <td>2</td>
            <td>20000/-</td>
            <td>20000/-</td>
            <td>
              <span className="badge bg-label-info">Pending</span>
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
            <td className="dt-select">
              <div className="ms-4">
                <input
                  aria-label="Select row"
                  className="form-check-input"
                  type="checkbox"
                />
              </div>
            </td>
            <td>3</td>
            <td>INS_000001</td>
            <td>08-08-2025</td>
            <td>08-08-2025</td>
            <td>Vendor</td>
            <td>Material</td>
            <td>2</td>
            <td>20000/-</td>
            <td>20000/-</td>
            <td>
              <span className="badge bg-label-info">Pending</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <button className="btn btn-info btn-sm waves-effect waves-light">
                  Payment Request
                </button>
              </div>
            </td>
          </tr>
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
            <td>4</td>
            <td>INS_000001</td>
            <td>08-08-2025</td>
            <td>08-08-2025</td>
            <td>Vendor</td>
            <td>Material</td>
            <td>2</td>
            <td>20000/-</td>
            <td>20000/-</td>
            <td>
              <span className="badge bg-label-danger">Reject</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <a
                  href="#"
                  type="button"
                  className="btn btn-text-danger rounded-pill btn-icon waves-effect"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  aria-label="Remark"
                  data-bs-original-title="Remark"
                >
                  <i className="icon-base ti tabler-info-circle text-danger  icon-20px" />
                </a>
                <div className="d-inline-flex gap-2">
                  <div className="d-inline-block">
                    <a
                      href="javascript:;"
                      className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="icon-base ti tabler-dots-vertical icon-20px" />
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-end m-0"
                      style={{}}
                    >
                      <a
                        href="javascript:;"
                        className="dropdown-item waves-effect"
                        data-bs-toggle="modal"
                        data-bs-target="#grnCreateModel"
                      >
                        Download Invoice
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
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* -------------------END INVOICE LIST TABLE------------------- */}
    </>
  );
}
