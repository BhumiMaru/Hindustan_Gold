import React, { useEffect } from "react";
import CustomSelect from "../../Common/CustomSelect/CustomSelect";
import { useUIContext } from "../../../Context/UIContext";
import { useServiceLocation3Master } from "../../../Context/Master/ServiceLocation3MasterContext";
import { useServiceLocation2Master } from "../../../Context/Master/ServiceLocation2MasterContext";
import { useServiceLocation1Master } from "../../../Context/Master/ServiceLocation1MasterContext";
import { toast } from "react-toastify";
import { validateTextInput } from "../../../utils/validation";

export default function ServiceLocation_3_Master_Form() {
  const { handleClose } = useUIContext();
  const {
    setServiceLocation3Data,
    serviceLocation3Data,
    serviceLocation3EditId,
    updateServiceLocation3,
    createServiceLocation3,
    setServiceLocation3EditId,
  } = useServiceLocation3Master();
  const { serviceLocation: serviceLocation1, fetchServiceLocations } =
    useServiceLocation1Master();
  const { serviceLocation2, fetchServiceLocations2 } =
    useServiceLocation2Master();

  useEffect(() => {
    fetchServiceLocations();
    fetchServiceLocations2();
  }, []);

  const handleSave = () => {
    // ✅ validate text input
    const { valid, error } = validateTextInput(
      serviceLocation3Data.serviceLocation3Name
    );
    if (!valid) {
      toast.error(error);
      return;
    }

    // ✅ validate select input
    if (!serviceLocation3Data.selectedSl1) {
      toast.error("Please select Service Location 1");
      return;
    }

    if (!serviceLocation3Data.selectedSl2) {
      toast.error("Please select Service Location 2");
      return;
    }

    if (serviceLocation3EditId) {
      // update
      updateServiceLocation3(
        serviceLocation3EditId,
        serviceLocation3Data.serviceLocation3Name,
        serviceLocation3Data.selectedSl1.value,
        serviceLocation3Data.selectedSl2.value
      );
    } else {
      // create
      createServiceLocation3(
        serviceLocation3Data.serviceLocation3Name,
        serviceLocation3Data.selectedSl1.value,
        serviceLocation3Data.selectedSl2.value
      );
    }

    handleClose("addNewServiceLocation3");
    setServiceLocation3EditId(null);
    setServiceLocation3Data({
      serviceLocation3Name: "",
      selectedSl1: null,
      selectedSl2: null,
    });
  };
  return (
    <>
      {/* -----------------START SERVICE LOCATION 3 MASTER Form-------------------- */}
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
                {serviceLocation3EditId
                  ? "Edit Service Location 3"
                  : "Add Service Location 3"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose("addNewServiceLocation3")}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12 mb-2">
                  <label htmlFor="select2Basic" className="form-label">
                    Service Location 1
                  </label>
                  <div className="position-relative">
                    <CustomSelect
                      options={serviceLocation1?.map((loc) => ({
                        value: loc.id,
                        label: loc.service_location_name,
                      }))}
                      value={serviceLocation3Data.selectedSl1}
                      onChange={(val) =>
                        setServiceLocation3Data((prev) => ({
                          ...prev,
                          selectedSl1: val,
                        }))
                      }
                      placeholder="Select Service Location 1"
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                  <label htmlFor="select3Basic" className="form-label">
                    Service Location 2
                  </label>
                  <div className="position-relative">
                    <CustomSelect
                      options={serviceLocation2?.map((loc) => ({
                        value: loc.id,
                        label: loc.service_location_2_name,
                      }))}
                      value={serviceLocation3Data.selectedSl2}
                      onChange={(val) =>
                        setServiceLocation3Data((prev) => ({
                          ...prev,
                          selectedSl2: val,
                        }))
                      }
                      placeholder="Select Service Location 2"
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                  <label htmlFor="nameSmall" className="form-label">
                    Service Location 3 Name
                  </label>
                  <input
                    type="text"
                    id="nameSmall"
                    className="form-control"
                    placeholder="Enter Service Location 3 Name"
                    value={serviceLocation3Data.serviceLocation3Name}
                    onChange={(e) =>
                      setServiceLocation3Data((prev) => ({
                        ...prev,
                        serviceLocation3Name: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-label-secondary waves-effect"
                data-bs-dismiss="modal"
                onClick={() => handleClose("addNewServiceLocation3")}
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
      {/* -----------------END SERVICE LOCATION 3 MASTER Form-------------------- */}
    </>
  );
}
