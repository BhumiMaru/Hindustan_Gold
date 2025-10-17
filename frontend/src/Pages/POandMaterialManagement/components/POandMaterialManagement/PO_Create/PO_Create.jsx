// import React, { useEffect, useState } from "react";
// import { usePOCreate } from "../../../../../Context/PIAndPoManagement/POCreate";
// import { useParams } from "react-router-dom";
// const publicUrl = import.meta.env.VITE_PUBLIC_URL;

// export default function PO_Create() {
//   const { id } = useParams();
//   const [showButton, setShowButton] = useState(false);
//   const [charges, setCharges] = useState([{ name: "", amount: "" }]);
//   const [milestones, setMilestones] = useState([
//     { percentage: "", description: "" },
//   ]);
//   const { PoCreate, PoData, getPoDetails, poDetails } = usePOCreate();

//   const handleAddMilestone = () => {
//     setMilestones([...milestones, { percentage: "", description: "" }]);
//   };

//   const handleChange = (index, field, value) => {
//     const updatedMilestones = [...milestones];
//     updatedMilestones[index][field] = value;
//     setMilestones(updatedMilestones);
//   };

//   const handleCheckboxChange = (e) => {
//     setShowButton(e.target.checked);
//   };

//   const handleAddCharge = () => {
//     setCharges([...charges, { name: "", amount: "" }]);
//   };

//   const handleChargeChange = (index, field, value) => {
//     const updatedCharges = [...charges];
//     updatedCharges[index][field] = value;
//     setCharges(updatedCharges);
//   };

//   //////////////////////
//   useEffect(() => {
//     getPoDetails(id);
//   }, [id]);

//   console.log("poDetails", poDetails);

//   // Handle Save
//   const handleSave = () => {
//     try {
//       const payload = {
//         ...PoData,
//         po_number: poDetails.po_number,
//         po_date: poDetails.po_date || new Date().toISOString().split("T")[0],
//         default_rupees: poDetails.default_rupees || 0,
//         total_discount: 500, // TODO: compute from items/discount inputs
//         packing_charge: 200, // TODO: get from state
//         packing_gst: 18,
//         fright_charge: 1000,
//         fright_gst: 18,
//         additional_charge_status: charges.length > 0 ? 1 : 0,
//         sub_total: 50000, // TODO: compute dynamically
//         gst_value: 9000,
//         final_total: 59000,
//         payment_status: 1,
//         taxes_pr: 18,
//         taxes_number: "12345",
//         guarantee_and_warranty: "1 year",
//         loading_and_freight_charges: "Included",
//         installation_at_site: "Yes",
//         delivery: "Within 30 days",
//         introduction: "This PO is for lab equipment",

//         items: poDetails.items.map((item, idx) => ({
//           id: item.id,
//           disc_pr: idx === 0 ? 5 : 0,
//           disc_number: idx === 0 ? 1000 : 0,
//           gst_pr: 18,
//           taxable_value: idx === 0 ? 38000 : 15000,
//         })),

//         additional_charges: charges.map((c) => ({
//           charge_name: c.name,
//           amount: Number(c.amount),
//         })),

//         payment_milestones: milestones.map((m) => ({
//           percentage: m.percentage,
//           description: m.description,
//         })),
//       };

//       PoCreate(payload);
//     } catch (error) {
//       console.log("Po Create Error:", error);
//     }
//   };

//   return (
//     <>
//       {/* --------------------START PO CREATE ----------------------- */}
//       <div className="flex-grow-1 container-p-y container-fluid">
//         <div className="row invoice-preview">
//           <div className="card invoice-preview-card p-sm-12 p-6">
//             <div className="card-body invoice-preview-header rounded">
//               <div className="d-flex flex-wrap flex-column flex-sm-row justify-content-between text-heading">
//                 <div className="mb-md-0 mb-6">
//                   <div className="d-flex svg-illustration mb-6 gap-2 align-items-center">
//                     {/* <span className="app-brand-logo demo">
//                                          <span className="text-primary">
//                                            <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z" fill="currentColor"></path>
//                                              <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd" d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z" fill="#161616"></path>
//                                              <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd" d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z" fill="#161616"></path>
//                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z" fill="currentColor"></path>
//                                            </svg>
//                                          </span>
//                                        </span>
//                                            <span className="app-brand-text fw-bold fs-4 ms-50">Vuexy</span>*/}
//                     <div>
//                       <img
//                         src={`${publicUrl}/assets/img/logo_vertical.png`}
//                         style={{ height: "86px", width: "137.95px" }}
//                       />
//                     </div>
//                   </div>
//                   <p className="mb-2">Office 149, 450 South Brand Brooklyn</p>
//                   <p className="mb-2">San Diego County, CA 91905, USA</p>
//                   <p className="mb-3">+1 (123) 456 7891, +44 (876) 543 2198</p>
//                 </div>
//                 <div className="col-md-5 col-8 pe-0 ps-0 ps-md-2">
//                   <dl className="row mb-0 gx-4">
//                     <dt className="col-sm-5 mb-2 d-md-flex align-items-center justify-content-end">
//                       <span className="h5 text-capitalize mb-0 text-nowrap">
//                         PO Number
//                       </span>
//                     </dt>
//                     <dd className="col-sm-7">
//                       <input
//                         type="text"
//                         className="form-control"
//                         disabled=""
//                         placeholder={poDetails.po_number}
//                         defaultValue={poDetails.po_number}
//                         id="invoiceId"
//                       />
//                     </dd>
//                     <dt className="col-sm-5 mb-1 d-md-flex align-items-center justify-content-end">
//                       <span className="fw-normal">PO Date:</span>
//                     </dt>
//                     <dd className="col-sm-7">
//                       <input
//                         type="date"
//                         className="form-control invoice-date"
//                         placeholder="DD/MM/YYYY"
//                       />
//                     </dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//             <div className="card-body px-0">
//               <div className="row">
//                 <div className="col-md-6 col-sm-5 col-12 mb-sm-0 mb-6">
//                   {/*  <h6>Invoice To:</h6>*/}
//                   <select className="form-select mb-4 w-50" disabled>
//                     <option value={poDetails?.venderdetail?.vendor_name}>
//                       {poDetails?.venderdetail?.vendor_name}
//                     </option>
//                     {/* <option value="Wesley Burland">Wesley Burland</option>
//                     <option value="Vladamir Koschek">Vladamir Koschek</option>
//                     <option value="Tyne Widmore">Tyne Widmore</option> */}
//                   </select>
//                   <p className="mb-1">{poDetails?.venderdetail?.address}</p>
//                 </div>
//                 <div className="col-md-6 col-sm-7">
//                   {/*  <h6>Bill To:</h6>*/}
//                   <table>
//                     <tbody>
//                       <tr>
//                         <td className="pe-4">Contact Person:</td>
//                         <td>{poDetails?.venderdetail?.contact_person_name}</td>
//                       </tr>
//                       <tr>
//                         <td className="pe-4">Mobile Number:</td>
//                         <td>{poDetails?.venderdetail?.mobile}</td>
//                       </tr>
//                       <tr>
//                         <td className="pe-4">E-mail:</td>
//                         <td>{poDetails?.venderdetail?.email}</td>
//                       </tr>
//                       <tr>
//                         <td className="pe-4">GST Number:</td>
//                         <td>{poDetails?.venderdetail?.gst_number}</td>
//                       </tr>
//                       <tr>
//                         <td className="pe-4">PAN Number:</td>
//                         <td>{poDetails?.venderdetail?.pan_number}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <div className="mt-2 d-flex">
//                     <div>
//                       <span className="badge bg-label-primary  mt-3">
//                         Is Payment Advance Or Partial
//                       </span>
//                     </div>
//                     &nbsp;
//                     <select className="form-select mt-2 w-25 form-select-sm">
//                       <option value="">Select</option>
//                       <option value="Yes">Yes</option>
//                       <option value="No">No</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="card-body pt-0 px-0">
//               <form className="source-item">
//                 <div className="mb-4" data-repeater-list="group-a">
//                   <table className="table">
//                     <thead>
//                       {/*style="margin-right: -35px;"*/}
//                       {/*className="d-flex align-items-center gap-2"*/}
//                       <tr>
//                         <th>Sr.#</th>
//                         <th>Item</th>
//                         <th>Indent No</th>
//                         <th>Description</th>
//                         <th>Qty.</th>
//                         <th>UOM</th>
//                         <th>
//                           <span>Unit&nbsp;Price</span>
//                           <select className="form-select-sm w-auto">
//                             <option value="">Select</option>
//                             <option value="inr">INR(₹)</option>
//                             <option value="dollar">Dollar($)</option>
//                           </select>
//                         </th>
//                         <th>Disc(%)</th>
//                         <th>Disc(₹)</th>
//                         <th>GST(%)</th>
//                         <th>GST(₹)</th>
//                         <th>Taxable Value</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {poDetails?.items?.map((item, index) => {
//                         console.log("item", item);
//                         return (
//                           <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>{item.item_name}</td>
//                             <td>{item.item_name}</td>
//                             <td>{item.description}</td>
//                             <td>{item.qty}</td>
//                             <td>{item.uom}</td>
//                             <td>{item.unit_price}</td>
//                             <td>
//                               <input
//                                 type="number"
//                                 className="form-control form-control-sm"
//                                 style={{ width: 61 }}
//                               />
//                             </td>
//                             <td>
//                               <input
//                                 type="number"
//                                 className="form-control form-control-sm"
//                                 style={{ width: 120 }}
//                               />
//                             </td>
//                             <td>
//                               <input
//                                 type="number"
//                                 className="form-control form-control-sm"
//                                 style={{ width: 61 }}
//                               />
//                             </td>
//                             <td>
//                               <input
//                                 type="number"
//                                 className="form-control form-control-sm"
//                                 style={{ width: 120 }}
//                               />
//                             </td>
//                             <td>26975</td>
//                           </tr>
//                         );
//                       })}

//                       {/* <tr>
//                         <td colSpan={12}>
//                           <button
//                             type="button"
//                             className="btn btn-sm btn-primary waves-effect waves-light"
//                             data-repeater-create=""
//                           >
//                             <i className="icon-base ti tabler-plus icon-xs me-1_5" />
//                             Add Item
//                           </button>
//                         </td>
//                       </tr> */}
//                       <tr>
//                         <td colSpan={9} className="border-transparent" />
//                         <td colSpan={2} className="text-end">
//                           <span className="w-px-100">
//                             Total&nbsp;Discount&nbsp;:
//                           </span>
//                         </td>
//                         <td>
//                           <span className="fw-medium text-heading">
//                             50000/-
//                           </span>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td colSpan={9} className="border-transparent" />
//                         <td colSpan={2}>
//                           <div className="d-flex justify-content-end">
//                             <div>
//                               <input
//                                 type="checkbox"
//                                 className="form-check form-check"
//                               />
//                             </div>
//                             &nbsp;
//                             <span className="mt-1">
//                               Packing&nbsp;Charge&nbsp;:
//                             </span>
//                           </div>
//                         </td>
//                         <td>
//                           <input
//                             type="number"
//                             className="form-control form-control-sm"
//                             style={{ width: 120 }}
//                           />
//                         </td>
//                       </tr>
//                       <tr>
//                         <td colSpan={9} className="border-transparent" />
//                         <td colSpan={2}>
//                           <div className="d-flex justify-content-end">
//                             <span className="mt-1">
//                               Packing&nbsp;GST&nbsp;:
//                             </span>
//                           </div>
//                         </td>
//                         <td>
//                           <input
//                             type="number"
//                             className="form-control form-control-sm"
//                             style={{ width: 120 }}
//                           />
//                         </td>
//                       </tr>
//                       <tr>
//                         <td colSpan={9} className="border-transparent" />
//                         <td colSpan={2}>
//                           <div className="d-flex justify-content-end">
//                             <div>
//                               <input
//                                 type="checkbox"
//                                 className="form-check form-check"
//                               />
//                             </div>
//                             &nbsp;
//                             <span className="mt-1">
//                               Fright&nbsp;Charge&nbsp;:
//                             </span>
//                           </div>
//                         </td>
//                         <td>
//                           <input
//                             type="number"
//                             className="form-control form-control-sm"
//                             style={{ width: 120 }}
//                           />
//                         </td>
//                       </tr>
//                       <tr>
//                         <td colSpan={9} className="border-transparent" />
//                         <td colSpan={2}>
//                           <div className="d-flex justify-content-end">
//                             <span className="mt-1">Fright&nbsp;GST&nbsp;:</span>
//                           </div>
//                         </td>
//                         <td>
//                           <input
//                             type="number"
//                             className="form-control form-control-sm"
//                             style={{ width: 120 }}
//                           />
//                         </td>
//                       </tr>
//                       <tr>
//                         <td colSpan={9} className="border-transparent" />
//                         <td colSpan={2}>
//                           <div className="d-flex">
//                             {/* <div>
//                               <input
//                                 type="checkbox"
//                                 className="form-check form-check"
//                                 onChange={handleCheckboxChange}
//                               />
//                             </div> */}
//                             &nbsp;
//                             <span className="mt-1">
//                               Additional&nbsp;Charge&nbsp;:
//                             </span>
//                           </div>
//                         </td>
//                         <td>
//                           <div>
//                             {/* {showButton && ( */}
//                             {/* <> */}
//                             <button
//                               type="button"
//                               className="btn btn-sm btn-primary waves-effect waves-light"
//                               data-repeater-create=""
//                               onClick={handleAddCharge}
//                             >
//                               <i className="icon-base ti tabler-plus icon-xs me-1_5" />
//                               Add&nbsp;Charge
//                             </button>
//                             {/* </>
//                             )} */}
//                           </div>
//                         </td>
//                       </tr>

//                       {charges.map((charge, index) => (
//                         <tr key={index}>
//                           <td colSpan={9} className="border-transparent"></td>
//                           <td colSpan={2}>
//                             <div className="d-flex align-items-center">
//                               {/* Cancel Button before Name Input */}
//                               {index !== 0 && (
//                                 <button
//                                   type="button"
//                                   className="btn btn-sm me-2 text-danger fs-5"
//                                   onClick={() => {
//                                     const updatedCharges = [...charges];
//                                     updatedCharges.splice(index, 1);
//                                     setCharges(updatedCharges);
//                                   }}
//                                 >
//                                   &times;
//                                 </button>
//                               )}
//                               <input
//                                 type="text"
//                                 className="form-control form-control-sm"
//                                 placeholder="Enter Charge Name"
//                                 value={charge.name}
//                                 onChange={(e) =>
//                                   handleChargeChange(
//                                     index,
//                                     "name",
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                             </div>
//                           </td>
//                           <td>
//                             <input
//                               type="number"
//                               className="form-control form-control-sm"
//                               style={{ width: 120 }}
//                               value={charge.amount}
//                               onChange={(e) =>
//                                 handleChargeChange(
//                                   index,
//                                   "amount",
//                                   e.target.value
//                                 )
//                               }
//                             />
//                           </td>
//                         </tr>
//                       ))}

//                       {/* <tr>
//                         <td colSpan={9} className="border-transparent" />
//                         <td colSpan={2}>
//                           <input
//                             type="number"
//                             className="form-control form-control-sm"
//                             placeholder="Emter Charge Name"
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="number"
//                             className="form-control form-control-sm"
//                             style={{ width: 120 }}
//                           />
//                         </td>
//                       </tr> */}
//                       <tr>
//                         <td colSpan={9} className="border-transparent" />
//                         <td colSpan={2}>
//                           <div className="d-flex justify-content-end">
//                             <span className="mt-1">Sub&nbsp;Total&nbsp;:</span>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="d-flex ">
//                             <span className="mt-1">₹ 132630.00</span>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td colSpan={9} className="border-transparent" />
//                         <td colSpan={2}>
//                           <div className="d-flex justify-content-end">
//                             <span className="mt-1">GST&nbsp;Value&nbsp;:</span>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="d-flex ">
//                             <span className="mt-1">₹ 132630.00</span>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td colSpan={9} className="border-transparent" />
//                         <td colSpan={2}>
//                           <div className="d-flex justify-content-end">
//                             <span className="mt-1">Total&nbsp;:</span>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="d-flex">
//                             <span className="mt-1">₹ 132630.00</span>
//                           </div>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </form>
//             </div>
//             <hr className="my-0" />
//             <div className="card-body px-0 pb-0">
//               <h5 className="my-0">Terms &amp; Conditions</h5>
//               <label className="form-label">Payment</label>
//               {/* <div className="row mb-2">
//                 <div className="col-4">
//                   <div>
//                     <div className="d-flex">
//                       <select
//                         className="form-select form-control form-select-sm"
//                         style={{ width: 100 }}
//                       >
//                         <option value="">0%</option>
//                         <option value="">10%</option>
//                         <option value="">20%</option>
//                       </select>
//                       <input
//                         type="text"
//                         className="form-control form-control-sm"
//                         aria-label="Text input with segmented dropdown button "
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-4">
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-primary waves-effect waves-light"
//                     data-repeater-create=""
//                   >
//                     <i className="icon-base ti tabler-plus icon-xs me-1_5" />
//                     Payment&nbsp;Milestone
//                   </button>
//                 </div>
//               </div> */}
//               <div className="row mb-2">
//                 {milestones.map((milestone, index) => (
//                   <div className="col-4 mt-3" key={index}>
//                     <div className="d-flex">
//                       <select
//                         className="form-select form-control form-select-sm"
//                         style={{ width: 100 }}
//                         value={milestone.percentage}
//                         onChange={(e) =>
//                           handleChange(index, "percentage", e.target.value)
//                         }
//                       >
//                         <option value="">0%</option>
//                         <option value="10">10%</option>
//                         <option value="20">20%</option>
//                       </select>
//                       <input
//                         type="text"
//                         className="form-control form-control-sm"
//                         aria-label="Text input with segmented dropdown button"
//                         placeholder="Description"
//                         value={milestone.description}
//                         onChange={(e) =>
//                           handleChange(index, "description", e.target.value)
//                         }
//                       />
//                     </div>
//                     <div>
//                       {index !== 0 && (
//                         <button
//                           type="button"
//                           className="btn btn-sm me-2 text-danger fs-5"
//                           onClick={() => {
//                             const updatedCharges = [...milestones];
//                             updatedCharges.splice(index, 1);
//                             setMilestones(updatedCharges);
//                           }}
//                         >
//                           &times;
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="row mb-2">
//                 <div className="col-4">
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-primary waves-effect waves-light"
//                     onClick={handleAddMilestone}
//                   >
//                     <i className="icon-base ti tabler-plus icon-xs me-1_5" />
//                     Payment&nbsp;Milestone
//                   </button>
//                 </div>
//               </div>
//               <label className="form-label">Taxes:</label>
//               <div className="row mb-2">
//                 <div className="col-6">
//                   <div>
//                     <div className="d-flex">
//                       <select
//                         className="form-select form-control form-select-sm"
//                         style={{ width: 100 }}
//                       >
//                         <option value="">0%</option>
//                         <option value="">10%</option>
//                         <option value="">20%</option>
//                       </select>
//                       <input
//                         type="text"
//                         className="form-control form-control-sm"
//                         aria-label="Text input with segmented dropdown button "
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <label className="form-label">Guarantee and Warranty:</label>
//               <div className="row mb-2">
//                 <div className="col-6">
//                   <div>
//                     <input
//                       type="text"
//                       className="form-control form-control-sm"
//                       aria-label="Text input with segmented dropdown button "
//                       placeholder="Enter Guarantee and Warranty"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="row mb-2">
//                 <div className="col-4">
//                   <div>
//                     <label className="form-label">
//                       Loading and freight charges:
//                     </label>
//                     <select className="form-select mb-4 form-select-sm">
//                       <option value="">Select</option>
//                       <option value="Wesley Burland">Applicable</option>
//                       <option value="Vladamir Koschek">Not Applicable</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="col-4">
//                   <div>
//                     <label className="form-label">Installation at Site:</label>
//                     <select className="form-select mb-4 form-select-sm">
//                       <option value="">Select</option>
//                       <option value="Wesley Burland">Applicable</option>
//                       <option value="Vladamir Koschek">Not Applicable</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="col-4">
//                   <div>
//                     <label className="form-label">Delivery:</label>
//                     <div className="d-flex">
//                       <input
//                         type="text"
//                         className="form-control form-control-sm"
//                         aria-label="Text input with segmented dropdown button "
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <hr className="my-0" />
//             <div className="row mb-2">
//               <div className="col-12">
//                 <div>
//                   <label className="form-label">Introduction:</label>
//                   <div className="d-flex">
//                     <input
//                       type="text"
//                       className="form-control form-control-sm"
//                       aria-label="Text input with segmented dropdown button "
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="col-12 mt-2 text-end">
//                 <button
//                   className="btn btn-success waves-effect waves-light"
//                   onClick={handleSave}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --------------------END PO CREATE ----------------------- */}
//     </>
//   );
// }

////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { usePOCreate } from "../../../../../Context/PIAndPoManagement/POCreate";
import { useNavigate, useParams } from "react-router-dom";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function PO_Create() {
  const { id } = useParams();
  const { PoCreate, getPoDetails, poDetails, formData, setFormData } =
    usePOCreate();

  // Form state
  // const [formData, setFormData] = useState({
  //   po_date: "",
  //   default_rupees: "",
  //   total_discount: "0",
  //   packing_charge: "",
  //   packing_gst: "",
  //   fright_charge: "",
  //   fright_gst: "",
  //   additional_charge_status: "1",
  //   sub_total: "0",
  //   gst_value: "0",
  //   final_total: "0",
  //   payment_status: "1",
  //   taxes_pr: "",
  //   taxes_number: "",
  //   guarantee_and_warranty: "",
  //   loading_and_freight_charges: "",
  //   installation_at_site: "",
  //   delivery: "",
  //   introduction: "",
  //   is_payment_advance_or_partial: "",
  //   currency: "inr",
  //   items: [],
  //   additional_charges: [],
  //   payment_milestones: [],
  // });

  // const [formData, setFormData] = useState({
  //   po_date: "",
  //   default_rupees: "",
  //   total_discount: "0",
  //   packing_charge: "",
  //   packing_gst: "",
  //   fright_charge: "",
  //   fright_gst: "",
  //   additional_charge_status: "1",
  //   sub_total: "0",
  //   gst_value: "0",
  //   final_total: "0",
  //   payment_status: "1",
  //   taxes_pr: "",
  //   taxes_number: "",
  //   guarantee_and_warranty: "",
  //   loading_and_freight_charges: "",
  //   installation_at_site: "",
  //   delivery: "",
  //   introduction: "",
  //   is_payment_advance_or_partial: "",
  //   currency: "inr",
  //   items: [],
  //   additional_charges: [],
  //   payment_milestones: [],
  // });

  const [charges, setCharges] = useState([]);
  const [milestones, setMilestones] = useState([
    // { percentage: "", payment_number: "" },
  ]);
  const [packingChargeChecked, setPackingChargeChecked] = useState(false);
  const [frightChargeChecked, setFrightChargeChecked] = useState(false);
  const navigate = useNavigate();

  // Initialize form with PO details
  useEffect(() => {
    if (id) {
      getPoDetails(id);
    }
  }, [id]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle item field changes (discount, GST, etc.)
  // const handleItemChange = (index, field, value) => {
  //   const updatedItems = [...formData.items];
  //   updatedItems[index] = {
  //     ...updatedItems[index],
  //     [field]: value,
  //   };
  //   setFormData((prev) => ({
  //     ...prev,
  //     items: updatedItems,
  //   }));
  // };

  // Milestone handlers
  const handleAddMilestone = () => {
    setMilestones([...milestones, { percentage: "", payment_number: "" }]); // Changed
  };

  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index][field] = value;
    setMilestones(updatedMilestones);
  };

  // Charge handlers
  const handleAddCharge = () => {
    setCharges([...charges, { name: "", amount: "" }]);
  };

  // const handleChargeChange = (index, field, value) => {
  //   const updatedCharges = [...charges];
  //   updatedCharges[index][field] = value;
  //   setCharges(updatedCharges);
  // };

  useEffect(() => {
    if (poDetails?.items) {
      // Initialize items with PO details and calculate initial totals
      const initializedItems = poDetails.items.map((item) => {
        console.log("itemmmm", item);
        return {
          id: item?.pirequestitem?.id,
          item_name: item?.pirequestitem?.item_name,
          description: item?.pirequestitem?.remark,
          qty: item?.pirequestitem?.qty,
          uom: item?.pirequestitem?.uom,
          unit_price: item?.unit_price,
          disc_pr: "",
          disc_number: "0",
          gst_pr: "",
          taxable_value: "0",
          base_amount: (
            item?.pirequestitem?.unit_price * item?.pirequestitem?.qty
          ).toFixed(2),
          gst_amount: "0",
        };
      });

      const totals = calculateGrandTotals(initializedItems);

      setFormData((prev) => ({
        ...prev,
        id: poDetails?.id,
        items: initializedItems,
        total_item: initializedItems.length,
        ...totals,
      }));
    }
  }, [poDetails]);

  useEffect(() => {
    if (formData?.items.length > 0) {
      const totals = calculateGrandTotals(formData.items);
      setFormData((prev) => ({ ...prev, ...totals }));
    }
  }, [
    charges,
    packingChargeChecked,
    frightChargeChecked,
    formData?.packing_charge,
    formData?.packing_gst,
    formData?.fright_charge,
    formData?.fright_gst,
  ]);

  // Calculate item totals (no GST included in subtotal here)
  const calculateItemTotals = (items) => {
    console.log("itemsssssssss", items);
    return items?.map((item) => {
      const unitPrice = parseFloat(item?.unit_price) || 0;
      const quantity = parseFloat(item?.qty) || 0;
      const discountPercent = parseFloat(item?.disc_pr) || 0;
      const gstPercent = parseFloat(item?.gst_pr) || 0;

      const baseAmount = unitPrice * quantity;
      const discountAmount = (baseAmount * discountPercent) / 100;
      const amountAfterDiscount = baseAmount - discountAmount;
      const gstAmount = (amountAfterDiscount * gstPercent) / 100;
      const taxableValue = amountAfterDiscount + gstAmount;

      return {
        ...item,
        base_amount: baseAmount?.toFixed(2),
        disc_number: discountAmount?.toFixed(2),
        gst_amount: gstAmount?.toFixed(2),
        taxable_value: taxableValue?.toFixed(2),
      };
    });
  };

  // const calculateGrandTotals = (items) => {
  //   const itemTotals = calculateItemTotals(items);

  //   // Item-wise totals
  //   const subTotal = itemTotals?.reduce(
  //     (sum, item) =>
  //       sum +
  //       (parseFloat(item?.base_amount) - parseFloat(item?.disc_number) || 0),
  //     0
  //   );
  //   const totalDiscount = itemTotals?.reduce(
  //     (sum, item) => sum + (parseFloat(item?.disc_number) || 0),
  //     0
  //   );
  //   const totalGST = itemTotals?.reduce(
  //     (sum, item) => sum + (parseFloat(item?.gst_amount) || 0),
  //     0
  //   );

  //   const packingGST =
  //     packingChargeChecked && formData?.packing_gst
  //       ? (packingCharge * (parseFloat(formData?.packing_gst) || 0)) / 100
  //       : 0;

  //   // Include Packing and Freight GST in total GST value
  //   if (packingChargeChecked && formData?.packing_gst) {
  //     totalGST +=
  //       (parseFloat(formData?.packing_charge) || 0) *
  //       ((parseFloat(formData?.packing_gst) || 0) / 100);
  //   }

  //   if (frightChargeChecked && formData?.fright_gst) {
  //     totalGST +=
  //       (parseFloat(formData?.fright_charge) || 0) *
  //       ((parseFloat(formData?.fright_gst) || 0) / 100);
  //   }

  //   // const packingGST =
  //   //   packingChargeChecked && formData?.packing_gst
  //   //     ? (packingCharge * (parseFloat(formData?.packing_gst) || 0)) / 100
  //   //     : 0;

  //   const freightCharge =
  //     frightChargeChecked && formData?.fright_charge
  //       ? parseFloat(formData?.fright_charge) || 0
  //       : 0;
  //   // const freightGST =
  //   //   frightChargeChecked && formData?.fright_gst
  //   //     ? (freightCharge * (parseFloat(formData?.fright_gst) || 0)) / 100
  //   //     : 0;

  //   // Additional charges
  //   const additionalChargesTotal = charges?.reduce(
  //     (sum, c) => sum + (parseFloat(c?.amount) || 0),
  //     0
  //   );

  //   // Final
  //   const finalTotal =
  //     subTotal +
  //     totalGST +
  //     packingCharge +
  //     // packingGST +
  //     freightCharge +
  //     // freightGST +
  //     additionalChargesTotal;

  //   return {
  //     sub_total: subTotal?.toFixed(2),
  //     total_discount: totalDiscount?.toFixed(2),
  //     gst_value: totalGST?.toFixed(2),
  //     final_total: finalTotal?.toFixed(2),
  //   };
  // };

  const calculateGrandTotals = (items) => {
    const itemTotals = calculateItemTotals(items);

    // ------------------------
    // ITEM-WISE CALCULATIONS
    // ------------------------
    const subTotalItems = itemTotals?.reduce(
      (sum, item) =>
        sum +
        (parseFloat(item?.base_amount) - parseFloat(item?.disc_number) || 0),
      0
    );

    const totalDiscount = itemTotals?.reduce(
      (sum, item) => sum + (parseFloat(item?.disc_number) || 0),
      0
    );

    // let totalGST = itemTotals?.reduce(
    //   (sum, item) => sum + (parseFloat(item?.gst_amount) || 0),
    //   0
    // );

    // // ------------------------
    // // PACKING & FREIGHT CHARGES
    // // ------------------------
    // const packingCharge =
    //   packingChargeChecked && formData?.packing_charge
    //     ? parseFloat(formData?.packing_charge) || 0
    //     : 0;

    // const freightCharge =
    //   frightChargeChecked && formData?.fright_charge
    //     ? parseFloat(formData?.fright_charge) || 0
    //     : 0;

    // // Add Packing & Freight GST into total GST
    // if (packingChargeChecked && formData?.packing_gst) {
    //   totalGST +=
    //     packingCharge * ((parseFloat(formData?.packing_gst) || 0) / 100);
    // }

    // if (frightChargeChecked && formData?.fright_gst) {
    //   totalGST +=
    //     freightCharge * ((parseFloat(formData?.fright_gst) || 0) / 100);
    // }

    // Calculate GST from items
    let totalGST = itemTotals?.reduce(
      (sum, item) => sum + (parseFloat(item?.gst_amount) || 0),
      0
    );

    // ------------------------
    // PACKING & FREIGHT CHARGES
    // ------------------------
    const packingCharge =
      packingChargeChecked && formData?.packing_charge
        ? parseFloat(formData.packing_charge) || 0
        : 0;

    const freightCharge =
      frightChargeChecked && formData?.fright_charge
        ? parseFloat(formData.fright_charge) || 0
        : 0;

    // Include Packing GST
    if (packingCharge > 0 && formData?.packing_gst) {
      const packingGST =
        packingCharge * (parseFloat(formData.packing_gst) / 100);
      totalGST += packingGST;
    }

    // Include Freight GST
    if (freightCharge > 0 && formData?.fright_gst) {
      const freightGST =
        freightCharge * (parseFloat(formData.fright_gst) / 100);
      totalGST += freightGST;
    }

    console.log("Total GST including packing & freight:", totalGST);

    // ------------------------
    // ADDITIONAL CHARGES
    // ------------------------
    const additionalChargesTotal = charges?.reduce(
      (sum, c) => sum + (parseFloat(c?.amount) || 0),
      0
    );

    // ------------------------
    // FINAL TOTALS
    // ------------------------
    const subTotal = subTotalItems + packingCharge + freightCharge;

    const finalTotal = subTotal + totalGST + additionalChargesTotal;

    return {
      sub_total: subTotal?.toFixed(2),
      total_discount: totalDiscount?.toFixed(2),
      gst_value: totalGST?.toFixed(2),
      final_total: finalTotal?.toFixed(2),
    };
  };

  // Handle item field changes (discount, GST, etc?.)
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    const item = { ...updatedItems[index] };

    // Update the field
    item[field] = value;

    // Recalculate item totals if discount percentage or GST percentage changes
    if (field === "disc_pr" || field === "gst_pr") {
      const unitPrice = parseFloat(item?.unit_price) || 0;
      const quantity = parseFloat(item?.qty) || 0;
      const discountPercent = parseFloat(item?.disc_pr) || 0;
      const gstPercent = parseFloat(item?.gst_pr) || 0;

      // Calculate base amount
      const baseAmount = unitPrice * quantity;
      item.base_amount = baseAmount.toFixed(2);

      // Calculate discount amount
      const discountAmount = (baseAmount * discountPercent) / 100;
      item.disc_number = discountAmount.toFixed(2);

      // Calculate amount after discount
      const amountAfterDiscount = baseAmount - discountAmount;

      // Calculate GST amount
      const gstAmount = (amountAfterDiscount * gstPercent) / 100;
      item.gst_amount = gstAmount.toFixed(2);

      // Calculate taxable value
      const taxableValue = amountAfterDiscount + gstAmount;
      item.taxable_value = taxableValue.toFixed(2);
    }

    updatedItems[index] = item;

    // Calculate grand totals
    const totals = calculateGrandTotals(updatedItems);

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      ...totals,
    }));
  };

  const handleChargeChange = (index, field, value) => {
    const updatedCharges = [...charges];
    updatedCharges[index][field] = value;
    setCharges(updatedCharges);
  };

  // Handle Save
  const handleSave = () => {
    try {
      const payload = {
        pi_get_quote_id: poDetails?.pi_get_quote_id || "",
        pi_get_quote_vendor_id: poDetails?.pi_get_quote_vendor_id || "",
        pi_request_id: poDetails?.pi_request_id || "",
        po_number: poDetails?.po_number || "",
        ...formData,
        // Charges
        additional_charges: charges
          ?.filter((charge) => charge?.name && charge?.amount)
          ?.map((charge) => ({
            charge_name: charge?.name,
            amount: parseFloat(charge?.amount) || 0,
          })),
        // Milestones
        payment_milestones: milestones
          ?.filter((m) => m?.percentage && m?.payment_number)
          ?.map((m, idx) => ({
            payment_pr: parseFloat(m?.percentage) || 0,
            payment_number: m?.payment_number, // keep as string/sequence if needed
          })),
        // Respect checkboxes
        packing_charge: packingChargeChecked ? formData?.packing_charge : "0",
        packing_gst: packingChargeChecked ? formData?.packing_gst : "0",
        fright_charge: frightChargeChecked ? formData?.fright_charge : "0",
        fright_gst: frightChargeChecked ? formData?.fright_gst : "0",
      };

      console.log("PO Create Payload:", payload);
      PoCreate(payload);

      navigate(`/po-material/po-detail/${poDetails?.id}`);
    } catch (error) {
      console.log("Po Create Error:", error);
    }
  };

  return (
    <>
      <div className="flex-grow-1 container-p-y container-fluid">
        <div className="row invoice-preview">
          <div className="card invoice-preview-card">
            <div className="card-body invoice-preview-header rounded">
              <div className="d-flex flex-wrap flex-column flex-sm-row justify-content-between text-heading">
                <div className="mb-md-0 mb-6">
                  <div className="d-flex svg-illustration mb-6 gap-2 align-items-center">
                    <div>
                      <img
                        src={`${publicUrl}/assets/img/logo_vertical.png`}
                        style={{ height: "86px", width: "137.95px" }}
                        alt="Company Logo"
                      />
                    </div>
                  </div>
                  <p className="mb-2">Office 149, 450 South Brand Brooklyn</p>
                  <p className="mb-2">San Diego County, CA 91905, USA</p>
                  <p className="mb-3">+1 (123) 456 7891, +44 (876) 543 2198</p>
                </div>
                <div className="col-md-5 col-8 pe-0 ps-0 ps-md-2">
                  <dl className="row mb-0 gx-4">
                    <dt className="col-sm-5 mb-2 d-md-flex align-items-center justify-content-end">
                      <span className="h5 text-capitalize mb-0 text-nowrap">
                        PO Number
                      </span>
                    </dt>
                    <dd className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        value={poDetails?.po_number || ""}
                        id="invoiceId"
                      />
                    </dd>
                    <dt className="col-sm-5 mb-1 d-md-flex align-items-center justify-content-end">
                      <span className="fw-normal">PO Date:</span>
                    </dt>
                    <dd className="col-sm-7">
                      <input
                        type="date"
                        className="form-control invoice-date"
                        // value={formData?.po_date}
                        value={new Date()?.toISOString()?.split("T")[0]}
                        onChange={(e) =>
                          handleInputChange("po_date", e?.target?.value)
                        }
                      />
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="card-body px-0">
              <div className="row">
                <div className="col-md-6 col-sm-5 col-12 mb-sm-0 mb-6">
                  <select className="form-select mb-4 w-50" disabled>
                    <option value={poDetails?.venderdetail?.vendor_name}>
                      {poDetails?.venderdetail?.vendor_name}
                    </option>
                  </select>
                  <p className="mb-1">{poDetails?.venderdetail?.address}</p>
                </div>
                <div className="col-md-6 col-sm-7">
                  <table>
                    <tbody>
                      <tr>
                        <td className="pe-4">Contact Person:</td>
                        <td>{poDetails?.venderdetail?.contact_person_name}</td>
                      </tr>
                      <tr>
                        <td className="pe-4">Mobile Number:</td>
                        <td>{poDetails?.venderdetail?.mobile}</td>
                      </tr>
                      <tr>
                        <td className="pe-4">E-mail:</td>
                        <td>{poDetails?.venderdetail?.email}</td>
                      </tr>
                      <tr>
                        <td className="pe-4">GST Number:</td>
                        <td>{poDetails?.venderdetail?.gst_number}</td>
                      </tr>
                      <tr>
                        <td className="pe-4">PAN Number:</td>
                        <td>{poDetails?.venderdetail?.pan_number}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-2 d-flex">
                    <div>
                      <span className="badge bg-label-primary mt-3">
                        Is Payment Advance Or Partial
                      </span>
                    </div>
                    &nbsp;
                    <select
                      className="form-select mt-2 w-25 form-select-sm"
                      value={formData?.is_payment_advance_or_partial}
                      onChange={(e) =>
                        handleInputChange(
                          "is_payment_advance_or_partial",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body pt-0 px-0">
              <form className="source-item">
                <div className="mb-4" data-repeater-list="group-a">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sr.#</th>
                        <th>Item</th>
                        <th>Indent No</th>
                        <th>Description</th>
                        <th>Qty.</th>
                        <th>UOM</th>
                        <th>
                          <span>Unit&nbsp;Price</span>

                          <select
                            class="form-select-sm w-auto"
                            value={formData?.default_rupees}
                            onChange={(e) =>
                              handleInputChange(
                                "default_rupees",
                                e.target.value
                              )
                            }
                          >
                            {/* <option value="">Select</option> */}
                            <option value="INR">INR(₹)</option>
                            <option value="USD">Dollar($)</option>
                          </select>
                        </th>
                        <th>Disc(%)</th>
                        <th>Disc(₹)</th>
                        <th>GST(%)</th>
                        <th>GST(₹)</th>
                        <th>Taxable Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData?.items?.map((item, index) => (
                        <tr key={index}>
                          {console.log("item", item)}
                          <td>{index + 1}</td>
                          <td>{item?.item_name}</td>
                          <td>{item?.item_name}</td>
                          <td>{item?.description}</td>
                          <td>{item?.qty}</td>
                          <td>{item?.uom}</td>
                          <td>{item?.unit_price}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 61 }}
                              value={item?.disc_pr}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "disc_pr",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 120 }}
                              value={item?.disc_number}
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 61 }}
                              value={item?.gst_pr}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "gst_pr",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 120 }}
                              value={item?.gst_amount}
                              readOnly
                            />
                          </td>
                          <td>{item?.taxable_value}</td>
                          {/* <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 120 }}
                              value={item?.taxable_value}
                              readOnly
                              className="form-control-plaintext"
                            />
                          </td> */}
                        </tr>
                      ))}

                      {/* Total Discount */}
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2} className="text-end">
                          <span className="w-px-100">
                            Total&nbsp;Discount&nbsp;:
                          </span>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={formData?.total_discount}
                            // onChange={(e) =>
                            //   handleInputChange(
                            //     "total_discount",
                            //     e.target.value
                            //   )
                            // }
                          />
                        </td>
                      </tr>

                      {/* Packing Charge */}
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <div>
                              <input
                                type="checkbox"
                                className="form-check form-check"
                                checked={packingChargeChecked}
                                onChange={(e) =>
                                  setPackingChargeChecked(e.target.checked)
                                }
                              />
                            </div>
                            &nbsp;
                            <span className="mt-1">
                              Packing&nbsp;Charge&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={formData?.packing_charge}
                            onChange={(e) =>
                              handleInputChange(
                                "packing_charge",
                                e.target.value
                              )
                            }
                            disabled={!packingChargeChecked}
                          />
                        </td>
                      </tr>

                      {/* Packing GST */}
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">
                              Packing&nbsp;GST&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={formData?.packing_gst}
                            onChange={(e) =>
                              handleInputChange("packing_gst", e.target.value)
                            }
                          />
                        </td>
                      </tr>

                      {/* Fright Charge */}
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <div>
                              <input
                                type="checkbox"
                                className="form-check form-check"
                                checked={frightChargeChecked}
                                onChange={(e) =>
                                  setFrightChargeChecked(e.target.checked)
                                }
                              />
                            </div>
                            &nbsp;
                            <span className="mt-1">
                              Fright&nbsp;Charge&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={formData?.fright_charge}
                            onChange={(e) =>
                              handleInputChange("fright_charge", e.target.value)
                            }
                            disabled={!frightChargeChecked}
                          />
                        </td>
                      </tr>

                      {/* Fright GST */}
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">Fright&nbsp;GST&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={formData?.fright_gst}
                            onChange={(e) =>
                              handleInputChange("fright_gst", e.target.value)
                            }
                          />
                        </td>
                      </tr>

                      {/* Additional Charges */}
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex">
                            <span className="mt-1">
                              Additional&nbsp;Charge&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary waves-effect waves-light"
                            onClick={handleAddCharge}
                          >
                            <i className="icon-base ti tabler-plus icon-xs me-1_5" />
                            Add&nbsp;Charge
                          </button>
                        </td>
                      </tr>

                      {charges?.map((charge, index) => (
                        <tr key={index}>
                          <td colSpan={9} className="border-transparent"></td>
                          <td colSpan={2}>
                            <div className="d-flex align-items-center">
                              {index !== 0 && (
                                <button
                                  type="button"
                                  className="btn btn-sm me-2 text-danger fs-5"
                                  onClick={() => {
                                    const updatedCharges = [...charges];
                                    updatedCharges.splice(index, 1);
                                    setCharges(updatedCharges);
                                  }}
                                >
                                  &times;
                                </button>
                              )}
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Enter Charge Name"
                                value={charge?.name}
                                onChange={(e) =>
                                  handleChargeChange(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 120 }}
                              value={charge?.amount}
                              onChange={(e) =>
                                handleChargeChange(
                                  index,
                                  "amount",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}

                      {/* Totals */}
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">Sub&nbsp;Total&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex ">
                            <span className="mt-1">
                              ₹ {formData?.sub_total}
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">GST&nbsp;Value&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex ">
                            <span className="mt-1">
                              ₹ {formData?.gst_value}
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} className="border-transparent" />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">Total&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <span className="mt-1">
                              ₹ {formData?.final_total}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>

            <hr className="my-0" />

            {/* Terms & Conditions Section */}
            <div className="card-body px-0 pb-0">
              <h5 className="my-0">Terms &amp; Conditions</h5>

              {/* Payment Milestones */}
              <label className="form-label">Payment</label>
              <div className="row mb-2">
                {milestones?.map((milestone, index) => (
                  <div className="col-4 mt-3" key={index}>
                    <div className="d-flex">
                      <select
                        className="form-select form-control form-select-sm"
                        style={{ width: 100 }}
                        value={milestone?.percentage}
                        onChange={(e) =>
                          handleMilestoneChange(
                            index,
                            "percentage",
                            e.target.value
                          )
                        }
                      >
                        <option value="">0%</option>
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                        <option value="30">30%</option>
                        <option value="40">40%</option>
                        <option value="50">50%</option>
                        <option value="60">60%</option>
                        <option value="70">70%</option>
                        <option value="80">80%</option>
                        <option value="90">90%</option>
                        <option value="100">100%</option>
                      </select>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        aria-label="Text input with segmented dropdown button"
                        placeholder="Description"
                        value={milestone?.payment_number}
                        onChange={
                          (e) =>
                            handleMilestoneChange(
                              index,
                              "payment_number",
                              e.target.value
                            ) // Changed
                        }
                      />
                    </div>
                    <div>
                      {index !== 0 && (
                        <button
                          type="button"
                          className="btn btn-sm me-2 text-danger fs-5"
                          onClick={() => {
                            const updatedMilestones = [...milestones];
                            updatedMilestones?.splice(index, 1);
                            setMilestones(updatedMilestones);
                          }}
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="row mb-2">
                <div className="col-4">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary waves-effect waves-light"
                    onClick={handleAddMilestone}
                  >
                    <i className="icon-base ti tabler-plus icon-xs me-1_5" />
                    Payment&nbsp;Milestone
                  </button>
                </div>
              </div>

              {/* Taxes */}
              <label className="form-label">Taxes:</label>
              <div className="row mb-2">
                <div className="col-6">
                  <div className="d-flex">
                    <select
                      className="form-select form-control form-select-sm"
                      style={{ width: 100 }}
                      value={formData?.taxes_pr}
                      onChange={(e) =>
                        handleInputChange("taxes_pr", e.target.value)
                      }
                    >
                      <option value="">0%</option>
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </select>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      aria-label="Text input with segmented dropdown button"
                      placeholder="Tax Number"
                      value={formData?.taxes_number}
                      onChange={(e) =>
                        handleInputChange("taxes_number", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Guarantee and Warranty */}
              <label className="form-label">Guarantee and Warranty:</label>
              <div className="row mb-2">
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    aria-label="Text input with segmented dropdown button"
                    placeholder="Enter Guarantee and Warranty"
                    value={formData?.guarantee_and_warranty}
                    onChange={(e) =>
                      handleInputChange(
                        "guarantee_and_warranty",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              {/* Other Details */}
              <div className="row mb-2">
                <div className="col-4">
                  <label className="form-label">
                    Loading and freight charges:
                  </label>
                  <select
                    className="form-select mb-4 form-select-sm"
                    value={formData?.loading_and_freight_charges}
                    onChange={(e) =>
                      handleInputChange(
                        "loading_and_freight_charges",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select</option>
                    <option value="Applicable">Applicable</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select>
                </div>
                <div className="col-4">
                  <label className="form-label">Installation at Site:</label>
                  <select
                    className="form-select mb-4 form-select-sm"
                    value={formData?.installation_at_site}
                    onChange={(e) =>
                      handleInputChange("installation_at_site", e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option value="Applicable">Applicable</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select>
                </div>
                <div className="col-4">
                  <label className="form-label">Delivery:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    aria-label="Text input with segmented dropdown button"
                    placeholder="Delivery terms"
                    value={formData?.delivery}
                    onChange={(e) =>
                      handleInputChange("delivery", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <hr className="my-0" />

            {/* Introduction and Save Button */}
            <div className="row mb-2">
              <div className="col-12">
                <label className="form-label">Introduction:</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  aria-label="Text input with segmented dropdown button"
                  placeholder="Enter introduction"
                  value={formData?.introduction}
                  onChange={(e) =>
                    handleInputChange("introduction", e.target.value)
                  }
                />
              </div>
              <div className="col-12 mt-2 text-end">
                <button
                  className="btn btn-success waves-effect waves-light"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
