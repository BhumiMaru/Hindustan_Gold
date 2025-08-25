import React from "react";

export default function PI_Request_Get_Quote() {
  return (
    <>
      {/* ---------------START PI REQUEST GET QUOTE-------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card mt-2">
          <h5 className="m-2">PI Item List</h5>
          <div className="card-datatable">
            <table className="dt-responsive-child table table-bordered">
              <thead>
                <tr>
                  <th>
                    <div className="ms-4">id#</div>
                  </th>
                  <th>PI Date</th>
                  <th>Approval Date</th>
                  <th>Order By</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="ms-4">123</div>
                  </td>
                  <td>05-08-2025</td>
                  <td>05-08-2025</td>
                  <td>Ronak Patel</td>
                  <td>Electrical</td>
                  <td>
                    <span className="badge bg-label-success">Complet</span>
                  </td>
                </tr>
                <tr>
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n                                        .table1 thead tr th {\n                                            padding-block: 0.5rem !important;\n                                            padding-inline-end: 1rem;\n                                        }\n\n                                        .table1 tbody tr {\n                                            background-color: #f9f9f9 !important;\n                                        }\n                                    ",
                    }}
                  />
                  <td colSpan={10} style={{ padding: 0 }}>
                    <table className="table table1 datatables-basic align-middle w-100">
                      <thead>
                        <tr className="bg-label-secondary">
                          <th>
                            <div className="ms-4">Item</div>
                          </th>
                          <th>Qty.</th>
                          <th>UOM</th>
                          <th>Priority</th>
                          <th>Purpose</th>
                          <th>Remarks</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="ms-4">ABCG- STCKER-CHARHER</div>
                          </td>
                          <td>10</td>
                          <td>Nos</td>
                          <td>
                            <span className="badge badge-outline-danger">
                              High
                            </span>
                          </td>
                          <td>
                            <a
                              href="#"
                              type="button"
                              className=""
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              aria-label="Purpose"
                              data-bs-original-title="Purpose"
                            >
                              <i className="icon-base ti tabler-progress-help text-dark  icon-20px" />
                            </a>
                          </td>
                          <td>STCKER-CHARHER</td>
                          <td>
                            <span className="badge bg-label-warning">
                              Pending
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="ms-4">ABCG- STCKER-CHARHER</div>
                          </td>
                          <td>10</td>
                          <td>Nos</td>
                          <td>
                            <span className="badge badge-outline-info">
                              Low
                            </span>
                          </td>
                          <td>
                            <a
                              href="#"
                              type="button"
                              className=""
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              aria-label="Purpose"
                              data-bs-original-title="Purpose"
                            >
                              <i className="icon-base ti tabler-progress-help text-dark  icon-20px" />
                            </a>
                          </td>
                          <td>STCKER-CHARHER</td>
                          <td>
                            <span className="badge bg-label-warning">
                              Pending
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <h5 className="ms-2">Past Vendor List</h5>
            <div className="me-4">
              <button className="btn btn-success btn-sm waves-effect waves-light">
                Bulk Mail Request
              </button>
            </div>
          </div>
          <div className="card-datatable">
            <table className="dt-responsive-child table table-bordered">
              <thead>
                <tr>
                  <th>
                    <div className="ms-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        style={{
                          width: "1rem !important",
                          height: "1rem !important",
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="ms-4">Vendor Id #</div>
                  </th>
                  <th>Name</th>
                  <th>Contact Person</th>
                  <th>Email Id</th>
                  <th>Mobile No</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="ms-4">
                      <input
                        aria-label="Select row"
                        className="form-check-input"
                        type="checkbox"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="ms-4">123</div>
                  </td>
                  <td>TATA</td>
                  <td>PATEL VISHAL</td>
                  <td>Vicichaudhary@gmail.com</td>
                  <td>9904941822</td>
                  <td>
                    <span className="badge bg-label-info">Pending</span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="btn btn-icon  waves-effect waves-light"
                      data-bs-placement="top"
                      aria-label="View Detail"
                      data-bs-original-title="View Detail"
                      data-bs-toggle="modal"
                      data-bs-target="#GetQuoteModel"
                    >
                      <i className="icon-base ti tabler-eye icon-md" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon  waves-effect waves-light"
                      data-bs-placement="top"
                      aria-label="Add Quote"
                      data-bs-original-title="Add Quote"
                      data-bs-toggle="modal"
                      data-bs-target="#AddQuoteModel"
                    >
                      <i className="icon-base ti tabler-receipt-rupee icon-md" />
                    </a>
                    <a
                      href="vendor-fill-quote.html"
                      className="btn btn-info btn-sm waves-effect waves-light"
                    >
                      {" "}
                      Send Request
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="ms-4">
                      <input
                        aria-label="Select row"
                        className="form-check-input"
                        type="checkbox"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="ms-4">123</div>
                  </td>
                  <td>TATA</td>
                  <td>PATEL VISHAL</td>
                  <td>Vicichaudhary@gmail.com</td>
                  <td>9904941822</td>
                  <td>
                    <span className="badge bg-label-info">Pending</span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="btn btn-icon  waves-effect waves-light"
                      data-bs-placement="top"
                      aria-label="View Detail"
                      data-bs-original-title="View Detail"
                      data-bs-toggle="modal"
                      data-bs-target="#GetQuoteModel"
                    >
                      <i className="icon-base ti tabler-eye icon-md" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon  waves-effect waves-light"
                      data-bs-placement="top"
                      aria-label="Add Quote"
                      data-bs-original-title="Add Quote"
                      data-bs-toggle="modal"
                      data-bs-target="#AddQuoteModel"
                    >
                      <i className="icon-base ti tabler-receipt-rupee icon-md" />
                    </a>
                    <button className="btn bg-label-info btn-sm waves-effect waves-light">
                      Quotation Pending
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="ms-4">
                      <input
                        aria-label="Select row"
                        className="form-check-input"
                        type="checkbox"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="ms-4">123</div>
                  </td>
                  <td>TATA</td>
                  <td>PATEL VISHAL</td>
                  <td>Vicichaudhary@gmail.com</td>
                  <td>9904941822</td>
                  <td>
                    <span className="badge bg-label-info">Pending</span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="btn btn-icon  waves-effect waves-light"
                      data-bs-placement="top"
                      aria-label="View Detail"
                      data-bs-original-title="View Detail"
                      data-bs-toggle="modal"
                      data-bs-target="#GetQuoteModel"
                    >
                      <i className="icon-base ti tabler-eye icon-md" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon  waves-effect waves-light"
                      data-bs-placement="top"
                      aria-label="Add Quote"
                      data-bs-original-title="Add Quote"
                      data-bs-toggle="modal"
                      data-bs-target="#AddQuoteModel"
                    >
                      <i className="icon-base ti tabler-receipt-rupee icon-md" />
                    </a>
                    <button className="btn btn-success btn-sm waves-effect waves-light">
                      Vendor Approve
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" d-flex justify-content-between mt-4 ms-2 me-4">
            <div className="d-flex">
              <h5 className="ms-2">Vendor</h5>
              <div className="d-flex ms-6 ">
                <div className="position-relative">
                  <select
                    id="Purpose"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="Purpose"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <option value="AK" selected="" data-select2-id={2}>
                      Select Vendor
                    </option>
                    <option value="HI">Vendor 2</option>
                    <option value="HI">Vendor 3</option>
                    <option value="HI">Vendor 4</option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id={1}
                    style={{ width: 156 }}
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
                          title="Select Vendor"
                        >
                          Select Vendor
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
                <div className="ms-4">
                  <button className="btn btn-success btn-sm waves-effect waves-light">
                    Add
                  </button>
                </div>
                <div className="ms-2">
                  <button
                    className="btn btn-info btn-sm waves-effect waves-light"
                    data-bs-toggle="modal"
                    data-bs-target="#vendorAddModel"
                  >
                    Add New Vendor
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-datatable">
            <table className="dt-responsive-child table table-bordered">
              <thead>
                <tr>
                  <th>
                    <div className="ms-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        style={{
                          width: "1rem !important",
                          height: "1rem !important",
                        }}
                      />
                    </div>
                  </th>
                  <th>
                    <div className="ms-4">Vendor Id #</div>
                  </th>
                  <th>Name</th>
                  <th>Contact Person</th>
                  <th>Email Id</th>
                  <th>Mobile No</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="ms-4">
                      <input
                        aria-label="Select row"
                        className="form-check-input"
                        type="checkbox"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="ms-4">123</div>
                  </td>
                  <td>TATA</td>
                  <td>PATEL VISHAL</td>
                  <td>Vicichaudhary@gmail.com</td>
                  <td>9904941822</td>
                  <td>
                    <span className="badge bg-label-info">Pending</span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="btn btn-icon  waves-effect waves-light"
                      data-bs-placement="top"
                      aria-label="View Detail"
                      data-bs-original-title="View Detail"
                      data-bs-toggle="modal"
                      data-bs-target="#GetQuoteModel"
                    >
                      <i className="icon-base ti tabler-eye icon-md" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon  waves-effect waves-light"
                      data-bs-placement="top"
                      aria-label="Add Quote"
                      data-bs-original-title="Add Quote"
                      data-bs-toggle="modal"
                      data-bs-target="#AddQuoteModel"
                    >
                      <i className="icon-base ti tabler-receipt-rupee icon-md" />
                    </a>
                    <button className="btn btn-info btn-sm waves-effect waves-light">
                      {" "}
                      Send Request
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="ms-4">
                      <input
                        aria-label="Select row"
                        className="form-check-input"
                        type="checkbox"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="ms-4">123</div>
                  </td>
                  <td>TATA</td>
                  <td>PATEL VISHAL</td>
                  <td>Vicichaudhary@gmail.com</td>
                  <td>9904941822</td>
                  <td>
                    <span className="badge bg-label-info">Pending</span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="btn btn-icon  waves-effect waves-light"
                      data-bs-placement="top"
                      aria-label="View Detail"
                      data-bs-original-title="View Detail"
                      data-bs-toggle="modal"
                      data-bs-target="#GetQuoteModel"
                    >
                      <i className="icon-base ti tabler-eye icon-md" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon  waves-effect waves-light"
                      data-bs-placement="top"
                      aria-label="Add Quote"
                      data-bs-original-title="Add Quote"
                      data-bs-toggle="modal"
                      data-bs-target="#AddQuoteModel"
                    >
                      <i className="icon-base ti tabler-receipt-rupee icon-md" />
                    </a>
                    <button className="btn bg-label-info btn-sm waves-effect waves-light">
                      Quotation Pending
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="ms-4">
                      <input
                        aria-label="Select row"
                        className="form-check-input"
                        type="checkbox"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="ms-4">123</div>
                  </td>
                  <td>TATA</td>
                  <td>PATEL VISHAL</td>
                  <td>Vicichaudhary@gmail.com</td>
                  <td>9904941822</td>
                  <td>
                    <span className="badge bg-label-info">Pending</span>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="btn btn-icon  waves-effect waves-light"
                      data-bs-placement="top"
                      aria-label="View Detail"
                      data-bs-original-title="View Detail"
                      data-bs-toggle="modal"
                      data-bs-target="#GetQuoteModel"
                    >
                      <i className="icon-base ti tabler-eye icon-md" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon  waves-effect waves-light"
                      data-bs-placement="top"
                      aria-label="Add Quote"
                      data-bs-original-title="Add Quote"
                      data-bs-toggle="modal"
                      data-bs-target="#AddQuoteModel"
                    >
                      <i className="icon-base ti tabler-receipt-rupee icon-md" />
                    </a>
                    <button className="btn btn-success btn-sm waves-effect waves-light">
                      Vendor Approve
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ---------------END PI REQUEST GET QUOTE-------------------- */}
    </>
  );
}
