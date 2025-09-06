import React from "react";
import { Link } from "react-router-dom";
import { useUIContext } from "../../../../../Context/UIContext";
import { useRoleMaster } from "../../../../../Context/Master/RoleMasterContext";

export default function Role_Master_Table() {
  const { handleOpen } = useUIContext();
  const { roles, startEditing, deleteRole } = useRoleMaster();
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
          {roles.map((role, index) => {
            return (
              <tr key={role.id}>
                <td>
                  <div className="ms-4">{index + 1}</div>
                </td>
                <td>{role.role_name}</td>
                <td>
                  <div className="d-inline-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#smallModal"
                      onClick={() => {
                        handleOpen("addNewRole");
                        startEditing(role.id, role.role_name);
                      }}
                    >
                      <i className="icon-base ti tabler-edit icon-22px"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => deleteRole(role.id)}
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
                    </button>
                    <Link
                      to={`/role-permission/${role.id}`}
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                    >
                      <i className="icon-base ti tabler-article text-info icon-22px"></i>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* ---------------------END ROLE MASTER TABLE---------------------- */}
    </>
  );
}
