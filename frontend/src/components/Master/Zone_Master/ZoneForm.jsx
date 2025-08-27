import React from "react";
import { useUIContext } from "../../../Context/UIContext";
import { validateTextInput } from "../../../utils/validation";
import { useZone } from "../../../Context/Master/ZoneContext";
import { toast } from "react-toastify";

export default function ZoneForm() {
  const { handleClose } = useUIContext();
  const {
    zoneName,
    setZoneName,
    colorCode,
    setColorCode,
    editId,
    addZone,
    updateZone,
    setEditId,
  } = useZone();

  const handleSave = async () => {
    const { valid, error } = validateTextInput(zoneName);
    if (!valid) {
      toast.error(error);
      return;
    }

    try {
      if (editId) {
        await updateZone();
      } else {
        await addZone();
      }

      // ✅ Close modal after save
      handleClose("addNewZone");

      // ✅ Reset form
      setEditId(null);
    } catch (err) {
      toast.error("Something went wrong while saving zone ❌");
      console.error(err);
    }
  };
  return (
    <>
      {/* ---------------------START ZONE FORM POPUP MODAL [ADD/EDIT]-------------------- */}
      <>
        <div
          className="modal fade show"
          id="smallModal"
          tabindex="-1"
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
                  Add Zone
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    handleClose("addNewZone");
                    setZoneName("");
                    setColorCode("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12 mb-2">
                    <label htmlFor="nameSmall" className="form-label">
                      Zone Name
                    </label>
                    <input
                      type="text"
                      id="nameSmall"
                      className="form-control"
                      placeholder="Enter Zone Name"
                      value={zoneName}
                      onChange={(e) => setZoneName(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mb-2">
                    <label htmlFor="color" className="form-label">
                      Select Color
                    </label>
                    <input
                      type="color"
                      id="color"
                      className="form-control"
                      value={colorCode}
                      onChange={(e) => setColorCode(e.target.value)}
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
                    handleClose("addNewZone");
                    setZoneName("");
                    setColorCode("");
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  onClick={handleSave}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
      </>
      {/* ---------------------END ZONE FORM POPUP MODAL [ADD/EDIT]-------------------- */}
    </>
  );
}
