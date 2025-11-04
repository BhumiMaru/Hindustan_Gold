import React from "react";
import { useInvoice } from "../../../../../Context/PIAndPoManagement/Invoice";
import { Link } from "react-router-dom";
import { useUIContext } from "../../../../../Context/UIContext";
import Loader from "../../../../../components/Common/Loader/Loader";

export default function Invoice_List_Table() {
  const { handleOpen } = useUIContext();
  const {
    invoice,
    pagination,
    setType,
    type,
    invoiceId,
    setInvoiceId,
    startEditing,
    loading,
  } = useInvoice();
  console.log("type", type);
  console.log("invoice", invoice);
  return (
    <>
      {/* -------------------START INVOICE LIST TABLE------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr className="align-items-center">
            {/* <th>
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
            </th> */}
            <th scope="col" style={{ width: 80 }}>
              Sr.No.
            </th>
            <th scope="col">Invoice Id</th>
            <th scope="col">Created</th>
            <th scope="col">Invoice Date</th>
            <th scope="col">Vendor</th>
            <th scope="col">Type</th>
            {/* <th scope="col">Item</th> */}
            <th scope="col">Invoice Amount</th>
            <th scope="col">Paid Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
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
            invoice?.map((invoice, index) => {
              return (
                <tr>
                  {/* <td className="dt-select">
                  <div className="ms-4">
                    <input
                      aria-label="Select row"
                      className="form-check-input"
                      type="checkbox"
                    />
                  </div>
                </td> */}
                  <td className="pe-1">
                    {" "}
                    {(pagination?.currentPage - 1) * pagination?.perPage +
                      (index + 1)}
                  </td>
                  <td>{invoice?.id}</td>
                  <td>{invoice?.created_at?.split("T")?.shift()}</td>
                  <td>{invoice?.invoice_date}</td>
                  <td>{invoice?.vendor?.vendor_name}</td>
                  <td>{invoice?.type}</td>
                  {/* <td>{invoice?.created_at}</td> */}
                  <td>{invoice?.taxable_amount}/-</td>
                  <td>{invoice?.paid_amount}/-</td>
                  <td>
                    <span
                      className={`badge ${
                        invoice?.status === "Pending"
                          ? "bg-label-warning"
                          : invoice.status === "Approve"
                          ? "bg-label-success"
                          : invoice.status === "Paid"
                          ? "bg-label-info"
                          : "bg-label-danger"
                      } `}
                    >
                      {invoice?.status}
                    </span>
                  </td>
                  <td>
                    <div className="d-inline-flex gap-2">
                      <Link
                        to={`/payment-management/invoice-detail/${invoice.id}`}
                        className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      >
                        <i className="icon-base ti tabler-eye icon-22px" />
                      </Link>
                      <div className="d-inline-flex gap-2">
                        <div className="d-inline-block">
                          <a
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
                              className="dropdown-item waves-effect"
                              data-bs-toggle="modal"
                              data-bs-target="#grnCreateModel"
                            >
                              Download Invoice
                            </a>
                            <a
                              className="dropdown-item waves-effect"
                              data-bs-toggle="modal"
                              data-bs-target="#grnCreateModel"
                              onClick={() => {
                                console.log("invoice?.id", invoice?.id);
                                startEditing({
                                  id: invoice?.id,
                                  payload: invoice,
                                });
                                setType(0); // editing mode
                                setTimeout(() => handleOpen("addInvoice"), 100);
                              }}
                            >
                              Edit
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item text-danger delete-record waves-effect">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {/* -------------------END INVOICE LIST TABLE------------------- */}
    </>
  );
}
