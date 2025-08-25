import React from "react";

export default function Generate_GRN() {
  return (
    <>
      {/* ------------------START GENERATE GRN ----------------- */}
      <div
        className="modal fade show"
        id="grnCreateModel"
        tabIndex={-1}
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-icon rounded-pill btn-label-info waves-effect"
                >
                  <i className="icon-base ti tabler-truck-delivery icon-22px" />
                </button>
                <h5 className="modal-title ms-2 mt-2" id="AddQuoteModelLabel2">
                  Generate GRN
                </h5>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row px-4">
                <div className="col-lg-3">
                  <label className="form-label">Vendor</label>
                  <p> ABC PVT LTD</p>
                </div>
                <div className="col-lg-3">
                  <label className="form-label">Contact Person</label>
                  <p>Vishal Patel</p>
                </div>
                <div className="col-lg-3">
                  <label className="form-label">GST Number</label>
                  <p>24FSFDDFDSS</p>
                </div>
                <div className="col-lg-12">
                  <label className="form-label">Address :</label>
                  <p>791 Crist Parks, Sashabury, IL 86039-9874</p>
                </div>
              </div>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                    .table2 thead tr th {\n                        padding-block: 0.5rem!important;\n                        padding-inline-end: 1rem;\n                    }\n\n                ",
                }}
              />
              <table className="table table2 datatables-basic align-middle w-100">
                <thead>
                  <tr className="bg-label-secondary">
                    <th>
                      <div className="ms-4">Item</div>{" "}
                    </th>
                    <th>Qty.</th>
                    <th>UOM</th>
                    <th>Pending Qty.</th>
                    <th>Received Qty.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {" "}
                      <div className="ms-4">ABCG- STCKER-CHARHER</div>
                    </td>
                    <td>500</td>
                    <td>Nos</td>
                    <td>200</td>
                    <td>
                      <input type="number" className="form-control" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <div className="ms-4">ABCG- STCKER-CHARHER</div>
                    </td>
                    <td>500</td>
                    <td>Nos</td>
                    <td>200</td>
                    <td>
                      <input type="number" className="form-control" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="row">
                <div className="col-lg-4">
                  <label className="form-label">Date of Receipt</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-lg-6">
                  <label className="form-label">Invoice Attachment File</label>
                  <input type="file" className="form-control" />
                </div>
                <div className="col-lg-12 mt-4">
                  <label className="form-label">Remarks</label>
                  <textarea className="form-control" defaultValue={""} />
                </div>
                <div className="col-lg-12 mt-4 text-end">
                  <button
                    type="button"
                    className="btn btn-label-secondary waves-effect"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button className="btn  btn-success ms-2 waves-effect waves-light">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------END GENERATE GRN ----------------- */}
    </>
  );
}
