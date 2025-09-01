import React from "react";
import { useUIContext } from "../../../Context/UIContext";
import { validateTextInput } from "../../../utils/validation";
import { useGroupMasterContext } from "../../../Context/Item Management/GroupMasterContext";

export default function Group_Master_Form() {
  const { handleClose } = useUIContext();
  const {
    groupName,
    setGroupName,
    groupEditId,
    setgroupEditId,
    createGroup,
    updateGroup,
  } = useGroupMasterContext();

  const handleSubmit = () => {
    const { valid, error } = validateTextInput(groupName);
    if (!valid) {
      toast.error(error);
      return;
    }

    if (groupEditId) {
      updateGroup(groupEditId, groupName);
    } else {
      createGroup(groupName);
    }
    setgroupEditId(null);
    setGroupName("");
    handleClose("addNewGroup");
  };
  return (
    <>
      {/* -------------------START GROUP MASTER FORM---------------------- */}
      <div
        className="modal fade show"
        id="smallModal"
        tabIndex="-1"
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div
          className="modal-dialog modal-sm modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel2">
                {groupEditId ? "Edit Group" : "Add Group"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  handleClose("addNewGroup");
                  setGroupName("");
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col mb-2">
                  <label htmlFor="nameSmall" className="form-label">
                    Group Name
                  </label>
                  <input
                    type="text"
                    id="nameSmall"
                    className="form-control"
                    placeholder="Enter Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-label-secondary waves-effect"
                data-bs-dismiss="modal"
                onClick={() => {
                  handleClose("addNewGroup");
                  setGroupName("");
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
                onClick={handleSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>

      {/* -------------------END GROUP MASTER FORM---------------------- */}
    </>
  );
}
