import React from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useGetQuote } from "../../../../../Context/PIAndPoManagement/GetQuote";
import { Link } from "react-router-dom";
const fileUrl = import.meta.env.VITE_FILE_URL;
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function Vendor_Quote_Detail() {
  const { handleClose } = useUIContext();
  const {
    newVendorId,
    newVendorData,
    setNewVendorData,
    vendorRateUpdate,
    newVendorList,
  } = useGetQuote();
  console.log("newVendorData", newVendorData);
  const vendorData = newVendorData?.vendor_item;
  return (
    <>
      {/* ------------------------STRAT VENDOR QUOTE DETAILS------------------------- */}
      <div
        className="modal fade show"
        id="GetQuoteModel"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div
          className="modal-dialog modal-md modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <div className="row">
                <div className="col-lg-12 justify-content-between">
                  <h5 className="modal-title" id="GetQuoteModelLabel2">
                    Vendor Quote Detail
                  </h5>
                  <div className="align-middle d-flex">
                    <i className="icon-base ti tabler-calendar-week " />
                    {/* <div className="ms-2">Quote Date : 11-08-2025 11:24 AM</div> */}
                    <div className="ms-2">
                      Quote Date : &nbsp;
                      {vendorData?.[0]?.created_at
                        ? new Date(vendorData?.[0].created_at).toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose("viewVendorQuoteDetails")}
              />
            </div>
            <div className="modal-body">
              <table className="table table1 datatables-basic align-middle w-100">
                <thead>
                  <tr className="bg-label-secondary">
                    <th>Item</th>
                    <th>Qty.</th>
                    <th>UOM</th>
                    <th>Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorData?.map((vendor, index) => {
                    return (
                      <tr key={index}>
                        {console.log("vv", vendor)}
                        <td>{vendor?.pirequestitem?.item_name}</td>
                        <td>{vendor?.pirequestitem?.qty}</td>
                        <td>{vendor?.pirequestitem?.uom}</td>
                        <td>{vendor?.rate && `₹${vendor?.rate}/-`}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* {newVendorData?.vendor_quote_file ? (
                <div className="row">
                  <label>Attachment File</label>
                  <Link
                    to={`${fileUrl}/storage/uploads/vendor_quotes/${newVendorData.vendor_quote_file}`}
                    className="mt-2"
                    target="_blank"
                  >
                    <div className="badge bg-label-info rounded p-1_5">
                      <i className="icon-base ti tabler-paperclip icon-md" />
                    </div>{" "}
                    {newVendorData?.vendor_quote_file}
                  </Link>
                </div>
              ) : (
                <div className="d-flex align-items-center text-muted">
                  <img
                    src={`${publicUrl}assets/img/icons/misc/no-file.png`}
                    alt="No file"
                    width={15}
                    className="me-2 opacity-75"
                  />
                  <span className="h6 mb-0">No file uploaded</span>
                </div>
              )} */}
              <div className="badge bg-label-info rounded-3">
                {newVendorData?.vendor_quote_file ? (
                  <Link
                    to={`${fileUrl}/storage/uploads/vendor_quotes/${newVendorData.vendor_quote_file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`${publicUrl}assets/img/icons/misc/doc.png`}
                      alt="Document"
                      width={15}
                      className="me-2"
                    />
                    <span className="h6 mb-0 text-info">
                      {newVendorData.vendor_quote_file}
                      {/* View Invoice File */}
                    </span>
                  </Link>
                ) : (
                  <div className="d-flex align-items-center text-muted">
                    <img
                      src={`${publicUrl}assets/img/icons/misc/no-file.png`}
                      alt="No file"
                      width={15}
                      className="me-2 opacity-75"
                    />
                    <span className="h6 mb-0">No file uploaded</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* ------------------------END VENDOR QUOTE DETAILS------------------------- */}
    </>
  );
}
