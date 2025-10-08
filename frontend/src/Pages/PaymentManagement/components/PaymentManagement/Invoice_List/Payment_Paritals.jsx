import React from "react";

export default function Payment_Paritals() {
  return (
    <>
      {/* ------------------START PAYMENT PARTIALS--------------------- */}
      <div
        className="modal fade show"
        id="partialModal"
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
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-icon rounded-pill btn-label-info waves-effect"
                >
                  <i className="icon-base ti tabler-file icon-22px" />
                </button>
                <h5 className="modal-title ms-2 mt-2" id="AddQuoteModelLabel2">
                  Add Partial Payment
                </h5>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-12">
                  <label className="form-label">Amount</label>
                  <input type="number" className="form-control" />
                </div>
                <div className="col-lg-12 mt-2">
                  <label className="form-label">Remarks</label>
                  <textarea className="form-control" defaultValue={""} />
                </div>
                <div className="col-lg-12 mt-2">
                  <label className="form-label">Date Of Invoice</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-lg-12 mt-2">
                  <label className="form-label">Payment Slip Attachment </label>
                  <input type="file" className="form-control" />
                </div>
                <div className="col-lg-12 mt-4 text-end">
                  <button
                    type="button"
                    className="btn btn-label-secondary waves-effect"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button className="btn  btn-success ms-2 waves-effect waves-light">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------END PAYMENT PARTIALS--------------------- */}
    </>
  );
}
