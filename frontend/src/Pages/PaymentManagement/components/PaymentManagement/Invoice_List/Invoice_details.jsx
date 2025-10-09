import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useInvoice } from "../../../../../Context/PIAndPoManagement/Invoice";
import Invoice_Reject from "./Invoice_Reject";
import { useUIContext } from "../../../../../Context/UIContext";
import Mark_as_Paid from "./Mark_as_Paid";
import Payment_Paritals from "./Payment_Paritals";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function Invoice_details() {
  const { id } = useParams();
  const { modal, handleOpen } = useUIContext();
  const {
    invoiceDetail,
    invoiceDetails,
    setInvoiceId,
    InvoiceReject,
    InvoiceApprove,
  } = useInvoice();
  console.log("invoiceDetail", invoiceDetail);

  useEffect(() => {
    invoiceDetails(id);
  }, [id]);
  return (
    <>
      {/* --------------------STRAT INVOICE DETAILS--------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 row-gap-4">
          <div className="d-flex flex-column justify-content-center">
            <div className="d-flex">
              <h6 className="mt-2">Payment Status:&nbsp;</h6>
              <div className="mt-2">
                <span
                  className={`badge  ${
                    invoiceDetail?.status === "Pending"
                      ? "bg-label-warning"
                      : invoiceDetail?.status === "Approve"
                      ? "bg-label-success"
                      : "bg-label-danger"
                  }`}
                >
                  {invoiceDetail?.status}
                </span>
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
                >
                  <i className="icon-base ti tabler-restore text-primary  icon-20px" />
                </a>
              </div>
            </div>
          </div>
          <div className="d-flex align-content-center flex-wrap gap-4">
            {invoiceDetail?.status === "Approve" && (
              <>
                <button
                  type="button"
                  // className={`btn btn-success waves-effect waves-light btn-sm ${
                  //   invoiceDetail.is_payment_advance_or_partial === "No"
                  //     ? "d-block"
                  //     : "d-none"
                  // }`}
                  className="btn btn-success waves-effect waves-light btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#markaspaidModal"
                  onClick={() => handleOpen("markaspaid")}
                >
                  <span className="icon-xs icon-base ti tabler-checks me-2" />
                  Mark as Paid
                </button>
                <button
                  type="button"
                  className={`btn btn-primary waves-effect waves-light btn-sm ${
                    invoiceDetail.is_payment_advance_or_partial === "No"
                      ? "d-none"
                      : ""
                  }`}
                  data-bs-toggle="modal"
                  data-bs-target="#partialModal"
                  onClick={() => handleOpen("paymentPartials")}
                >
                  <span className="icon-xs icon-base ti tabler-plus me-2" />
                  Add Partial Payment
                </button>
              </>
            )}

            <button
              type="button"
              className={`btn btn-success waves-effect waves-light btn-sm ${
                invoiceDetail?.status === "Approve" ||
                invoiceDetail?.status === "Reject"
                  ? "d-none"
                  : ""
              }`}
              onClick={async () => {
                try {
                  await InvoiceApprove({ id: invoiceDetail.id });
                  await invoiceDetails(invoiceDetail.id);
                } catch (error) {
                  console.error("Error approving GRN:", error);
                }
              }}
            >
              Approve
            </button>
            <button
              type="button"
              className={`btn btn-danger waves-effect waves-light btn-sm ${
                invoiceDetail?.status === "Approve" ||
                invoiceDetail?.status === "Reject"
                  ? "d-none"
                  : ""
              }`}
              onClick={() => {
                setInvoiceId(id);
                handleOpen("rejectInvoice");
              }}
            >
              Reject
            </button>
            {/*  <div class="d-flex gap-4"><button class="btn btn-label-secondary waves-effect">Discard</button>*/}
            {/*  <a href="po-create.html" class="btn btn-info waves-effect btn-sm"
                           data-bs-toggle="modal"
                           data-bs-target="#InvoiceModel">Add Invoice</a>*/}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="card ">
              <div
                className="card-datatable  pt-0"
                style={{ paddingBlockEnd: "0.01rem!important" }}
              >
                <div className="mx-4 my-2 d-flex justify-content-between">
                  <h4 className="">Invoice Detail</h4>
                  <div>
                    <div className="badge bg-label-info rounded-3">
                      <img
                        src={`${publicUrl}assets/img/icons/misc/doc.png`}
                        alt="img"
                        width={15}
                        className="me-2"
                      />
                      <span className="h6 mb-0 text-info">
                        {invoiceDetail?.invoice_file}
                      </span>
                    </div>
                    <Link
                      to="/payment-management/invoice-list"
                      className="badge bg-label-primary rounded p-1_5 mt-1"
                    >
                      <i className="icon-base ti tabler-eye icon-md" />
                    </Link>
                  </div>
                </div>
                <div className="row ms-2">
                  <div className="col-lg-3">
                    <label className="form-label">Invoice No</label>
                    <p>{invoiceDetail?.id}</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">Invoice Date</label>
                    <p>{invoiceDetail?.invoice_date}</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">Invoice Amount</label>
                    <p>{invoiceDetail?.taxable_amount}</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">TDS Amount</label>
                    <p>{invoiceDetail?.remarks}</p>
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label">Remark</label>
                    <p className="text-danger">{invoiceDetail?.remarks}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-4">
              <div
                className="card-datatable  pt-0"
                style={{ paddingBlockEnd: "0.01rem!important" }}
              >
                <div className="d-flex justify-content-between mx-4 mt-2">
                  <h4 className="">Payments</h4>
                </div>
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n                                        .table2 thead tr th {\n                                            padding-block: 0.5rem !important;\n                                            padding-inline-end: 1rem;\n                                        }\n\n                                        .table2 tbody tr {\n                                            background-color: #fff !important;\n                                        }\n                                    ",
                  }}
                />
                <table className="table table2 datatables-basic align-middle w-100">
                  <thead>
                    <tr className="bg-label-secondary">
                      <th>
                        <div className="ms-4">Amount</div>
                      </th>
                      <th>Payment Date</th>
                      <th>Remark</th>
                      <th>Attachment </th>
                      <th>Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="ms-4">10000/-</div>
                      </td>
                      <td>13-08-2025</td>
                      <td>Remark</td>
                      <td>
                        <a href="#" className="">
                          <i className="icon-base ti tabler-paperclip icon-20px " />
                        </a>
                      </td>
                      <td>
                        <div className="d-inline-flex gap-2">
                          <div className="d-inline-block">
                            <a
                              href="javascript:;"
                              className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="icon-base ti tabler-dots-vertical icon-20px" />
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-end m-0"
                              style={{}}
                            >
                              <a
                                href="javascript:;"
                                className="dropdown-item waves-effect"
                                data-bs-toggle="modal"
                                data-bs-target="#grnCreateModel"
                              >
                                Edit
                              </a>
                              <div className="dropdown-divider" />
                              <a
                                href="javascript:;"
                                className="dropdown-item text-danger delete-record waves-effect"
                              >
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="ms-4">10000/-</div>
                      </td>
                      <td>13-08-2025</td>
                      <td>Remark</td>
                      <td>
                        <a href="#" className="">
                          <i className="icon-base ti tabler-paperclip icon-20px" />
                        </a>
                      </td>
                      <td>
                        <div className="d-inline-flex gap-2">
                          <div className="d-inline-block">
                            <a
                              href="javascript:;"
                              className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="icon-base ti tabler-dots-vertical icon-20px" />
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-end m-0"
                              style={{}}
                            >
                              <a
                                href="javascript:;"
                                className="dropdown-item waves-effect"
                                data-bs-toggle="modal"
                                data-bs-target="#grnCreateModel"
                              >
                                Edit
                              </a>
                              <div className="dropdown-divider" />
                              <a
                                href="javascript:;"
                                className="dropdown-item text-danger delete-record waves-effect"
                              >
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card mt-4">
              <div
                className="card-datatable  pt-0"
                style={{ paddingBlockEnd: "0.01rem!important" }}
              >
                <div className="d-flex justify-content-between mx-4 mt-2">
                  <h4 className="">GRN Detail</h4>
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
                    <p>{invoiceDetail?.grn?.grn_no}</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">GRN Date</label>
                    <p>{invoiceDetail?.grn?.grn_date}</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">PO ID</label>
                    <p>{invoiceDetail?.po_id}</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">PI ID</label>
                    <p>{invoiceDetail?.pi_request_id}</p>
                  </div>
                </div>
                <table className="table table2 datatables-basic align-middle w-100">
                  <thead>
                    <tr className="bg-label-secondary">
                      <th>
                        <div className="ms-4">Item</div>
                      </th>
                      <th>UMO</th>
                      <th>Received Qty.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceDetail?.grn?.items?.map((item, index) => {
                      return (
                        <tr>
                          <td>
                            <div className="ms-4">
                              {item?.request_item?.item_name}
                            </div>
                          </td>
                          <td> {item?.request_item?.uom}</td>
                          <td> {item?.request_item?.qty}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* DataTable with Buttons */}
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="">
                <h4 className="mx-4 my-2">Vendor Detail</h4>
                <div className="row px-4">
                  <div className="col-lg-6">
                    <label className="form-label">Vendor</label>
                    <p>{invoiceDetail?.vendor?.vendor_name}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Contact Person</label>
                    <p>{invoiceDetail?.vendor?.contact_person_name}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Email Id :</label>
                    <p>{invoiceDetail?.vendor?.email}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Mobile Number : </label>
                    <p>{invoiceDetail?.vendor?.mobile}</p>
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label">Address :</label>
                    <p>{invoiceDetail?.vendor?.address}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">GST Number</label>
                    <p>{invoiceDetail?.vendor?.gst_number}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">PAN Number</label>
                    <p>{invoiceDetail?.vendor?.pan_number}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">
                      MSME Cirtificate Available
                    </label>
                    <p>{invoiceDetail?.vendor?.msme_certificate}</p>
                  </div>
                </div>
                <hr />
                <div className=" row px-4">
                  <div className="col-lg-6">
                    <label className="form-label"> Bank Name</label>
                    <p>{invoiceDetail?.vendor?.bank_name}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Account No</label>
                    <p>{invoiceDetail?.vendor?.account_no}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">IFSC Code</label>
                    <p>{invoiceDetail?.vendor?.ifsc_code}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Branch Name</label>
                    <p>{invoiceDetail?.vendor?.branch_name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-4">
              <h4 className="mx-4 my-2">Vendor Detail</h4>
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
      {modal.rejectInvoice && <Invoice_Reject id={id} />}
      {modal.markaspaid && <Mark_as_Paid id={id} />}
      {modal.paymentPartials && <Payment_Paritals id={id} />}
      {/* --------------------END INVOICE DETAILS--------------------- */}
    </>
  );
}
