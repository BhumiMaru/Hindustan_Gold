import React from "react";
import { useCompanyMaster } from "../../../Context/Master/CompanyMasterContext";
import { validateTextInput } from "../../../utils/validation";
import { useUIContext } from "../../../Context/UIContext";

export default function Company_Master_Form() {
  const {
    companyName,
    setCompanyName,
    updateCompany,
    createCompany,
    setCompanyEditId,
    companyEditId,
  } = useCompanyMaster();
  const { handleClose } = useUIContext();

  const handleSubmit = () => {
    const { valid, error } = validateTextInput(companyName);
    if (!valid) {
      toast.error(error);
      return;
    }

    if (companyEditId) {
      updateCompany(companyEditId, companyName);
    } else {
      createCompany(companyName);
    }
    setCompanyEditId(null);
    setCompanyName("");
    handleClose("addNewCompany");
  };

  return (
    <>
      {/* ---------------------START COMPANY MASTER FORM------------------------- */}
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
                  {companyEditId ? "Edit Company" : "Add Company"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    handleClose("addNewCompany");
                    setCompanyName("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col mb-2">
                    <label htmlFor="nameSmall" className="form-label">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="nameSmall"
                      className="form-control"
                      placeholder="Enter Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
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
                    handleClose("addNewCompany");
                    setCompanyName("");
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
      </>
      {/* ---------------------END COMPANY MASTER FORM------------------------- */}
    </>
  );
}
