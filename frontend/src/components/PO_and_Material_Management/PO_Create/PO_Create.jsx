import React from "react";

export default function PO_Create() {
  return (
    <>
      {/* --------------------START PO CREATE ----------------------- */}
      <div className="flex-grow-1 container-p-y container-fluid">
        <div className="row invoice-preview">
          <div className="card invoice-preview-card p-sm-12 p-6">
            <div className="card-body invoice-preview-header rounded">
              <div className="d-flex flex-wrap flex-column flex-sm-row justify-content-between text-heading">
                <div className="mb-md-0 mb-6">
                  <div className="d-flex svg-illustration mb-6 gap-2 align-items-center">
                    {/* <span class="app-brand-logo demo">
                                         <span class="text-primary">
                                           <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path fill-rule="evenodd" clip-rule="evenodd" d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z" fill="currentColor"></path>
                                             <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd" d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z" fill="#161616"></path>
                                             <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd" d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z" fill="#161616"></path>
                                             <path fill-rule="evenodd" clip-rule="evenodd" d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z" fill="currentColor"></path>
                                           </svg>
                                         </span>
                                       </span>
                                           <span class="app-brand-text fw-bold fs-4 ms-50">Vuexy</span>*/}
                    <div>
                      <img
                        src="assets/img/logo_vertical.png"
                        style={{ height: 86 }}
                      />
                    </div>
                  </div>
                  <p className="mb-2">Office 149, 450 South Brand Brooklyn</p>
                  <p className="mb-2">San Diego County, CA 91905, USA</p>
                  <p className="mb-3">+1 (123) 456 7891, +44 (876) 543 2198</p>
                </div>
                <div className="col-md-5 col-8 pe-0 ps-0 ps-md-2">
                  <dl className="row mb-0 gx-4">
                    <dt className="col-sm-5 mb-2 d-md-flex align-items-center justify-content-end">
                      <span className="h5 text-capitalize mb-0 text-nowrap">
                        PO Number
                      </span>
                    </dt>
                    <dd className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        disabled=""
                        placeholder="#3905"
                        defaultValue="#3905"
                        id="invoiceId"
                      />
                    </dd>
                    <dt className="col-sm-5 mb-1 d-md-flex align-items-center justify-content-end">
                      <span className="fw-normal">PO Date:</span>
                    </dt>
                    <dd className="col-sm-7">
                      <input
                        type="date"
                        className="form-control invoice-date"
                        placeholder="DD/MM/YYYY"
                      />
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="card-body px-0">
              <div className="row">
                <div className="col-md-6 col-sm-5 col-12 mb-sm-0 mb-6">
                  {/*  <h6>Invoice To:</h6>*/}
                  <select className="form-select mb-4 w-50">
                    <option value="">Select Vendor</option>
                    <option value="Wesley Burland">Wesley Burland</option>
                    <option value="Vladamir Koschek">Vladamir Koschek</option>
                    <option value="Tyne Widmore">Tyne Widmore</option>
                  </select>
                  <p className="mb-1">Shelby Company Limited</p>
                  <p className="mb-1">Small Heath, B10 0HF, UK</p>
                  <p className="mb-1">718-986-6062</p>
                  <p className="mb-0">peakyFBlinders@gmail.com</p>
                </div>
                <div className="col-md-6 col-sm-7">
                  {/*  <h6>Bill To:</h6>*/}
                  <table>
                    <tbody>
                      <tr>
                        <td className="pe-4">Contact Person:</td>
                        <td>Vishal Patel</td>
                      </tr>
                      <tr>
                        <td className="pe-4">Mobile Number:</td>
                        <td>9904941822</td>
                      </tr>
                      <tr>
                        <td className="pe-4">GST Number:</td>
                        <td>24GSDTSJAGD7A</td>
                      </tr>
                      <tr>
                        <td className="pe-4">PAN Number:</td>
                        <td>GSDTSJAGD7A</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-2 d-flex">
                    <div>
                      <span className="badge bg-label-primary  mt-3">
                        Is Payment Advance Or Partial
                      </span>
                    </div>
                    &nbsp;
                    <select className="form-select mt-2 w-25 form-select-sm">
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body pt-0 px-0">
              <form className="source-item">
                <div className="mb-4" data-repeater-list="group-a">
                  <table className="table">
                    <thead>
                      {/*style="margin-right: -35px;"*/}
                      {/*class="d-flex align-items-center gap-2"*/}
                      <tr>
                        <th>Sr.#</th>
                        <th>Item</th>
                        <th>Indent No</th>
                        <th>Description</th>
                        <th>Qty.</th>
                        <th>UOM</th>
                        <th>
                          <span>Unit&nbsp;Price</span>
                          <select className="form-select-sm w-auto">
                            <option value="">Select</option>
                            <option value="inr">INR(₹)</option>
                            <option value="dollar">Dollar($)</option>
                          </select>
                        </th>
                        <th>Disc(%)</th>
                        <th>Disc(₹)</th>
                        <th>GST(%)</th>
                        <th>GST(₹)</th>
                        <th>Taxable Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>LAB2766</td>
                        <td>88</td>
                        <td>Cole Parmer-NCSF000861</td>
                        <td>1</td>
                        <td>Nos</td>
                        <td>26975</td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 61 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 61 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                        <td>26975</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>LAB2766</td>
                        <td>88</td>
                        <td>Cole Parmer-NCSF000861</td>
                        <td>1</td>
                        <td>Nos</td>
                        <td>26975</td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 61 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 61 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                        <td>26975</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>LAB2766</td>
                        <td>88</td>
                        <td>Cole Parmer-NCSF000861</td>
                        <td>1</td>
                        <td>Nos</td>
                        <td>26975</td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 61 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 61 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                        <td>26975</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>LAB2766</td>
                        <td>88</td>
                        <td>Cole Parmer-NCSF000861</td>
                        <td>1</td>
                        <td>Nos</td>
                        <td>26975</td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 61 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 61 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                        <td>26975</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>LAB2766</td>
                        <td>88</td>
                        <td>Cole Parmer-NCSF000861</td>
                        <td>1</td>
                        <td>Nos</td>
                        <td>26975</td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 61 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 61 }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                        <td>26975</td>
                      </tr>
                      <tr>
                        <td colSpan={12}>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary waves-effect waves-light"
                            data-repeater-create=""
                          >
                            <i className="icon-base ti tabler-plus icon-xs me-1_5" />
                            Add Item
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2} className="text-end">
                          <span className="w-px-100">
                            Total&nbsp;Discount&nbsp;:
                          </span>
                        </td>
                        <td>
                          <span className="fw-medium text-heading">
                            50000/-
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <div>
                              <input
                                type="checkbox"
                                className="form-check form-check"
                              />
                            </div>
                            &nbsp;
                            <span className="mt-1">
                              Packing&nbsp;Charge&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">
                              Packing&nbsp;GST&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <div>
                              <input
                                type="checkbox"
                                className="form-check form-check"
                              />
                            </div>
                            &nbsp;
                            <span className="mt-1">
                              Fright&nbsp;Charge&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">Fright&nbsp;GST&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex">
                            <div>
                              <input
                                type="checkbox"
                                className="form-check form-check"
                              />
                            </div>
                            &nbsp;
                            <span className="mt-1">
                              Additional&nbsp;Charge&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <button
                              type="button"
                              className="btn btn-sm btn-primary waves-effect waves-light"
                              data-repeater-create=""
                            >
                              <i className="icon-base ti tabler-plus icon-xs me-1_5" />
                              Add&nbsp;Charge
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Emter Charge Name"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">Sub&nbsp;Total&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex ">
                            <span className="mt-1">₹ 132630.00</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">GST&nbsp;Value&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex ">
                            <span className="mt-1">₹ 132630.00</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">Total&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <span className="mt-1">₹ 132630.00</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
            <hr className="my-0" />
            <div className="card-body px-0 pb-0">
              <h5 className="my-0">Terms &amp; Conditions</h5>
              <label className="form-label">Payment</label>
              <div className="row mb-2">
                <div className="col-4">
                  <div>
                    <div className="d-flex">
                      <select
                        className="form-select form-control form-select-sm"
                        style={{ width: 100 }}
                      >
                        <option value="">0%</option>
                        <option value="">10%</option>
                        <option value="">20%</option>
                      </select>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        aria-label="Text input with segmented dropdown button "
                      />
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary waves-effect waves-light"
                    data-repeater-create=""
                  >
                    <i className="icon-base ti tabler-plus icon-xs me-1_5" />
                    Payment&nbsp;Milestone
                  </button>
                </div>
              </div>
              <label className="form-label">Taxes:</label>
              <div className="row mb-2">
                <div className="col-6">
                  <div>
                    <div className="d-flex">
                      <select
                        className="form-select form-control form-select-sm"
                        style={{ width: 100 }}
                      >
                        <option value="">0%</option>
                        <option value="">10%</option>
                        <option value="">20%</option>
                      </select>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        aria-label="Text input with segmented dropdown button "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <label className="form-label">Guarantee and Warranty:</label>
              <div className="row mb-2">
                <div className="col-6">
                  <div>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      aria-label="Text input with segmented dropdown button "
                      placeholder="Enter Guarantee and Warranty"
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-4">
                  <div>
                    <label className="form-label">
                      Loading and freight charges:
                    </label>
                    <select className="form-select mb-4 form-select-sm">
                      <option value="">Select</option>
                      <option value="Wesley Burland">Applicable</option>
                      <option value="Vladamir Koschek">Not Applicable</option>
                    </select>
                  </div>
                </div>
                <div className="col-4">
                  <div>
                    <label className="form-label">Installation at Site:</label>
                    <select className="form-select mb-4 form-select-sm">
                      <option value="">Select</option>
                      <option value="Wesley Burland">Applicable</option>
                      <option value="Vladamir Koschek">Not Applicable</option>
                    </select>
                  </div>
                </div>
                <div className="col-4">
                  <div>
                    <label className="form-label">Delivery:</label>
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        aria-label="Text input with segmented dropdown button "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-0" />
            <div className="row mb-2">
              <div className="col-12">
                <div>
                  <label className="form-label">Introduction:</label>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      aria-label="Text input with segmented dropdown button "
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 mt-2 text-end">
                <button className="btn btn-success waves-effect waves-light">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------END PO CREATE ----------------------- */}
    </>
  );
}
