import React, { useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useGRN } from "../../../../../Context/PIAndPoManagement/GRN";

export default function RejectGRN({ id }) {
  // console.log("iddddddd", id);
  const { handleClose } = useUIContext();
  const { GRNReject, GRNDetails, grnDetails } = useGRN();
  //   const { rejectRequest, itemRequestData } = useItemRequest();
  const [reason, setReason] = useState("");
  // console.log("itemRequestData ", itemRequestData);

  const handleSubmit = async () => {
    try {
      await GRNReject({ grn_id: id, reject_reason: reason });
      await GRNDetails(grnDetails.id);
      handleClose("viewRejectGRN");
      setReason("");
    } catch (error) {
      console.error("Error approving GRN:", error);
    }
  };

  return (
    <>
      {/* ---------------------START REJECT REQUEST MODAL------------------- */}
      <div
        className="modal fade show"
        id="rejectRemarkModal"
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
              <p className="fs-4">Reject Remark</p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  handleClose("viewRejectGRN");
                  setReason("");
                }}
              />
            </div>
            <div className="mx-4 mb-4">
              <label className="form-label">Reject Remark</label>
              <textarea
                className="form-control"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              {/*  <p className="text-muted small mt-1">This action cannot be undone.</p>*/}
            </div>
            <div className="modal-footer justify-content-center">
              {/*  <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                Cancel
            </button>*/}
              <button
                type="button"
                className="btn btn-info waves-effect waves-light"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* ---------------------END REJECT REQUEST MODAL------------------- */}
    </>
  );
}
