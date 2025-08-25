import React from "react";

export default function Role_Master_Table() {
  return (
    <>
      {/* ---------------------START ROLE MASTER TABLE---------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-4">Sr#</div>
            </th>
            <th scope="col">Role</th>
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
            <td>Store Manager</td>
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
                <a
                  href="user-permission.html"
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-article text-info icon-22px"></i>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ms-4">2</div>
            </td>
            <td>Staff User</td>
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
                <a
                  href="user-permission.html"
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-article text-info icon-22px"></i>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ms-4">3</div>
            </td>
            <td>Account Admin</td>
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
                <a
                  href="user-permission.html"
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-article text-info icon-22px"></i>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* ---------------------END ROLE MASTER TABLE---------------------- */}
    </>
  );
}
