// import React, { useEffect } from "react";
// import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";
// import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
// import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";
// import { useItemMaster } from "../../../../../Context/ItemManagement/ItemMasterContext";
// import { useServiceLocation3Master } from "../../../../../Context/Master/ServiceLocation3MasterContext";
// import { useNavigate, useParams } from "react-router-dom";

// export default function Item_Request_Form() {
//   const { type, id } = useParams();
//   const navigate = useNavigate();
//   const { serviceLocation3, fetchServiceLocations3 } =
//     useServiceLocation3Master();
//   const {
//     itemRequestData,
//     setItemRequestData,
//     createItemRequest,
//     itemRequest,
//     fetchItemRequestById,
//     getItemRequestData,
//     editItemRequest,
//     itemList,
//     setEditId,
//     getItemNameAndId,
//   } = useItemRequest();
//   const { itemMaster, fetchItemMaster } = useItemMaster();

//   useEffect(() => {
//     if (type) {
//       getItemNameAndId(type);
//       setItemRequestData((prev) => ({ ...prev, item_type: type }));
//     }
//   }, [type]);

//   useEffect(() => {
//     getItemRequestData();
//     fetchServiceLocations3();
//     fetchItemMaster();
//   }, []);

//   useEffect(() => {
//     if (type) {
//       setItemRequestData((prev) => ({
//         ...prev,
//         item_type: type,
//       }));
//     }
//   }, [type]);

//   // if editing, fetch details
//   useEffect(() => {
//     if (id) {
//       setEditId(id);
//       fetchItemRequestById(id);
//     }
//   }, [id]);

//   // handle input changes
//   // const handleChange = (e) => {
//   //   const { id, value } = e.target;
//   //   setItemRequestData((prev) => ({ ...prev, [id]: value }));
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const payload = { ...itemRequestData };
//     try {
//       console.log("id", id);
//       if (id) {
//         editItemRequest(id, payload);
//         navigate("/user/request/request-list");
//       } else {
//         createItemRequest(payload);
//         console.log("payload form", payload);
//         navigate("/user/request/request-list");
//       }
//       console.log("pay", payload);
//     } catch (error) {
//       console.log("save error:", error);
//     }
//   };

//   return (
//     <>
//       {/* -----------------START ITEM REQUEST FORM---------------- */}
//       <>
//         <div className="container-xxl flex-grow-1 container-p-y">
//           {/* DataTable with Buttons */}
//           <div className="card mt-3">
//             <div className="row p-3">
//               {/* <!--    <div className="col-sm-3 mb-4">
//                                 <label htmlFor="RequestType" className="form-label">Request Type</label>
//                                 <select id="RequestType" className="select2 form-select" >
//                                     <option value="AK">Material</option>
//                                     <option value="HI">Service</option>
//                                 </select>
//                             </div>--> */}
//               {/* <div className="col-sm-3 mb-4">
//                 <label htmlFor="Category" className="form-label">
//                   Item Type
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="item_type"
//                   placeholder="Item Type"
//                   disabled
//                   readOnly
//                   value={itemRequestData?.item_type || ""}
//                 />
//               </div> */}
//               <div className="col-sm-3 mb-4">
//                 {/* <label htmlFor="SelectItem" className="form-label">
//                   Select Item
//                 </label> */}
//                 <div className="position-relative">
//                   {/* <select
//                     id="SelectItem"
//                     className="select2 form-select"
//                     value={itemRequestData.item_code || ""}
//                     onChange={(e) => {
//                       const selectedCode = e.target.value;
//                       setItemRequestData((prev) => ({
//                         ...prev,
//                         item_code: selectedCode,
//                       }));
//                       // fetch details for this workflowId
//                       const selectedWorkflowId =
//                         e.target.options[e.target.selectedIndex].dataset
//                           .workflowid;
//                       getItemRequestDetails(selectedWorkflowId);
//                     }}
//                   >
//                     <option value="">-- Select Item --</option>
//                     {itemRequest.map((item) => (
//                       <option
//                         key={item.id}
//                         value={item.item_code}
//                         data-workflowid={item.first_workflow_id}
//                       >
//                         {item.item_request?.item_type || "Unnamed Item"}
//                       </option>
//                     ))}
//                   </select> */}
//                   {/* <CustomSelect
//                     id="selectItem"
//                     label="Select Item"
//                     options={itemMaster.map((item) => {
//                       return {
//                         value: item.id,
//                         label: item.item_name,
//                       };
//                     })}
//                     value={itemRequestData?.item_id}
//                     onChange={(selected) => {
//                       setItemRequestData({
//                         ...itemRequestData,
//                         item_id: selected,
//                       });
//                     }}
//                     placeholder="Select Service Location"
//                     required
//                   /> */}

//                   <CustomSelect
//                     id="selectItem"
//                     label="Select Item"
//                     // options={itemMaster.map((item) => ({
//                     //   value: item.id,
//                     //   label: item.item_name,
//                     // }))}
//                     options={itemList?.map((item) => ({
//                       value: item.id,
//                       label: item.item_name,
//                     }))}
//                     value={itemRequestData?.item_id}
//                     onChange={(selected) => {
//                       const selectedId = Number(selected);
//                       const selectedItem = itemMaster.find(
//                         (itm) => Number(itm.id) === selectedId
//                       );

//                       const storage = selectedItem?.storage_locations?.[0];
//                       setItemRequestData((prev) => ({
//                         ...prev,
//                         item_id: selectedId,
//                         c_id: selectedItem?.c_id || null,
//                         sub_c_id: selectedItem?.sub_c_id || null,
//                         uom: selectedItem?.uom || "",
//                         item_code: selectedItem?.item_code || "",

//                         // ✅ IDs
//                         service_location_1_id:
//                           storage?.service_location3?.service_location2
//                             ?.service_location1?.id || null,
//                         service_location_2_id:
//                           storage?.service_location3?.service_location2?.id ||
//                           null,
//                         service_location_3_id:
//                           storage?.service_location3?.id || null,

//                         // ✅ Names
//                         service_location_1_name:
//                           storage?.service_location3?.service_location2
//                             ?.service_location1?.service_location_name || "",
//                         service_location_2_name:
//                           storage?.service_location3?.service_location2
//                             ?.service_location_2_name || "",
//                         service_location_3_name:
//                           storage?.service_location3?.service_location_3_name ||
//                           "",
//                       }));
//                     }}
//                     placeholder="Select Item"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="col-sm-3 mb-4">
//                 <label htmlFor="Category" className="form-label">
//                   Category
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="Category"
//                   placeholder="Category"
//                   disabled
//                   readOnly=""
//                   value={itemRequestData?.c_id || ""}
//                 />
//               </div>
//               <div className="col-sm-3 mb-4">
//                 <label htmlFor="Subcategory" className="form-label">
//                   Subcategory
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="Subcategory"
//                   placeholder="Subcategory"
//                   disabled
//                   readOnly=""
//                   value={itemRequestData?.sub_c_id || ""}
//                 />
//               </div>
//               {/* <div className="col-sm-3 mb-4 d-none">
//                 <label htmlFor="unit_price" className="form-label">
//                   Unit Of Price
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="unit_price"
//                   placeholder="unit_price"
//                   readOnly=""
//                   value={itemRequestData?.unit_price || ""}
//                   onChange={(e) => {
//                     setItemRequestData((prev) => ({
//                       ...prev,
//                       unit_price: e.target.value,
//                     }));
//                   }}
//                 />
//               </div> */}
//               <div className="col-sm-3 mb-4">
//                 <label htmlFor="Code" className="form-label">
//                   Code
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="Code"
//                   placeholder="Code"
//                   disabled
//                   readOnly=""
//                   value={itemRequestData?.item_code || ""}
//                 />
//               </div>

//               {/* Service Location 1 */}
//               <div className="col-sm-3 mb-4">
//                 <CustomSelect
//                   id="service_location_1_id"
//                   label="Service Location 1"
//                   options={
//                     itemRequestData?.service_location_1_id
//                       ? [
//                           {
//                             value: itemRequestData.service_location_1_id,
//                             label: itemRequestData.service_location_1_name,
//                           },
//                         ]
//                       : []
//                   }
//                   value={itemRequestData?.service_location_1_id || null}
//                   onChange={(selected) => {
//                     setItemRequestData((prev) => ({
//                       ...prev,
//                       service_location_1_id: selected,
//                     }));
//                   }}
//                   placeholder="Select Service Location 1"
//                   required
//                   disabled
//                 />
//               </div>

//               {/* Service Location 3 */}
//               <div className="col-sm-3 mb-4">
//                 <CustomSelect
//                   id="service_location_3_id"
//                   label="Service Location 3"
//                   options={serviceLocation3.map((sl3) => ({
//                     value: sl3.id,
//                     label: sl3.service_location_3_name,
//                   }))}
//                   value={itemRequestData?.service_location_3_id || null}
//                   onChange={(selected) => {
//                     setItemRequestData((prev) => ({
//                       ...prev,
//                       service_location_3_id: selected,
//                     }));
//                   }}
//                   placeholder="Select Service Location 3"
//                   required
//                   disabled
//                 />
//               </div>

//               {/* Service Location 3 */}
//               <div className="col-sm-3 mb-4">
//                 <CustomSelect
//                   id="service_location_3_id"
//                   label="Service Location 3"
//                   options={serviceLocation3.map((sl3) => ({
//                     value: sl3.id,
//                     label: sl3.service_location_3_name,
//                   }))}
//                   value={itemRequestData?.service_location_3_id || null}
//                   onChange={(selected) => {
//                     setItemRequestData((prev) => ({
//                       ...prev,
//                       service_location_3_id: selected,
//                     }));
//                   }}
//                   placeholder="Select Service Location 3"
//                   required
//                   disabled
//                 />
//               </div>
//               {/* purpose */}
//               <div className="col-sm-3 mb-4">
//                 {/* <label htmlFor="Purpose" className="form-label">
//                   Purpose
//                 </label> */}
//                 <div className="position-relative">
//                   <CustomSelect
//                     id="selectPurpose"
//                     label="Purpose"
//                     options={[
//                       {
//                         value: "For maintenance work",
//                         label: "For maintenance work",
//                       },
//                       {
//                         value: "For Project Execution",
//                         label: "For Project Execution",
//                       },
//                       {
//                         value: "For Stock Replenishment",
//                         label: "For Stock Replenishment",
//                       },
//                     ]}
//                     value={itemRequestData?.purpose || null}
//                     onChange={(selected) => {
//                       setItemRequestData((prev) => ({
//                         ...prev,
//                         purpose: selected,
//                       }));
//                     }}
//                     placeholder="Select Purpose"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-sm-3 mb-4">
//                 <label htmlFor="Quantity" className="form-label">
//                   Quantity
//                 </label>

//                 <input
//                   type="number"
//                   className="form-control"
//                   id="quantity"
//                   placeholder=""
//                   value={itemRequestData?.quantity ?? ""} // ✅ ensures controlled input
//                   onChange={(e) =>
//                     setItemRequestData((prev) => ({
//                       ...prev,
//                       quantity: e.target.value ? Number(e.target.value) : "",
//                     }))
//                   }
//                   min="0"
//                 />
//               </div>

//               <div className="col-sm-3 mb-4">
//                 <label htmlFor="UnitofMeasure" className="form-label">
//                   Unit of Measure
//                 </label>

//                 <input
//                   type="text"
//                   className="form-control"
//                   id="UnitofMeasure"
//                   placeholder="Unit of Measure"
//                   disabled
//                   readOnly=""
//                   value={itemRequestData?.uom || ""}
//                 />
//               </div>
//               <div className="col-sm-6 mb-4">
//                 <label htmlFor="Remarks" className="form-label">
//                   Remarks
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="Remarks"
//                   placeholder=""
//                   value={itemRequestData?.remarks || ""}
//                   onChange={(e) =>
//                     setItemRequestData((prev) => ({
//                       ...prev,
//                       remarks: e.target.value,
//                     }))
//                   }
//                 />
//               </div>
//               <div className="col-sm-3 mb-4">
//                 <label htmlFor="ReceivingPerson" className="form-label">
//                   Receiving Person
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="ReceivingPerson"
//                   placeholder=""
//                   value={itemRequestData?.receiving_person || ""}
//                   onChange={(e) =>
//                     setItemRequestData((prev) => ({
//                       ...prev,
//                       receiving_person: e.target.value,
//                     }))
//                   }
//                 />
//               </div>
//               {/* <!-- <div className="col-sm-3 mb-4">
//                                 <label htmlFor="RequestDate" className="form-label">Request Date </label>
//                                 <input type="date" className="form-control" id="RequestDate" placeholder="" />
//                             </div>
// --> */}
//               <div className="col-sm-6 mb-4">
//                 <label htmlFor="UploadFile" className="form-label">
//                   Upload File (Optional){" "}
//                 </label>
//                 <input
//                   type="file"
//                   className="form-control"
//                   id="UploadFile"
//                   placeholder=""
//                 />
//               </div>

//               <div className="col-lg-12 text-end">
//                 <button
//                   className="btn btn-primary waves-effect waves-light"
//                   onClick={handleSubmit}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//       {/* -----------------END ITEM REQUEST FORM---------------- */}
//     </>
//   );
// }

//////////////////////

import React, { useEffect } from "react";
import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import { useItemRequest } from "../../../../../Context/Request Management/Item_Request";
import { useItemMaster } from "../../../../../Context/ItemManagement/ItemMasterContext";
import { useServiceLocation3Master } from "../../../../../Context/Master/ServiceLocation3MasterContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Item_Request_Form() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { serviceLocation3, fetchServiceLocations3 } =
    useServiceLocation3Master();
  const {
    itemRequestData,
    setItemRequestData,
    createItemRequest,
    itemRequest,
    fetchItemRequestById,
    getItemRequestData,
    editItemRequest,
    itemList,
    setEditId,
    getItemNameAndId,
  } = useItemRequest();
  const { itemMaster, fetchItemMaster } = useItemMaster();
  console.log("type", type);
  // FIXED: Enhanced useEffect for data loading
  useEffect(() => {
    // console.log("Component mounted with type:", type, "id:", id);

    getItemRequestData();
    fetchServiceLocations3();
    fetchItemMaster();

    if (type) {
      getItemNameAndId(type);
      setItemRequestData((prev) => ({ ...prev, item_type: type }));
    }

    // If editing, fetch details
    if (id) {
      // console.log("Editing mode - ID:", id);
      setEditId(id);
      // Use setTimeout to ensure other data is loaded first
      setTimeout(() => {
        fetchItemRequestById(id);
      }, 100);
    }
  }, [id, type]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!itemRequestData.item_id || !itemRequestData.quantity) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = {
      ...itemRequestData,
      // Ensure we're sending the correct ID for edit
      ...(id && { id: itemRequestData.request_id }),
    };

    // console.log("Submitting payload:", payload);

    try {
      if (id) {
        editItemRequest(id, payload);
      } else {
        createItemRequest(payload);
      }
      navigate("/user/request/request-list");
    } catch (error) {
      console.log("Save error:", error);
    }
  };

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card mt-3">
          <div className="row p-3">
            {/* Select Item */}
            <div className="col-sm-3 mb-4">
              <CustomSelect
                id="selectItem"
                label="Select Item"
                // options={
                //   itemMaster?.map((item) => ({
                //     value: item.id,
                //     label: item.item_name,
                //   })) || []
                // }
                options={
                  itemMaster
                    ?.filter((item) => item.type === type) // ✅ Filter items of selected type
                    ?.map((item) => ({
                      value: item.id,
                      label: item.item_name,
                    })) || []
                }
                value={itemRequestData?.item_id || ""}
                onChange={(selected) => {
                  const selectedId = Number(selected);
                  const selectedItem = itemMaster.find(
                    (itm) => Number(itm.id) === selectedId
                  );
                  // console.log("selectedId", selectedItem);

                  const storage = selectedItem?.storage_locations?.[0];
                  setItemRequestData((prev) => ({
                    ...prev,
                    item_id: selectedId,
                    c_id: selectedItem?.c_id || null,
                    category_name:
                      selectedItem?.category?.category_name || null,
                    sub_c_id: selectedItem?.sub_c_id || null,
                    sub_category_name:
                      selectedItem?.subcategory?.sub_category_name || null,
                    uom: selectedItem?.uom || "",
                    item_code: selectedItem?.item_code || "",
                    service_location_1_id:
                      storage?.service_location3?.service_location2
                        ?.service_location1?.id || null,
                    service_location_2_id:
                      storage?.service_location3?.service_location2?.id || null,
                    service_location_3_id:
                      storage?.service_location3?.id || null,
                    service_location_1_name:
                      storage?.service_location3?.service_location2
                        ?.service_location1?.service_location_name || "",
                    service_location_2_name:
                      storage?.service_location3?.service_location2
                        ?.service_location_2_name || "",
                    service_location_3_name:
                      storage?.service_location3?.service_location_3_name || "",
                  }));
                }}
                placeholder="Select Item"
                required
              />
            </div>

            {/* Category */}
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
                readOnly
                // value={itemRequestData?.c_id || ""}
                value={
                  itemRequestData?.category_name || itemRequestData?.c_id || ""
                }
              />
            </div>

            {/* Subcategory */}
            <div className="col-sm-3 mb-4">
              <label htmlFor="Subcategory" className="form-label">
                Subcategory
              </label>
              <input
                type="text"
                className="form-control"
                id="Subcategory"
                placeholder="Subcategory"
                disabled
                readOnly
                // value={itemRequestData?.sub_c_id || ""}
                value={
                  itemRequestData?.sub_category_name ||
                  itemRequestData?.sub_c_id ||
                  ""
                }
              />
            </div>

            {/* Code */}
            <div className="col-sm-3 mb-4">
              <label htmlFor="Code" className="form-label">
                Code
              </label>
              <input
                type="text"
                className="form-control"
                id="Code"
                placeholder="Code"
                disabled
                readOnly
                value={itemRequestData?.item_code || ""}
              />
            </div>

            {/* Service Location 1 */}
            <div className="col-sm-3 mb-4">
              <label htmlFor="service_location_1" className="form-label">
                Service Location 1
              </label>
              <input
                type="text"
                className="form-control"
                id="service_location_1"
                placeholder="Service Location 1"
                disabled
                readOnly
                value={
                  itemRequestData?.service_location_1_name ||
                  itemRequestData?.service_location_1_id ||
                  ""
                }
              />
            </div>

            {/* Service Location 3 */}
            <div className="col-sm-3 mb-4">
              <label htmlFor="service_location_3" className="form-label">
                Service Location 3
              </label>
              <input
                type="text"
                className="form-control"
                id="service_location_3"
                placeholder="Service Location 3"
                disabled
                readOnly
                value={
                  itemRequestData?.service_location_3_name ||
                  itemRequestData?.service_location_3_id ||
                  ""
                }
              />
            </div>

            {/* Purpose */}
            <div className="col-sm-3 mb-4">
              <CustomSelect
                id="selectPurpose"
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
                value={itemRequestData?.purpose || ""}
                onChange={(selected) => {
                  setItemRequestData((prev) => ({
                    ...prev,
                    purpose: selected,
                  }));
                }}
                placeholder="Select Purpose"
                required
              />
            </div>

            {/* Quantity */}
            <div className="col-sm-3 mb-4">
              <label htmlFor="Quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                placeholder="Quantity"
                value={itemRequestData?.quantity ?? ""}
                onChange={(e) =>
                  setItemRequestData((prev) => ({
                    ...prev,
                    quantity: e.target.value ? Number(e.target.value) : "",
                  }))
                }
                min="0"
                required
              />
            </div>

            {/* Unit of Measure */}
            <div className="col-sm-3 mb-4">
              <label htmlFor="UnitofMeasure" className="form-label">
                Unit of Measure
              </label>
              <input
                type="text"
                className="form-control"
                id="UnitofMeasure"
                placeholder="Unit of Measure"
                disabled
                readOnly
                value={itemRequestData?.uom || ""}
              />
            </div>

            {/* Remarks */}
            <div className="col-sm-6 mb-4">
              <label htmlFor="Remarks" className="form-label">
                Remarks
              </label>
              <input
                type="text"
                className="form-control"
                id="Remarks"
                placeholder="Remarks"
                value={itemRequestData?.remarks || ""}
                onChange={(e) =>
                  setItemRequestData((prev) => ({
                    ...prev,
                    remarks: e.target.value,
                  }))
                }
              />
            </div>
            {/* Receiving Person */}
            {type === "material" && (
              <div className="col-sm-3 mb-4">
                <label htmlFor="ReceivingPerson" className="form-label">
                  Receiving Person
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ReceivingPerson"
                  placeholder="Receiving Person"
                  value={itemRequestData?.receiving_person || ""}
                  onChange={(e) =>
                    setItemRequestData((prev) => ({
                      ...prev,
                      receiving_person: e.target.value,
                    }))
                  }
                />
              </div>
            )}

            {/* Upload File */}
            <div className="col-sm-6 mb-4">
              <label htmlFor="UploadFile" className="form-label">
                Upload File (Optional)
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
                {id ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
