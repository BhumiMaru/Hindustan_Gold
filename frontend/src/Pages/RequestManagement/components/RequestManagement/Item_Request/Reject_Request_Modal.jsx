import React from "react";

export default function Reject_Request_Modal() {
  return (
    <>
      {/* ---------------------START REJECT REQUEST MODAL------------------- */}
      <div
        className="modal fade show"
        id="rejectRemarkModal"
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
              <p className="fs-4">Reject Remark</p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="mx-4 mb-4">
              <label className="form-label">Reject Remark</label>
              <textarea className="form-control" defaultValue={""} />
              {/*  <p class="text-muted small mt-1">This action cannot be undone.</p>*/}
            </div>
            <div className="modal-footer justify-content-center">
              {/*  <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                Cancel
            </button>*/}
              <button
                type="button"
                className="btn btn-info waves-effect waves-light"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------END REJECT REQUEST MODAL------------------- */}
    </>
  );
}
