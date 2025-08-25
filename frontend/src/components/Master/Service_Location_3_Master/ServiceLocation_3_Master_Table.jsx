import React from "react";

export default function ServiceLocation_3_Master_Table() {
  return (
    <>
      {/* -----------------START SERVICE LOCATION 3 MASTER TABLE-------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-4">Sr#</div>
            </th>
            <th scope="col">Service Location 3</th>
            <th scope="col">Service Location 2</th>
            <th scope="col">Service Location 1</th>

            <th scope="col" style={{ width: "180px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="ms-4">1</div>
            </td>
            <td>Service Location 3 Master </td>
            <td>Service Location 2 Master </td>
            <td>Service Location 1 Master </td>

            <td>
              <div className="d-inline-flex gap-2">
                <button
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#smallModal"
                >
                  <i className="icon-base ti tabler-edit icon-22px"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ms-4">2</div>
            </td>
            <td>Service Location 3 Master </td>
            <td>Service Location 2 Master </td>
            <td>Service Location 1 Master </td>
            <td>
              <div className="d-inline-flex gap-2">
                <button
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#smallModal"
                >
                  <i className="icon-base ti tabler-edit icon-22px"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ms-4">3</div>
            </td>
            <td>Service Location 3 Master </td>
            <td>Service Location 2 Master </td>
            <td>Service Location 1 Master </td>
            <td>
              <div className="d-inline-flex gap-2">
                <button
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#smallModal"
                >
                  <i className="icon-base ti tabler-edit icon-22px"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* -----------------END SERVICE LOCATION 3 MASTER TABLE-------------------- */}
    </>
  );
}
