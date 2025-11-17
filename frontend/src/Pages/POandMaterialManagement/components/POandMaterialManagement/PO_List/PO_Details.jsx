import React, { useEffect, useRef, useState } from "react";
import {
  POProvider,
  usePOCreate,
} from "../../../../../Context/PIAndPoManagement/POCreate";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUIContext } from "../../../../../Context/UIContext";
import PO_Reject_Modal from "./PO_Reject_Modal";
import UpdateGRN from "../GRN_List/UpdateGRN";
import {
  GRNProvider,
  useGRN,
} from "../../../../../Context/PIAndPoManagement/GRN";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { VendorProvider } from "../../../../../Context/PaymentManagement/Vendor";
import { SubCategoryProvider } from "../../../../../Context/ItemManagement/SubCategoryContext";
import { ItemRequestProvider } from "../../../../../Context/Request Management/Item_Request";
import Invoice_List_Form from "../../../../PaymentManagement/components/PaymentManagement/Invoice_List/Invoice_List_Form";
import { useInvoice } from "../../../../../Context/PIAndPoManagement/Invoice";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import { decryptData } from "../../../../../utils/decryptData";
import Loader from "../../../../../components/Common/Loader/Loader";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function PO_Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleOpen, modal, handleClose } = useUIContext();
  const {
    poDetails,
    setPoDetails,
    getPoDetails,
    PoApprove,
    PoId,
    setPoId,
    poWorkflowDetails,
    setPoWorkflowDetails,
    poWorkflow,
  } = usePOCreate();

  const printRef = useRef();
  const {
    setType,
    // setItemIdInvoice,
    // setVendorIdInvoice,
    // setSubcategoryIdInvoice,
  } = useInvoice();
  const { userPermission, fetchUserPermission } = useUserCreation();
  const { GRNList, grnList, loading } = useGRN();

  // sub category id , vendor id and grn id set via po and grn
  // const [subcategoryIdInvoice, setSubcategoryIdInvoice] = useState(null);
  const [poIdInvoice, setPoIdInvoice] = useState(null);
  // const [vendorIdInvoice, setVendorIdInvoice] = useState(null);
  // const [itemIdInvoice, setItemIdInvoice] = useState(null);

  // console.log("vendorIdInvoice", vendorIdInvoice);

  // fetch grn after add
  useEffect(() => {
    GRNList({
      po_id: poDetails?.id,
    });
  }, [poDetails?.id]);
  console.log("grnList", grnList);

  const getAuthData = sessionStorage.getItem("authData");
  const decryptAuthData = decryptData(getAuthData);
  const user = decryptAuthData?.user;

  useEffect(() => {
    fetchUserPermission(user.id);
  }, [user.id]);

  // useEffect(() => {
  //   getPoDetails(id);
  // }, [id]);

  // ✅ Fetch PO detail + workflow on mount
  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      await getPoDetails(id);
      await poWorkflow(id);
    };
    loadData();
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

  // Download PDF

  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = `/po-material/po-detail-download/${poDetails?.id}`;
    link.download = `PO_${poDetails?.po_number}.pdf`;
    link.click();
  };

  // console.log("poDetails", poDetails);
  // console.log("po id", poIdInvoice);
  return (
    <>
      {/* ------------------------START PO DETAILS--------------------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
          <div className="d-flex flex-column justify-content-center"></div>
          <div className="d-flex align-content-center flex-wrap gap-4">
            {userPermission?.some(
              (perm) =>
                perm.type === "PO Generation" && perm.permission === "approve"
            ) &&
              poDetails.status === "Pending" && (
                <>
                  <button
                    type="submit"
                    className={`btn btn-success waves-effect waves-light btn-sm ${
                      poDetails.status === "Approve" ||
                      poDetails.status === "Reject"
                        ? "d-none"
                        : ""
                    } `}
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
                      poDetails.status === "Approve" ||
                      poDetails.status === "Reject"
                        ? "d-none"
                        : ""
                    } `}
                    onClick={() => {
                      handleOpen("viewRejectPo");
                      setPoId(poDetails.id);
                    }}
                  >
                    Reject
                  </button>
                </>
              )}

            {/*  <div class="d-flex gap-4"><button class="btn btn-label-secondary waves-effect">Discard</button>*/}
            {poDetails.status === "Reject" ? (
              <>
                <span className="text-danger">
                  Remarks: {poDetails.reject_reason}
                </span>
              </>
            ) : (
              <>
                {userPermission?.some(
                  (perm) =>
                    perm.type === "PO Generation" && perm.permission === "add"
                ) &&
                  poDetails.status === "Approve" && (
                    <Link
                      to={`/po-material/po-create/${poDetails.id}`}
                      className={`btn btn-warning waves-effect btn-sm ${
                        poDetails.status === "Reject" ||
                        poDetails.status === "Approve" ||
                        (poDetails.status === "Pending" && "d-none")
                      } ${poDetails.po_generat_status === 1 ? "d-none" : ""} `}
                    >
                      Generate PO
                    </Link>
                  )}
              </>
            )}

            {poDetails.po_type === "service" && (
              <button
                className="btn btn-primary waves-effect waves-light"
                data-bs-toggle="modal"
                data-bs-target="#InvoiceModel"
                onClick={() => {
                  handleOpen("addInvoice");
                  setType(2);
                  setPoIdInvoice(Number(poDetails?.id));
                }}
              >
                Add Invoice
              </button>
            )}

            {poDetails.po_type === "material" &&
              poDetails.po_generat_status === 1 && (
                <>
                  <button
                    className={`btn btn-info waves-effect btn-sm ${
                      poDetails.status === "Reject" ||
                      poDetails.status === "Approve" ||
                      (poDetails.status === "Pending" && "d-none")
                    } ${poDetails?.status === "Complete" && "d-none"}`}
                    onClick={() => {
                      setPoId(poDetails?.id);
                      handleOpen("editGRN");
                    }}
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
                    onClick={handleDownloadPDF}
                  >
                    <i className="icon-base ti tabler-download icon-md me-2" />
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
                          poDetails.status === "Pending"
                            ? "bg-label-warning"
                            : poDetails.status === "Reject"
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
                            <div className="ms-4">
                              {poDetails?.pirequestitem?.item_name}
                            </div>
                          </td>
                          <td>{poDetails.qty}</td>
                          <td>{poDetails.uom}</td>
                          <td>{poDetails.unit_price}</td>
                          <td>{poDetails.Taxable_value}</td>
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
                      <td>{poDetails?.pirequest?.created_at.split("T")[0]}</td>
                      <td>{poDetails?.pirequest?.order_by?.name}</td>
                      <td>
                        {poDetails?.pirequest?.department_by?.department_name}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            poDetails?.pirequest?.final_approve_status ==
                              "Approve" ||
                            poDetails?.pirequest?.final_approve_status ==
                              "Completed"
                              ? "bg-label-success"
                              : poDetails?.pirequest?.final_approve_status ==
                                "Pending"
                              ? "bg-label-primary"
                              : poDetails?.pirequest?.final_approve_status ==
                                "InProgress"
                              ? "bg-label-info"
                              : "bg-label-danger"
                          }`}
                        >
                          {poDetails?.pirequest?.final_approve_status}
                        </span>
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
            {/* {grnList.length > 0 && ( */}
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
                    {loading ? (
                      <tr>
                        <td colSpan="11">
                          <Loader />
                        </td>
                      </tr>
                    ) : (
                      grnList?.map((grn, index) => {
                        console.log("grnn", grn);
                        return (
                          <tr key={index}>
                            <td>
                              <div className="ms-4">{index + 1}</div>
                            </td>
                            <td>{grn?.grn_no}</td>
                            {/* <td>{setPoIdInvoice(grn.po_id)}</td> */}
                            <td>{grn?.grn_date}</td>
                            <td>
                              <div className="d-flex justify-content-start align-items-center user-name">
                                <div className="avatar-wrapper">
                                  {/* <div className="avatar me-2">
                                  <img
                                    src="assets/img/avatars/10.png"
                                    alt="Avatar"
                                    className="rounded-circle"
                                  />
                                </div> */}
                                </div>
                                <div className="d-flex flex-column">
                                  <span className="emp_name text-truncate text-heading fw-medium">
                                    {grn?.pirequestperson?.name}
                                  </span>
                                  {/* <small className="emp_post text-truncate">
                                  {grnList?.pirequestperson?.department}
                                </small> */}
                                </div>
                              </div>
                            </td>
                            <td>{grn.items?.length}</td>

                            <td>
                              <span
                                className={`badge ${
                                  grn?.status === "Complete" ||
                                  grn?.status === "Approve"
                                    ? "bg-label-success"
                                    : grn?.status === "Pending"
                                    ? "bg-label-warning"
                                    : "bg-label-danger"
                                }`}
                              >
                                {grn?.status}
                              </span>
                            </td>
                            {/* <td
                            className={`${
                              grn?.status === "Complete" ? "d-block" : "d-none"
                            }`}
                            // className={`
                            //   ${grn?.invoice_file ? "d-block" : "d-none"}`}
                          >
                            <Link
                              to="/payment-management/invoice-list"
                              type="button"
                              className=""
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              aria-label="View Invoice"
                              data-bs-original-title="View Invoice"
                            >
                              <i className="icon-base ti tabler-file-invoice text-success  icon-20px" />
                            </Link>
                          </td>
                          <td
                          // className={`${
                          //   grn?.status === "Pending" &&
                          //   userPermission?.some(
                          //     (perm) =>
                          //       [
                          //         "Get Quotation",
                          //         "PO Generation",
                          //         "GRN",
                          //       ].includes(perm.type) &&
                          //       perm.permission === "add"
                          //   )
                          //     ? "d-block"
                          //     : "d-none"
                          // }`}
                          >
                            {grn?.status === "Pending" &&
                            userPermission?.some(
                              (perm) =>
                                [
                                  "Get Quotation",
                                  "PO Generation",
                                  "GRN",
                                ].includes(perm.type) &&
                                perm.permission === "add"
                            ) ? (
                              <Link
                                // to="/payment-management/invoice-list"
                                onClick={() => {
                                  handleOpen("addInvoice");
                                  setType(2);
                                  setSubcategoryIdInvoice();
                                  setVendorIdInvoice(grn?.vendor_id);
                                  setItemIdInvoice(grn?.items[0]?.item_id);
                                }}
                                className="btn btn-dark btn-sm waves-effect waves-light"
                              >
                                Create Invoice
                              </Link>
                            ) : null}
                          </td> */}
                            {/* ✅ Show View Invoice Icon when GRN is Complete */}
                            <td>
                              {grn?.is_invoice_create === 1 && (
                                <Link
                                  to="/payment-management/invoice-list"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  aria-label="View Invoice"
                                  data-bs-original-title="View Invoice"
                                >
                                  <i className="icon-base ti tabler-file-invoice text-success icon-20px" />
                                </Link>
                              )}
                            </td>

                            {/* ✅ Show Create Invoice Button when GRN is Pending & user has permission */}

                            {grn?.is_invoice_create == 0 &&
                              userPermission?.some(
                                (perm) =>
                                  [
                                    "Get Quotation",
                                    "PO Generation",
                                    "GRN",
                                  ].includes(perm.type) &&
                                  perm.permission === "add"
                              ) && (
                                <td>
                                  <Link
                                    onClick={() => {
                                      handleOpen("addInvoice");
                                      setType(2);
                                      // setSubcategoryIdInvoice();
                                      // setVendorIdInvoice(grn?.vendor_id);
                                      // setItemIdInvoice(grn?.items[0]?.item_id);
                                      setPoIdInvoice(Number(grn?.po_id));
                                    }}
                                    className="btn btn-dark btn-sm waves-effect waves-light"
                                  >
                                    Create Invoice
                                  </Link>
                                </td>
                              )}
                          </tr>
                        );
                      })
                    )}

                    {/* <tr>
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
                          href="invoice-list"
                          className="btn btn-dark btn-sm waves-effect waves-light"
                        >
                          Create Invoice
                        </a>
                      </td>
                    </tr> */}
                    {/* <tr>
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
                        <Link
                          to="/payment-management/invoice-list"
                          type="button"
                          className=""
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          aria-label="View Invoice"
                          data-bs-original-title="View Invoice"
                        >
                          <i className="icon-base ti tabler-file-invoice text-success  icon-20px" />
                        </Link>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
            {/* )} */}
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
                    {poWorkflowDetails?.map((po, index) => {
                      console.log("po", po);
                      const formateDate = po?.detail
                        ? new Date(po?.detail?.create_at)
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
                      // const formateDate = po?.detail ? new Date(po?.detail?.create_at)
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
                              <h6 className="mb-0">{po?.type}</h6>
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
                                    {po?.detail?.create_by_name}
                                  </p>
                                  <small>{po?.detail?.role_name}</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                    {/* <li className="timeline-item timeline-item-transparent">
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
      {modal.viewRejectPo && <PO_Reject_Modal />}
      {modal.editGRN && (
        <>
          <POProvider>
            <GRNProvider>
              <UpdateGRN
                id={id}
                onClose={() => {
                  handleClose("editGRN");
                  GRNList({ po_id: Number(id) }); //  Refresh GRN list after modal close
                }}
              />
            </GRNProvider>
          </POProvider>
        </>
      )}
      {modal.addInvoice && (
        <VendorProvider>
          <SubCategoryProvider>
            <ItemRequestProvider>
              <Invoice_List_Form
                oncClose={async () => {
                  handleClose("addInvoice");
                  await GRNList({
                    po_id: poDetails?.id,
                  });
                }}
                type={2}
                // vendorIdInvoice={vendorIdInvoice}
                // itemIdInvoice={itemIdInvoice}
                poIdInvoice={poIdInvoice}
              />
            </ItemRequestProvider>
          </SubCategoryProvider>
        </VendorProvider>
      )}
      {/* ------------------------END PO DETAILS--------------------------- */}
    </>
  );
}
