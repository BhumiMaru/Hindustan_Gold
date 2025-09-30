import React from "react";
import { useUIContext } from "../../../../../Context/UIContext";

export default function Add_Quote_Modal() {
  const { handleClose } = useUIContext();
  return (
    <>
      {/* -----------------------START ADD QUOTE DETAILS----------------------- */}
      <div
        className="modal fade show"
        id="AddQuoteModel"
        tabIndex={-1}
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="modal-dialog modal-md modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddQuoteModelLabel2">
                Add Quote
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose("addQuote")}
              />
            </div>
            <div className="modal-body">
              <table className="table table1 datatables-basic align-middle w-100">
                <thead>
                  <tr className="bg-label-secondary">
                    <th>Item </th>
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
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        style={{ width: "100%", minWidth: 80 }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="row">
                <div className="col-lg-12">
                  <label>Attachment File</label>
                  <input type="file" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* -----------------------END ADD QUOTE DETAILS----------------------- */}
    </>
  );
}
