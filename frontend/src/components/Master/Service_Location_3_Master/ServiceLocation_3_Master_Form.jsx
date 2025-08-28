import React from "react";

export default function ServiceLocation_3_Master_Form() {
  return (
    <>
      {/* -----------------START SERVICE LOCATION 3 MASTER Form-------------------- */}
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
                Add Service Location 3
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
                <div className="col-md-12 mb-2">
                  <label htmlFor="select2Basic" className="form-label">
                    Service Location 1
                  </label>
                  <div className="position-relative">
                    <select
                      id="select2Basic"
                      className="select2 form-select select2-hidden-accessible"
                      data-select2-id="select2Basic"
                      tabIndex="-1"
                      aria-hidden="true"
                    >
                      <option value="AK" data-select2-id="6">
                        Service Location 1
                      </option>
                      <option value="HI">Service Location 1</option>
                      <option value="CA">Service Location 1</option>
                      <option value="NV">Service Location 1</option>
                    </select>
                    <span
                      className="select2 select2-container select2-container--default"
                      dir="ltr"
                      data-select2-id="5"
                      style={{ width: "auto" }}
                    >
                      <span className="selection">
                        <span
                          className="select2-selection select2-selection--single"
                          role="combobox"
                          aria-haspopup="true"
                          aria-expanded="false"
                          tabIndex="0"
                          aria-disabled="false"
                          aria-labelledby="select2-select2Basic-container"
                        >
                          <span
                            className="select2-selection__rendered"
                            id="select2-select2Basic-container"
                            role="textbox"
                            aria-readonly="true"
                            title="Service Location 1"
                          >
                            Service Location 1
                          </span>
                          <span
                            className="select2-selection__arrow"
                            role="presentation"
                          >
                            <b role="presentation"></b>
                          </span>
                        </span>
                      </span>
                      <span
                        className="dropdown-wrapper"
                        aria-hidden="true"
                      ></span>
                    </span>
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                  <label htmlFor="select3Basic" className="form-label">
                    Service Location 2
                  </label>
                  <div className="position-relative">
                    <select
                      id="select3Basic"
                      className="select2 form-select select2-hidden-accessible"
                      data-select2-id="select3Basic"
                      tabIndex="-1"
                      aria-hidden="true"
                    >
                      <option value="AK" data-select2-id="8">
                        Service Location 2
                      </option>
                      <option value="HI">Service Location 2</option>
                      <option value="CA">Service Location 2</option>
                      <option value="NV">Service Location 2</option>
                    </select>
                    <span
                      className="select2 select2-container select2-container--default"
                      dir="ltr"
                      data-select2-id="7"
                      style={{ width: "auto" }}
                    >
                      <span className="selection">
                        <span
                          className="select2-selection select2-selection--single"
                          role="combobox"
                          aria-haspopup="true"
                          aria-expanded="false"
                          tabIndex="0"
                          aria-disabled="false"
                          aria-labelledby="select2-select3Basic-container"
                        >
                          <span
                            className="select2-selection__rendered"
                            id="select2-select3Basic-container"
                            role="textbox"
                            aria-readonly="true"
                            title="Service Location 2"
                          >
                            Service Location 2
                          </span>
                          <span
                            className="select2-selection__arrow"
                            role="presentation"
                          >
                            <b role="presentation"></b>
                          </span>
                        </span>
                      </span>
                      <span
                        className="dropdown-wrapper"
                        aria-hidden="true"
                      ></span>
                    </span>
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                  <label htmlFor="nameSmall" className="form-label">
                    Service Location 3 Name
                  </label>
                  <input
                    type="text"
                    id="nameSmall"
                    className="form-control"
                    placeholder="Enter Service Location 3 Name"
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
      {/* -----------------END SERVICE LOCATION 3 MASTER Form-------------------- */}
    </>
  );
}
