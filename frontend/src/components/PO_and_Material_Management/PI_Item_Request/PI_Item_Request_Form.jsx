import React from "react";

export default function PI_Item_Request_Form() {
  return (
    <>
      {/* --------------START PI ITEM REQUEST FORM-------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card mt-3 p-3">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12 d-flex justify-content-between">
                  <h4>Item 1 #</h4>
                  <a
                    href="javascript:;"
                    data-bs-toggle="tooltip"
                    className="btn btn-icon delete-record waves-effect waves-light"
                    data-bs-placement="top"
                    aria-label="Delete"
                    data-bs-original-title="Delete"
                  >
                    <i className="icon-base ti tabler-trash text-danger icon-md" />
                  </a>
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="SelectItem" className="form-label">
                    Requested Item
                  </label>
                  <div className="position-relative">
                    <select
                      id="SelectItem"
                      className="select2 form-select"
                      tabIndex={0}
                      aria-hidden="false"
                    >
                      <option value="AK">Item 1</option>
                      <option value="HI">Item 2</option>
                      <option value="HI">Item 3</option>
                      <option value="HI">Item 4</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Category" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Category"
                    placeholder="Category"
                    defaultValue="Category 1"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Subcategory" className="form-label">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Subcategory"
                    placeholder="Subcategory"
                    defaultValue="Subcategory 1"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Quantity" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="Quantity"
                    placeholder=""
                    min={0}
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="UnitofMeasure" className="form-label">
                    Unit of Measure
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="UnitofMeasure"
                    placeholder=""
                    defaultValue="KG"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="ServiceLocation" className="form-label">
                    Service Location{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ServiceLocation"
                    placeholder=""
                    defaultValue="Location 1"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Zone" className="form-label">
                    Zone{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Zone"
                    placeholder=""
                    defaultValue="Zone 1"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Purpose" className="form-label">
                    Purpose
                  </label>
                  <div className="position-relative">
                    <select
                      id="Purpose"
                      className="select2 form-select"
                      tabIndex={0}
                      aria-hidden="false"
                    >
                      <option value="AK">Purpose 1</option>
                      <option value="HI">Purpose 2</option>
                      <option value="HI">Purpose 3</option>
                      <option value="HI">Purpose 4</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Priority" className="form-label">
                    Priority
                  </label>
                  <div className="position-relative">
                    <select
                      id="Priority"
                      className="select2 form-select"
                      tabIndex={0}
                      aria-hidden="false"
                    >
                      <option value="AK">High</option>
                      <option value="HI">Medium</option>
                      <option value="HI">Low</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="RequestDate" className="form-label">
                    Tentative Consumption Day{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="RequestDate"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-6 mb-4">
                  <label htmlFor="Remarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Remarks"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-6 mb-4">
                  <label htmlFor="UploadFile" className="form-label">
                    Upload File (Optional){" "}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="UploadFile"
                    placeholder=""
                  />
                </div>
                <hr />
              </div>
              <div className="row">
                <div className="col-lg-12 d-flex justify-content-between">
                  <h4>Item 2 #</h4>
                  <a
                    href="javascript:;"
                    data-bs-toggle="tooltip"
                    className="btn btn-icon delete-record waves-effect waves-light"
                    data-bs-placement="top"
                    aria-label="Delete"
                    data-bs-original-title="Delete"
                  >
                    <i className="icon-base ti tabler-trash text-danger icon-md" />
                  </a>
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="SelectItem" className="form-label">
                    Requested Item
                  </label>
                  <div className="position-relative">
                    <select
                      id="SelectItem"
                      className="select2 form-select"
                      tabIndex={0}
                      aria-hidden="false"
                    >
                      <option value="AK">Item 1</option>
                      <option value="HI">Item 2</option>
                      <option value="HI">Item 3</option>
                      <option value="HI">Item 4</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Category" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Category"
                    placeholder="Category"
                    defaultValue="Category 1"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Subcategory" className="form-label">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Subcategory"
                    placeholder="Subcategory"
                    defaultValue="Subcategory 1"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Quantity" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="Quantity"
                    placeholder=""
                    min={0}
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="UnitofMeasure" className="form-label">
                    Unit of Measure
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="UnitofMeasure"
                    placeholder=""
                    defaultValue="KG"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="ServiceLocation" className="form-label">
                    Service Location{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ServiceLocation"
                    placeholder=""
                    defaultValue="Location 1"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Zone" className="form-label">
                    Zone{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Zone"
                    placeholder=""
                    defaultValue="Zone 1"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Purpose" className="form-label">
                    Purpose
                  </label>
                  <div className="position-relative">
                    <select
                      id="Purpose"
                      className="select2 form-select"
                      tabIndex={0}
                      aria-hidden="false"
                    >
                      <option value="AK">Purpose 1</option>
                      <option value="HI">Purpose 2</option>
                      <option value="HI">Purpose 3</option>
                      <option value="HI">Purpose 4</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Priority" className="form-label">
                    Priority
                  </label>
                  <div className="position-relative">
                    <select
                      id="Priority"
                      className="select2 form-select"
                      tabIndex={0}
                      aria-hidden="false"
                    >
                      <option value="AK">High</option>
                      <option value="HI">Medium</option>
                      <option value="HI">Low</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="RequestDate" className="form-label">
                    Tentative Consumption Day{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="RequestDate"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-6 mb-4">
                  <label htmlFor="Remarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Remarks"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-6 mb-4">
                  <label htmlFor="UploadFile" className="form-label">
                    Upload File (Optional){" "}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="UploadFile"
                    placeholder=""
                  />
                </div>
                <hr />
              </div>
              <div className="row">
                <div className="col-lg-12 d-flex justify-content-between">
                  <h4>Item 3 #</h4>
                  <a
                    href="javascript:;"
                    data-bs-toggle="tooltip"
                    className="btn btn-icon delete-record waves-effect waves-light"
                    data-bs-placement="top"
                    aria-label="Delete"
                    data-bs-original-title="Delete"
                  >
                    <i className="icon-base ti tabler-trash text-danger icon-md" />
                  </a>
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="SelectItem" className="form-label">
                    Requested Item
                  </label>
                  <div className="position-relative">
                    <select
                      id="SelectItem"
                      className="select2 form-select select2-hidden-accessible"
                      data-select2-id="SelectItem"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <option value="AK" data-select2-id={25}>
                        Item 1
                      </option>
                      <option value="HI">Item 2</option>
                      <option value="HI">Item 3</option>
                      <option value="HI">Item 4</option>
                    </select>
                    <span
                      className="select2 select2-container select2-container--default"
                      dir="ltr"
                      data-select2-id={24}
                      style={{ width: "236.75px" }}
                    >
                      <span className="selection">
                        <span
                          className="select2-selection select2-selection--single"
                          role="combobox"
                          aria-haspopup="true"
                          aria-expanded="false"
                          tabIndex={0}
                          aria-disabled="false"
                          aria-labelledby="select2-SelectItem-container"
                        >
                          <span
                            className="select2-selection__rendered"
                            id="select2-SelectItem-container"
                            role="textbox"
                            aria-readonly="true"
                            title="Item 1"
                          >
                            Item 1
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
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Category" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Category"
                    placeholder="Category"
                    defaultValue="Category 1"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Subcategory" className="form-label">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Subcategory"
                    placeholder="Subcategory"
                    defaultValue="Subcategory 1"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Quantity" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="Quantity"
                    placeholder=""
                    min={0}
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="UnitofMeasure" className="form-label">
                    Unit of Measure
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="UnitofMeasure"
                    placeholder=""
                    defaultValue="KG"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="ServiceLocation" className="form-label">
                    Service Location{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ServiceLocation"
                    placeholder=""
                    defaultValue="Location 1"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Zone" className="form-label">
                    Zone{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Zone"
                    placeholder=""
                    defaultValue="Zone 1"
                    disabled=""
                    readOnly=""
                  />
                </div>
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Purpose" className="form-label">
                    Purpose
                  </label>
                  <div className="position-relative">
                    <select
                      id="Purpose"
                      className="select2 form-select select2-hidden-accessible"
                      data-select2-id="Purpose"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <option value="AK" data-select2-id={30}>
                        Purpose 1
                      </option>
                      <option value="HI">Purpose 2</option>
                      <option value="HI">Purpose 3</option>
                      <option value="HI">Purpose 4</option>
                    </select>
                    <span
                      className="select2 select2-container select2-container--default"
                      dir="ltr"
                      data-select2-id={29}
                      style={{ width: "236.75px" }}
                    >
                      <span className="selection">
                        <span
                          className="select2-selection select2-selection--single"
                          role="combobox"
                          aria-haspopup="true"
                          aria-expanded="false"
                          tabIndex={0}
                          aria-disabled="false"
                          aria-labelledby="select2-Purpose-container"
                        >
                          <span
                            className="select2-selection__rendered"
                            id="select2-Purpose-container"
                            role="textbox"
                            aria-readonly="true"
                            title="Purpose 1"
                          >
                            Purpose 1
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
                <div className="col-sm-3 mb-4">
                  <label htmlFor="Priority" className="form-label">
                    Priority
                  </label>
                  <div className="position-relative">
                    <select
                      id="Priority"
                      className="select2 form-select select2-hidden-accessible"
                      data-select2-id="Priority"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <option value="AK" data-select2-id={34}>
                        High
                      </option>
                      <option value="HI">Medium</option>
                      <option value="HI">Low</option>
                    </select>
                    <span
                      className="select2 select2-container select2-container--default"
                      dir="ltr"
                      data-select2-id={33}
                      style={{ width: "236.75px" }}
                    >
                      <span className="selection">
                        <span
                          className="select2-selection select2-selection--single"
                          role="combobox"
                          aria-haspopup="true"
                          aria-expanded="false"
                          tabIndex={0}
                          aria-disabled="false"
                          aria-labelledby="select2-Priority-container"
                        >
                          <span
                            className="select2-selection__rendered"
                            id="select2-Priority-container"
                            role="textbox"
                            aria-readonly="true"
                            title="High"
                          >
                            High
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
                <div className="col-sm-3 mb-4">
                  <label htmlFor="RequestDate" className="form-label">
                    Tentative Consumption Day{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="RequestDate"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-6 mb-4">
                  <label htmlFor="Remarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Remarks"
                    placeholder=""
                  />
                </div>
                <div className="col-sm-6 mb-4">
                  <label htmlFor="UploadFile" className="form-label">
                    Upload File (Optional){" "}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="UploadFile"
                    placeholder=""
                  />
                </div>
                <hr />
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <button className="btn btn-info waves-effect waves-light">
                Add
              </button>
              <button className="btn btn-primary waves-effect waves-light">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --------------END PI ITEM REQUEST FORM-------------- */}
    </>
  );
}
