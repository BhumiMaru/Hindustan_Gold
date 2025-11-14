import React, { useEffect } from "react";
import { useInvoice } from "../../../../../Context/PIAndPoManagement/Invoice";
import { useUIContext } from "../../../../../Context/UIContext";

export default function Payment_Paritals({ id }) {
  const { paymentData, setPaymentData, paymentPartial, resetPaymentData } =
    useInvoice();
  const { handleClose } = useUIContext();

  useEffect(() => {
    setPaymentData((prev) => ({
      ...prev,
      invoice_id: id,
      type_of_payment: 1,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await paymentPartial(paymentData);

      // ✅ Close modal only if payment was successful
      if (res?.status === true) {
        handleClose("paymentPartials");
        resetPaymentData();
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      // Don't close modal on error
    }
  };

  return (
    <>
      {/* ------------------START PAYMENT PARTIALS--------------------- */}
      <div
        className="modal fade show"
        id="partialModal"
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
                  className="btn btn-icon rounded-pill btn-label-info waves-effect"
                >
                  <i className="icon-base ti tabler-file icon-22px" />
                </button>
                <h5 className="modal-title ms-2 mt-2" id="AddQuoteModelLabel2">
                  Add Partial Payment
                </h5>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  handleClose("paymentPartials");
                  resetPaymentData();
                }}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-12">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={paymentData.amount}
                    onChange={handleChange}
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
                  <label className="form-label">Date Of Invoice</label>
                  <input
                    type="date"
                    className="form-control"
                    name="payment_date"
                    value={paymentData.payment_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-12 mt-2">
                  <label className="form-label">Payment Slip Attachment </label>
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
                <div className="col-lg-12 mt-4 text-end">
                  <button
                    type="button"
                    className="btn btn-label-secondary waves-effect"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      handleClose("paymentPartials");
                      resetPaymentData();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn  btn-success ms-2 waves-effect waves-light"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* ------------------END PAYMENT PARTIALS--------------------- */}
    </>
  );
}
