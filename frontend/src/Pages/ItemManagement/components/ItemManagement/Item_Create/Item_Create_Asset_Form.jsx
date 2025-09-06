import React from "react";

export default function Item_Create_Asset_Form() {
  return (
    <>
      {/* ----------------START ITEM CREATE Asset FORM------------------ */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card h-100 mt-2">
          <div className="card-body">
            <div className="nav-align-top">
              {/* <ul
                className="nav nav-tabs nav-fill rounded-0 timeline-indicator-advanced"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    type="button"
                    className="nav-link waves-effect"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Item"
                    aria-controls="Item"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    Material
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    type="button"
                    className="nav-link waves-effect"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Services"
                    aria-controls="Services"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    Services
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    type="button"
                    className="nav-link waves-effect active"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Assets"
                    aria-controls="Assets"
                    aria-selected="true"
                  >
                    Assets
                  </button>
                </li>
              </ul> */}
              <div className="tab-content border-0  mx-1">
                <div className="tab-pane fade" id="Item" role="tabpanel">
                  <div className="row p-3">
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Group" className="form-label">
                        Group
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Group"
                        placeholder="Group"
                        defaultValue="Group"
                        disabled=""
                        readOnly=""
                      />
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
                        disabled=""
                        defaultValue="Categary"
                        readOnly=""
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Subcategory" className="form-label">
                        Subcategory
                      </label>
                      <div className="position-relative">
                        <select
                          id="Subcategory"
                          className="select2 form-select select2-hidden-accessible"
                          data-select2-id="Subcategory"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value="AK" data-select2-id={2}>
                            Subcategory 1
                          </option>
                          <option value="HI">Subcategory 2</option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={1}
                          style={{ width: "210.75px" }}
                        >
                          <span className="selection">
                            <span
                              className="select2-selection select2-selection--single"
                              role="combobox"
                              aria-haspopup="true"
                              aria-expanded="false"
                              tabIndex={0}
                              aria-disabled="false"
                              aria-labelledby="select2-Subcategory-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-Subcategory-container"
                                role="textbox"
                                aria-readonly="true"
                                title="Subcategory 1"
                              >
                                Subcategory 1
                              </span>
                              <span
                                className="select2-selection__arrow"
                                role="presentation"
                              >
                                <b role="presentation" />
                              </span>
                            </span>
                          </span>
                          <span
                            className="dropdown-wrapper"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Itemname" className="form-label">
                        Item
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Itemname"
                        placeholder="Enter Item Name"
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Zone" className="form-label">
                        Unit Of Measure
                      </label>
                      <div className="position-relative">
                        <select
                          id="Zone"
                          className="select2 form-select select2-hidden-accessible"
                          data-select2-id="Zone"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value="AK" data-select2-id={4}>
                            Kg
                          </option>
                          <option value="HI">Ltr</option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={3}
                          style={{ width: "210.75px" }}
                        >
                          <span className="selection">
                            <span
                              className="select2-selection select2-selection--single"
                              role="combobox"
                              aria-haspopup="true"
                              aria-expanded="false"
                              tabIndex={0}
                              aria-disabled="false"
                              aria-labelledby="select2-Zone-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-Zone-container"
                                role="textbox"
                                aria-readonly="true"
                                title="Kg"
                              >
                                Kg
                              </span>
                              <span
                                className="select2-selection__arrow"
                                role="presentation"
                              >
                                <b role="presentation" />
                              </span>
                            </span>
                          </span>
                          <span
                            className="dropdown-wrapper"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="ItemCode" className="form-label">
                        Item Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ItemCode"
                        placeholder="Item Code"
                        defaultValue="AS-DN-001"
                        disabled=""
                        readOnly=""
                      />
                    </div>
                    <div className="col-sm-6 mb-4">
                      <label htmlFor="Description" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="Description"
                        className="form-control"
                        defaultValue={""}
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label className="form-label">Is Purpose Required?</label>
                      <div>
                        <div className="form-check form-check-inline mt-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio1"
                            defaultValue="option1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio2"
                            defaultValue="option2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio2"
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label className="form-label">
                        Is Approval Required?
                      </label>
                      <div>
                        <div className="form-check form-check-inline mt-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio3"
                            defaultValue="option1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio3"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio4"
                            defaultValue="option2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio4"
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Primary */}
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="select2Primary" className="form-label">
                        Storage Location
                      </label>
                      <div className="select2-primary">
                        <div className="position-relative">
                          <select
                            id="select2Primary"
                            className="select2 form-select select2-hidden-accessible"
                            multiple=""
                            data-select2-id="select2Primary"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value={1} selected="" data-select2-id={6}>
                              Option1
                            </option>
                            <option value={2} selected="" data-select2-id={7}>
                              Option2
                            </option>
                            <option value={3}>Option3</option>
                            <option value={4}>Option4</option>
                          </select>
                          <span
                            className="select2 select2-container select2-container--default"
                            dir="ltr"
                            data-select2-id={5}
                            style={{ width: "210.75px" }}
                          >
                            <span className="selection">
                              <span
                                className="select2-selection select2-selection--multiple"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabIndex={-1}
                                aria-disabled="false"
                              >
                                <ul className="select2-selection__rendered">
                                  <li
                                    className="select2-selection__choice"
                                    title="Option1"
                                    data-select2-id={8}
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
                                    data-select2-id={9}
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
                                      tabIndex={0}
                                      autoComplete="off"
                                      autoCorrect="off"
                                      autoCapitalize="none"
                                      spellCheck="false"
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
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Primary */}
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="select2info" className="form-label">
                        Zone
                      </label>
                      <div className="select2-info">
                        <div className="position-relative">
                          <select
                            id="select2info"
                            className="select2 form-select select2-hidden-accessible"
                            multiple=""
                            data-select2-id="select2info"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value={1} selected="" data-select2-id={11}>
                              Option1
                            </option>
                            <option value={2} selected="" data-select2-id={12}>
                              Option2
                            </option>
                            <option value={3}>Option3</option>
                            <option value={4}>Option4</option>
                          </select>
                          <span
                            className="select2 select2-container select2-container--default"
                            dir="ltr"
                            data-select2-id={10}
                            style={{ width: "210.75px" }}
                          >
                            <span className="selection">
                              <span
                                className="select2-selection select2-selection--multiple"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabIndex={-1}
                                aria-disabled="false"
                              >
                                <ul className="select2-selection__rendered">
                                  <li
                                    className="select2-selection__choice"
                                    title="Option1"
                                    data-select2-id={13}
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
                                    data-select2-id={14}
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
                                      tabIndex={0}
                                      autoComplete="off"
                                      autoCorrect="off"
                                      autoCapitalize="none"
                                      spellCheck="false"
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
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Stock" className="form-label">
                        Stock
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="Stock"
                        placeholder="Stock"
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="StockValue" className="form-label">
                        Stock Value
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="StockValue"
                        placeholder="Stock Value"
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="MinimumStock" className="form-label">
                        Minimum Stock
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="MinimumStock"
                        placeholder="Minimum Stock"
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="status" className="form-label">
                        Status
                      </label>
                      <div className="position-relative">
                        <select
                          id="status"
                          className="select2 form-select select2-hidden-accessible"
                          data-select2-id="status"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value="AK" data-select2-id={16}>
                            Active
                          </option>
                          <option value="HI">Deactive</option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={15}
                          style={{ width: "210.75px" }}
                        >
                          <span className="selection">
                            <span
                              className="select2-selection select2-selection--single"
                              role="combobox"
                              aria-haspopup="true"
                              aria-expanded="false"
                              tabIndex={0}
                              aria-disabled="false"
                              aria-labelledby="select2-status-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-status-container"
                                role="textbox"
                                aria-readonly="true"
                                title="Active"
                              >
                                Active
                              </span>
                              <span
                                className="select2-selection__arrow"
                                role="presentation"
                              >
                                <b role="presentation" />
                              </span>
                            </span>
                          </span>
                          <span
                            className="dropdown-wrapper"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-12 text-end">
                      <button className="btn btn-primary waves-effect waves-light">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="Services" role="tabpanel">
                  <div className="row p-3">
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Group1" className="form-label">
                        Group
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Group1"
                        placeholder="Group"
                        defaultValue="Group"
                        disabled=""
                        readOnly=""
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Category1" className="form-label">
                        Category
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Category1"
                        placeholder="Category"
                        defaultValue="Categary"
                        disabled=""
                        readOnly=""
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Subcategory1" className="form-label">
                        Subcategory
                      </label>
                      <div className="position-relative">
                        <select
                          id="Subcategory1"
                          className="select2 form-select select2-hidden-accessible"
                          data-select2-id="Subcategory1"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value="AK" data-select2-id={18}>
                            Subcategory 1
                          </option>
                          <option value="HI">Subcategory 2</option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={17}
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
                              aria-labelledby="select2-Subcategory1-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-Subcategory1-container"
                                role="textbox"
                                aria-readonly="true"
                                title="Subcategory 1"
                              >
                                Subcategory 1
                              </span>
                              <span
                                className="select2-selection__arrow"
                                role="presentation"
                              >
                                <b role="presentation" />
                              </span>
                            </span>
                          </span>
                          <span
                            className="dropdown-wrapper"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Servicename" className="form-label">
                        Service
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Servicename"
                        placeholder="Enter Service Name"
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="ServiceCode" className="form-label">
                        Service Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ServiceCode"
                        placeholder="Service Code"
                        defaultValue="AS-DN-001"
                        disabled=""
                        readOnly=""
                      />
                    </div>
                    <div className="col-sm-6 mb-4">
                      <label htmlFor="Description1" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="Description1"
                        className="form-control"
                        defaultValue={""}
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label className="form-label">Is Purpose Required?</label>
                      <div>
                        <div className="form-check form-check-inline mt-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio11"
                            defaultValue="option1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio21"
                            defaultValue="option2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio2"
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label className="form-label">
                        Is Approval Required?
                      </label>
                      <div>
                        <div className="form-check form-check-inline mt-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio31"
                            defaultValue="option1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio3"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio41"
                            defaultValue="option2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio4"
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Primary */}
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="ServiceLocation" className="form-label">
                        Service Location
                      </label>
                      <div className="select2-primary">
                        <div className="position-relative">
                          <select
                            id="ServiceLocation"
                            className="select2 form-select select2-hidden-accessible"
                            multiple=""
                            data-select2-id="ServiceLocation"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value={1} selected="" data-select2-id={20}>
                              Option1
                            </option>
                            <option value={2} selected="" data-select2-id={21}>
                              Option2
                            </option>
                            <option value={3}>Option3</option>
                            <option value={4}>Option4</option>
                          </select>
                          <span
                            className="select2 select2-container select2-container--default"
                            dir="ltr"
                            data-select2-id={19}
                            style={{ width: "auto" }}
                          >
                            <span className="selection">
                              <span
                                className="select2-selection select2-selection--multiple"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabIndex={-1}
                                aria-disabled="false"
                              >
                                <ul className="select2-selection__rendered">
                                  <li
                                    className="select2-selection__choice"
                                    title="Option1"
                                    data-select2-id={22}
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
                                    data-select2-id={23}
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
                                      tabIndex={0}
                                      autoComplete="off"
                                      autoCorrect="off"
                                      autoCapitalize="none"
                                      spellCheck="false"
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
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Primary */}
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="select2info1" className="form-label">
                        Zone
                      </label>
                      <div className="select2-info">
                        <div className="position-relative">
                          <select
                            id="select2info1"
                            className="select2 form-select select2-hidden-accessible"
                            multiple=""
                            data-select2-id="select2info1"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value={1} selected="" data-select2-id={25}>
                              Option1
                            </option>
                            <option value={2} selected="" data-select2-id={26}>
                              Option2
                            </option>
                            <option value={3}>Option3</option>
                            <option value={4}>Option4</option>
                          </select>
                          <span
                            className="select2 select2-container select2-container--default"
                            dir="ltr"
                            data-select2-id={24}
                            style={{ width: "auto" }}
                          >
                            <span className="selection">
                              <span
                                className="select2-selection select2-selection--multiple"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabIndex={-1}
                                aria-disabled="false"
                              >
                                <ul className="select2-selection__rendered">
                                  <li
                                    className="select2-selection__choice"
                                    title="Option1"
                                    data-select2-id={27}
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
                                    data-select2-id={28}
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
                                      tabIndex={0}
                                      autoComplete="off"
                                      autoCorrect="off"
                                      autoCapitalize="none"
                                      spellCheck="false"
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
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="status1" className="form-label">
                        Status
                      </label>
                      <div className="position-relative">
                        <select
                          id="status1"
                          className="select2 form-select select2-hidden-accessible"
                          data-select2-id="status1"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value="AK" data-select2-id={30}>
                            Active
                          </option>
                          <option value="HI">Deactive</option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={29}
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
                              aria-labelledby="select2-status1-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-status1-container"
                                role="textbox"
                                aria-readonly="true"
                                title="Active"
                              >
                                Active
                              </span>
                              <span
                                className="select2-selection__arrow"
                                role="presentation"
                              >
                                <b role="presentation" />
                              </span>
                            </span>
                          </span>
                          <span
                            className="dropdown-wrapper"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-12 text-end">
                      <button className="btn btn-primary waves-effect waves-light">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade active show"
                  id="Assets"
                  role="tabpanel"
                >
                  <div className="row p-3">
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Group12" className="form-label">
                        Group
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Group12"
                        placeholder="Group"
                        defaultValue="Group"
                        disabled=""
                        readOnly=""
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="AssetCategory1" className="form-label">
                        Asset Category
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="AssetCategory1"
                        placeholder="Category"
                        defaultValue="Categary"
                        disabled=""
                        readOnly=""
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Subcategory12" className="form-label">
                        Subcategory
                      </label>
                      <div className="position-relative">
                        <select
                          id="Subcategory12"
                          className="select2 form-select select2-hidden-accessible"
                          data-select2-id="Subcategory12"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value="AK" data-select2-id={32}>
                            Subcategory 1
                          </option>
                          <option value="HI">Subcategory 2</option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={31}
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
                              aria-labelledby="select2-Subcategory12-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-Subcategory12-container"
                                role="textbox"
                                aria-readonly="true"
                                title="Subcategory 1"
                              >
                                Subcategory 1
                              </span>
                              <span
                                className="select2-selection__arrow"
                                role="presentation"
                              >
                                <b role="presentation" />
                              </span>
                            </span>
                          </span>
                          <span
                            className="dropdown-wrapper"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Assetname" className="form-label">
                        Asset
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Assetname"
                        placeholder="Enter Asset Name"
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="AssetCode" className="form-label">
                        Asset Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="AssetCode"
                        placeholder="Service Code"
                        defaultValue="AS-DN-001"
                        disabled=""
                        readOnly=""
                      />
                    </div>
                    <div className="col-sm-6 mb-4">
                      <label htmlFor="Description12" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="Description12"
                        className="form-control"
                        defaultValue={""}
                      />
                    </div>
                    {/* Primary */}
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="ServiceLocation12" className="form-label">
                        Service Location
                      </label>
                      <div className="select2-primary">
                        <div className="position-relative">
                          <select
                            id="ServiceLocation12"
                            className="select2 form-select select2-hidden-accessible"
                            multiple=""
                            data-select2-id="ServiceLocation12"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value={1} selected="" data-select2-id={34}>
                              Option1
                            </option>
                            <option value={2} selected="" data-select2-id={35}>
                              Option2
                            </option>
                            <option value={3}>Option3</option>
                            <option value={4}>Option4</option>
                          </select>
                          <span
                            className="select2 select2-container select2-container--default"
                            dir="ltr"
                            data-select2-id={33}
                            style={{ width: "auto" }}
                          >
                            <span className="selection">
                              <span
                                className="select2-selection select2-selection--multiple"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabIndex={-1}
                                aria-disabled="false"
                              >
                                <ul className="select2-selection__rendered">
                                  <li
                                    className="select2-selection__choice"
                                    title="Option1"
                                    data-select2-id={36}
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
                                    data-select2-id={37}
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
                                      tabIndex={0}
                                      autoComplete="off"
                                      autoCorrect="off"
                                      autoCapitalize="none"
                                      spellCheck="false"
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
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label className="form-label">Is Movable?</label>
                      <div>
                        <div className="form-check form-check-inline mt-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio112"
                            defaultValue="option1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio212"
                            defaultValue="option2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio2"
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Primary */}
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="select2info112" className="form-label">
                        Zone
                      </label>
                      <div className="select2-info">
                        <div className="position-relative">
                          <select
                            id="select2info112"
                            className="select2 form-select select2-hidden-accessible"
                            multiple=""
                            data-select2-id="select2info112"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value={1} selected="" data-select2-id={39}>
                              Option1
                            </option>
                            <option value={2} selected="" data-select2-id={40}>
                              Option2
                            </option>
                            <option value={3}>Option3</option>
                            <option value={4}>Option4</option>
                          </select>
                          <span
                            className="select2 select2-container select2-container--default"
                            dir="ltr"
                            data-select2-id={38}
                            style={{ width: "auto" }}
                          >
                            <span className="selection">
                              <span
                                className="select2-selection select2-selection--multiple"
                                role="combobox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabIndex={-1}
                                aria-disabled="false"
                              >
                                <ul className="select2-selection__rendered">
                                  <li
                                    className="select2-selection__choice"
                                    title="Option1"
                                    data-select2-id={41}
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
                                    data-select2-id={42}
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
                                      tabIndex={0}
                                      autoComplete="off"
                                      autoCorrect="off"
                                      autoCapitalize="none"
                                      spellCheck="false"
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
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="PurchaseDate" className="form-label">
                        Purchase Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="PurchaseDate"
                        placeholder="Purchase Date"
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="WarrantyExpiry" className="form-label">
                        Warranty Expiry
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="WarrantyExpiry"
                        placeholder="Warranty Expiry Date"
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
                        placeholder="Enter Quantity"
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="status12" className="form-label">
                        Status
                      </label>
                      <div className="position-relative">
                        <select
                          id="status12"
                          className="select2 form-select select2-hidden-accessible"
                          data-select2-id="status12"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <option value="AK" data-select2-id={44}>
                            Active
                          </option>
                          <option value="HI">Deactive</option>
                        </select>
                        <span
                          className="select2 select2-container select2-container--default"
                          dir="ltr"
                          data-select2-id={43}
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
                              aria-labelledby="select2-status12-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-status12-container"
                                role="textbox"
                                aria-readonly="true"
                                title="Active"
                              >
                                Active
                              </span>
                              <span
                                className="select2-selection__arrow"
                                role="presentation"
                              >
                                <b role="presentation" />
                              </span>
                            </span>
                          </span>
                          <span
                            className="dropdown-wrapper"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-12 text-end">
                      <button className="btn btn-primary waves-effect waves-light">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------END ITEM CREATE Asset FORM------------------ */}
    </>
  );
}
