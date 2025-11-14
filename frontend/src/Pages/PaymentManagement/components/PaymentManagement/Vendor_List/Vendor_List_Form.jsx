import React, { useEffect } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import { useVendor } from "../../../../../Context/PaymentManagement/Vendor";

export default function Vendor_List_Form({ getVendorFilter }) {
  const { handleClose } = useUIContext();
  const {
    createVendor,
    EditVendor,
    setVendorData,
    vendorData,
    vendorEditId,
    // getVendorFilter,
    getVendorList,
    resetVendorData,
    btnLoading,
  } = useVendor();

  // Reset form when modal opens/closes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("vendor", vendorData);

  const handleSave = async () => {
    try {
      const payload = {
        ...vendorData,
      };

      console.log("Saving vendor data:", payload);

      let result;
      if (vendorEditId) {
        result = await EditVendor(vendorEditId, payload);
      } else {
        result = await createVendor(payload);
      }

      console.log("Save result:", result);

      if (result?.success) {
        handleClose("addNewVendor");
        await getVendorList();
        await getVendorFilter();
        resetVendorData(); // Reset after successful save
      }
    } catch (error) {
      console.log("Vendor Save Error : ", error);
    }
  };

  const handleCloseModal = () => {
    resetVendorData();
    handleClose("addNewVendor");
  };

  return (
    <>
      <div
        className="modal fade show"
        id="vendorAddModel"
        tabIndex={-1}
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel2">
                {vendorEditId ? "Edit Vendor" : "Add Vendor"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-4 mb-2">
                  <label htmlFor="nameSmall" className="form-label">
                    Vendor <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="nameSmall"
                    className="form-control"
                    placeholder="Enter Vendor Name"
                    name="vendor_name"
                    value={vendorData?.vendor_name || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-4 mb-2">
                  <label htmlFor="contactPersonname" className="form-label">
                    Contact Person <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactPersonname"
                    className="form-control"
                    placeholder="Enter Contact Person Name"
                    name="contact_person_name"
                    value={vendorData?.contact_person_name || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-4 mb-2">
                  <label htmlFor="emailid" className="form-label">
                    Email Id <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="emailid"
                    className="form-control"
                    placeholder="Enter Email Id"
                    name="email"
                    value={vendorData?.email || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-4 mb-2">
                  <label htmlFor="mobileno" className="form-label">
                    Mobile Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="mobileno"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    name="mobile"
                    value={vendorData?.mobile || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-4 mb-2">
                  <label htmlFor="address" className="form-label">
                    Address
                    {/* <span className="text-danger">*</span> */}
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    placeholder="Enter Address"
                    name="address"
                    value={vendorData?.address || ""}
                    onChange={handleChange}
                    // required
                  />
                </div>
                <div className="col-lg-4 mb-2">
                  <label htmlFor="gstnumber" className="form-label">
                    GST Number
                    {/* <span className="text-danger">*</span> */}
                  </label>
                  <input
                    type="text"
                    id="gstnumber"
                    className="form-control"
                    placeholder="Enter GST Number"
                    name="gst_number"
                    value={vendorData?.gst_number || ""}
                    onChange={handleChange}
                    // required
                  />
                </div>
                <div className="col-lg-4 mb-2">
                  <label htmlFor="pannumber" className="form-label">
                    PAN Number
                    {/* <span className="text-danger">*</span> */}
                  </label>
                  <input
                    type="text"
                    id="pannumber"
                    className="form-control"
                    placeholder="Enter PAN Number"
                    name="pan_number"
                    value={vendorData?.pan_number || ""}
                    onChange={handleChange}
                    // required
                  />
                </div>
                <div className="col-lg-4 mb-2">
                  <CustomSelect
                    id="selectVendorType"
                    label="MSME Certificate Available"
                    options={[
                      { value: "Yes", label: "Yes" },
                      { value: "No", label: "No" },
                    ]}
                    value={vendorData?.msme_certificate || ""}
                    onChange={(val) =>
                      setVendorData((prev) => ({
                        ...prev,
                        msme_certificate: val,
                      }))
                    }
                    placeholder="Select"
                    // isTextRequired
                  />
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-lg-4 mb-2">
                  <label htmlFor="bankname" className="form-label">
                    Bank Name
                    {/* <span className="text-danger">*</span> */}
                  </label>
                  <input
                    type="text"
                    id="bankname"
                    className="form-control"
                    placeholder="Enter Bank Name"
                    name="bank_name"
                    value={vendorData?.bank_name || ""}
                    onChange={handleChange}
                    // required
                  />
                </div>
                <div className="col-lg-4 mb-2">
                  <label htmlFor="accountno" className="form-label">
                    Account No
                    {/* <span className="text-danger">*</span> */}
                  </label>
                  <input
                    type="text"
                    id="accountno"
                    className="form-control"
                    placeholder="Enter Account No"
                    name="account_no"
                    value={vendorData?.account_no || ""}
                    onChange={handleChange}
                    // required
                  />
                </div>
                <div className="col-lg-4 mb-2">
                  <label htmlFor="ifsccode" className="form-label">
                    IFSC Code
                    {/* <span className="text-danger">*</span> */}
                  </label>
                  <input
                    type="text"
                    id="ifsccode"
                    className="form-control"
                    placeholder="Enter IFSC Code"
                    name="ifsc_code"
                    value={vendorData?.ifsc_code || ""}
                    onChange={handleChange}
                    // required
                  />
                </div>
                <div className="col-lg-4 mb-2">
                  <label htmlFor="BranchName" className="form-label">
                    Branch Name
                    {/* <span className="text-danger">*</span> */}
                  </label>
                  <input
                    type="text"
                    id="BranchName"
                    className="form-control"
                    placeholder="Enter Branch Name"
                    name="branch_name"
                    value={vendorData?.branch_name || ""}
                    onChange={handleChange}
                    // required
                  />
                </div>
                <div className="col-lg-4 mb-2">
                  <CustomSelect
                    id="selectStatus"
                    label="Status"
                    options={[
                      { value: 1, label: "Active" },
                      { value: 0, label: "Deactive" },
                    ]}
                    value={vendorData?.status}
                    onChange={(val) => {
                      console.log("val", val);
                      return setVendorData((prev) => ({
                        ...prev,
                        status: Number(val),
                      }));
                    }}
                    placeholder="Select Status"
                    isTextRequired
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-label-secondary waves-effect"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
                onClick={handleSave}
                disabled={btnLoading}
              >
                {btnLoading && (
                  <div
                    className="spinner-border spinner-white me-2"
                    role="status"
                  ></div>
                )}
                {vendorEditId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
