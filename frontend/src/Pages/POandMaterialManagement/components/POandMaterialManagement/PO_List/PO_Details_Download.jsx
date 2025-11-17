// import React, { useEffect, useRef } from "react";
// import { usePOCreate } from "../../../../../Context/PIAndPoManagement/POCreate";
// import { Link, useParams } from "react-router-dom";
// import { useUIContext } from "../../../../../Context/UIContext";
// import PO_Reject_Modal from "./PO_Reject_Modal";
// const publicUrl = import.meta.env.VITE_PUBLIC_URL;

// export default function PO_Details_Download() {
//   const { id } = useParams();
//   const { handleOpen, modal } = useUIContext();
//   const { poDetails, setPoDetails, getPoDetails, PoApprove, PoId, setPoId } =
//     usePOCreate();
//   const printRef = useRef();

//   useEffect(() => {
//     getPoDetails(id);
//   }, [id]);

//   //   useEffect(() => {
//   //     // enable Bootstrap tooltips
//   //     const tooltipTriggerList = document.querySelectorAll(
//   //       '[data-bs-toggle="tooltip"]'
//   //     );
//   //     const tooltipList = [...tooltipTriggerList].map(
//   //       (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
//   //     );
//   //   }, [poDetails]);

//   const handlePrint = () => {
//     const printContents = printRef?.current?.innerHTML;
//     const originalContents = document?.body?.innerHTML;

//     document.body.innerHTML = printContents;
//     window.print();
//     document.body.innerHTML = originalContents;
//     window.location.reload(); // reload to restore event listeners
//   };

//   console.log("poDetails", poDetails);
//   return (
//     <>
//       {/* ------------------------START PO DETAILS--------------------------- */}
//       <div className="flex-grow-1 container-p-y container-fluid" ref={printRef}>
//         <div className="row invoice-preview">
//           <div className="card invoice-preview-card p-sm-12 p-6">
//             <div className="card-body invoice-preview-header rounded">
//               <div className="d-flex flex-wrap flex-column flex-sm-row justify-content-between text-heading">
//                 <div className="mb-md-0 mb-6">
//                   <div className="d-flex svg-illustration mb-6 gap-2 align-items-center">
//                     <div>
//                       <img
//                         src={`${publicUrl}/assets/img/logo_vertical.png`}
//                         style={{ height: "86px", width: "137.95px" }}
//                         alt="Company Logo"
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
//                       {/* <input
//                         type="text"
//                         className="form-control"
//                         disabled
//                         value={poDetails?.po_number || ""}
//                         id="invoiceId"
//                       /> */}
//                       {poDetails?.po_number || ""}
//                     </dd>
//                     <dt className="col-sm-5 mb-1 d-md-flex align-items-center justify-content-end">
//                       <span className="fw-normal">PO Date:</span>
//                     </dt>
//                     <dd className="col-sm-7">
//                       {/* <input
//                         type="date"
//                         className="form-control invoice-date"
//                         value={poDetails.po_date}
//                       /> */}
//                       {poDetails.po_date}
//                     </dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>

//             <div className="card-body px-0">
//               <div className="row">
//                 <div className="col-md-6 col-sm-5 col-12 mb-sm-0 mb-6">
//                   {/* <select className="form-select mb-4 w-50" disabled>
//                     <option value={poDetails?.venderdetail?.vendor_name}>
//                       {poDetails?.venderdetail?.vendor_name}
//                     </option>
//                   </select> */}
//                   {poDetails?.venderdetail?.vendor_name}
//                   <p className="mb-1">{poDetails?.venderdetail?.address}</p>
//                 </div>
//                 <div className="col-md-6 col-sm-7">
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
//                       <span className="badge bg-label-primary mt-3">
//                         Is Payment Advance Or Partial
//                       </span>
//                     </div>
//                     &nbsp;
//                     {poDetails.is_payment_advance_or_partial}
//                     {/* <select
//                       className="form-select mt-2 w-25 form-select-sm"
//                       value={poDetails.is_payment_advance_or_partial}
//                     >
//                       <option value="">Select</option>
//                       <option value="Yes">Yes</option>
//                       <option value="No">No</option>
//                     </select> */}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="card-body pt-0 px-0">
//               <form className="source-item">
//                 <div className="mb-4" data-repeater-list="group-a">
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th>Sr.#</th>
//                         <th>Item</th>
//                         <th>Indent No</th>
//                         <th>Description</th>
//                         <th>Qty.</th>
//                         <th>UOM</th>
//                         <th>
//                           <span>Unit&nbsp;Price</span>
//                           <b>({poDetails.default_rupees})</b>
//                           {/* <select
//                             className="form-select"
//                             value={poDetails.default_rupees}
//                           >
//                             <option value="">Select Currency</option>
//                             <option value="INR">INR (₹)</option>
//                             <option value="USD">USD ($)</option>
//                           </select> */}
//                         </th>
//                         <th>Disc(%)</th>
//                         <th>Disc(₹)</th>
//                         <th>GST(%)</th>
//                         <th>GST(₹)</th>
//                         <th>Taxable Value</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {poDetails?.items?.map((item, index) => (
//                         <tr key={index}>
//                           <td>{index + 1}</td>
//                           <td>{item.item_name}</td>
//                           <td>{item.item_name}</td>
//                           <td>{item.description}</td>
//                           <td>{item.qty}</td>
//                           <td>{item.uom}</td>
//                           <td>{item.unit_price}</td>
//                           <td>
//                             {/* <input
//                               type="number"
//                               className="form-control form-control-sm"
//                               style={{ width: 61 }}
//                               value={item.disc_pr}
//                             /> */}
//                             {item.disc_pr}
//                           </td>
//                           <td>
//                             {/* <input
//                               type="number"
//                               className="form-control form-control-sm"
//                               style={{ width: 120 }}
//                               value={item.disc_number}
//                               readOnly
//                             /> */}
//                             {item.disc_number}
//                           </td>
//                           <td>
//                             {/* <input
//                               type="number"
//                               className="form-control form-control-sm"
//                               style={{ width: 61 }}
//                               value={item.gst_pr}
//                             /> */}
//                             {item.gst_pr}
//                           </td>
//                           <td>
//                             {/* <input
//                               type="number"
//                               className="form-control form-control-sm"
//                               style={{ width: 120 }}
//                               value={item.gst_amount}
//                               readOnly
//                             /> */}
//                             {item.gst_amount}
//                           </td>
//                           <td>{item.Taxable_value}</td>
//                           {/* <td>
//                             <input
//                               type="number"
//                               className="form-control form-control-sm"
//                               style={{ width: 120 }}
//                               value={item.taxable_value}
//                               readOnly
//                               className="form-control-plaintext"
//                             />
//                           </td> */}
//                         </tr>
//                       ))}

//                       {/* Total Discount */}
//                       <tr>
//                         <td colSpan={9}  style={{ border: "none" }} />
//                         <td colSpan={2} className="text-end">
//                           <span className="w-px-100">
//                             Total&nbsp;Discount&nbsp;:
//                           </span>
//                         </td>
//                         <td>
//                           {/* <input
//                             type="number"
//                             className="form-control form-control-sm"
//                             style={{ width: 120 }}
//                             value={poDetails.total_discount}
//                           /> */}
//                           {poDetails.total_discount}
//                         </td>
//                       </tr>

//                       {/* Packing Charge */}
//                       <tr>
//                         <td colSpan={9}  style={{ border: "none" }} />
//                         <td colSpan={2}>
//                           <div className="d-flex justify-content-end">
//                             &nbsp;
//                             <span className="mt-1">
//                               Packing&nbsp;Charge&nbsp;:
//                             </span>
//                           </div>
//                         </td>
//                         <td>
//                           {/* <input
//                             type="number"
//                             className="form-control form-control-sm"
//                             style={{ width: 120 }}
//                             value={poDetails.packing_charge}
//                           /> */}
//                           {poDetails.packing_charge}
//                         </td>
//                       </tr>

//                       {/* Packing GST */}
//                       <tr>
//                         <td colSpan={9}  style={{ border: "none" }} />
//                         <td colSpan={2}>
//                           <div className="d-flex justify-content-end">
//                             <span className="mt-1">
//                               Packing&nbsp;GST&nbsp;:
//                             </span>
//                           </div>
//                         </td>
//                         <td>
//                           {/* <input
//                             type="number"
//                             className="form-control form-control-sm"
//                             style={{ width: 120 }}
//                             value={poDetails.packing_gst}
//                           /> */}
//                           {poDetails.packing_gst}
//                         </td>
//                       </tr>

//                       {/* Fright Charge */}
//                       <tr>
//                         <td colSpan={9}  style={{ border: "none" }} />
//                         <td colSpan={2}>
//                           <div className="d-flex justify-content-end">
//                             &nbsp;
//                             <span className="mt-1">
//                               Fright&nbsp;Charge&nbsp;:
//                             </span>
//                           </div>
//                         </td>
//                         <td>
//                           {/* <input
//                             type="number"
//                             className="form-control form-control-sm"
//                             style={{ width: 120 }}
//                             value={poDetails.freight_charge}
//                           /> */}
//                           {poDetails.freight_charge}
//                         </td>
//                       </tr>

//                       {/* Fright GST */}
//                       <tr>
//                         <td colSpan={9}  style={{ border: "none" }} />
//                         <td colSpan={2}>
//                           <div className="d-flex justify-content-end">
//                             <span className="mt-1">Fright&nbsp;GST&nbsp;:</span>
//                           </div>
//                         </td>
//                         <td>
//                           {/* <input
//                             type="number"
//                             className="form-control form-control-sm"
//                             style={{ width: 120 }}
//                             value={poDetails.freight_gst}
//                           /> */}
//                           {poDetails.freight_gst}
//                         </td>
//                       </tr>

//                       {/* Additional Charges */}
//                       <tr>
//                         <td colSpan={9}  style={{ border: "none" }} />
//                         <td colSpan={2}>
//                           <div className="d-flex">
//                             <span className="mt-1">
//                               Additional&nbsp;Charge&nbsp;:
//                             </span>
//                           </div>
//                         </td>
//                         <td>
//                           {/* <button
//                             type="button"
//                             className="btn btn-sm btn-primary waves-effect waves-light"
//                           >
//                             <i className="icon-base ti tabler-plus icon-xs me-1_5" />
//                             Add&nbsp;Charge
//                           </button> */}
//                         </td>
//                       </tr>

//                       {poDetails?.additional_charges?.map((charge, index) => (
//                         <tr key={index}>
//                           <td colSpan={9}  style={{ border: "none" }}></td>
//                           <td colSpan={2}>
//                             <div className="d-flex align-items-center">
//                               {index !== 0 && (
//                                 <button
//                                   type="button"
//                                   className="btn btn-sm me-2 text-danger fs-5"
//                                 >
//                                   &times;
//                                 </button>
//                               )}
//                               {/* <input
//                                 type="text"
//                                 className="form-control form-control-sm"
//                                 placeholder="Enter Charge Name"
//                                 value={charge.charge_name}
//                               /> */}
//                               {charge.charge_name}
//                             </div>
//                           </td>
//                           <td>
//                             {/* <input
//                               type="number"
//                               className="form-control form-control-sm"
//                               style={{ width: 120 }}
//                               value={charge.amount}
//                             /> */}
//                             {charge.amount}
//                           </td>
//                         </tr>
//                       ))}

//                       {/* Totals */}
//                       <tr>
//                         <td colSpan={9}  style={{ border: "none" }} />
//                         <td colSpan={2}>
//                           <div className="d-flex justify-content-end">
//                             <span className="mt-1">Sub&nbsp;Total&nbsp;:</span>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="d-flex ">
//                             <span className="mt-1">
//                               ₹ {poDetails.sub_total}
//                             </span>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td colSpan={9}  style={{ border: "none" }} />
//                         <td colSpan={2}>
//                           <div className="d-flex justify-content-end">
//                             <span className="mt-1">GST&nbsp;Value&nbsp;:</span>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="d-flex ">
//                             <span className="mt-1">
//                               ₹ {poDetails.gst_value}
//                             </span>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td colSpan={9}  style={{ border: "none" }} />
//                         <td colSpan={2}>
//                           <div className="d-flex justify-content-end">
//                             <span className="mt-1">Total&nbsp;:</span>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="d-flex">
//                             <span className="mt-1">
//                               ₹ {poDetails.final_total}
//                             </span>
//                           </div>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </form>
//             </div>

//             <hr className="my-0" />

//             {/* Terms & Conditions Section */}
//             <div className="card-body px-0 pb-0">
//               <h5 className="my-0">Terms &amp; Conditions</h5>

//               {/* Payment Milestones */}
//               <label className="form-label">Payment</label>
//               <div className="row mb-2">
//                 {poDetails?.payment_milestones?.map((milestone, index) => (
//                   <div className="col-4 mt-3" key={index}>
//                     <div className="d-flex">
//                       {milestone.payment_pr}
//                       {/* <select
//                         className="form-select form-control form-select-sm"
//                         style={{ width: 100 }}
//                         value={milestone.payment_pr}
//                       >
//                         <option value="">0%</option>
//                         <option value="10">10%</option>
//                         <option value="20">20%</option>
//                         <option value="30">30%</option>
//                         <option value="40">40%</option>
//                         <option value="50">50%</option>
//                         <option value="60">60%</option>
//                         <option value="70">70%</option>
//                         <option value="80">80%</option>
//                         <option value="90">90%</option>
//                         <option value="100">100%</option>
//                       </select> */}
//                       {/* <input
//                         type="text"
//                         className="form-control form-control-sm"
//                         aria-label="Text input with segmented dropdown button"
//                         placeholder="Description"
//                         value={milestone.payment_number}
//                       /> */}
//                       {milestone.payment_number}
//                     </div>
//                     <div>
//                       {index !== 0 && (
//                         <button
//                           type="button"
//                           className="btn btn-sm me-2 text-danger fs-5"
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
//                   >
//                     <i className="icon-base ti tabler-plus icon-xs me-1_5" />
//                     Payment&nbsp;Milestone
//                   </button>
//                 </div>
//               </div>

//               {/* Taxes */}
//               <label className="form-label">Taxes:</label>
//               <div className="row mb-2">
//                 <div className="col-6">
//                   <div className="d-flex">
//                     {/* <select
//                       className="form-select form-control form-select-sm"
//                       style={{ width: 100 }}
//                       value={poDetails.taxes_pr}
//                     >
//                       <option value="">0%</option>
//                       <option value="5">5%</option>
//                       <option value="12">12%</option>
//                       <option value="18">18%</option>
//                       <option value="28">28%</option>
//                     </select> */}
//                     {poDetails.taxes_pr}
//                     {/* <input
//                       type="text"
//                       className="form-control form-control-sm"
//                       aria-label="Text input with segmented dropdown button"
//                       placeholder="Tax Number"
//                       value={poDetails.taxes_number}
//                     /> */}
//                     {poDetails.taxes_number}
//                   </div>
//                 </div>
//               </div>

//               {/* Guarantee and Warranty */}
//               <label className="form-label">Guarantee and Warranty:</label>
//               <div className="row mb-2">
//                 <div className="col-6">
//                   {/* <input
//                     type="text"
//                     className="form-control form-control-sm"
//                     aria-label="Text input with segmented dropdown button"
//                     placeholder="Enter Guarantee and Warranty"
//                     value={poDetails.guarantee_and_warranty}
//                   /> */}
//                   {poDetails.guarantee_and_warranty}
//                 </div>
//               </div>

//               {/* Other Details */}
//               <div className="row mb-2">
//                 <div className="col-4">
//                   <label className="form-label">
//                     Loading and freight charges:
//                   </label>
//                   {poDetails.loading_and_freight_charges}
//                   {/* <select
//                     className="form-select mb-4 form-select-sm"
//                     value={poDetails.loading_and_freight_charges}
//                   >
//                     <option value="">Select</option>
//                     <option value="Applicable">Applicable</option>
//                     <option value="Not Applicable">Not Applicable</option>
//                   </select> */}
//                 </div>
//                 <div className="col-4">
//                   <label className="form-label">Installation at Site:</label>
//                   {poDetails.installation_at_site}
//                   {/* <select
//                     className="form-select mb-4 form-select-sm"
//                     value={poDetails.installation_at_site}
//                   >
//                     <option value="">Select</option>
//                     <option value="Applicable">Applicable</option>
//                     <option value="Not Applicable">Not Applicable</option>
//                   </select> */}
//                 </div>
//                 <div className="col-4">
//                   <label className="form-label">Delivery:</label>
//                   {poDetails.delivery}
//                   {/* <input
//                     type="text"
//                     className="form-control form-control-sm"
//                     aria-label="Text input with segmented dropdown button"
//                     placeholder="Delivery terms"
//                     value={poDetails.delivery}
//                   /> */}
//                 </div>
//               </div>
//             </div>

//             <hr className="my-0" />

//             {/* Introduction and Save Button */}
//             <div className="row mb-2">
//               <div className="col-12">
//                 <label className="form-label">Introduction:</label>
//                 {/* <input
//                   type="text"
//                   className="form-control form-control-sm"
//                   aria-label="Text input with segmented dropdown button"
//                   placeholder="Enter introduction"
//                   value={poDetails.Introduction}
//                 /> */}
//                 {poDetails.Introduction}
//               </div>
//               <div className="col-12 mt-2 text-end">
//                 <button
//                   className="btn btn-success waves-effect waves-light"
//                   onClick={handlePrint}
//                 >
//                   Print
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* ------------------------END PO DETAILS--------------------------- */}
//     </>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { usePOCreate } from "../../../../../Context/PIAndPoManagement/POCreate";
import { Link, useParams } from "react-router-dom";
import { useUIContext } from "../../../../../Context/UIContext";
import PO_Reject_Modal from "./PO_Reject_Modal";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function PO_Details_Download() {
  const { id } = useParams();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { handleOpen, modal } = useUIContext();
  const { poDetails, setPoDetails, getPoDetails, PoApprove, PoId, setPoId } =
    usePOCreate();
  const printRef = useRef();

  useEffect(() => {
    getPoDetails(id);
  }, [id]);

  //   useEffect(() => {
  //     // enable Bootstrap tooltips
  //     const tooltipTriggerList = document.querySelectorAll(
  //       '[data-bs-toggle="tooltip"]'
  //     );
  //     const tooltipList = [...tooltipTriggerList].map(
  //       (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  //     );
  //   }, [poDetails]);

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);

      const element = printRef.current;

      // Important: clone DOM and remove unsupported CSS
      const clone = element.cloneNode(true);

      // ===== HIDE/REMOVE elements you don't want in the PDF (buttons, etc.) =====
      // Remove elements with class "no-print" so they won't appear in the generated PDF
      clone.querySelectorAll(".no-print").forEach((node) => {
        node.remove();
      });
      // Alternatively you could do: node.style.display = "none";

      // REMOVE all modern CSS color functions BEFORE html2canvas reads them
      clone.querySelectorAll("*").forEach((node) => {
        const style = window.getComputedStyle(node);

        // Remove color() & color-mix() safely
        const safeColor =
          style.color &&
          (style.color.includes("color(") || style.color.includes("color-mix("))
            ? "black"
            : style.color;

        const safeBg =
          style.backgroundColor &&
          (style.backgroundColor.includes("color(") ||
            style.backgroundColor.includes("color-mix("))
            ? "white"
            : style.backgroundColor;

        node.style.color = safeColor;
        node.style.backgroundColor = safeBg;
      });

      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        allowTaint: false,
        scrollY: -window.scrollY,
        backgroundColor: "#ffffff",
      });

      document.body.removeChild(clone);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.height;

      while (heightLeft > 0) {
        pdf.addPage();
        position = heightLeft - pdfHeight;
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.height;
      }

      pdf.save(`PO_${poDetails?.po_number || id}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  //   const handlePrint = () => {
  //     const printContents = printRef.current.innerHTML;

  //     const newWindow = window.open("");
  //     newWindow.document.write(`
  //   <html>
  //   <head>
  //     <title>Purchase Order</title>
  //     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
  //     <style>
  //       body { padding:20px; font-family: Arial, sans-serif !important; font-size: 13px; }
  //       @media print { .no-print { display: none !important; } body { margin:0; padding:0; } .page-break { page-break-before: always; } }
  //       .border-transparent { border: none !important; }
  //     </style>
  //   </head>
  //   <body> ${printContents} </body>
  //   </html>
  // `);
  //     newWindow.document.close();
  //     newWindow.onload = () => newWindow.print();
  //   };

  // const handlePrint = () => {
  //   const printContents = printRef.current.innerHTML;

  //   // Save the original body
  //   const originalContents = document.body.innerHTML;

  //   // Replace body with print content
  //   document.body.innerHTML = printContents;

  //   // Call print
  //   window.print();

  //   // Restore original body
  //   document.body.innerHTML = originalContents;

  //   // Reload scripts and event listeners
  //   window.location.reload();
  // };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;

    const printWindow = window.open("", "_blank");

    // CSS for print window: hides no-print, and makes .blank-on-print render as blank box
    printWindow.document.write(`
    <html>
      <head>
        <title>Purchase Order</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <style>
          /* Hide buttons, navbar, or any element you don't want */
          .no-print, .navbar, .header, .footer { display: none !important; }

          /* Keep table borders */
          table, th, td { border: 1px solid #e7e6e6 !important; border-collapse: collapse; }
          th, td { padding: 4px !important; }
          .border-transparent { border : none !important; }
 /* REMOVE FULL PAGE BORDER */
  .card, .invoice-preview-card {
    border: none !important;
    box-shadow: none !important;
  }
          body { margin: 0; padding: 8mm; font-size: 12px; line-height: 1.2; font-family: Arial, sans-serif; }

          /* Prevent page breaks inside PO card */
          .invoice-preview-card { page-break-inside: avoid; }

          /* Ensure blank areas are white boxes and inner contents hidden for print */
          .blank-on-print {
            background: white !important;
            color: transparent !important;
            border: 1px solid #e7e6e6 !important;
            min-height: 120px;
            display: block !important;
          }
          .blank-on-print * { display: none !important; } /* hide inner nodes, keep the box */

          @page {
            size: A4 portrait;
            margin: 10mm; 
          }
        </style>
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();

    // allow browser to render then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  console.log("poDetails", poDetails);
  return (
    <>
      <style>
        {`
        .pdf-safe * {
  color: black !important;
  background: white !important;
  border-color: #e7e6e6 !important;
}
.no-border td {
  border: none !important;
}
  

        `}
      </style>
      {/* ------------------------START PO DETAILS--------------------------- */}
      <div
        className="flex-grow-1 container-p-y container-fluid pdf-safe"
        ref={printRef}
      >
        <div className="row invoice-preview">
          <div className="card invoice-preview-card p-sm-12 p-6">
            <div className="card-body invoice-preview-header rounded">
              <div className="d-flex flex-wrap flex-column flex-sm-row justify-content-between text-heading">
                <div className="mb-md-0 mb-6">
                  <div className="d-flex svg-illustration mb-6 gap-2 align-items-center">
                    <div>
                      <img
                        src={`${publicUrl}assets/img/logo_vertical.png`}
                        style={{ height: "86px", width: "137.95px" }}
                        alt="Company Logo"
                        // crossOrigin="anonymous"
                      />
                    </div>
                  </div>
                  <p className="mb-2">Office 149, 450 South Brand Brooklyn</p>
                  <p className="mb-2">San Diego County, CA 91905, USA</p>
                  <p className="mb-3">+1 (123) 456 7891, +44 (876) 543 2198</p>
                </div>
                <div className="col-md-5 col-8 pe-0 ps-0 ps-md-2">
                  <dl className="row mb-0 gx-4 align-items-center">
                    <dt className="col-sm-5 mb-2 d-md-flex align-items-center justify-content-end">
                      <span className="h5 text-capitalize mb-0 text-nowrap">
                        PO Number
                      </span>
                    </dt>
                    <dd className="col-sm-7">
                      {/* <input
                        type="text"
                        className="form-control"
                        disabled
                        value={poDetails?.po_number || ""}
                        id="invoiceId"
                      /> */}
                      {poDetails?.po_number || ""}
                    </dd>
                    <dt className="col-sm-5 mb-1 d-md-flex align-items-center justify-content-end">
                      <span className="fw-normal">PO Date:</span>
                    </dt>
                    <dd className="col-sm-7">
                      {/* <input
                        type="date"
                        className="form-control invoice-date"
                        value={poDetails.po_date}
                      /> */}
                      {poDetails.po_date}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="card-body px-0">
              <div className="row">
                <div className="col-md-6 col-sm-5 col-12 mb-sm-0 mb-6">
                  {/* <select className="form-select mb-4 w-50" disabled>
                    <option value={poDetails?.venderdetail?.vendor_name}>
                      {poDetails?.venderdetail?.vendor_name}
                    </option>
                  </select> */}
                  {poDetails?.venderdetail?.vendor_name}
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
                        Is Payment Advance Or Partial :
                      </span>
                      <span>{poDetails.is_payment_advance_or_partial}</span>
                    </div>
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
                        {/* <th>Indent No</th> */}
                        <th>Description</th>
                        <th>Qty.</th>
                        <th>UOM</th>
                        <th>
                          <span>Unit&nbsp;Price</span>
                          <b>({poDetails.default_rupees})</b>
                          {/* <select
                            className="form-select"
                            value={poDetails.default_rupees}
                          >
                            <option value="">Select Currency</option>
                            <option value="INR">INR (₹)</option>
                            <option value="USD">USD ($)</option>
                          </select> */}
                        </th>
                        <th>Disc(%)</th>
                        <th>Disc(₹)</th>
                        <th>GST(%)</th>
                        <th>GST(₹)</th>
                        <th>Taxable Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {poDetails?.items?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.item_name}</td>
                          {/* <td>{item.item_name}</td> */}
                          <td>{item.description}</td>
                          <td>{item.qty}</td>
                          <td>{item.uom}</td>
                          <td>{item.unit_price}</td>
                          <td>
                            {/* <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 61 }}
                              value={item.disc_pr}
                            /> */}
                            {item.disc_pr}
                          </td>
                          <td>
                            {/* <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 120 }}
                              value={item.disc_number}
                              readOnly
                            /> */}
                            {item.disc_number}
                          </td>
                          <td>
                            {/* <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 61 }}
                              value={item.gst_pr}
                            /> */}
                            {item.gst_pr}
                          </td>
                          <td>
                            {/* <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 120 }}
                              value={item.gst_amount}
                              readOnly
                            /> */}
                            {item.gst_amount}
                          </td>
                          <td>{item.Taxable_value}</td>
                          {/* <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 120 }}
                              value={item.taxable_value}
                              readOnly
                              className="form-control-plaintext"
                            />
                          </td> */}
                        </tr>
                      ))}

                      {/* Total Discount */}
                      <tr>
                        <td
                          colSpan={9}
                          className="border-transparent"
                          style={{ border: "none" }}
                        ></td>
                        <td colSpan={2} className="text-end">
                          <span className="w-px-100">
                            Total&nbsp;Discount&nbsp;:
                          </span>
                        </td>
                        <td>
                          {/* <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={poDetails.total_discount}
                          /> */}
                          {poDetails.total_discount}
                        </td>
                      </tr>

                      {/* Packing Charge */}
                      <tr>
                        <td
                          colSpan={9}
                          className="border-transparent"
                          style={{ border: "none" }}
                        />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            &nbsp;
                            <span className="mt-1">
                              Packing&nbsp;Charge&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          {/* <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={poDetails.packing_charge}
                          /> */}
                          {poDetails.packing_charge}
                        </td>
                      </tr>

                      {/* Packing GST */}
                      <tr>
                        <td
                          colSpan={9}
                          className="border-transparent"
                          style={{ border: "none" }}
                        />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">
                              Packing&nbsp;GST&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          {/* <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={poDetails.packing_gst}
                          /> */}
                          {poDetails.packing_gst}
                        </td>
                      </tr>

                      {/* Fright Charge */}
                      <tr>
                        <td
                          colSpan={9}
                          className="border-transparent"
                          style={{ border: "none" }}
                        />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            &nbsp;
                            <span className="mt-1">
                              Fright&nbsp;Charge&nbsp;:
                            </span>
                          </div>
                        </td>
                        <td>
                          {/* <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={poDetails.freight_charge}
                          /> */}
                          {poDetails.freight_charge}
                        </td>
                      </tr>

                      {/* Fright GST */}
                      <tr>
                        <td
                          colSpan={9}
                          className="border-transparent"
                          style={{ border: "none" }}
                        />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">Fright&nbsp;GST&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          {/* <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: 120 }}
                            value={poDetails.freight_gst}
                          /> */}
                          {poDetails.freight_gst}
                        </td>
                      </tr>

                      {/* Additional Charges */}
                      <tr>
                        <td
                          colSpan={9}
                          className="border-transparent"
                          style={{ border: "none" }}
                        />
                        <td colSpan={2}>
                          <div className="d-flex">
                            <b className="mt-1">
                              Additional&nbsp;Charge&nbsp;:
                            </b>
                          </div>
                        </td>
                        <td>
                          {/* <button
                            type="button"
                            className="btn btn-sm btn-primary waves-effect waves-light"
                          >
                            <i className="icon-base ti tabler-plus icon-xs me-1_5" />
                            Add&nbsp;Charge
                          </button> */}
                        </td>
                      </tr>

                      {poDetails?.additional_charges?.map((charge, index) => (
                        <tr key={index}>
                          <td
                            colSpan={9}
                            className="border-transparent"
                            style={{ border: "none" }}
                          ></td>
                          <td colSpan={2}>
                            <div className="d-flex align-items-center">
                              {index !== 0 && (
                                <button
                                  type="button"
                                  className="btn btn-sm me-2 text-danger fs-5"
                                >
                                  &times;
                                </button>
                              )}
                              {/* <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Enter Charge Name"
                                value={charge.charge_name}
                              /> */}
                              {charge.charge_name}
                            </div>
                          </td>
                          <td>
                            {/* <input
                              type="number"
                              className="form-control form-control-sm"
                              style={{ width: 120 }}
                              value={charge.amount}
                            /> */}
                            {charge.amount}
                          </td>
                        </tr>
                      ))}

                      {/* Totals */}
                      <tr>
                        <td
                          colSpan={9}
                          className="border-transparent"
                          style={{ border: "none" }}
                        />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">Sub&nbsp;Total&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex ">
                            <span className="mt-1">
                              ₹ {poDetails.sub_total}
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={9}
                          className="border-transparent"
                          style={{ border: "none" }}
                        />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">GST&nbsp;Value&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex ">
                            <span className="mt-1">
                              ₹ {poDetails.gst_value}
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={9}
                          className="border-transparent"
                          style={{ border: "none" }}
                        />
                        <td colSpan={2}>
                          <div className="d-flex justify-content-end">
                            <span className="mt-1">Total&nbsp;:</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <span className="mt-1">
                              ₹ {poDetails.final_total}
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
              <b className="form-label">Payment</b>
              <div className="row mb-2">
                {poDetails?.payment_milestones?.map((milestone, index) => (
                  <div className="col-4 mt-3" key={index}>
                    <div className="d-flex">
                      {milestone.payment_pr}%
                      {/* <select
                        className="form-select form-control form-select-sm"
                        style={{ width: 100 }}
                        value={milestone.payment_pr}
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
                      </select> */}
                      {/* <input
                        type="text"
                        className="form-control form-control-sm"
                        aria-label="Text input with segmented dropdown button"
                        placeholder="Description"
                        value={milestone.payment_number}
                      /> */}
                      {milestone.payment_number}
                    </div>
                    <div>
                      {index !== 0 && (
                        <button
                          type="button"
                          className="btn btn-sm me-2 text-danger fs-5"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="row mb-2">
                <div className="col-4">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary waves-effect waves-light"
                  >
                    <i className="icon-base ti tabler-plus icon-xs me-1_5" />
                    Payment&nbsp;Milestone
                  </button>
                </div>
              </div> */}

              {/* Taxes */}
              <b className="form-label">Taxes:</b>
              <div className="row mb-2">
                <div className="col-6">
                  <div className="d-flex">
                    {/* <span className="badge bg-label-primary"> */}
                    {poDetails.taxes_pr}%{/* </span> */}
                    &nbsp; {/* <span className="badge bg-label-primary"> */}
                    {poDetails.taxes_number}
                    {/* </span> */}
                  </div>
                </div>
              </div>

              {/* Guarantee and Warranty */}
              {poDetails.guarantee_and_warranty && (
                <>
                  <b className="form-label">Guarantee and Warranty:</b>
                  <div className="row mb-2">
                    <div className="col-6">
                      <span className="fs-6">
                        {poDetails.guarantee_and_warranty}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Other Details */}
              <div className="row mb-2">
                {poDetails.loading_and_freight_charges && (
                  <div className="col-4">
                    <b className="form-label">Loading and freight charges:</b>
                    <span className="fs-6">
                      {poDetails.loading_and_freight_charges}
                    </span>
                    {/* <select
                    className="form-select mb-4 form-select-sm"
                    value={poDetails.loading_and_freight_charges}
                  >
                    <option value="">Select</option>
                    <option value="Applicable">Applicable</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select> */}
                  </div>
                )}

                {poDetails.installation_at_site && (
                  <div className="col-4">
                    <b className="form-label">Installation at Site:</b> &nbsp;
                    <span className="fs-6">
                      {poDetails.installation_at_site}
                    </span>
                    {/* <select
                    className="form-select mb-4 form-select-sm"
                    value={poDetails.installation_at_site}
                  >
                    <option value="">Select</option>
                    <option value="Applicable">Applicable</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select> */}
                  </div>
                )}

                {poDetails.delivery && (
                  <div className="col-4">
                    <label className="form-label">Delivery:</label>
                    {poDetails.delivery}
                    {/* <input
                    type="text"
                    className="form-control form-control-sm"
                    aria-label="Text input with segmented dropdown button"
                    placeholder="Delivery terms"
                    value={poDetails.delivery}
                  /> */}
                  </div>
                )}
              </div>
            </div>

            {/* Introduction and Save Button */}
            <div className="row mb-2">
              {poDetails.Introduction && (
                <div className="col-12">
                  <hr className="my-0 border-transparent" />
                  <b className="form-label">Introduction:</b>
                  {/* <input
                  type="text"
                  className="form-control form-control-sm"
                  aria-label="Text input with segmented dropdown button"
                  placeholder="Enter introduction"
                  value={poDetails.Introduction}
                /> */}
                  {poDetails.Introduction}
                </div>
              )}

              <div className="col-12 mt-2 text-end no-print">
                <button
                  className="btn btn-primary me-2"
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                >
                  {isGeneratingPDF && (
                    <div
                      className="spinner-border spinner-white me-2"
                      role="status"
                    ></div>
                  )}
                  Download PDF
                </button>
                <button
                  className="btn btn-success waves-effect waves-light"
                  onClick={handlePrint}
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------END PO DETAILS--------------------------- */}
    </>
  );
}
