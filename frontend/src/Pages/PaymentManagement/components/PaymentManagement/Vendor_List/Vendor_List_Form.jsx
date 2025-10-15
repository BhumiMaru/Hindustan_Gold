// import React from "react";
// import { useUIContext } from "../../../../../Context/UIContext";
// import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
// import { useVendor } from "../../../../../Context/PaymentManagement/Vendor";

// export default function Vendor_List_Form() {
//   const { handleClose } = useUIContext();
//   const {
//     createVendor,
//     EditVendor,
//     setVendorData,
//     vendorData,
//     vendorEditId,
//     getVendorFilter,
//     getVendorList,
//   } = useVendor();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVendorData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const payload = {
//         ...vendorData,
//       };
//       let result;
//       if (vendorEditId) {
//         result = await EditVendor(vendorEditId, payload);
//       } else {
//         result = await createVendor(payload);
//       }

//       // createVendor(payload);
//       handleClose("addNewVendor");
//       await getVendorList();
//       await getVendorFilter();
//     } catch (error) {
//       console.log("Vendor Save Error : ", error);
//     }
//   };

//   return (
//     <>
//       <>
//         {/* ------------------START VENDOR FORM----------------------- */}
//         <div
//           className="modal fade show"
//           id="vendorAddModel"
//           tabIndex={-1}
//           style={{ display: "block" }}
//           aria-modal="true"
//           role="dialog"
//         >
//           <div
//             className="modal-dialog modal-lg modal-dialog-centered"
//             role="document"
//           >
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="exampleModalLabel2">
//                   Add Vendor
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                   onClick={() => handleClose("addNewVendor")}
//                 />
//               </div>
//               <div className="modal-body">
//                 <div className="row">
//                   <div className="col-lg-4 mb-2">
//                     <label htmlFor="nameSmall" className="form-label">
//                       Vendor
//                     </label>
//                     <input
//                       type="text"
//                       id="nameSmall"
//                       className="form-control"
//                       placeholder="Enter Vendor Name"
//                       name="vendor_name"
//                       value={vendorData?.vendor_name}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-2">
//                     <label htmlFor="contactPersonname" className="form-label">
//                       Contact Person
//                     </label>
//                     <input
//                       type="text"
//                       id="contactPersonname"
//                       className="form-control"
//                       placeholder="Enter Contact Person Name"
//                       name="contact_person_name"
//                       value={vendorData?.contact_person_name}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-2">
//                     <label htmlFor="emailid" className="form-label">
//                       Email Id
//                     </label>
//                     <input
//                       type="email"
//                       id="emailid"
//                       className="form-control"
//                       placeholder="Enter Email Id"
//                       name="email"
//                       value={vendorData?.email}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-2">
//                     <label htmlFor="mobileno" className="form-label">
//                       Mobile Number
//                     </label>
//                     <input
//                       type="text"
//                       id="mobileno"
//                       className="form-control"
//                       placeholder="Enter Mobile Number"
//                       name="mobile"
//                       value={vendorData?.mobile}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-2">
//                     <label htmlFor="address" className="form-label">
//                       Address
//                     </label>
//                     <input
//                       type="text"
//                       id="address"
//                       className="form-control"
//                       placeholder="Enter Address"
//                       name="address"
//                       value={vendorData?.address}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-2">
//                     <label htmlFor="gstnumber" className="form-label">
//                       GST Number
//                     </label>
//                     <input
//                       type="text"
//                       id="gstnumber"
//                       className="form-control"
//                       placeholder="Enter GST Number"
//                       name="gst_number"
//                       value={vendorData?.gst_number}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-2">
//                     <label htmlFor="pannumber" className="form-label">
//                       PAN Number
//                     </label>
//                     <input
//                       type="text"
//                       id="pannumber"
//                       className="form-control"
//                       placeholder="Enter PAN Number"
//                       name="pan_number"
//                       value={vendorData?.pan_number}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-2">
//                     <CustomSelect
//                       id="selectVendorType"
//                       label="MSME Cirtificate Available"
//                       options={[
//                         { value: "Yes", label: "Yes" },
//                         { value: "No", label: "No" },
//                       ]}
//                       value={vendorData?.msme_certificate}
//                       onChange={(val) =>
//                         setVendorData((prev) => ({
//                           ...prev,
//                           msme_certificate: val,
//                         }))
//                       }
//                       placeholder="Select"
//                     />
//                   </div>
//                 </div>
//                 <hr />
//                 <div className="row">
//                   <div className="col-lg-4 mb-2">
//                     <label htmlFor="bankname" className="form-label">
//                       {" "}
//                       Bank Name
//                     </label>
//                     <input
//                       type="text"
//                       id="bankname"
//                       className="form-control"
//                       placeholder="Enter Bank Name"
//                       name="bank_name"
//                       value={vendorData?.bank_name}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-2">
//                     <label htmlFor="accountno" className="form-label">
//                       Account No
//                     </label>
//                     <input
//                       type="text"
//                       id="accountno"
//                       className="form-control"
//                       placeholder="Enter Account No"
//                       name="account_no"
//                       value={vendorData?.account_no}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-2">
//                     <label htmlFor="ifsccode" className="form-label">
//                       IFSC Code
//                     </label>
//                     <input
//                       type="text"
//                       id="ifsccode"
//                       className="form-control"
//                       placeholder="Enter IFSC Code"
//                       name="ifsc_code"
//                       value={vendorData?.ifsc_code}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-2">
//                     <label htmlFor="BranchName" className="form-label">
//                       Branch Name
//                     </label>
//                     <input
//                       type="text"
//                       id="BranchName"
//                       className="form-control"
//                       placeholder="Enter Branch Name"
//                       name="branch_name"
//                       value={vendorData?.branch_name}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-lg-4 mb-2">
//                     {/* <label htmlFor="BranchName" className="form-label">
//                       Status
//                     </label> */}
//                     <CustomSelect
//                       id="selectStatus"
//                       label="Status"
//                       options={[
//                         { value: 1, label: "Active" },
//                         { value: 0, label: "Deactive" },
//                       ]}
//                       value={vendorData?.status ?? ""} // show empty if undefined
//                       onChange={(val) =>
//                         setVendorData((prev) => ({
//                           ...prev,
//                           status: Number(val), // ensure it's a number
//                         }))
//                       }
//                       placeholder="Select Status"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-label-secondary waves-effect"
//                   data-bs-dismiss="modal"
//                   onClick={() => handleClose("addNewVendor")}
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-primary waves-effect waves-light"
//                   onClick={handleSave}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="modal-backdrop fade show"></div>
//         {/* ------------------END VENDOR FORM----------------------- */}
//       </>
//     </>
//   );
// }

////

import React from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import { useVendor } from "../../../../../Context/PaymentManagement/Vendor";

export default function Vendor_List_Form() {
  const { handleClose } = useUIContext();
  const {
    createVendor,
    EditVendor,
    setVendorData,
    vendorData,
    vendorEditId,
    getVendorFilter,
    getVendorList,
  } = useVendor();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...vendorData,
      };
      let result;
      if (vendorEditId) {
        result = await EditVendor(vendorEditId, payload);
      } else {
        result = await createVendor(payload);
      }

      // createVendor(payload);
      handleClose("addNewVendor");
      await getVendorList();
      await getVendorFilter();
    } catch (error) {
      console.log("Vendor Save Error : ", error);
    }
  };

  return (
    <>
      <>
        {/* ------------------START VENDOR FORM----------------------- */}
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
                  Add Vendor
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleClose("addNewVendor")}
                />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="nameSmall" className="form-label">
                      Vendor
                    </label>
                    <input
                      type="text"
                      id="nameSmall"
                      className="form-control"
                      placeholder="Enter Vendor Name"
                      name="vendor_name"
                      value={vendorData?.vendor_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="contactPersonname" className="form-label">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      id="contactPersonname"
                      className="form-control"
                      placeholder="Enter Contact Person Name"
                      name="contact_person_name"
                      value={vendorData?.contact_person_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="emailid" className="form-label">
                      Email Id
                    </label>
                    <input
                      type="email"
                      id="emailid"
                      className="form-control"
                      placeholder="Enter Email Id"
                      name="email"
                      value={vendorData?.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="mobileno" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      id="mobileno"
                      className="form-control"
                      placeholder="Enter Mobile Number"
                      name="mobile"
                      value={vendorData?.mobile}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="form-control"
                      placeholder="Enter Address"
                      name="address"
                      value={vendorData?.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="gstnumber" className="form-label">
                      GST Number
                    </label>
                    <input
                      type="text"
                      id="gstnumber"
                      className="form-control"
                      placeholder="Enter GST Number"
                      name="gst_number"
                      value={vendorData?.gst_number}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="pannumber" className="form-label">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      id="pannumber"
                      className="form-control"
                      placeholder="Enter PAN Number"
                      name="pan_number"
                      value={vendorData?.pan_number}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <CustomSelect
                      id="selectVendorType"
                      label="MSME Cirtificate Available"
                      options={[
                        { value: "Yes", label: "Yes" },
                        { value: "No", label: "No" },
                      ]}
                      value={vendorData?.msme_certificate}
                      onChange={(val) =>
                        setVendorData((prev) => ({
                          ...prev,
                          msme_certificate: val,
                        }))
                      }
                      placeholder="Select"
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="bankname" className="form-label">
                      {" "}
                      Bank Name
                    </label>
                    <input
                      type="text"
                      id="bankname"
                      className="form-control"
                      placeholder="Enter Bank Name"
                      name="bank_name"
                      value={vendorData?.bank_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="accountno" className="form-label">
                      Account No
                    </label>
                    <input
                      type="text"
                      id="accountno"
                      className="form-control"
                      placeholder="Enter Account No"
                      name="account_no"
                      value={vendorData?.account_no}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="ifsccode" className="form-label">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      id="ifsccode"
                      className="form-control"
                      placeholder="Enter IFSC Code"
                      name="ifsc_code"
                      value={vendorData?.ifsc_code}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label htmlFor="BranchName" className="form-label">
                      Branch Name
                    </label>
                    <input
                      type="text"
                      id="BranchName"
                      className="form-control"
                      placeholder="Enter Branch Name"
                      name="branch_name"
                      value={vendorData?.branch_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    {/* <label htmlFor="BranchName" className="form-label">
                      Status
                    </label> */}
                    <CustomSelect
                      id="selectStatus"
                      label="Status"
                      options={[
                        { value: 1, label: "Active" },
                        { value: 0, label: "Deactive" },
                      ]}
                      value={vendorData?.status ?? ""} // show empty if undefined
                      onChange={(val) =>
                        setVendorData((prev) => ({
                          ...prev,
                          status: Number(val), // ensure it's a number
                        }))
                      }
                      placeholder="Select Status"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-label-secondary waves-effect"
                  data-bs-dismiss="modal"
                  onClick={() => handleClose("addNewVendor")}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
        {/* ------------------END VENDOR FORM----------------------- */}
      </>
    </>
  );
}
