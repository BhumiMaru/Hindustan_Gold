import React from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useInvoice } from "../../../../../Context/PIAndPoManagement/Invoice";

export default function Invoice_List_Form() {
  const { handleClose } = useUIContext();
  const { createInvoice, invoiceData, setInvoiceData } = useInvoice();

  const handleSave = () => {
    createInvoice(payload);
  };

  return (
    <>
      {/* -------------------START INVOICE LIST FORM------------------- */}
      <div
        className="modal fade show"
        id="InvoiceModel"
        tabIndex={-1}
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
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
                  Add Invoice
                </h5>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose("addInvoice")}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-4">
                  <label className="form-label">Sub Category</label>
                  <div className="select2-info">
                    <div className="position-relative">
                      <select
                        id="select2info"
                        className="select2 form-select select2-hidden-accessible"
                        data-select2-id="select2info"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <option value={1} selected="">
                          Option1
                        </option>
                        <option value={2} selected="" data-select2-id={8}>
                          Option2
                        </option>
                        <option value={3}>Option3</option>
                        <option value={4}>Option4</option>
                      </select>
                      <span
                        className="select2 select2-container select2-container--default"
                        dir="ltr"
                        data-select2-id={7}
                        style={{ width: "auto" }}
                      >
                        <span className="selection">
                          <span
                            className="select2-selection select2-selection--single"
                            role="combobox"
                            aria-haspopup="true"
                            aria-expanded="false"
                            tabIndex={0}
                            aria-disabled="false"
                            aria-labelledby="select2-select2info-container"
                          >
                            <span
                              className="select2-selection__rendered"
                              id="select2-select2info-container"
                              role="textbox"
                              aria-readonly="true"
                              title="Option2"
                            >
                              Option2
                            </span>
                            <span
                              className="select2-selection__arrow"
                              role="presentation"
                            >
                              <b role="presentation" />
                            </span>
                          </span>
                        </span>
                        <span className="dropdown-wrapper" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <label className="form-label">Vendor</label>
                  <div className="select2-info">
                    <div className="position-relative">
                      <select
                        id=""
                        className="select2 form-select select2-hidden-accessible"
                        data-select2-id={9}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <option value={1} selected="">
                          Option1
                        </option>
                        <option value={2} selected="" data-select2-id={11}>
                          Option2
                        </option>
                        <option value={3}>Option3</option>
                        <option value={4}>Option4</option>
                      </select>
                      <span
                        className="select2 select2-container select2-container--default"
                        dir="ltr"
                        data-select2-id={10}
                        style={{ width: "auto" }}
                      >
                        <span className="selection">
                          <span
                            className="select2-selection select2-selection--single"
                            role="combobox"
                            aria-haspopup="true"
                            aria-expanded="false"
                            tabIndex={0}
                            aria-disabled="false"
                            aria-labelledby="select2--container"
                          >
                            <span
                              className="select2-selection__rendered"
                              id="select2--container"
                              role="textbox"
                              aria-readonly="true"
                              title="Option2"
                            >
                              Option2
                            </span>
                            <span
                              className="select2-selection__arrow"
                              role="presentation"
                            >
                              <b role="presentation" />
                            </span>
                          </span>
                        </span>
                        <span className="dropdown-wrapper" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <label className="form-label">Invoice Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-lg-4 mt-2">
                  <label className="form-label">Taxable Amount</label>
                  <input type="number" className="form-control" />
                </div>
                <div className="col-lg-4 mt-2">
                  <label className="form-label">TDS Amount</label>
                  <input type="number" className="form-control" />
                </div>
                <div className="col-lg-12 mt-2">
                  <label className="form-label">Remarks</label>
                  <textarea className="form-control" defaultValue={""} />
                </div>
                <div className="col-lg-6 mt-2">
                  <label className="form-label">Invoice Attachment File</label>
                  <input type="file" className="form-control" />
                </div>
                <div className="col-lg-12 mt-4 text-end">
                  <button
                    type="button"
                    className="btn btn-label-secondary waves-effect"
                    data-bs-dismiss="modal"
                    onClick={() => handleClose("addInvoice")}
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
      <div className="modal-backdrop fade show"></div>
      {/* -------------------END INVOICE LIST FORM------------------- */}
    </>
  );
}
