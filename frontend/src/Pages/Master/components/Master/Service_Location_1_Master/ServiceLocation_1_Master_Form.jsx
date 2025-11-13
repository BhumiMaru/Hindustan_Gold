import React from "react";
import { toast } from "react-toastify";
import { useUIContext } from "../../../../../Context/UIContext";
import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";
import { validateTextInput } from "../../../../../utils/validation";

export default function ServiceLocation_1_Master_Form() {
  const { handleClose } = useUIContext();
  const {
    setServiceLocationName,
    serviceLocationName,
    updateServiceLocation,
    createServiceLocation,
    serviceLocation1EditId,
    setServiceLocation1EditId,
    btnLoading,
  } = useServiceLocation1Master();

  const handleSubmit = () => {
    const { valid, error } = validateTextInput(serviceLocationName);
    if (!valid) {
      toast.error(error);
      return;
    }

    if (serviceLocation1EditId) {
      updateServiceLocation(serviceLocation1EditId, serviceLocationName);
    } else {
      createServiceLocation(serviceLocationName);
    }
    setServiceLocation1EditId(null);
    setServiceLocationName("");
    // handleClose("addNewServiceLocation1");
  };

  return (
    <>
      {/* -----------------START SERVICE LOCATION 1 MASTER Form-------------------- */}
      <>
        <div
          className="modal fade show"
          id="smallModal"
          tabIndex="-1"
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
                  {serviceLocation1EditId
                    ? "Edit Service Location 1"
                    : "Add Service Location 1"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    handleClose("addNewServiceLocation1");
                    setServiceLocationName("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col mb-2">
                    <label htmlFor="nameSmall" className="form-label">
                      Service Location 1 Name{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="nameSmall"
                      className="form-control"
                      placeholder="Enter Service Location 1 Name"
                      value={serviceLocationName}
                      onChange={(e) => setServiceLocationName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-label-secondary waves-effect"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleClose("addNewServiceLocation1");
                    setServiceLocationName("");
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  onClick={handleSubmit}
                  disabled={btnLoading}
                >
                  {btnLoading && (
                    <div
                      className="spinner-border spinner-white me-2"
                      role="status"
                    ></div>
                  )}
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
      </>
      {/* -----------------END SERVICE LOCATION 1 MASTER Form-------------------- */}
    </>
  );
}
