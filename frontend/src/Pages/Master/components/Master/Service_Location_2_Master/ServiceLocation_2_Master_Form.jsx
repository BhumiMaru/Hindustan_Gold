import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";
import { useUIContext } from "../../../../../Context/UIContext";
import { useServiceLocation2Master } from "../../../../../Context/Master/ServiceLocation2MasterContext";
import { validateTextInput } from "../../../../../utils/validation";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";

export default function ServiceLocation_2_Master_Form() {
  const { serviceLocation, fetchServiceLocations } =
    useServiceLocation1Master();
  const { handleClose } = useUIContext();
  const {
    createServiceLocation2,
    updateServiceLocation2,
    serviceLocation2EditId,
    serviceLocation2Name,
    setServiceLocation2Name,
    setServiceLocation2EditId,
    selectedOption,
    setSelectedOption,
  } = useServiceLocation2Master();

  useEffect(() => {
    fetchServiceLocations();
  }, []);

  const handleSave = () => {
    // ✅ validate text input
    const { valid, error } = validateTextInput(serviceLocation2Name);
    if (!valid) {
      toast.error(error);
      return;
    }

    // ✅ validate select input
    if (!selectedOption) {
      toast.error("Please select Service Location 1");
      return;
    }

    try {
      if (serviceLocation2EditId) {
        // ✅ update existing
        updateServiceLocation2(
          serviceLocation2EditId,
          serviceLocation2Name,
          selectedOption.value
        );
      } else {
        // ✅ create new
        createServiceLocation2(serviceLocation2Name, selectedOption.value);
      }

      // ✅ reset state after success
      handleClose("addNewServiceLocation2");
      setServiceLocation2Name("");
      setServiceLocation2EditId(null);
      setSelectedOption(null); // reset dropdown
    } catch (error) {
      console.error("Error saving Service Location 2:", error);
      toast.error("Something went wrong while saving");
    }
  };

  return (
    <>
      {/* -----------------START SERVICE LOCATION 2 MASTER Form-------------------- */}
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
                {serviceLocation2EditId
                  ? "Edit Service Location 2"
                  : "Add Service Location 2"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  handleClose("addNewServiceLocation2");
                  setServiceLocation2Name("");
                  setSelectedOption(null);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12 mb-2">
                  {/* <label htmlFor="select2Basic" className="form-label">
                    Service Location 1
                  </label> */}
                  <div className="position-relative">
                    <CustomSelect
                      label="Service Location 1"
                      options={serviceLocation.map((loc) => ({
                        value: loc.id,
                        label: loc.service_location_name,
                      }))}
                      value={selectedOption}
                      onChange={setSelectedOption}
                      placeholder="Select Service Location 1"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                  <label htmlFor="nameSmall" className="form-label">
                    Service Location 2 Name
                  </label>
                  <input
                    type="text"
                    id="nameSmall"
                    className="form-control"
                    placeholder="Enter Service Location 2 Name"
                    value={serviceLocation2Name}
                    onChange={(e) => setServiceLocation2Name(e.target.value)}
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
                  handleClose("addNewServiceLocation2");
                  setServiceLocation2Name("");
                  setSelectedOption(null);
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
      {/* -----------------END SERVICE LOCATION 2 MASTER Form-------------------- */}
    </>
  );
}
