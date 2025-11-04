import React from "react";
import { useGroupMasterContext } from "../../../../../Context/ItemManagement/GroupMasterContext";
import { useUIContext } from "../../../../../Context/UIContext";
import Loader from "../../../../../components/Common/Loader/Loader";

export default function Group_Master_Table() {
  const { groups, startEditing, deleteGroup, pagination, loading } =
    useGroupMasterContext();
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
          {loading ? (
            <tr>
              <td colSpan="11">
                <Loader />
              </td>
            </tr>
          ) : (
            groups.map((group, index) => {
              return (
                <tr key={group?.id}>
                  <td>
                    <div className="ms-2">
                      {" "}
                      {(pagination.currentPage - 1) * pagination.perPage +
                        (index + 1)}
                    </div>
                  </td>
                  <td>{group?.group_name}</td>
                  {/* <td>
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
                </td> */}
                  <td>
                    <div className="d-inline-flex gap-2">
                      <a
                        className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="icon-base ti tabler-dots-vertical icon-20px"></i>
                      </a>
                      <div className="d-inline-block">
                        <div className="dropdown-menu dropdown-menu-end m-0">
                          <button
                            className="dropdown-item waves-effect"
                            onClick={() => {
                              handleOpen("addNewGroup");
                              startEditing(group?.id, group?.group_name);
                            }}
                          >
                            Edit
                          </button>
                          {/* <a
                          href="#"
                          className="dropdown-item waves-effect"
                          data-bs-toggle="modal"
                          data-bs-target="#grnCreateModel"
                          onClick={() => {
                            handleOpen("viewSubCategory");
                            setSubCategoryData(subCat);
                          }}
                        >
                          View
                        </a> */}
                          {/* <div className="dropdown-divider"></div> */}
                          <a
                            className="dropdown-item text-danger delete-record waves-effect"
                            onClick={() => deleteGroup(group?.id)}
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
      {/* -------------------END GROUP MASTER TABLE---------------------- */}
    </>
  );
}
