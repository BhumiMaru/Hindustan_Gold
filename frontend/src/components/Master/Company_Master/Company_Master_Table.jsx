import React from "react";

export default function Company_Master_Table() {
  return (
    <>
      {/* ---------------------START COMPANY MASTER TABLE------------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-4">Sr#</div>
            </th>
            <th scope="col">Company</th>
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
            <td>Sansnd</td>
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
            <td>Ahmedabad</td>
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
      {/* ---------------------END COMPANY MASTER TABLE------------------------- */}
    </>
  );
}
