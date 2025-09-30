import React from "react";
import { useUIContext } from "../../../../../Context/UIContext";

export default function Vendor_Quote_Detail() {
  const { handleClose } = useUIContext();
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
                    <div className="ms-2">Quote Date : 11-08-2025 11:24 AM</div>
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
                  <tr>
                    <td>ABCG - STCKER-CHARHER</td>
                    <td>10</td>
                    <td>Nos</td>
                    <td>₹ 500/-</td>
                  </tr>
                  <tr>
                    <td>ABCG- STCKER-CHARHER</td>
                    <td>10</td>
                    <td>Nos</td>
                    <td>₹ 500/-</td>
                  </tr>
                </tbody>
              </table>
              <div className="row">
                <label>Attachment File</label>
                <a href="#" className="mt-2">
                  <div className="badge bg-label-info rounded p-1_5">
                    <i className="icon-base ti tabler-paperclip icon-md" />
                  </div>{" "}
                  quate_invice.pdf
                </a>
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
