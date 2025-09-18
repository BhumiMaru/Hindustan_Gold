import React from "react";

export default function Approve_Request_Modal() {
  return (
    <>
      {/* -------------------START APPROVE REQUEST MODAL--------------------- */}
      <div
        className="modal fade show"
        id="servicesModal"
        tabIndex={-1}
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
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body text-center">
              <div className="mb-3">
                <i className="icon-base ti tabler-server-cog icon-46px text-success" />
              </div>
              <h5 className="mb-0">
                Will this service request be completed in-house or by an
                external provider?
              </h5>
              {/*  <p class="text-muted small mt-1">This action cannot be undone.</p>*/}
            </div>
            <div className="modal-footer justify-content-center">
              {/*  <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                Cancel
            </button>*/}
              <button
                type="button"
                className="btn btn-success waves-effect waves-light"
              >
                Yes, in-house
              </button>
              <button
                type="button"
                className="btn btn-info waves-effect waves-light"
              >
                Generate New PI
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* -------------------END APPROVE REQUEST MODAL--------------------- */}
    </>
  );
}
