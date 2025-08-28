import React from "react";

export default function SubCategory_Master_Form() {
  return (
    <>
      {/* ---------------START CATEGORY MASTER FORM----------------- */}
      <>
        <div
          className="modal fade show"
          id="smallModal"
          tabIndex="-1"
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
                <h5 className="modal-title" id="exampleModalLabel2">
                  Add Subcategory
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
                      Group
                    </label>
                    <div className="position-relative">
                      <select
                        id="select2Basic"
                        className="select2 form-select select2-hidden-accessible"
                        data-select2-id="select2Basic"
                        tabIndex="-1"
                        aria-hidden="true"
                      >
                        <option value="AK" data-select2-id="10">
                          Group
                        </option>
                        <option value="HI">Group</option>
                        <option value="CA">Group</option>
                        <option value="NV">Group</option>
                      </select>
                      <span
                        className="select2 select2-container select2-container--default"
                        dir="ltr"
                        data-select2-id="9"
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
                              title="Group"
                            >
                              Group
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
                      Category
                    </label>
                    <div className="position-relative">
                      <select
                        id="select3Basic"
                        className="select2 form-select select2-hidden-accessible"
                        data-select2-id="select3Basic"
                        tabIndex="-1"
                        aria-hidden="true"
                      >
                        <option value="AK" data-select2-id="12">
                          Category
                        </option>
                        <option value="HI">Category</option>
                        <option value="CA">Category</option>
                        <option value="NV">Category</option>
                      </select>
                      <span
                        className="select2 select2-container select2-container--default"
                        dir="ltr"
                        data-select2-id="11"
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
                              title="Category"
                            >
                              Category
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
                      Subcategory
                    </label>
                    <input
                      type="text"
                      id="nameSmall"
                      className="form-control"
                      placeholder="Enter Subcategory Name"
                    />
                  </div>
                  {/* Primary */}
                  <div className="col-md-12 mb-4">
                    <label htmlFor="select2info1" className="form-label">
                      Categary Owner
                    </label>
                    <div className="select2-info">
                      <div className="position-relative">
                        <select
                          id="select2info1"
                          className="select2 form-select select2-hidden-accessible"
                          multiple=""
                          data-select2-id="select2info1"
                          tabIndex="-1"
                          aria-hidden="true"
                        >
                          <option value="1" selected="" data-select2-id="14">
                            Option1
                          </option>
                          <option value="2" selected="" data-select2-id="15">
                            Option2
                          </option>
                          <option value="3">Option3</option>
                          <option value="4">Option4</option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id="13"
                          style={{ width: "auto" }}
                        >
                          <span className="selection">
                            <span
                              className="select2-selection select2-selection--multiple"
                              role="combobox"
                              aria-haspopup="true"
                              aria-expanded="false"
                              tabIndex="-1"
                              aria-disabled="false"
                            >
                              <ul className="select2-selection__rendered">
                                <li
                                  className="select2-selection__choice"
                                  title="Option1"
                                  data-select2-id="16"
                                >
                                  <span
                                    className="select2-selection__choice__remove"
                                    role="presentation"
                                  >
                                    ×
                                  </span>
                                  Option1
                                </li>
                                <li
                                  className="select2-selection__choice"
                                  title="Option2"
                                  data-select2-id="17"
                                >
                                  <span
                                    className="select2-selection__choice__remove"
                                    role="presentation"
                                  >
                                    ×
                                  </span>
                                  Option2
                                </li>
                                <li className="select2-search select2-search--inline">
                                  <input
                                    className="select2-search__field"
                                    type="search"
                                    tabIndex="0"
                                    autocomplete="off"
                                    autocorrect="off"
                                    autocapitalize="none"
                                    spellcheck="false"
                                    role="searchbox"
                                    aria-autocomplete="list"
                                    placeholder=""
                                    style={{ width: "0.75em" }}
                                  />
                                </li>
                              </ul>
                            </span>
                          </span>
                          <span
                            className="dropdown-wrapper"
                            aria-hidden="true"
                          ></span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-2">
                    <label htmlFor="prefix" className="form-label">
                      Prefix Code
                    </label>
                    <input
                      type="text"
                      id="prefix"
                      className="form-control"
                      max="3"
                      placeholder="Enter Prefix Code"
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
      {/* ---------------END CATEGORY MASTER FORM----------------- */}
    </>
  );
}
