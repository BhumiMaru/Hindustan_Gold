// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
// import { useItemMaster } from "../../../../../Context/ItemManagement/ItemMasterContext";
// import { usePIRequest } from "../../../../../Context/PIAndPoManagement/PIRequestList";
// import { toast } from "react-toastify";

// export default function PI_Item_Request_Form() {
//   const { type, id } = useParams();
//   const { CreatePIRequest, items, setItems, findById, editPiRequest } =
//     usePIRequest();

//   // State to hold multiple items
//   // const [items, setItems] = useState([
//   //   {
//   //     id: 1,
//   //     requestedItem: "",
//   //     category: "Category 1",
//   //     subcategory: "Subcategory 1",
//   //     qty: "",
//   //     uom: "KG",
//   //     serviceLocation: "Location 1",
//   //     zone: "Zone 1",
//   //     purpose: "",
//   //     priority: "",
//   //     requestDate: "",
//   //     remarks: "",
//   //     file: null,
//   //   },
//   // ]);
//   const { itemMaster, fetchItemMaster } = useItemMaster();

//   useEffect(() => {
//     fetchItemMaster();
//   }, []);

//   useEffect(() => {
//     console.log("id", id);
//     if (id) {
//       findById(id);
//     }
//   }, [id]);

//   // Add new item
//   const handleAddItem = () => {
//     setItems([
//       ...items,
//       {
//         id: items.length + 1,
//         requestedItem: "",
//         category: "Category 1",
//         subcategory: "Subcategory 1",
//         qty: "",
//         uom: "KG",
//         serviceLocation: "Location 1",
//         zone: "Zone 1",
//         purpose: "",
//         priority: "",
//         requestDate: "",
//         remarks: "",
//         file: null,
//         tentative_consumption_day: "",
//       },
//     ]);
//   };

//   // Delete One Item Form
//   const DeleteItem = (id) => {
//     if (items.length === 1) {
//       toast.info("At least one item is required.");
//       return;
//     }
//     setItems(items.filter((item) => item.id !== id));
//   };

//   // Handle Save (API Call)
//   // const handleSave = async () => {
//   //   try {
//   //     const formData = new FormData();

//   //     // top-level fields
//   //     if (id) formData.append("id", id);
//   //     // formData.append("pi_date", "2025-09-21"); // or your dynamic date
//   //     formData.append("pi_type", type || "Imported Purchase");
//   //     // formData.append("order_by", 1); // dynamic: logged-in user id
//   //     // formData.append("departmant_id", 24);
//   //     formData.append("total_item", items.length);
//   //     // formData.append("po_total", 18000); // calculate if needed
//   //     // formData.append("status", "submitted");
//   //     // formData.append("get_quoate", "hello");

//   //     // items array → flatten into FormData
//   //     items.forEach((item, index) => {
//   //       // Only send id if item exists (edit case)
//   //       if (item.id && item.existing) {
//   //         formData.append(`items[${index}][id]`, item.id);
//   //       }

//   //       formData.append(`items[${index}][item_id]`, item.requestedItem || "");
//   //       console.log(`items[${index}][item_id]`, item.requestedItem);
//   //       formData.append(`items[${index}][item_name]`, item.item_name || "");
//   //       formData.append(`items[${index}][qty]`, item.qty || 0);
//   //       formData.append(`items[${index}][uom]`, item.uom || "");
//   //       formData.append(`items[${index}][priority]`, item.priority || "");
//   //       formData.append(`items[${index}][purpose]`, item.purpose || "");
//   //       formData.append(
//   //         `items[${index}][tentative_consumption_day]`,
//   //         item.tentative_consumption_day || 1
//   //       );
//   //       formData.append(`items[${index}][remark]`, item.remarks || "");
//   //       formData.append(`items[${index}][status]`, item.status || "");

//   //       if (item.file) {
//   //         formData.append(`items[${index}][file]`, item.file);
//   //       }
//   //     });

//   //     // send to API
//   //     if (id) {
//   //       console.log("formData", formData);
//   //       await editPiRequest(id, formData);
//   //     } else {
//   //       await CreatePIRequest(formData);
//   //     }
//   //   } catch (err) {
//   //     toast.error("Error saving PI Request");
//   //     console.error("handleSave error:", err);
//   //   }
//   // };

//   // const handleSave = async () => {
//   //   try {
//   //     const formData = new FormData();

//   //     // Top-level fields
//   //     if (id) formData.append("id", id); // edit
//   //     console.log("ii", id);
//   //     console.log("pi_type", type);
//   //     formData.append("pi_type", type); // mandatory
//   //     formData.append("total_item", items.length);

//   //     // Flatten items array properly
//   //     // items.forEach((item, index) => {
//   //     //   formData.append(`items[${index}][item_id]`, item.requestedItem || "");
//   //     //   formData.append(`items[${index}][item_name]`, item.item_name || "");
//   //     //   formData.append(`items[${index}][qty]`, item.qty || 0);
//   //     //   formData.append(`items[${index}][uom]`, item.uom || "");
//   //     //   formData.append(`items[${index}][priority]`, item.priority || "");
//   //     //   formData.append(`items[${index}][purpose]`, item.purpose || "");
//   //     //   formData.append(
//   //     //     `items[${index}][tentative_consumption_day]`,
//   //     //     item.tentative_consumption_day || 1
//   //     //   );
//   //     //   formData.append(`items[${index}][remark]`, item.remarks || "");
//   //     //   formData.append(`items[${index}][status]`, item.status || "");

//   //     //   // Include file if exists
//   //     //   if (item.file) {
//   //     //     formData.append(`items[${index}][file]`, item.file);
//   //     //   }

//   //     //   // Include item ID if existing (edit case)
//   //     //   if (item.existing && item.dbId) {
//   //     //     formData.append(`items[${index}][id]`, item.dbId); // send real DB id
//   //     //   }
//   //     // });

//   //     items.forEach((item, index) => {
//   //       console.log("iiitems", item);
//   //       const uom = item.uom; // fallback default
//   //       formData.append(`items[${index}][uom]`, uom);

//   //       formData.append(`items[${index}][item_id]`, item.requestedItem || "");
//   //       formData.append(`items[${index}][item_name]`, item.item_name || "");
//   //       formData.append(`items[${index}][qty]`, item.qty || 0);
//   //       formData.append(`items[${index}][priority]`, item.priority || "");
//   //       formData.append(`items[${index}][purpose]`, item.purpose || "");
//   //       formData.append(
//   //         `items[${index}][tentative_consumption_day]`,
//   //         item.tentative_consumption_day || 1
//   //       );
//   //       formData.append(`items[${index}][remark]`, item.remarks || "");
//   //       formData.append(`items[${index}][status]`, item.status || "");
//   //       if (item.existing && item.dbId) {
//   //         formData.append(`items[${index}][id]`, item.dbId);
//   //       }
//   //       if (item.file) {
//   //         formData.append(`items[${index}][file]`, item.file);
//   //       }
//   //     });

//   //     // Send to API
//   //     if (id) {
//   //       await editPiRequest(id, formData);
//   //       console.log("formData edit", formData);
//   //     } else {
//   //       await CreatePIRequest(formData);
//   //     }
//   //   } catch (err) {
//   //     toast.error("Error saving PI Request");
//   //     console.error("handleSave error:", err);
//   //   }
//   // };
//   const handleSave = async () => {
//     try {
//       const formData = new FormData();

//       if (id) formData.append("id", id);
//       formData.append("pi_type", type);
//       formData.append("total_item", items.length);

//       items.forEach((item, index) => {
//         formData.append(`items[${index}][item_id]`, item.requestedItem || "");
//         formData.append(`items[${index}][item_name]`, item.item_name || "");
//         formData.append(`items[${index}][qty]`, item.qty || 0);
//         formData.append(`items[${index}][uom]`, item.uom || "KG");
//         formData.append(`items[${index}][priority]`, item.priority || "");
//         formData.append(`items[${index}][purpose]`, item.purpose || "");
//         formData.append(
//           `items[${index}][tentative_consumption_day]`,
//           item.tentative_consumption_day || 1
//         );
//         formData.append(`items[${index}][remark]`, item.remarks || "");
//         formData.append(`items[${index}][status]`, item.status || "pending");

//         if (item.existing && item.dbId) {
//           formData.append(`items[${index}][id]`, item.dbId);
//         }
//         if (item.file) {
//           formData.append(`items[${index}][file]`, item.file);
//         }
//       });

//       if (id) {
//         await editPiRequest(id, formData);
//       } else {
//         await CreatePIRequest(formData);
//       }
//     } catch (err) {
//       toast.error("Error saving PI Request");
//       console.error("handleSave error:", err);
//     }
//   };

//   // Handle individual field changes
//   const handleItemChange = (itemId, field, value) => {
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === itemId ? { ...item, [field]: value } : item
//       )
//     );
//   };

//   // Handle select changes for specific items
//   const handleSelectChange = (itemId, field, selectedValue) => {
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === itemId ? { ...item, [field]: selectedValue } : item
//       )
//     );
//   };

//   // Handle item selection from item master
//   const handleItemSelect = (itemId, selectedId) => {
//     const selectedItem = itemMaster.find(
//       (itm) => itm.id === Number(selectedId)
//     );

//     if (selectedItem) {
//       const storage = selectedItem?.storage_locations?.[0];
//       const zone = selectedItem?.zones?.[0]?.zone;

//       setItems((prev) =>
//         prev.map((item) =>
//           item.id === itemId
//             ? {
//                 ...item,
//                 requestedItem: selectedId,
//                 item_name: selectedItem?.item_name || "",
//                 category: selectedItem?.category?.category_name || "",
//                 subcategory: selectedItem?.subcategory?.sub_category_name || "",
//                 uom: selectedItem?.uom || "KG",
//                 serviceLocation:
//                   storage?.service_location3?.service_location2
//                     ?.service_location1?.service_location_name || "",
//                 zone: zone?.zone_name || "",
//               }
//             : item
//         )
//       );
//     }
//   };

//   return (
//     <>
//       {/* --------------START PI ITEM REQUEST FORM-------------- */}
//       <div className="container-xxl flex-grow-1 container-p-y">
//         {/* DataTable with Buttons */}
//         <div className="card mt-3 p-3">
//           <div className="row">
//             <div className="col-lg-12">
//               {items?.map((item) => {
//                 return (
//                   <div className="row">
//                     <div className="col-lg-12 d-flex justify-content-between">
//                       <h4>Item {item.id} #</h4>
//                       <a
//                         data-bs-toggle="tooltip"
//                         className="btn btn-icon delete-record waves-effect waves-light"
//                         data-bs-placement="top"
//                         aria-label="Delete"
//                         data-bs-original-title="Delete"
//                         onClick={() => DeleteItem(item.id)}
//                       >
//                         <i className="icon-base ti tabler-trash text-danger icon-md" />
//                       </a>
//                     </div>
//                     <div className="col-sm-3 mb-4">
//                       {/* <label htmlFor="SelectItem" className="form-label">
//                         Requested Item
//                       </label> */}
//                       <div className="position-relative">
//                         {/* <CustomSelect
//                           id="selectItem"
//                           label="Requested Item"
//                           options={itemMaster.map((item) => ({
//                             value: item.id,
//                             label: item.item_name || item.name || "Unnamed",
//                           }))}
//                           value={items?.item_id}
//                           onChange={(selected) => {
//                             const selectedId = Number(selected);
//                             const selectedItem = itemMaster.find(
//                               (itm) => itm.id === selectedId
//                             );
//                             console.log("selectedId", selectedId);

//                             const storage =
//                               selectedItem?.storage_locations?.[0];
//                             const zone = selectedItem?.zones?.[0]?.zone;

//                             setItems((prev) =>
//                               prev.map((it) =>
//                                 it.id === item.id
//                                   ? {
//                                       ...it,
//                                       requestedItem: selectedId,
//                                       item_name: selectedItem?.item_name || "",
//                                       category:
//                                         selectedItem?.category?.category_name ||
//                                         "",
//                                       subcategory:
//                                         selectedItem?.subcategory
//                                           ?.sub_category_name || "",
//                                       uom: selectedItem?.uom || "",
//                                       serviceLocation:
//                                         storage?.service_location3
//                                           ?.service_location2?.service_location1
//                                           ?.service_location_name || "",
//                                       zone: zone?.zone_name || "",
//                                     }
//                                   : it
//                               )
//                             );
//                           }}
//                           placeholder="Select Item"
//                           required
//                         /> */}
//                         <CustomSelect
//                           id={`selectItem-${item.id}`}
//                           label="Requested Item"
//                           options={itemMaster.map((itm) => ({
//                             value: itm.id,
//                             label: itm.item_name || itm.name || "Unnamed",
//                           }))}
//                           value={item.requestedItem} // <-- use the specific item value, not items?.item_id
//                           // onChange={(selected) => {
//                           //   const selectedId = Number(selected);
//                           //   const selectedItem = itemMaster.find(
//                           //     (itm) => itm.id === selectedId
//                           //   );

//                           //   const storage =
//                           //     selectedItem?.storage_locations?.[0];
//                           //   const zone = selectedItem?.zones?.[0]?.zone;

//                           //   setItems((prev) =>
//                           //     prev.map((it) =>
//                           //       it.id === item.id
//                           //         ? {
//                           //             ...it,
//                           //             requestedItem: selectedId,
//                           //             item_name: selectedItem?.item_name || "",
//                           //             category:
//                           //               selectedItem?.category?.category_name ||
//                           //               "",
//                           //             subcategory:
//                           //               selectedItem?.subcategory
//                           //                 ?.sub_category_name || "",
//                           //             uom: selectedItem?.uom || "",
//                           //             serviceLocation:
//                           //               storage?.service_location3
//                           //                 ?.service_location2?.service_location1
//                           //                 ?.service_location_name || "",
//                           //             zone: zone?.zone_name || "",
//                           //           }
//                           //         : it
//                           //     )
//                           //   );
//                           // }}
//                           onChange={(selected) =>
//                             handleItemSelect(item.id, selected)
//                           }
//                           placeholder="Select Item"
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-sm-3 mb-4">
//                       <label
//                         htmlFor={`Category-${item.id}`}
//                         className="form-label"
//                       >
//                         Category
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id={`Category-${item.id}`}
//                         placeholder="Category"
//                         defaultValue="Category 1"
//                         disabled
//                         readOnly
//                         value={item.category}
//                       />
//                     </div>
//                     <div className="col-sm-3 mb-4">
//                       <label
//                         htmlFor={`Subcategory-${item.id}`}
//                         className="form-label"
//                       >
//                         Subcategory
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id={`Subcategory-${item.id}`}
//                         placeholder="Subcategory"
//                         defaultValue="Subcategory 1"
//                         disabled
//                         readOnly=""
//                         value={item.subcategory}
//                       />
//                     </div>
//                     <div className="col-sm-3 mb-4">
//                       <label
//                         htmlFor={`Quantity-${item.id}`}
//                         className="form-label"
//                       >
//                         Quantity
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         id={`Quantity-${item.id}`}
//                         placeholder=""
//                         min={0}
//                         value={item.qty}
//                         // onChange={(e) =>
//                         //   setItems((prev) =>
//                         //     prev.map((it) =>
//                         //       it.id === item.id
//                         //         ? { ...it, qty: e.target.value }
//                         //         : it
//                         //     )
//                         //   )
//                         // }
//                         onChange={(e) =>
//                           handleItemChange(item.id, "qty", e.target.value)
//                         }
//                       />
//                     </div>
//                     <div className="col-sm-3 mb-4">
//                       <label
//                         htmlFor={`UnitofMeasure-${item.id}`}
//                         className="form-label"
//                       >
//                         Unit of Measure
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id={`UnitofMeasure-${item.id}`}
//                         placeholder=""
//                         // defaultValue="KG"
//                         disabled
//                         readOnly=""
//                         value={item.category}
//                       />
//                     </div>
//                     <div className="col-sm-3 mb-4">
//                       <label
//                         htmlFor={`ServiceLocation-${item.id}`}
//                         className="form-label"
//                       >
//                         Service Location{" "}
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id={`ServiceLocation-${item.id}`}
//                         placeholder=""
//                         defaultValue="Location 1"
//                         disabled
//                         readOnly=""
//                         value={item.serviceLocation}
//                       />
//                     </div>
//                     <div className="col-sm-3 mb-4">
//                       <label htmlFor={`Zone-${item.id}`} className="form-label">
//                         Zone{" "}
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id={`Zone-${item.id}`}
//                         placeholder=""
//                         defaultValue="Zone 1"
//                         disabled
//                         readOnly=""
//                         value={item.zone}
//                       />
//                     </div>
//                     <div className="col-sm-3 mb-4">
//                       {/* <label htmlFor="Purpose" className="form-label">
//                         Purpose
//                       </label> */}
//                       <div className="position-relative">
//                         <CustomSelect
//                           id={`selectPurpose-${item.id}`}
//                           label="Purpose"
//                           options={[
//                             {
//                               value: "For maintenance work",
//                               label: "For maintenance work",
//                             },
//                             {
//                               value: "For Project Execution",
//                               label: "For Project Execution",
//                             },
//                             {
//                               value: "For Stock Replenishment",
//                               label: "For Stock Replenishment",
//                             },
//                           ]}
//                           value={items?.purpose || null}
//                           // onChange={(selected) => {
//                           //   setItems((prev) =>
//                           //     prev.map((it) =>
//                           //       it.id === item.id
//                           //         ? { ...it, purpose: selected }
//                           //         : it
//                           //     )
//                           //   );
//                           // }}
//                           onChange={(selected) =>
//                             handleSelectChange(item.id, "purpose", selected)
//                           }
//                           placeholder="Select Purpose"
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-sm-3 mb-4">
//                       {/* <label htmlFor="Priority" className="form-label">
//                         Priority
//                       </label> */}
//                       <div className="position-relative">
//                         <CustomSelect
//                           id={`selectPriority-${item.id}`}
//                           label="Priority"
//                           options={[
//                             {
//                               value: "high",
//                               label: "High",
//                             },
//                             {
//                               value: "medium",
//                               label: "Medium",
//                             },
//                             {
//                               value: "low",
//                               label: "Low",
//                             },
//                           ]}
//                           value={items?.priority || null}
//                           // onChange={(selected) => {
//                           //   setItems((prev) =>
//                           //     prev.map((it) =>
//                           //       it.id === item.id
//                           //         ? { ...it, priority: selected }
//                           //         : it
//                           //     )
//                           //   );
//                           // }}
//                           onChange={(selected) =>
//                             handleSelectChange(item.id, "priority", selected)
//                           }
//                           placeholder="Select priority"
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-sm-3 mb-4">
//                       <label htmlFor="RequestDate" className="form-label">
//                         Tentative Consumption Day{" "}
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         id={`RequestDate-${item.id}`}
//                         placeholder=""
//                         value={item.tentative_consumption_day}
//                         // onChange={(e) =>
//                         //   setItems((prev) =>
//                         //     prev.map((it) =>
//                         //       it.id === item.id
//                         //         ? {
//                         //             ...it,
//                         //             tentative_consumption_day: e.target.value,
//                         //           }
//                         //         : it
//                         //     )
//                         //   )
//                         // }
//                         onChange={(e) =>
//                           handleItemChange(
//                             item.id,
//                             "tentative_consumption_day",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </div>
//                     <div className="col-sm-6 mb-4">
//                       <label
//                         htmlFor={`Remarks-${item.id}`}
//                         className="form-label"
//                       >
//                         Remarks
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id={`Remarks-${item.id}`}
//                         placeholder=""
//                         value={item.remarks}
//                         // onChange={(e) =>
//                         //   setItems((prev) =>
//                         //     prev.map((it) =>
//                         //       it.id === item.id
//                         //         ? { ...it, remarks: e.target.value }
//                         //         : it
//                         //     )
//                         //   )
//                         // }
//                         onChange={(e) =>
//                           handleItemChange(item.id, "remarks", e.target.value)
//                         }
//                       />
//                     </div>
//                     <div className="col-sm-6 mb-4">
//                       <label
//                         htmlFor={`UploadFile-${item.id}`}
//                         className="form-label"
//                       >
//                         Upload File (Optional){" "}
//                       </label>
//                       <input
//                         type="file"
//                         className="form-control"
//                         id={`UploadFile-${item.id}`}
//                         placeholder=""
//                         // onChange={(e) =>
//                         //   setItems((prev) =>
//                         //     prev.map((it) =>
//                         //       it.id === item.id
//                         //         ? { ...it, file: e.target.files[0] }
//                         //         : it
//                         //     )
//                         //   )
//                         // }
//                         onChange={(e) =>
//                           handleItemChange(item.id, "file", e.target.files[0])
//                         }
//                       />
//                     </div>
//                     <hr />
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="col-lg-12 text-center d-flex justify-content-center gap-2">
//               <button
//                 className="btn btn-info waves-effect waves-light"
//                 onClick={handleAddItem}
//               >
//                 Add
//               </button>
//               <button
//                 className="btn btn-primary waves-effect waves-light"
//                 onClick={handleSave}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --------------END PI ITEM REQUEST FORM-------------- */}
//     </>
//   );
// }

import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import { useItemMaster } from "../../../../../Context/ItemManagement/ItemMasterContext";
import { toast } from "react-toastify";
import { usePIRequest } from "../../../../../Context/PIAndPoManagement/PIRequestList";

export default function PI_Item_Request_Form() {
  const { type, id } = useParams();
  const { CreatePIRequest, items, setItems, findById, editPiRequest } =
    usePIRequest();
  const { itemMaster, fetchItemMaster } = useItemMaster();
  const [isPurpose, setIsPurpose] = useState(false);
  const [isStock, setIsStock] = useState();
  // Add state to track quantity errors
  const [quantityError, setQuantityError] = useState({});
  const navigate = useNavigate();
  const [duplicateError, setDuplicateError] = useState({});

  useEffect(() => {
    fetchItemMaster();
  }, []);

  console.log("itemMaster", itemMaster);

  useEffect(() => {
    if (id && itemMaster.length > 0) {
      findById(id);
    }
  }, [id, itemMaster]);

  // useEffect(() => {
  //   // console.log("id", id);
  //   if (id) {
  //     findById(id);
  //   }
  // }, [id]);

  useEffect(() => {
    if (type === "service") {
      setItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          qty: 1, // Must be at least 1, not 0
          purpose: "service",
        }))
      );
    }
  }, [type]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        requestedItem: "",
        category: "",
        subcategory: "",
        qty: type == "service" ? 1 : "",
        uom: "KG",
        serviceLocation: "",
        zone: "",
        purpose: type == "service" ? "service" : "",
        priority: "",
        requestDate: "",
        remarks: "",
        file: null,
        tentative_consumption_day: "",
      },
    ]);
  };

  const DeleteItem = (id) => {
    if (items.length === 1) {
      toast.info("At least one item is required.");
      return;
    }
    setItems(items.filter((item) => item.id !== id));
  };

  // const handleSave = async () => {
  //   try {
  //     const formData = new FormData();

  //     if (id) formData.append("id", id);
  //     formData.append("pi_type", type);
  //     formData.append("total_item", Number(items.length));
  //     // console.log("pi items", items);

  //     items.forEach((item, index) => {
  //       formData.append(
  //         `items[${index}][item_id]`,
  //         Number(item.requestedItem) || 0
  //       );
  //       formData.append(`items[${index}][item_name]`, item.item_name || "");
  //       formData.append(`items[${index}][qty]`, Number(item.qty) || 0);
  //       formData.append(`items[${index}][uom]`, item.uom || "KG");
  //       formData.append(`items[${index}][priority]`, item.priority || "");
  //       formData.append(`items[${index}][purpose]`, item.purpose || "");
  //       formData.append(
  //         `items[${index}][tentative_consumption_day]`,
  //         item.tentative_consumption_day || 1
  //       );
  //       formData.append(`items[${index}][remark]`, item.remarks || "");
  //       formData.append(`items[${index}][status]`, item.status || "pending");

  //       if (item.existing && item.dbId) {
  //         formData.append(`items[${index}][id]`, item.dbId);
  //       }
  //       if (item.file) {
  //         formData.append(`items[${index}][file]`, item.file);
  //       }
  //     });

  //     for (const pair of formData.entries()) {
  //       console.log(pair[0], ":", pair[1]);
  //     }

  //     let res;
  //     if (id) {
  //       res = await editPiRequest(id, formData);
  //       // if (res?.status === true) {
  //       //   navigate("/po-material/pi-request-list");
  //       // }
  //     } else {
  //       res = await CreatePIRequest(formData);
  //       // if (res?.status === true) {
  //       //   navigate("/po-material/pi-request-list");
  //       // }
  //     }
  //     if (res?.status === true) {
  //       navigate("/po-material/pi-request-list");
  //     }
  //   } catch (err) {
  //     toast.error("Error saving PI Request");
  //     console.error("handleSave error:", err);
  //   }
  // };

  // Handle individual field changes

  const handleSave = async () => {
    try {
      //  Step 1: Check for empty requested items
      const emptyItem = items.find(
        (itm) => !itm.requestedItem || itm.requestedItem === ""
      );
      if (emptyItem) {
        toast.warning("Please select all Requested Items before saving.");
        return;
      }

      const requestedItems = items
        .map((itm) => itm.requestedItem)
        .filter(Boolean);
      const hasDuplicate = requestedItems.some(
        (itemId, index) => requestedItems.indexOf(itemId) !== index
      );

      if (hasDuplicate) {
        toast.warning(
          "Duplicate requested items found. Please fix before saving."
        );
        return;
      }

      // Check if any item qty exceeds stock
      const invalidItems = items.filter(
        (item) => isStock && Number(item.qty) > Number(isStock)
      );

      if (invalidItems.length > 0) {
        toast.error(
          `Quantity for Item(s) ${invalidItems
            .map((i) => i.id)
            .join(", ")} exceeds available stock (${isStock})`
        );
        return; // Stop saving
      }

      const formData = new FormData();
      if (id) formData.append("id", id);
      formData.append("pi_type", type);
      formData.append("total_item", Number(items.length));

      items.forEach((item, index) => {
        formData.append(
          `items[${index}][item_id]`,
          Number(item.requestedItem) || 0
        );
        formData.append(`items[${index}][item_name]`, item.item_name || "");
        formData.append(`items[${index}][qty]`, Number(item.qty));
        formData.append(`items[${index}][uom]`, item.uom || "KG");
        formData.append(`items[${index}][priority]`, item.priority || "");
        formData.append(`items[${index}][purpose]`, item.purpose || "");
        formData.append(
          `items[${index}][tentative_consumption_day]`,
          item.tentative_consumption_day || 1
        );
        formData.append(`items[${index}][remark]`, item.remarks || "");
        formData.append(`items[${index}][status]`, item.status || "pending");

        if (item.existing && item.dbId) {
          formData.append(`items[${index}][id]`, item.dbId);
        }
        if (item.file) {
          formData.append(`items[${index}][file]`, item.file);
        }
      });

      let res;
      if (id) {
        res = await editPiRequest(id, formData);
      } else {
        res = await CreatePIRequest(formData);
      }

      if (res?.status === true) {
        navigate("/po-material/pi-request-list");
      }
    } catch (err) {
      toast.error("Error saving PI Request");
      console.error("handleSave error:", err);
    }
  };

  const handleItemChange = (itemId, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  // Handle select changes for specific items
  const handleSelectChange = (itemId, field, selectedValue) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, [field]: selectedValue } : item
      )
    );
  };

  // Handle quantity change with stock validation
  const handleQuantityChange = (itemId, value, stock) => {
    const qty = Number(value);
    if (qty > stock) {
      const errorMsg = `Quantity cannot exceed available stock (${stock})`;
      setQuantityError((prev) => ({ ...prev, [itemId]: errorMsg }));
    } else {
      setQuantityError((prev) => ({ ...prev, [itemId]: "" }));
    }
    handleItemChange(itemId, "qty", value);
  };

  // Handle item selection from item master
  const handleItemSelect = (itemId, selectedId) => {
    const selectedItem = itemMaster.find(
      (itm) => itm.id === Number(selectedId)
    );

    // ✅ Check if same item is already selected in another row
    const alreadySelected = items.some(
      (itm) => itm.requestedItem === selectedId && itm.id !== itemId
    );

    if (alreadySelected) {
      // Set error for this specific row
      setDuplicateError((prev) => ({
        ...prev,
        [itemId]: "This item is already selected in another row.",
      }));
      // Reset requested item to blank
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, requestedItem: "" } : item
        )
      );
      return;
    } else {
      // Clear duplicate error if user fixes it
      setDuplicateError((prev) => ({
        ...prev,
        [itemId]: "",
      }));
    }

    // ✅ Update stock and purpose per selected item
    if (selectedItem) {
      const storage = selectedItem?.storage_locations?.[0];
      const zone = selectedItem?.zones?.[0]?.zone;
      const stockQty = selectedItem?.stock || 0;

      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? {
                ...item,
                requestedItem: selectedId,
                item_name: selectedItem?.item_name || "",
                category: selectedItem?.category?.category_name || "",
                subcategory: selectedItem?.subcategory?.sub_category_name || "",
                uom: selectedItem?.uom || "KG",
                serviceLocation:
                  storage?.service_location3?.service_location_3_name || "",
                zone: zone?.zone_name || "",
                stock: stockQty,
              }
            : item
        )
      );

      const isPurPoseRequired = selectedItem?.is_purpose_required;
      const isStockRequired = selectedItem?.stock;
      setIsStock(isStockRequired);
      setIsPurpose(isPurPoseRequired);
    }
  };

  console.log("isPurpose", isPurpose);
  console.log("isStock", isStock);
  console.log(quantityError);

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card mt-3 p-3">
          <div className="row">
            <div className="col-lg-12">
              {items?.map((item, index) => (
                <div key={item.id} className="row mb-4">
                  <div className="col-lg-12 d-flex justify-content-between align-items-center mb-3">
                    <h4>Item {item.id} #</h4>
                    <button
                      type="button"
                      className="btn btn-icon delete-record waves-effect waves-light"
                      onClick={() => DeleteItem(item.id)}
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-md" />
                    </button>
                  </div>

                  <div className="col-sm-3 mb-3">
                    <CustomSelect
                      id={`selectItem-${item.id}`}
                      label="Requested Item"
                      options={itemMaster
                        ?.filter((item) => item.type === type)
                        .map((itm) => ({
                          value: itm.id,
                          label: itm.item_name || itm.name || "Unnamed",
                        }))}
                      value={item.requestedItem}
                      onChange={(selected) =>
                        handleItemSelect(item.id, selected)
                      }
                      placeholder="Select Item"
                      required
                      isTextRequired
                    />
                    {duplicateError[item.id] && (
                      <small className="text-danger">
                        {duplicateError[item.id]}
                      </small>
                    )}
                  </div>

                  <div className="col-sm-3 mb-3">
                    <label
                      htmlFor={`Category-${item.id}`}
                      className="form-label"
                    >
                      Category
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`Category-${item.id}`}
                      placeholder="Category"
                      disabled
                      value={item.category}
                      readOnly
                    />
                  </div>

                  <div className="col-sm-3 mb-3">
                    <label
                      htmlFor={`Subcategory-${item.id}`}
                      className="form-label"
                    >
                      Subcategory
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`Subcategory-${item.id}`}
                      disabled
                      placeholder="Subcategory"
                      value={item.subcategory}
                      readOnly
                    />
                  </div>

                  {type === "material" && (
                    <div className="col-sm-3 mb-3">
                      <label
                        htmlFor={`Quantity-${item.id}`}
                        className="form-label"
                      >
                        Quantity {isStock ? ` (Stock Is : ${isStock})` : null}{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id={`Quantity-${item.id}`}
                        placeholder="Quantity"
                        min={0}
                        value={item.qty}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value, isStock)
                        }
                        required
                      />
                      {quantityError[item.id] && (
                        <small className="text-danger">
                          {quantityError[item.id]}
                        </small>
                      )}
                    </div>
                  )}

                  <div className="col-sm-3 mb-3">
                    <label
                      htmlFor={`UnitofMeasure-${item.id}`}
                      className="form-label"
                    >
                      Unit of Measure
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`UnitofMeasure-${item.id}`}
                      disabled
                      placeholder="UOM"
                      value={item.uom}
                      readOnly
                    />
                  </div>

                  <div className="col-sm-3 mb-3">
                    <label
                      htmlFor={`ServiceLocation-${item.id}`}
                      className="form-label"
                    >
                      Service Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`ServiceLocation-${item.id}`}
                      disabled
                      placeholder="Service Location"
                      value={item.serviceLocation3}
                      readOnly
                    />
                  </div>

                  <div className="col-sm-3 mb-3">
                    <label htmlFor={`Zone-${item.id}`} className="form-label">
                      Zone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      id={`Zone-${item.id}`}
                      placeholder="Zone"
                      value={item.zone}
                      readOnly
                    />
                  </div>
                  <div
                    className={`col-sm-3 mb-3 ${
                      isPurpose === 1 ? "d-block" : "d-none"
                    }`}
                  >
                    <CustomSelect
                      id={`selectPurpose-${item.id}`}
                      label="Purpose"
                      options={[
                        {
                          value: "For maintenance work",
                          label: "For maintenance work",
                        },
                        {
                          value: "For Project Execution",
                          label: "For Project Execution",
                        },
                        {
                          value: "For Stock Replenishment",
                          label: "For Stock Replenishment",
                        },
                      ]}
                      value={item.purpose}
                      onChange={(selected) =>
                        handleSelectChange(item.id, "purpose", selected)
                      }
                      placeholder="Select Purpose"
                      required
                    />
                  </div>

                  <div className="col-sm-3 mb-3">
                    <CustomSelect
                      id={`selectPriority-${item.id}`}
                      label="Priority"
                      options={[
                        { value: "high", label: "High" },
                        { value: "medium", label: "Medium" },
                        { value: "low", label: "Low" },
                      ]}
                      value={item.priority}
                      onChange={(selected) =>
                        handleSelectChange(item.id, "priority", selected)
                      }
                      placeholder="Select priority"
                      required
                      isTextRequired
                    />
                  </div>

                  <div className="col-sm-3 mb-3">
                    <label
                      htmlFor={`RequestDate-${item.id}`}
                      className="form-label"
                    >
                      Tentative Consumption Day{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id={`RequestDate-${item.id}`}
                      placeholder="Days"
                      value={item.tentative_consumption_day}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "tentative_consumption_day",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label
                      htmlFor={`Remarks-${item.id}`}
                      className="form-label"
                    >
                      Remarks
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`Remarks-${item.id}`}
                      placeholder="Remarks"
                      value={item.remarks}
                      onChange={(e) =>
                        handleItemChange(item.id, "remarks", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label
                      htmlFor={`UploadFile-${item.id}`}
                      className="form-label"
                    >
                      Upload File (Optional)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id={`UploadFile-${item.id}`}
                      onChange={(e) =>
                        handleItemChange(item.id, "file", e.target.files[0])
                      }
                    />
                  </div>

                  {index < items.length - 1 && <hr className="mt-4" />}
                </div>
              ))}
            </div>

            <div className="col-lg-12 text-center d-flex justify-content-center gap-2 mt-4">
              <button
                className="btn btn-info waves-effect waves-light"
                onClick={handleAddItem}
              >
                Add Item
              </button>
              <button
                className="btn btn-primary waves-effect waves-light"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
