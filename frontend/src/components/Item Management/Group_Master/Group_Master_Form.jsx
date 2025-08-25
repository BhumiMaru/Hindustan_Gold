import React from "react";

export default function Group_Master_Form() {
  return (
    <>
      {/* -------------------START GROUP MASTER FORM---------------------- */}
      <div
        class="modal fade show"
        id="smallModal"
        tabindex="-1"
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div
          class="modal-dialog modal-sm modal-dialog-centered"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel2">
                Add Group
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col mb-2">
                  <label for="nameSmall" class="form-label">
                    Group Name
                  </label>
                  <input
                    type="text"
                    id="nameSmall"
                    class="form-control"
                    placeholder="Enter Group Name"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-label-secondary waves-effect"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary waves-effect waves-light"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------END GROUP MASTER FORM---------------------- */}
    </>
  );
}
