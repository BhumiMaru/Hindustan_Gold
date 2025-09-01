import React from "react";
import avatar10 from "../../../../public/assets/img/avatars/10.png";
import { Link } from "react-router-dom";

export default function User_Creation_Table() {
  return (
    <>
      {/* -------------------START USER CREATION TABLE--------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr className="align-items-center">
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-4">SR#</div>
            </th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Employee&nbsp;ID</th>
            <th scope="col">Email&nbsp;ID</th>
            <th scope="col">Department</th>
            <th scope="col">Registration Date</th>
            <th scope="col">Status</th>
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
            <td>HP_000001</td>
            <td>
              <div className="d-flex justify-content-start align-items-center user-name">
                <div className="avatar-wrapper">
                  <div className="avatar me-2">
                    <img
                      src={avatar10}
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
            <td>EMP000001</td>
            <td>rpeckett2o@timesonline.co.uk</td>
            <td>
              <div className="d-flex" style={{ marginRight: "10px" }}>
                <div>
                  <div
                    style={{
                      borderRadius: "100%",
                      backgroundColor: "#3db133",
                      padding: "8px",
                      width: "2px",
                    }}
                  ></div>
                </div>
                &nbsp;Finance
              </div>
            </td>
            <td>20-08-2025</td>
            <td>
              <span className="badge bg-label-success">Active</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <a
                  href="user-create.html"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-edit icon-22px"></i>
                </a>
                <Link
                  to="/user-permission"
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-article text-info icon-22px"></i>
                </Link>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ms-4">2</div>
            </td>
            <td>HP_000002</td>
            <td>
              <div className="d-flex justify-content-start align-items-center user-name">
                <div className="avatar-wrapper">
                  <div className="avatar me-2">
                    <span className="avatar-initial rounded-circle bg-label-success">
                      RP
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <span className="emp_name text-truncate text-heading fw-medium">
                    Reina Peckett
                  </span>
                  <small className="emp_post text-truncate">
                    Quality Control Specialist
                  </small>
                </div>
              </div>
            </td>
            <td>EMP000002</td>
            <td>abeslier2n@zimbio.com</td>
            <td>
              <div className="d-flex">
                <div>
                  <div
                    style={{
                      borderRadius: "100%",
                      backgroundColor: "red",
                      padding: "8px",
                      width: "2px",
                    }}
                  ></div>
                </div>
                &nbsp;Marketing
              </div>
            </td>
            <td>20-08-2025</td>
            <td>
              <span className="badge bg-label-danger">Deactive</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <Link
                  to="/user-permission"
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-article text-info icon-22px"></i>
                </Link>
              </div>
              <div className="d-inline-flex gap-2">
                <a
                  href="javascript:;"
                  className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="icon-base ti tabler-dots-vertical icon-20px"></i>
                </a>
                <div className="d-inline-block">
                  <div
                    className="dropdown-menu dropdown-menu-end m-0"
                    style={{}}
                  >
                    <a
                      href="user-create.html"
                      className="dropdown-item waves-effect"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="dropdown-item waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#grnCreateModel"
                    >
                      View
                    </a>
                    <div className="dropdown-divider"></div>
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
      {/* -------------------END USER CREATION TABLE--------------------- */}
    </>
  );
}
