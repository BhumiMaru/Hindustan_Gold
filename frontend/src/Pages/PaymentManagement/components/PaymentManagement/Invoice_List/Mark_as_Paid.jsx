import React, { useEffect } from "react";
import { useInvoice } from "../../../../../Context/PIAndPoManagement/Invoice";
import { useUIContext } from "../../../../../Context/UIContext";

export default function Mark_as_Paid({ id }) {
  const {
    paymentData,
    setPaymentData,
    paymentPartial,
    resetPaymentData,
    invoiceDetail,
  } = useInvoice();
  const { handleClose } = useUIContext();

  useEffect(() => {
    setPaymentData((prev) => ({
      ...prev,
      invoice_id: id,
      type_of_payment: 1,
      payment_date: new Date().toISOString().split("T")[0],
      amount: invoiceDetail?.taxable_amount || 0,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (invoiceDetail.is_payment_advance_or_partial === "Yes") {
      console.log({
        amount: invoiceDetail.taxable_amount,
        // payment_date: "",
        remark: "Payment Done",
        type_of_payment: 2,
        paymentslip: null,
      });
      setPaymentData({
        amount: invoiceDetail.taxable_amount,
        // payment_date: "",
        remark: "Payment Done",
        type_of_payment: 2,
        paymentslip: null,
      });
    } else {
      console.log("paymentData", paymentData);
      paymentPartial(paymentData);
    }
    handleClose("markaspaid");
  };

  return (
    <>
      {/* ---------------------START MARK AS PAID----------------------- */}
      <div
        className="modal fade show"
        id="markaspaidModal"
        tabIndex={-1}
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="modal-dialog modal-sm modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-icon rounded-pill btn-label-primary waves-effect"
                >
                  <i className="icon-base ti tabler-checks icon-22px" />
                </button>
                <h5
                  className="modal-title ms-2 mt-2"
                  id="markaspaidModalLabel2"
                >
                  Mark As Paid
                </h5>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  handleClose("markaspaid");
                  resetPaymentData();
                }}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                {invoiceDetail.is_payment_advance_or_partial === "Yes" ? (
                  <>
                    <div className="col-lg-12 text-left my-3">
                      <h6 className="mb-3">
                        Are you sure you want to mark this invoice as paid?
                      </h6>
                      {/* <p className="text-muted">
                        Invoice ID: <strong>#{invoiceDetail.id}</strong> <br />
                        Amount: ₹{invoiceDetail.taxable_amount}
                      </p> */}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-lg-12">
                      <label className="form-label">Amount</label>
                      <input
                        type="number"
                        className="form-control"
                        name="taxable_amount"
                        value={invoiceDetail.taxable_amount}
                        disabled
                        readOnly=""
                      />
                    </div>
                    <div className="col-lg-12 mt-2">
                      <label className="form-label">Remarks</label>
                      <textarea
                        className="form-control"
                        name="remark"
                        value={paymentData.remark}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-12 mt-2">
                      <label className="form-label">
                        Payment Slip Attachment{" "}
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        name="paymentslip"
                        // value={paymentData.paymentslip}
                        onChange={(e) =>
                          setPaymentData((prev) => ({
                            ...prev,
                            paymentslip: e.target.files[0],
                          }))
                        }
                      />
                    </div>
                  </>
                )}

                <div className="col-lg-12 mt-4 text-end">
                  <button
                    type="button"
                    className="btn btn-label-secondary waves-effect"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      handleClose("markaspaid");
                      resetPaymentData();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn  btn-success ms-2 waves-effect waves-light"
                    onClick={handleSave}
                  >
                    Payment Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* ---------------------END MARK AS PAID----------------------- */}
    </>
  );
}
