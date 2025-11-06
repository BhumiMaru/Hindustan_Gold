import React from "react";
import { Link } from "react-router-dom";
import { useUIContext } from "../../../../../Context/UIContext";
import { useRoleMaster } from "../../../../../Context/Master/RoleMasterContext";
import Loader from "../../../../../components/Common/Loader/Loader";

export default function Role_Master_Table() {
  const { handleOpen } = useUIContext();
  const { roles, startEditing, deleteRole, pagination, loading } =
    useRoleMaster();

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
          {loading ? (
            <tr>
              <td colSpan="11">
                <Loader />
              </td>
            </tr>
          ) : roles.length === 0 ? (
            <tr>
              <td colSpan="11" className="text-center py-5">
                <p className="mt-2 text-muted fw-semibold">No items found</p>
              </td>
            </tr>
          ) : (
            roles?.map((role, index) => {
              return (
                <tr key={role.id}>
                  <td>
                    <div className="ms-4">
                      {" "}
                      {(pagination.currentPage - 1) * pagination.perPage +
                        (index + 1)}
                    </div>
                  </td>
                  <td>{role.role_name}</td>
                  <td>
                    <div className="d-inline-flex gap-2">
                      <Link
                        to={`/super_admin/role-permission/${role.id}`}
                        type="button"
                        className="btn btn-text-secondary rounded-pill btn-icon waves-effect text-decoration-none"
                      >
                        <i className="icon-base ti tabler-article text-info icon-22px"></i>
                      </Link>
                    </div>
                    <div className="d-inline-flex gap-2">
                      <a
                        className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                        aria-expanded="true"
                      >
                        <i className="icon-base ti tabler-dots-vertical icon-20px" />
                      </a>
                      <div className="d-inline-block">
                        <div
                          className="dropdown-menu dropdown-menu-end m-0"
                          style={{
                            position: "absolute",
                            inset: "auto 0px 0px auto",
                            margin: 0,
                            transform: "translate(-24px, -136px)",
                          }}
                          data-popper-placement="top-end"
                        >
                          <button
                            // key={user.id}
                            className="dropdown-item waves-effect"
                            onClick={() => {
                              handleOpen("addNewRole");
                              startEditing(role.id, role.role_name);
                            }}
                          >
                            Edit
                          </button>

                          <div className="dropdown-divider" />
                          <a
                            className="dropdown-item text-danger delete-record waves-effect"
                            onClick={() => deleteRole(role.id)}
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {/* ---------------------END ROLE MASTER TABLE---------------------- */}
    </>
  );
}
