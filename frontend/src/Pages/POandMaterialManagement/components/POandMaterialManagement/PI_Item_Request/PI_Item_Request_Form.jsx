import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import { useItemMaster } from "../../../../../Context/ItemManagement/ItemMasterContext";
import { usePIRequest } from "../../../../../Context/PIAndPoManagement/PIRequestList";
import { toast } from "react-toastify";

export default function PI_Item_Request_Form() {
  const { type } = useParams();
  const { CreatePIRequest } = usePIRequest();

  // State to hold multiple items
  const [items, setItems] = useState([
    {
      id: 1,
      requestedItem: "",
      category: "Category 1",
      subcategory: "Subcategory 1",
      qty: "",
      uom: "KG",
      serviceLocation: "Location 1",
      zone: "Zone 1",
      purpose: "",
      priority: "",
      requestDate: "",
      remarks: "",
      file: null,
    },
  ]);
  const { itemMaster, fetchItemMaster } = useItemMaster();

  useEffect(() => {
    fetchItemMaster();
  }, []);

  // Add new item
  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        requestedItem: "",
        category: "Category 1",
        subcategory: "Subcategory 1",
        qty: "",
        uom: "KG",
        serviceLocation: "Location 1",
        zone: "Zone 1",
        purpose: "",
        priority: "",
        requestDate: "",
        remarks: "",
        file: null,
      },
    ]);
  };

  // Delete One Item Form
  const DeleteItem = (id) => {
    if (items.length === 1) {
      toast.info("At least one item is required.");
      return;
    }
    setItems(items.filter((item) => item.id !== id));
  };

  // Handle Save (API Call)
  const handleSave = async () => {
    const payload = {
      pi_type: type, // from route params
      pi_date: new Date().toISOString().split("T")[0], // today’s date
      // department_id: 3, // you may want this dynamic
      // order_by: 1, // current user id maybe
      items: items.map((item) => ({
        item_id: item.requestedItem || null,
        qty: item.qty,
        uom: item.uom,
        priority: item.priority,
        purpose: item.purpose,
        remark: item.remarks,
      })),
    };

    await CreatePIRequest(payload);
  };

  return (
    <>
      {/* --------------START PI ITEM REQUEST FORM-------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card mt-3 p-3">
          <div className="row">
            <div className="col-lg-12">
              {items?.map((item) => {
                return (
                  <div className="row">
                    <div className="col-lg-12 d-flex justify-content-between">
                      <h4>Item {item.id} #</h4>
                      <a
                        data-bs-toggle="tooltip"
                        className="btn btn-icon delete-record waves-effect waves-light"
                        data-bs-placement="top"
                        aria-label="Delete"
                        data-bs-original-title="Delete"
                        onClick={() => DeleteItem(item.id)}
                      >
                        <i className="icon-base ti tabler-trash text-danger icon-md" />
                      </a>
                    </div>
                    <div className="col-sm-3 mb-4">
                      {/* <label htmlFor="SelectItem" className="form-label">
                        Requested Item
                      </label> */}
                      <div className="position-relative">
                        <CustomSelect
                          id="selectItem"
                          label="Requested Item"
                          options={itemMaster.map((item) => ({
                            value: item.id,
                            label: item.item_name,
                          }))}
                          value={items?.item_id}
                          onChange={(selected) => {
                            const selectedId = Number(selected);
                            const selectedItem = itemMaster.find(
                              (itm) => itm.id === selectedId
                            );

                            const storage =
                              selectedItem?.storage_locations?.[0];
                            const zone = selectedItem?.zones?.[0]?.zone;

                            setItems((prev) =>
                              prev.map((it) =>
                                it.id === item.id
                                  ? {
                                      ...it,
                                      requestedItem: selectedId,
                                      category:
                                        selectedItem?.category?.category_name ||
                                        "",
                                      subcategory:
                                        selectedItem?.subcategory
                                          ?.sub_category_name || "",
                                      uom: selectedItem?.uom || "",
                                      serviceLocation:
                                        storage?.service_location3
                                          ?.service_location2?.service_location1
                                          ?.service_location_name || "",
                                      zone: zone?.zone_name || "",
                                    }
                                  : it
                              )
                            );
                          }}
                          placeholder="Select Item"
                          required
                        />
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
                        defaultValue="Category 1"
                        disabled
                        readOnly=""
                        value={item.category}
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
                        defaultValue="Subcategory 1"
                        disabled
                        readOnly=""
                        value={item.subcategory}
                      />
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
                        min={0}
                        value={item.qty}
                        onChange={(e) =>
                          setItems((prev) =>
                            prev.map((it) =>
                              it.id === item.id
                                ? { ...it, qty: e.target.value }
                                : it
                            )
                          )
                        }
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
                        // defaultValue="KG"
                        disabled
                        readOnly=""
                        value={item.category}
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="ServiceLocation" className="form-label">
                        Service Location{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ServiceLocation"
                        placeholder=""
                        defaultValue="Location 1"
                        disabled
                        readOnly=""
                        value={item.serviceLocation}
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Zone" className="form-label">
                        Zone{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Zone"
                        placeholder=""
                        defaultValue="Zone 1"
                        disabled
                        readOnly=""
                        value={item.zone}
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      {/* <label htmlFor="Purpose" className="form-label">
                        Purpose
                      </label> */}
                      <div className="position-relative">
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
                          value={items?.purpose || null}
                          onChange={(selected) => {
                            setItems((prev) =>
                              prev.map((it) =>
                                it.id === item.id
                                  ? { ...it, purpose: selected }
                                  : it
                              )
                            );
                          }}
                          placeholder="Select Purpose"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      {/* <label htmlFor="Priority" className="form-label">
                        Priority
                      </label> */}
                      <div className="position-relative">
                        <CustomSelect
                          id="selectPriority"
                          label="Priority"
                          options={[
                            {
                              value: "high",
                              label: "High",
                            },
                            {
                              value: "medium",
                              label: "Medium",
                            },
                            {
                              value: "low",
                              label: "Low",
                            },
                          ]}
                          value={items?.priority || null}
                          onChange={(selected) => {
                            setItems((prev) =>
                              prev.map((it) =>
                                it.id === item.id
                                  ? { ...it, priority: selected }
                                  : it
                              )
                            );
                          }}
                          placeholder="Select priority"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="RequestDate" className="form-label">
                        Tentative Consumption Day{" "}
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="RequestDate"
                        placeholder=""
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
                        value={item.remarks}
                        onChange={(e) =>
                          setItems((prev) =>
                            prev.map((it) =>
                              it.id === item.id
                                ? { ...it, remarks: e.target.value }
                                : it
                            )
                          )
                        }
                      />
                    </div>
                    <div className="col-sm-6 mb-4">
                      <label htmlFor="UploadFile" className="form-label">
                        Upload File (Optional){" "}
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="UploadFile"
                        placeholder=""
                        onChange={(e) =>
                          setItems((prev) =>
                            prev.map((it) =>
                              it.id === item.id
                                ? { ...it, file: e.target.files[0] }
                                : it
                            )
                          )
                        }
                      />
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
            <div className="col-lg-12 text-center d-flex justify-content-center gap-2">
              <button
                className="btn btn-info waves-effect waves-light"
                onClick={handleAddItem}
              >
                Add
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

      {/* --------------END PI ITEM REQUEST FORM-------------- */}
    </>
  );
}
