import React, { useState } from "react";
import { toast } from "react-toastify";
import { useUIContext } from "../../../../../Context/UIContext";
import { useDepartment } from "../../../../../Context/Master/DepartmentContext";
import { validateTextInput } from "../../../../../utils/validation";

export default function DepartmentForm() {
  const { handleClose } = useUIContext();
  const {
    deptName,
    updateDepartment,
    addDepartment,
    setDeptName,
    fetchDepartments,
    deptEditId,
    setDeptEditId,
  } = useDepartment();

  // Add or Update Department
  const handleSave = async () => {
    const { valid, error } = validateTextInput(deptName);
    if (!valid) {
      toast.error(error);
      return;
    }

    try {
      if (deptEditId) {
        await updateDepartment(deptEditId, deptName);
        toast.success("Department updated successfully ✅");
      } else {
        await addDepartment(deptName);
        toast.success("Department added successfully ✅");
      }

      // ✅ Close modal after save
      handleClose("addNewDepartment");
      fetchDepartments();

      // ✅ Reset form
      setDeptName("");
      setDeptEditId(null);
    } catch (err) {
      toast.error("Something went wrong while saving department ❌");
      console.error(err);
    }
  };

  return (
    <>
      {/* ----------------Start Department Add/Edit Form [Popup Modal]-------------------- */}
      <div
        className="modal fade show"
        id="smallModal"
        tabIndex={-1}
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
                {deptEditId ? "Edit Department" : "Add Department"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  handleClose("addNewDepartment");
                  setDeptName("");
                }}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col mb-2">
                  <label htmlFor="nameSmall" className="form-label">
                    Department Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="nameSmall"
                    className="form-control"
                    placeholder="Enter Department Name"
                    value={deptName}
                    onChange={(e) => setDeptName(e.target.value)}
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
                  handleClose("addNewDepartment");
                  setDeptName("");
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
                onClick={handleSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* ----------------End Department Add/Edit Form [Popup Modal]-------------------- */}
    </>
  );
}
