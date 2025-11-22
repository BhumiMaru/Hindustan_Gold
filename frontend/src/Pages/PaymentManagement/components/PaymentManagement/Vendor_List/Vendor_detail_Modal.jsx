import React, { useEffect } from "react";
import { useVendor } from "../../../../../Context/PaymentManagement/Vendor";
import { useUIContext } from "../../../../../Context/UIContext";

export default function Vendor_detail_Modal() {
  const { vendorDetail, vendorEditId, vendorDetails } = useVendor();
  const { handleClose } = useUIContext();

  useEffect(() => {
    vendorDetails(vendorEditId);
  }, [vendorEditId]);
  // console.log("vendor", vendorDetail);
  return (
    <>
      {/* -------------------START VENDOR DETAILS--------------------- */}
      {vendorDetail ? (
        <>
          <div
            className="modal fade show"
            id="vendorViewModel"
            tabIndex={-1}
            style={{ display: "block", paddingLeft: 0 }}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="vendorViewModelLabel2">
                    Vendor Detail
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => handleClose("viewVendorDetails")}
                  />
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-lg-4 mb-2">
                      <label htmlFor="nameSmall" className="form-label">
                        Vendor
                      </label>
                      <p>{vendorDetail?.vendor_name}</p>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <label htmlFor="contactPersonname" className="form-label">
                        Contact Person
                      </label>
                      <p>{vendorDetail?.contact_person_name}</p>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <label htmlFor="emailid" className="form-label">
                        Email Id
                      </label>
                      <p>{vendorDetail?.email}</p>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <label htmlFor="mobileno" className="form-label">
                        Mobile Number
                      </label>
                      <p>{vendorDetail?.mobile}</p>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <p>{vendorDetail?.address}</p>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <label htmlFor="gstnumber" className="form-label">
                        GST Number
                      </label>
                      <p>{vendorDetail?.gst_number}</p>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <label htmlFor="pannumber" className="form-label">
                        PAN Number
                      </label>
                      <p>{vendorDetail?.pan_number}</p>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <label htmlFor="vendortype" className="form-label">
                        MSME Cirtificate Available
                      </label>
                      <p>{vendorDetail?.msme_certificate}</p>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <label htmlFor="vendortype" className="form-label">
                        Register Date
                      </label>
                      <p>{vendorDetail?.vendor_name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-lg-4 mb-2">
                      <label htmlFor="bankname" className="form-label">
                        {" "}
                        Bank Name
                      </label>
                      <p>{vendorDetail?.bank_name}</p>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <label htmlFor="accountno" className="form-label">
                        Account No
                      </label>
                      <p>{vendorDetail?.account_no}</p>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <label htmlFor="ifsccode" className="form-label">
                        IFSC Code
                      </label>
                      <p>{vendorDetail?.ifsc_code}</p>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <label htmlFor="BranchName" className="form-label">
                        Branch Name
                      </label>
                      <p>{vendorDetail?.branch_name}</p>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <label htmlFor="BranchName" className="form-label">
                        Status
                      </label>{" "}
                      <br />
                      <span
                        className={`badge bg-label-success ${
                          vendorDetail?.status === 1
                            ? "bg-label-success"
                            : "bg-label-danger"
                        }`}
                      >
                        {vendorDetail?.status === 1 ? "Active" : "Deactive"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      ) : (
        <p className="text-center">Loading vendor details...</p>
      )}

      {/* -------------------END VENDOR DETAILS--------------------- */}
    </>
  );
}
