import React from "react";
import { useGroupMasterContext } from "../../../Context/Item Management/GroupMasterContext";
import { useUIContext } from "../../../Context/UIContext";

export default function Group_Master_Table() {
  const { groups, startEditing, deleteGroup } = useGroupMasterContext();
  const { handleOpen } = useUIContext();
  return (
    <>
      {/* -------------------START GROUP MASTER TABLE---------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-2">Sr#</div>
            </th>
            <th scope="col">Group</th>
            <th scope="col" style={{ width: "180px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => {
            return (
              <tr key={group.id}>
                <td>
                  <div className="ms-2">{index + 1}</div>
                </td>
                <td>{group.group_name}</td>
                <td>
                  <div className="d-inline-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#smallModal"
                      onClick={() => {
                        handleOpen("addNewGroup");
                        startEditing(group.id, group.group_name);
                      }}
                    >
                      <i className="icon-base ti tabler-edit icon-22px"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => deleteGroup(group.id)}
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* -------------------END GROUP MASTER TABLE---------------------- */}
    </>
  );
}
