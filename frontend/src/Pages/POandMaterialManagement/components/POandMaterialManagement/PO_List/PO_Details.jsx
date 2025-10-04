import React, { useEffect } from "react";
import { usePOCreate } from "../../../../../Context/PIAndPoManagement/POCreate";
import { Link, useParams } from "react-router-dom";
import { useUIContext } from "../../../../../Context/UIContext";
import PO_Reject_Modal from "./PO_Reject_Modal";

export default function PO_Details() {
  const { id } = useParams();
  const { handleOpen, modal } = useUIContext();
  const { poDetails, setPoDetails, getPoDetails, PoApprove, PoId, setPoId } =
    usePOCreate();

  useEffect(() => {
    getPoDetails(id);
  }, [id]);

  useEffect(() => {
    // enable Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }, [poDetails]);

  console.log("poDetails", poDetails.id);
  return (
    <>
      {/* ------------------------START PO DETAILS--------------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
          <div className="d-flex flex-column justify-content-center"></div>
          <div className="d-flex align-content-center flex-wrap gap-4">
            <button
              type="submit"
              className={`btn btn-success waves-effect waves-light btn-sm ${
                poDetails.status === "Approve" || poDetails.status === "Reject"
                  ? "d-none"
                  : ""
              }`}
              onClick={async () => {
                PoApprove(poDetails.id);
                await getPoDetails(poDetails.id);
              }}
            >
              Approve
            </button>
            <button
              type="submit"
              className={`btn btn-danger waves-effect waves-light btn-sm ${
                poDetails.status === "Approve" || poDetails.status === "Reject"
                  ? "d-none"
                  : ""
              }`}
              onClick={() => {
                handleOpen("viewRejectPo");
                setPoId(poDetails.id);
              }}
            >
              Reject
            </button>
            {/*  <div class="d-flex gap-4"><button class="btn btn-label-secondary waves-effect">Discard</button>*/}
            {poDetails.status === "Reject" ? (
              <>
                <span className="text-danger">
                  Remarks: {poDetails.reject_reason}
                </span>
              </>
            ) : (
              <>
                <Link
                  to={`/po-material/po-create/${poDetails.id}`}
                  className={`btn btn-warning waves-effect btn-sm ${
                    poDetails.status === "Reject" ||
                    poDetails.status === "Approve" ||
                    (poDetails.status === "Pending" && "d-none")
                  }`}
                >
                  Generate PO
                </Link>
                <button
                  className={`btn btn-info waves-effect btn-sm ${
                    poDetails.status === "Reject" ||
                    poDetails.status === "Approve" ||
                    (poDetails.status === "Pending" && "d-none")
                  }`}
                >
                  Generate GRN
                </button>
                <button
                  type="submit"
                  className={`btn btn-label-success waves-effect btn-sm ${
                    poDetails.status === "Reject" ||
                    poDetails.status === "Approve" ||
                    (poDetails.status === "Pending" && "d-none")
                  }`}
                >
                  {" "}
                  <i className="icon-base ti tabler-download icon-md me-2" />{" "}
                  Download PO
                </button>
              </>
            )}
            {/* {poDetails.status === "Approve" && (
              <>
                <Link
                  to={`/po-material/po-create/${poDetails.id}`}
                  className={`btn btn-warning waves-effect btn-sm ${
                    poDetails.status === "Reject" && "d-none"
                  }`}
                >
                  Generate PO
                </Link>
                <button
                  className={`btn btn-info waves-effect btn-sm ${
                    poDetails.status === "Reject" && "d-none"
                  }`}
                >
                  Generate GRN
                </button>
                <button
                  type="submit"
                  className={`btn btn-label-success waves-effect btn-sm ${
                    poDetails.status === "Reject" && "d-none"
                  }`}
                >
                  {" "}
                  <i className="icon-base ti tabler-download icon-md me-2" />{" "}
                  Download PO
                </button>
              </>
            )} */}
          </div>
        </div>
        <div className="row">
          {/* PO DETAILS */}
          <div className="col-lg-8">
            <div className="card">
              <div
                className="card-datatable table-responsive pt-0"
                style={{ paddingBlockEnd: "0.01rem!important" }}
              >
                <div className="d-flex justify-content-between mx-4 mt-2">
                  <h5 className="">PO Detail</h5>
                  <div className="d-flex">
                    <div>
                      <span
                        className={`badge ${
                          poDetails.status === "Reject"
                            ? "bg-label-danger"
                            : "bg-label-success"
                        } mt-2`}
                      >
                        {poDetails.status}
                        {/* {poDetails.status === "Reject"
                          ? `Remarks: ${poDetails.reject_reason}`
                          : poDetails.status} */}
                      </span>
                    </div>
                    <p className="mt-2">&nbsp;&nbsp;{poDetails.po_number}</p>
                  </div>
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
                        <div className="ms-4">Item</div>
                      </th>
                      <th>Qty.</th>
                      <th>UMO</th>
                      <th>Unit Price</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {poDetails?.items?.map((poDetails, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="ms-4">{poDetails.item_name}</div>
                          </td>
                          <td>{poDetails.qty}</td>
                          <td>{poDetails.uom}</td>
                          <td>{poDetails.unit_price}</td>
                          <td>{poDetails.item_name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* DataTable with Buttons */}
            <div className="card mt-4">
              <div
                className="card-datatable table-responsive pt-0"
                style={{ paddingBlockEnd: "0.01rem!important" }}
              >
                <div className="mx-4 my-2 d-flex justify-content-between">
                  <h5 className="">PI Detail</h5>
                  <div>
                    <Link
                      to={`/po-material/pi-request-get-quote/${poDetails?.pirequest?.id}`}
                      className="badge bg-label-success rounded p-1_5 mt-1"
                    >
                      <i className="icon-base ti tabler-eye icon-md" />
                    </Link>
                  </div>
                </div>
                <table className="dt-responsive-child table table-bordered">
                  <thead>
                    <tr>
                      <th>
                        <div className="ms-4">id#</div>
                      </th>
                      <th>Approval Date</th>
                      <th>Order By</th>
                      <th>Department</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="ms-4">{poDetails?.pirequest?.id}</div>
                      </td>
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
                            "\n                                                .table1 thead tr th {\n                                                    padding-block: 0.5rem !important;\n                                                    padding-inline-end: 1rem;\n                                                }\n\n                                                .table1 tbody tr {\n                                                    background-color: #f9f9f9 !important;\n                                                }\n                                            ",
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
                              <th>UMO</th>
                              <th>Priority</th>
                              <th>Purpose</th>
                              <th>Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {poDetails?.pirequest?.piitems.map(
                              (items, index) => (
                                <React.Fragment key={items.id}>
                                  <tr>
                                    <td>
                                      <div className="ms-4">
                                        {items.item_name}
                                        <div />
                                      </div>
                                    </td>
                                    <td>{items.qty}</td>
                                    <td>{items.uom}</td>
                                    <td>
                                      <span
                                        className={`badge ${
                                          items.priority === "low"
                                            ? "badge-outline-danger"
                                            : items.priority === "medium"
                                            ? "badge-outline-warning"
                                            : "badge-outline-success"
                                        } `}
                                      >
                                        {items.priority}
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
                                        data-bs-original-title={items.purpose}
                                      >
                                        <i className="icon-base ti tabler-progress-help text-dark  icon-20px" />
                                      </a>
                                    </td>
                                    <td>{items.remark}</td>
                                  </tr>
                                </React.Fragment>
                              )
                            )}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-datatable table-responsive pt-0">
                <div className="mx-4 my-2 d-flex justify-content-between">
                  <h5 className="">GRN Detail</h5>
                  <div>
                    <Link
                      to="/po-material/grn-list"
                      className="badge bg-label-success rounded p-1_5 mt-1"
                    >
                      <i className="icon-base ti tabler-eye icon-md" />
                    </Link>
                  </div>
                </div>
                <table className="table datatables-basic align-middle">
                  <thead>
                    <tr className="align-items-center">
                      <th scope="col" style={{ width: 80 }}>
                        <div className="ms-4">Sr#</div>
                      </th>
                      <th scope="col">GRN&nbsp;ID</th>
                      <th scope="col">GRN&nbsp;Date</th>
                      <th scope="col">PI Request Person</th>
                      <th scope="col">Total Item</th>
                      <th scope="col">Status</th>
                      <th scope="col" style={{ minWidth: 160 }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="ms-4">1</div>
                      </td>
                      <td>GR_00001</td>
                      <td>03-08-2025</td>
                      <td>
                        <div className="d-flex justify-content-start align-items-center user-name">
                          <div className="avatar-wrapper">
                            <div className="avatar me-2">
                              <img
                                src="assets/img/avatars/10.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-column">
                            <span className="emp_name text-truncate text-heading fw-medium">
                              Evangelina Carnock
                            </span>
                            <small className="emp_post text-truncate">
                              Department Head
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>10</td>
                      <td>
                        <span className="badge bg-label-warning">Pending</span>
                      </td>
                      <td>
                        <a
                          href="invoice-list.html"
                          className="btn btn-dark btn-sm waves-effect waves-light"
                        >
                          Create Invoice
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="ms-4">2</div>
                      </td>
                      <td>GR_00001</td>
                      <td>03-08-2025</td>
                      <td>
                        <div className="d-flex justify-content-start align-items-center user-name">
                          <div className="avatar-wrapper">
                            <div className="avatar me-2">
                              <img
                                src="assets/img/avatars/10.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-column">
                            <span className="emp_name text-truncate text-heading fw-medium">
                              Evangelina Carnock
                            </span>
                            <small className="emp_post text-truncate">
                              Department Head
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>10</td>
                      <td>
                        <span className="badge bg-label-warning">Pending</span>
                      </td>
                      <td>
                        <a
                          href="invoice-list.html"
                          className="btn btn-dark btn-sm waves-effect waves-light"
                        >
                          Create Invoice
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="ms-4">3</div>
                      </td>
                      <td>GR_00001</td>
                      <td>03-08-2025</td>
                      <td>
                        <div className="d-flex justify-content-start align-items-center user-name">
                          <div className="avatar-wrapper">
                            <div className="avatar me-2">
                              <img
                                src="assets/img/avatars/10.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-column">
                            <span className="emp_name text-truncate text-heading fw-medium">
                              Evangelina Carnock
                            </span>
                            <small className="emp_post text-truncate">
                              Department Head
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>10</td>
                      <td>
                        <span className="badge bg-label-warning">Pending</span>
                      </td>
                      <td>
                        <a
                          href="invoice-list.html"
                          type="button"
                          className=""
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          aria-label="View Invoice"
                          data-bs-original-title="View Invoice"
                        >
                          <i className="icon-base ti tabler-file-invoice text-success  icon-20px" />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            {/* Vendor Detail */}
            <div className="card">
              <div className="">
                <h5 className="mx-4 my-2">Vendor Detail</h5>
                <div className="row px-4">
                  <div className="col-lg-6">
                    <label className="form-label">Vendor</label>
                    <p> {poDetails?.venderdetail?.vendor_name}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Contact Person</label>
                    <p>{poDetails?.venderdetail?.contact_person_name}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Email Id :</label>
                    <p>{poDetails?.venderdetail?.email}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Mobile Number : </label>
                    <p>{poDetails?.venderdetail?.mobile}</p>
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label">Address :</label>
                    <p>{poDetails?.venderdetail?.address}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">GST Number</label>
                    <p>{poDetails?.venderdetail?.gst_number}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">PAN Number</label>
                    <p>{poDetails?.venderdetail?.pan_number}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">
                      MSME Cirtificate Available
                    </label>
                    <p>{poDetails?.venderdetail?.msme_certificate}</p>
                  </div>
                </div>
                <hr />
                <div className=" row px-4">
                  <div className="col-lg-6">
                    <label className="form-label"> Bank Name</label>
                    <p>{poDetails?.venderdetail?.bank_name}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Account No</label>
                    <p>{poDetails?.venderdetail?.account_no}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">IFSC Code</label>
                    <p>{poDetails?.venderdetail?.ifsc_code}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Branch Name</label>
                    <p>{poDetails?.venderdetail?.branch_name}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Time Line */}
            <div className="card mt-4">
              <h5 className="mx-4 my-2">Time Line</h5>
              <div className=" h-100">
                <div className="card-body">
                  <ul className="timeline mb-0">
                    <li className="timeline-item timeline-item-transparent">
                      <span className="timeline-point timeline-point-success" />
                      <div className="timeline-event">
                        <div className="timeline-header mb-3">
                          <h6 className="mb-0">PO Close</h6>
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
      {modal.viewRejectPo && <PO_Reject_Modal />}
      {/* ------------------------END PO DETAILS--------------------------- */}
    </>
  );
}
