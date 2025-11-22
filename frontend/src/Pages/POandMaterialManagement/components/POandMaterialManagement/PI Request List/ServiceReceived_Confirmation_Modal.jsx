import React from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { usePIRequest } from "../../../../../Context/PIAndPoManagement/PIRequestList";

export default function ServiceReceived_Confirmation_Modal({ piRequestId }) {
  const { handleClose } = useUIContext();
  const { serviceReceived, btnLoading } = usePIRequest();
  // console.log("piRequestId", typeof piRequestId);

  //  Handle Service Received Confirmation
  const handleServiceReceived = async () => {
    try {
      await serviceReceived({
        request_id: Number(piRequestId),
      });
      // handleClose("serviceReceive");
    } catch (error) {
      console.error("Error marking service as received:", error);
    }
  };

  return (
    <>
      {/* -----------------START SERVICE RECEIVED MODAL---------------- */}
      <div
        className="modal fade show"
        id="smallModal"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        style={{ display: "block" }}
      >
        <div
          className="modal-dialog modal-sm modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel2">
                Confirm Service Received
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => handleClose("serviceReceive")}
              />
            </div>
            <div className="modal-body">
              <p className="mb-2 text-center">
                Are you sure you want to mark this service as{" "}
                <strong>Received</strong>?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-label-secondary waves-effect"
                onClick={() => handleClose("serviceReceive")}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
                onClick={handleServiceReceived}
                disabled={btnLoading}
              >
                {btnLoading && (
                  <div
                    className="spinner-border spinner-white me-2"
                    role="status"
                  ></div>
                )}
                Yes, Received
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* -----------------END SERVICE RECEIVED MODAL---------------- */}
    </>
  );
}
