import React from "react";
import { useUOM } from "../../Context/UomContext";
import { validateTextInput } from "../../utils/validation";
import { toast } from "react-toastify";
import { useUIContext } from "../../Context/UIContext";

export default function UOMForm() {
  const { editId, setEditId, uomData, setUomData, createUOM, EditUOM } =
    useUOM();
  const { handleClose } = useUIContext();

  const handleSubmit = () => {
    const { valid, error } = validateTextInput(uomData.name);
    if (!valid) {
      toast.error(error);
      return;
    }

    if (editId) {
      EditUOM({
        id: editId,
        name: uomData.name,
      });
    } else {
      createUOM(uomData.name);
    }
    setEditId(null);
    setUomData({
      name: "",
    });
    handleClose("addNewUOM");
  };

  return (
    <>
      {/* ----------------START UOM FORM----------------- */}
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
                {editId ? "Edit UOM" : "Add UOM"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  handleClose("addNewUOM");
                  setUomData({
                    name: "",
                  });
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col mb-2">
                  <label htmlFor="nameSmall" className="form-label">
                    UOM Name
                  </label>
                  <input
                    type="text"
                    id="nameSmall"
                    className="form-control"
                    placeholder="Enter UOM Name"
                    value={uomData?.name}
                    onChange={(e) => setUomData({ name: e.target.value })}
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
                  handleClose("addNewUOM");
                  setUomData({
                    name: "",
                  });
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
                onClick={handleSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* ----------------END UOM FORM----------------- */}
    </>
  );
}
