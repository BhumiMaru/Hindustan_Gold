import React from "react";
import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";

export default function Item_Request_Form() {
  const { serviceL1, fetchSL1Filter } = useServiceLocation1Master();
  const { itemRequestData, setItemRequestData, createItemRequest } =
    useItemRequest();

  // handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setItemRequestData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createItemRequest();
  };

  return (
    <>
      {/* -----------------START ITEM REQUEST FORM---------------- */}
      <>
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* DataTable with Buttons */}
          <div className="card mt-3">
            <div className="row p-3">
              {/* <!--    <div className="col-sm-3 mb-4">
                                <label htmlFor="RequestType" className="form-label">Request Type</label>
                                <select id="RequestType" className="select2 form-select" >
                                    <option value="AK">Material</option>
                                    <option value="HI">Service</option>
                                </select>
                            </div>--> */}
              <div className="col-sm-3 mb-4">
                <label htmlFor="SelectItem" className="form-label">
                  Select Item
                </label>
                <div className="position-relative">
                  <select
                    id="SelectItem"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="SelectItem"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <option value="AK" data-select2-id="2">
                      Item 1
                    </option>
                    <option value="HI">Item 2</option>
                    <option value="HI">Item 3</option>
                    <option value="HI">Item 4</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-3 mb-4">
                <label htmlFor="Category" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Category"
                  placeholder="Category"
                  disabled
                  readOnly=""
                  value={itemRequestData.c_id || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-3 mb-4">
                <label htmlFor="Subcategory" className="form-label">
                  Subcategory
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Subcategory"
                  placeholder="Subcategory"
                  value="Subcategory 1"
                  disabled
                  readOnly=""
                />
              </div>
              <div className="col-sm-3 mb-4">
                <label htmlFor="Code" className="form-label">
                  Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Code"
                  placeholder="Code"
                  value="MAT_STR_SDR_000001"
                  disabled
                  readOnly=""
                />
              </div>

              <div className="col-sm-3 mb-4">
                <CustomSelect
                  id="selectServiceLocation"
                  label="Service Location 1"
                  options={serviceL1.map((sl1) => {
                    return {
                      value: sl1.id,
                      label: sl1.service_location_name,
                    };
                  })}
                  value={itemRequestData?.service_location_1_id}
                  onChange={(selected) => {
                    setUserCreationData({
                      ...itemRequestData,
                      service_location_1_id: selected,
                    });
                  }}
                  placeholder="Select Service Location"
                  required
                />
              </div>
              <div className="col-sm-3 mb-4">
                <label htmlFor="Purpose" className="form-label">
                  Purpose
                </label>
                <div className="position-relative">
                  <select
                    id="Purpose"
                    className="select2 form-select select2-hidden-accessible"
                    data-select2-id="Purpose"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <option value="AK" data-select2-id="4">
                      Purpose 1
                    </option>
                    <option value="HI">Purpose 2</option>
                    <option value="HI">Purpose 3</option>
                    <option value="HI">Purpose 4</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-3 mb-4">
                <label htmlFor="Quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="Quantity"
                  placeholder=""
                  min="0"
                  value={itemRequestData.quantity || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-sm-3 mb-4">
                <label htmlFor="UnitofMeasure" className="form-label">
                  Unit of Measure
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="UnitofMeasure"
                  placeholder=""
                  value="KG"
                  disabled
                  readOnly=""
                />
              </div>
              <div className="col-sm-6 mb-4">
                <label htmlFor="Remarks" className="form-label">
                  Remarks
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Remarks"
                  placeholder=""
                  value={itemRequestData.remarks || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-3 mb-4">
                <label htmlFor="ReceivingPerson" className="form-label">
                  Receiving Person
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ReceivingPerson"
                  placeholder=""
                  value={itemRequestData.receiving_person || ""}
                  onChange={handleChange}
                />
              </div>
              {/* <!-- <div className="col-sm-3 mb-4">
                                <label htmlFor="RequestDate" className="form-label">Request Date </label>
                                <input type="date" className="form-control" id="RequestDate" placeholder="" />
                            </div>
--> */}
              <div className="col-sm-6 mb-4">
                <label htmlFor="UploadFile" className="form-label">
                  Upload File (Optional){" "}
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="UploadFile"
                  placeholder=""
                />
              </div>

              <div className="col-lg-12 text-end">
                <button
                  className="btn btn-primary waves-effect waves-light"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* -----------------END ITEM REQUEST FORM---------------- */}
    </>
  );
}
