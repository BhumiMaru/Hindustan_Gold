import React from "react";

export default function Vendor_List_Form() {
  return (
    <>
      <>
        {/* ------------------START VENDOR FORM----------------------- */}
        <div
          className="modal fade show"
          id="vendorAddModel"
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
                <h5 className="modal-title" id="exampleModalLabel2">
                  Add Vendor
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="nameSmall" className="form-label">
                      Vendor
                    </label>
                    <input
                      type="text"
                      id="nameSmall"
                      className="form-control"
                      placeholder="Enter Vendor Name"
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="contactPersonname" className="form-label">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      id="contactPersonname"
                      className="form-control"
                      placeholder="Enter Contact Person Name"
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="emailid" className="form-label">
                      Email Id
                    </label>
                    <input
                      type="email"
                      id="emailid"
                      className="form-control"
                      placeholder="Enter Email Id"
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="mobileno" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      id="mobileno"
                      className="form-control"
                      placeholder="Enter Mobile Number"
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="form-control"
                      placeholder="Enter Address"
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="gstnumber" className="form-label">
                      GST Number
                    </label>
                    <input
                      type="text"
                      id="gstnumber"
                      className="form-control"
                      placeholder="Enter GST Number"
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="pannumber" className="form-label">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      id="pannumber"
                      className="form-control"
                      placeholder="Enter PAN Number"
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="vendortype" className="form-label">
                      MSME Cirtificate Available
                    </label>
                    <select id="vendortype" className="form-select">
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="bankname" className="form-label">
                      {" "}
                      Bank Name
                    </label>
                    <input
                      type="text"
                      id="bankname"
                      className="form-control"
                      placeholder="Enter Bank Name"
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="accountno" className="form-label">
                      Account No
                    </label>
                    <input
                      type="text"
                      id="accountno"
                      className="form-control"
                      placeholder="Enter Account No"
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="ifsccode" className="form-label">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      id="ifsccode"
                      className="form-control"
                      placeholder="Enter IFSC Code"
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="BranchName" className="form-label">
                      Branch Name
                    </label>
                    <input
                      type="text"
                      id="BranchName"
                      className="form-control"
                      placeholder="Enter Branch Name"
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="BranchName" className="form-label">
                      Status
                    </label>
                    <select id="" className="form-select">
                      <option value="Active" selected="">
                        Active
                      </option>
                      <option value="Deactive">Deactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-label-secondary waves-effect"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------END VENDOR FORM----------------------- */}
      </>
    </>
  );
}
