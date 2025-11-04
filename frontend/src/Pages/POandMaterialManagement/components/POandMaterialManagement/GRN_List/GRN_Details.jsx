import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useGRN } from "../../../../../Context/PIAndPoManagement/GRN";
import RejectGRN from "./RejectGRN";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../../../utils/decryptData";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import Invoice_List_Form from "../../../../PaymentManagement/components/PaymentManagement/Invoice_List/Invoice_List_Form";
import { VendorProvider } from "../../../../../Context/PaymentManagement/Vendor";
import { SubCategoryProvider } from "../../../../../Context/ItemManagement/SubCategoryContext";
import { InvoiceProvider } from "../../../../../Context/PIAndPoManagement/Invoice";
import { ItemRequestProvider } from "../../../../../Context/Request Management/Item_Request";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function GRN_Details() {
  const { id } = useParams();
  // console.log("id", id);
  const { handleOpen, modal } = useUIContext();
  const { fetchUserPermission, userPermission } = useUserCreation();
  const {
    grnId,
    setGrnId,
    GRNDetails,
    grnDetails,
    GRNApprove,
    GRNWorkflowdetails,
    setGRNWorkflowdetails,
    grnWorkflow,
  } = useGRN();
  console.log("grnDetails", grnDetails);
  const [grnIdInvoice, setGrnIdInvoice] = useState(null);

  // useEffect(() => {
  //   GRNDetails(id);
  // }, [id]);

  // ✅ Fetch GRN detail + workflow on mount
  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      await GRNDetails(id);
      await grnWorkflow(id);
    };
    loadData();
  }, [id]);

  console.log("GRNWorkflowdetails", GRNWorkflowdetails);

  // ✅ Get saved auth data
  const savedAuth = sessionStorage.getItem("authData");
  let user = null;

  if (savedAuth) {
    try {
      const decrypted = decryptData(savedAuth);
      user = decrypted?.user || null;
      // console.log("user", user);
    } catch (error) {
      console.error("Error decrypting auth data", error);
    }
  }

  // console.log("userPermission", userPermission);

  useEffect(() => {
    fetchUserPermission(user.id);
  }, [user.id]);

  return (
    <>
      {/* -----------------------START GRN DETAILS----------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center  row-gap-4">
          <div className="d-flex">
            <h6 className="mt-2">Payment Status:&nbsp;</h6>
            <div className="mt-2">
              <span
                className={`badge ${
                  grnDetails.status === "Pending"
                    ? "bg-label-warning"
                    : grnDetails.status === "Approve" ||
                      grnDetails.status === "Complete"
                    ? "bg-label-success"
                    : "bg-label-danger"
                } `}
              >
                {grnDetails.status}
              </span>
            </div>
            {/* <div className="ms-2">
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
            </div> */}
          </div>
          <div className="d-flex align-content-center flex-wrap gap-4">
            {/* {console.log(
              "grnDetails?.pi_request_person",
              typeof grnDetails?.pi_request_person
            )}
            {console.log("user.id", typeof user.id)} */}
            {
              // userPermission.some(
              //   (prem) => prem.type == "GRN" && prem.permission == "approve"
              // ) &&
              grnDetails?.status == "Pending" &&
                grnDetails?.pi_request_person == user.id && (
                  <>
                    <button
                      onClick={async () => {
                        try {
                          await GRNApprove({ grn_id: grnDetails.id });
                          await GRNDetails(grnDetails.id);
                        } catch (error) {
                          console.error("Error approving GRN:", error);
                        }
                      }}
                      className={`btn btn-success waves-effect waves-light btn-sm ${
                        grnDetails.status === "Approve" ||
                        grnDetails.status === "Reject"
                          ? "d-none"
                          : ""
                      }`}
                    >
                      Approve
                    </button>

                    <button
                      // type="submit"
                      className={`btn btn-danger waves-effect waves-light btn-sm ${
                        grnDetails.status === "Approve" ||
                        grnDetails.status === "Reject"
                          ? "d-none"
                          : ""
                      }`}
                      onClick={() => {
                        setGrnId(id);
                        handleOpen("viewRejectGRN");
                      }}
                    >
                      Reject
                    </button>
                  </>
                )
            }

            {/*  <div class="d-flex gap-4"><button class="btn btn-label-secondary waves-effect">Discard</button>*/}

            {(grnDetails.status === "Approve" ||
              grnDetails.status === "Reject") && (
              <a
                href="po-create"
                className="btn btn-info waves-effect btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#InvoiceModel"
                onClick={() => {
                  handleOpen("addInvoice");
                  setGrnIdInvoice(grnDetails?.po_id);
                }}
              >
                Add Invoice
              </a>
            )}
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
                    <label className="form-label">GRN NO</label>
                    <p>{grnDetails.grn_no}</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">GRN Date</label>
                    <p>{grnDetails.grn_date}</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">PO ID</label>
                    <p>{grnDetails?.po?.po_number}</p>
                  </div>
                  <div className="col-lg-3">
                    <label className="form-label">PI ID</label>
                    <p>{grnDetails.pi_request_id}</p>
                  </div>
                </div>
                <table className="table table2 datatables-basic align-middle w-100">
                  <thead>
                    <tr className="bg-label-secondary">
                      <th>
                        <div className="ms-4">Item</div>
                      </th>
                      <th>Qty.</th>
                      <th>UOM</th>
                      <th>Received Qty.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grnDetails?.items?.map((item, index) => {
                      return (
                        <tr>
                          <td>
                            <div className="ms-4">{item?.item?.item_name}</div>
                          </td>
                          <td>{item?.grn_qty}</td>
                          <td>{item?.item?.uom}</td>
                          <td>{item?.item?.item_name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {grnDetails.status === "Reject" && (
                  <div className="row ms-2 mt-2">
                    <div className="col-lg-12">
                      <div className="d-flex">
                        <div className="badge bg-label-danger rounded p-1_5">
                          <i className="icon-base ti tabler-ban icon-md" />
                        </div>
                        <h6 className="mb-0 ms-4 mt-1">Reject Reason</h6>
                      </div>
                      <p className="ms-6 ps-6">{grnDetails?.reject_reason} </p>
                    </div>
                  </div>
                )}
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
                      href="invoice-list"
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
                    <p>{grnDetails?.vendor?.vendor_name}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Contact Person</label>
                    <p>{grnDetails?.vendor?.contact_person_name}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Email Id :</label>
                    <p>{grnDetails?.vendor?.email}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Mobile Number : </label>
                    <p>{grnDetails?.vendor?.mobile}</p>
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label">Address :</label>
                    <p>{grnDetails?.vendor?.address}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">GST Number</label>
                    <p>{grnDetails?.vendor?.gst_number}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">PAN Number</label>
                    <p>{grnDetails?.vendor?.pan_number}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">
                      MSME Cirtificate Available
                    </label>
                    <p>{grnDetails?.vendor?.msme_certificate}</p>
                  </div>
                </div>
                <hr />
                <div className=" row px-4">
                  <div className="col-lg-6">
                    <label className="form-label"> Bank Name</label>
                    <p>{grnDetails?.vendor?.bank_name}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Account No</label>
                    <p>{grnDetails?.vendor?.account_no}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">IFSC Code</label>
                    <p>{grnDetails?.vendor?.ifsc_code}</p>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">Branch Name</label>
                    <p>{grnDetails?.vendor?.branch_name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-4">
              <h5 className="mx-4 my-2">Time Line</h5>
              <div className=" h-100">
                <div className="card-body">
                  <ul className="timeline mb-0">
                    {GRNWorkflowdetails?.slice()
                      ?.reverse()
                      ?.map((grn, index) => {
                        const formateDate = grn?.detail
                          ? new Date(grn?.detail?.create_at)
                              .toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })
                              .replace(/\//g, "-")
                              .replace(",", " ")
                              .replace(/\s?(am|pm)$/i, (match) =>
                                match.toUpperCase()
                              )
                          : "Pending";

                        const colors = [
                          "info",
                          "success",
                          "primary",
                          "info",
                          "success",
                        ];
                        // const formateDate = grn?.detail ? new Date(grn?.detail?.create_at)
                        return (
                          <li
                            className="timeline-item timeline-item-transparent"
                            key={index}
                          >
                            <span
                              className={`timeline-point timeline-point-${colors[index]}`}
                            />
                            <div className="timeline-event">
                              <div className="timeline-header mb-3">
                                <h6 className="mb-0">{grn?.type}</h6>
                                <small className="text-body-secondary">
                                  {formateDate}
                                </small>
                              </div>
                              <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                                <div className="d-flex flex-wrap align-items-center mb-50">
                                  <div className="avatar avatar-sm me-2">
                                    <img
                                      src={`${publicUrl}/assets/img/avatars/1.png`}
                                      alt="Avatar"
                                      className="rounded-circle"
                                    />
                                  </div>
                                  <div>
                                    <p className="mb-0 small fw-medium">
                                      {grn?.detail?.create_by_name}
                                    </p>
                                    <small> {grn?.detail?.role_name}</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    {/* <li className="timeline-item timeline-item-transparent">
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
                        <p class="mb-2">6 team members in a project</p>
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
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal.viewRejectGRN && <RejectGRN id={id} />}
      {modal.addInvoice && (
        <InvoiceProvider>
          <VendorProvider>
            <SubCategoryProvider>
              <ItemRequestProvider>
                <Invoice_List_Form
                  id={id}
                  type={1}
                  grnIdInvoice={grnIdInvoice}
                />
              </ItemRequestProvider>
            </SubCategoryProvider>
          </VendorProvider>
        </InvoiceProvider>
      )}
      {/* -----------------------END GRN DETAILS----------------------- */}
    </>
  );
}
