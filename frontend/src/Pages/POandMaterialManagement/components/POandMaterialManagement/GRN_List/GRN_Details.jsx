import React from "react";

export default function GRN_Details() {
  return (
    <>
      {/* -----------------------START GRN DETAILS----------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center  row-gap-4">
          <div className="d-flex">
            <h6 className="mt-2">Payment Status:&nbsp;</h6>
            <div className="mt-2">
              <span className="badge bg-label-info">Pending</span>
            </div>
            <div className="ms-2">
              <a
                href="#"
                type="button"
                className="btn btn-text-primary rounded-pill btn-icon waves-effect"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Revert to Unpaid"
                data-bs-original-title="Revert to Unpaid"
                onClick={() => {
                  window.location.reload();
                }}
              >
                <i className="icon-base ti tabler-restore text-primary  icon-20px" />
              </a>
            </div>
          </div>
          <div className="d-flex align-content-center flex-wrap gap-4">
            <button
              type="submit"
              className="btn btn-success waves-effect waves-light btn-sm"
            >
              Approve
            </button>
            <button
              type="submit"
              className="btn btn-danger waves-effect waves-light btn-sm"
            >
              Reject
            </button>
            {/*  <div class="d-flex gap-4"><button class="btn btn-label-secondary waves-effect">Discard</button>*/}
            <a
              href="po-create.html"
              className="btn btn-info waves-effect btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#InvoiceModel"
            >
              Add Invoice
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div
                className="card-datatable  pt-0"
                style={{ paddingBlockEnd: "0.01rem!important" }}
              >
                <div className="d-flex justify-content-between mx-4 my-2">
                  <h5 className="">GRN Detail</h5>
                </div>
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n                                        .table2 thead tr th {\n                                            padding-block: 0.5rem !important;\n                                            padding-inline-end: 1rem;\n                                        }\n\n                                        .table2 tbody tr {\n                                            background-color: #fff !important;\n                                        }\n                                    ",
                  }}
                />
                <div className="row ms-2">
                  <div className="col-lg-3">
                    <label className="form-label">GRN ID</label>
                    <p>GRN-0000001</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">GRN Date</label>
                    <p>25-08-2025</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">PO ID</label>
                    <p>PO-0000001</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">PI ID</label>
                    <p>PI-0000001</p>
                  </div>
                </div>
                <table className="table table2 datatables-basic align-middle w-100">
                  <thead>
                    <tr className="bg-label-secondary">
                      <th>
                        <div className="ms-4">Item</div>
                      </th>
                      <th>Qty.</th>
                      <th>UMO</th>
                      <th>Received Qty.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="ms-4">ABCG- STCKER-CHARHER</div>
                      </td>
                      <td>10</td>
                      <td>Nos</td>
                      <td>200</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="ms-4">ABCG- STCKER-CHARHER</div>
                      </td>
                      <td>10</td>
                      <td>Nos</td>
                      <td>200</td>
                    </tr>
                  </tbody>
                </table>
                <div className="row ms-2 mt-2">
                  <div className="col-lg-12">
                    <div className="d-flex">
                      <div className="badge bg-label-danger rounded p-1_5">
                        <i className="icon-base ti tabler-ban icon-md" />
                      </div>
                      <h6 className="mb-0 ms-4 mt-1">Reject Reason</h6>
                    </div>
                    <p className="ms-6 ps-6">Qty Not Avaliable </p>
                  </div>
                </div>
              </div>
            </div>
            {/* DataTable with Buttons */}
            <div className="card mt-4">
              <div
                className="card-datatable  pt-0"
                style={{ paddingBlockEnd: "0.01rem!important" }}
              >
                <div className="mx-4 my-2 d-flex justify-content-between">
                  <h5 className="">Invoice Detail</h5>
                  <div>
                    <div className="badge bg-label-info rounded-3">
                      <img
                        src="assets/img/icons/misc/doc.png"
                        alt="img"
                        width={15}
                        className="me-2"
                      />
                      <span className="h6 mb-0 text-info">invoices.pdf</span>
                    </div>
                    <a
                      href="invoice-list.html"
                      className="badge bg-label-primary rounded p-1_5 mt-1"
                    >
                      <i className="icon-base ti tabler-eye icon-md" />
                    </a>
                  </div>
                </div>
                <div className="row ms-2">
                  <div className="col-lg-3">
                    <label className="form-label">Invoice No</label>
                    <p>INV-0000001</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">Invoice Date</label>
                    <p>25-08-2025</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">Invoice Amount</label>
                    <p>1000</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">TDS Amount</label>
                    <p>2500</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="">
                <h5 className="mx-4 my-2">Vendor Detail</h5>
                <div className="row px-4">
                  <div className="col-lg-6">
                    <label className="form-label">Vendor</label>
                    <p> ABC PVT LTD</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Contact Person</label>
                    <p>Vishal Patel</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Email Id :</label>
                    <p>abc@gmail.com</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Mobile Number : </label>
                    <p>9876564334</p>
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label">Address :</label>
                    <p>791 Crist Parks, Sashabury, IL 86039-9874</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">GST Number</label>
                    <p>24FSFDDFDSS</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">PAN Number</label>
                    <p>DSSFEFDSF</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">
                      MSME Cirtificate Available
                    </label>
                    <p>Yes</p>
                  </div>
                </div>
                <hr />
                <div className=" row px-4">
                  <div className="col-lg-6">
                    <label className="form-label"> Bank Name</label>
                    <p>State Bank Of India</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Account No</label>
                    <p>36000012342</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">IFSC Code</label>
                    <p>SBI0HK08</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Branch Name</label>
                    <p>NARODA</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-4">
              <h5 className="mx-4 my-2">Time Line</h5>
              <div className=" h-100">
                <div className="card-body">
                  <ul className="timeline mb-0">
                    <li className="timeline-item timeline-item-transparent">
                      <span className="timeline-point timeline-point-success" />
                      <div className="timeline-event">
                        <div className="timeline-header mb-3">
                          <h6 className="mb-0">GRN Close</h6>
                          <small className="text-body-secondary">
                            12-03-2025&nbsp;2:45&nbsp;PM
                          </small>
                        </div>
                        <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                          <div className="d-flex flex-wrap align-items-center mb-50">
                            <div className="avatar avatar-sm me-2">
                              <img
                                src="assets/img/avatars/1.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div>
                              <p className="mb-0 small fw-medium">
                                Mitul Patel
                              </p>
                              <small>Store Head</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item timeline-item-transparent">
                      <span className="timeline-point timeline-point-info" />
                      <div className="timeline-event">
                        <div className="timeline-header mb-3">
                          <h6 className="mb-0">Generate GRN</h6>
                          <small className="text-body-secondary">
                            12-03-2025&nbsp;2:45&nbsp;PM
                          </small>
                        </div>
                        <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                          <div className="d-flex flex-wrap align-items-center mb-50">
                            <div className="avatar avatar-sm me-2">
                              <img
                                src="assets/img/avatars/1.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div>
                              <p className="mb-0 small fw-medium">
                                Mitul Patel
                              </p>
                              <small>Store Head</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item timeline-item-transparent">
                      <span className="timeline-point timeline-point-primary" />
                      <div className="timeline-event">
                        <div className="timeline-header mb-3">
                          <h6 className="mb-0">Generate PO</h6>
                          <small className="text-body-secondary">
                            12-03-2025&nbsp;2:45&nbsp;PM
                          </small>
                        </div>
                        <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                          <div className="d-flex flex-wrap align-items-center mb-50">
                            <div className="avatar avatar-sm me-2">
                              <img
                                src="assets/img/avatars/1.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div>
                              <p className="mb-0 small fw-medium">
                                Mitul Patel
                              </p>
                              <small>Category Head</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item timeline-item-transparent">
                      <span className="timeline-point timeline-point-success" />
                      <div className="timeline-event">
                        <div className="timeline-header mb-3">
                          <h6 className="mb-0">Generate Quote</h6>
                          <small className="text-body-secondary">
                            12-03-2025&nbsp;1:25&nbsp;PM
                          </small>
                        </div>
                        <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                          <div className="d-flex flex-wrap align-items-center mb-50">
                            <div className="avatar avatar-sm me-2">
                              <img
                                src="assets/img/avatars/1.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div>
                              <p className="mb-0 small fw-medium">
                                Mitul Patel
                              </p>
                              <small>Plant Head</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item timeline-item-transparent">
                      <span className="timeline-point timeline-point-info" />
                      <div className="timeline-event">
                        <div className="timeline-header mb-3">
                          <h6 className="mb-0">Create PI</h6>
                          <small className="text-body-secondary">
                            11-08-2025&nbsp;11:25&nbsp;AM
                          </small>
                        </div>
                        {/*<p class="mb-2">6 team members in a project</p>*/}
                        <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                          <div className="d-flex flex-wrap align-items-center mb-50">
                            <div className="avatar avatar-sm me-2">
                              <img
                                src="assets/img/avatars/1.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div>
                              <p className="mb-0 small fw-medium">
                                Vishal Patel
                              </p>
                              <small>Staff User</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -----------------------END GRN DETAILS----------------------- */}
    </>
  );
}
