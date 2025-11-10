import React from "react";
import { toast } from "react-toastify";
import { useRoleMaster } from "../../../../../Context/Master/RoleMasterContext";
import { useUIContext } from "../../../../../Context/UIContext";
import { validateTextInput } from "../../../../../utils/validation";

export default function Role_Master_Form() {
  const {
    roleName,
    setRoleName,
    roleEditId,
    updateRole,
    createRole,
    setRoleEditId,
  } = useRoleMaster();
  const { handleClose } = useUIContext();

  const handleSubmit = () => {
    const { valid, error } = validateTextInput(roleName);
    if (!valid) {
      toast.error(error);
      return;
    }

    if (roleEditId) {
      updateRole(roleEditId, roleName);
    } else {
      createRole(roleName);
    }
  };

  return (
    <>
      {/* ----------------------START ROLE MASTER FORM------------------------ */}
      <>
        <div
          className="modal fade show"
          id="smallModal"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="modal-dialog modal-sm modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel2">
                  {roleEditId ? "Edit Role" : "Add Role"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    handleClose("addNewRole");
                    setRoleName("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col mb-2">
                    <label htmlFor="nameSmall" className="form-label">
                      Role Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="nameSmall"
                      className="form-control"
                      placeholder="Enter Role Name"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                      required
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
                    handleClose("addNewRole");
                    setRoleName("");
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
      </>
      {/* ----------------------END ROLE MASTER FORM------------------------ */}
    </>
  );
}
