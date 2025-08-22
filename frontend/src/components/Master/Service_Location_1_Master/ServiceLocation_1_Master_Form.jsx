import React from "react";

export default function ServiceLocation_1_Master_Form() {
  return (
    <>
      {/* -----------------START SERVICE LOCATION 1 MASTER Form-------------------- */}
      <>
        <div
          className="modal fade show"
          id="smallModal"
          tabindex="-1"
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
                  Add Service Location 1
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col mb-2">
                    <label htmlFor="nameSmall" className="form-label">
                      Service Location 1 Name
                    </label>
                    <input
                      type="text"
                      id="nameSmall"
                      className="form-control"
                      placeholder="Enter Service Location 1 Name"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-label-secondary waves-effect"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* -----------------END SERVICE LOCATION 1 MASTER Form-------------------- */}
    </>
  );
}
