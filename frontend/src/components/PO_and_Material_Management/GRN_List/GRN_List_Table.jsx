import React from "react";

export default function GRN_List_Table() {
  return (
    <>
      {/* -------------START GRN LIST TABLE--------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr className="align-items-center">
            <th scope="col" style={{ width: 80 }}>
              <div className="ms-4">Sr#</div>
            </th>
            <th scope="col">GRN&nbsp;ID</th>
            <th scope="col">GRN&nbsp;Date</th>
            <th scope="col">PO&nbsp;ID</th>
            <th scope="col">Type</th>
            <th scope="col">PI Request Person</th>
            <th scope="col">PI Receiving Person</th>
            <th scope="col">Vendor</th>
            <th scope="col">Total Item</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="ms-4">1</div>
            </td>
            <td>GR_00001</td>
            <td>03-08-2025</td>
            <td>PO_00001</td>
            <td>Material</td>
            <td>Evangelina Carnock</td>
            <td>Evangelina Carnock</td>
            <td>TATA LTDPVT</td>
            <td>10</td>
            <td>
              <span className="badge bg-label-warning">Pending</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <a
                  href="grn-detail.html"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-eye icon-20px" />
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
            </td>
          </tr>
        </tbody>
      </table>
      {/* -------------END GRN LIST TABLE--------------- */}
    </>
  );
}
