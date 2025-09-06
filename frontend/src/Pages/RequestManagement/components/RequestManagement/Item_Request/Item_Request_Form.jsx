import React from "react";

export default function Item_Request_Form() {
  return (
    <>
      {/* -----------------START ITEM REQUEST FORM---------------- */}
      <>
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* DataTable with Buttons */}
          <div className="card mt-3">
            <div className="row p-3">
              {/* <!--    <div className="col-sm-3 mb-4">
                                <label htmlFor="RequestType" className="form-label">Request Type</label>
                                <select id="RequestType" className="select2 form-select" >
                                    <option value="AK">Material</option>
                                    <option value="HI">Service</option>
                                </select>
                            </div>--> */}
              <div className="col-sm-3 mb-4">
                <label htmlFor="SelectItem" className="form-label">
                  Select Item
                </label>
                <div className="position-relative">
                  <select
                    id="SelectItem"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="SelectItem"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <option value="AK" data-select2-id="2">
                      Item 1
                    </option>
                    <option value="HI">Item 2</option>
                    <option value="HI">Item 3</option>
                    <option value="HI">Item 4</option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="1"
                    style={{ width: "236.75px" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabIndex="0"
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

              <div className="col-sm-3 mb-4">
                <label htmlFor="Category" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Category"
                  placeholder="Category"
                  value="Category 1"
                  disabled=""
                  readonly=""
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
                  value="Subcategory 1"
                  disabled=""
                  readonly=""
                />
              </div>
              <div className="col-sm-3 mb-4">
                <label htmlFor="Code" className="form-label">
                  Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Code"
                  placeholder="Code"
                  value="MAT_STR_SDR_000001"
                  disabled=""
                  readonly=""
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
                  value="Location 1"
                  disabled=""
                  readonly=""
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
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <option value="AK" data-select2-id="4">
                      Purpose 1
                    </option>
                    <option value="HI">Purpose 2</option>
                    <option value="HI">Purpose 3</option>
                    <option value="HI">Purpose 4</option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id="3"
                    style={{ width: "236.75px" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection select2-selection--single"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabIndex="0"
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
              <div className="col-sm-3 mb-4">
                <label htmlFor="Quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="Quantity"
                  placeholder=""
                  min="0"
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
                  value="KG"
                  disabled=""
                  readonly=""
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
              <div className="col-sm-3 mb-4">
                <label htmlFor="ReceivingPerson" className="form-label">
                  Receiving Person
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ReceivingPerson"
                  placeholder=""
                />
              </div>
              {/* <!-- <div className="col-sm-3 mb-4">
                                <label htmlFor="RequestDate" className="form-label">Request Date </label>
                                <input type="date" className="form-control" id="RequestDate" placeholder="" />
                            </div>
--> */}
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

              <div className="col-lg-12 text-end">
                <button className="btn btn-primary waves-effect waves-light">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* -----------------END ITEM REQUEST FORM---------------- */}
    </>
  );
}
