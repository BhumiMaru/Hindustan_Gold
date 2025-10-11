import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useUIContext } from "../../../../../Context/UIContext";
import { useServiceLocation3Master } from "../../../../../Context/Master/ServiceLocation3MasterContext";
import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";
import { useServiceLocation2Master } from "../../../../../Context/Master/ServiceLocation2MasterContext";
import { validateTextInput } from "../../../../../utils/validation";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";

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
    // Validate name only if present
    if (serviceLocation3Data.service_location_3_name) {
      const { valid, error } = validateTextInput(
        serviceLocation3Data.service_location_3_name
      );
      if (!valid) {
        toast.error(error);
        return;
      }
    }

    if (serviceLocation3EditId) {
      // --- UPDATE MODE ---
      let updatePayload = {};

      if (serviceLocation3Data.service_location_3_name) {
        updatePayload.service_location_3_name =
          serviceLocation3Data.service_location_3_name;
      }

      if (serviceLocation3Data.selectedSl1) {
        updatePayload.service_location_1_id = serviceLocation3Data.selectedSl1;
      }

      if (serviceLocation3Data.selectedSl2) {
        updatePayload.service_location_2_id = serviceLocation3Data.selectedSl2;
      }

      updateServiceLocation3(serviceLocation3EditId, {
        id: serviceLocation3EditId,
        ...updatePayload,
      });
    } else {
      // --- CREATE MODE ---
      if (
        !serviceLocation3Data.selectedSl1 ||
        !serviceLocation3Data.selectedSl2
      ) {
        toast.error("Please select Service Location 1 & 2 for new entry");
        return;
      }
      // console.log("sl3", {
      //   service_location_3_name: serviceLocation3Data.service_location_3_name,
      //   service_location_1_id: serviceLocation3Data.selectedSl1,
      //   service_location_2_id: serviceLocation3Data.selectedSl2,
      // });
      createServiceLocation3(
        serviceLocation3Data.service_location_3_name,
        serviceLocation3Data.selectedSl1,
        serviceLocation3Data.selectedSl2
      );
    }

    // reset form
    handleClose("addNewServiceLocation3");
    setServiceLocation3EditId(null);
    setServiceLocation3Data({
      service_location_3_name: "",
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
                  <div className="position-relative">
                    <CustomSelect
                      options={serviceLocation1?.map((loc) => ({
                        value: loc.id,
                        label: loc.service_location_name,
                      }))}
                      value={serviceLocation3Data?.selectedSl1} // ✅ always full object
                      onChange={(val) =>
                        setServiceLocation3Data((prev) => ({
                          ...prev,
                          selectedSl1: val,
                        }))
                      }
                      label="Service Location 1"
                      placeholder="Select Service Location 1"
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                  <div className="position-relative">
                    <CustomSelect
                      options={serviceLocation2?.map((loc) => ({
                        value: loc.id,
                        label: loc.service_location_2_name,
                      }))}
                      value={serviceLocation3Data?.selectedSl2} // ✅ always full object
                      onChange={(val) =>
                        setServiceLocation3Data((prev) => ({
                          ...prev,
                          selectedSl2: val,
                        }))
                      }
                      label="Service Location 2"
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
                    value={serviceLocation3Data.service_location_3_name}
                    onChange={(e) =>
                      setServiceLocation3Data((prev) => ({
                        ...prev,
                        service_location_3_name: e.target.value,
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
