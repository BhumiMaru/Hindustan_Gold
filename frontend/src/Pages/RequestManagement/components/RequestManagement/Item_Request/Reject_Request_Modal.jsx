import React, { useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";

export default function Reject_Request_Modal() {
  const { handleClose } = useUIContext();
  const { rejectRequest, itemRequestData } = useItemRequest();
  const [reason, setReason] = useState("");
  // console.log("itemRequestData ", itemRequestData);

  const handleSubmit = async () => {
    try {
      const item_request_id = itemRequestData.item_request_id;
      const workflow_id = itemRequestData?.item_request?.workflows[0]?.id;
      rejectRequest(item_request_id, workflow_id, reason);
      handleClose("viewReject");
      setReason("");
    } catch (error) {
      console.log("reject error", error);
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
                  handleClose("viewReject");
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
              {/*  <p class="text-muted small mt-1">This action cannot be undone.</p>*/}
            </div>
            <div className="modal-footer justify-content-center">
              {/*  <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
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
