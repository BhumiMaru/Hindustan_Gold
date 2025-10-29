import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoryMaster } from "../../../../../Context/ItemManagement/CategoryMasterContext";
import { useZone } from "../../../../../Context/Master/ZoneContext";
import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";
import { useServiceLocation2Master } from "../../../../../Context/Master/ServiceLocation2MasterContext";
import { useServiceLocation3Master } from "../../../../../Context/Master/ServiceLocation3MasterContext";
import { useSubCategory } from "../../../../../Context/ItemManagement/SubCategoryContext";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";
import { toast } from "react-toastify";
import { useItemMaster } from "../../../../../Context/ItemManagement/ItemMasterContext";
import { useUOM } from "../../../../../Context/UomContext";

export default function Item_Create_Material_Form() {
  const { type, id } = useParams();
  const {
    setItemMasterData,
    EditItemMaster,
    createItemMaster,
    itemSubCategoryId,
    setItemSubCategoryId,
    getCategoryGroupAndItemCodeBySubCategoryId,
    fetchItemMaster,
    itemMasterData,
    isItemEditId,
    fetchitemById,
    StartEditing,
    ResetItemMaster,
  } = useItemMaster();

  const navigate = useNavigate();
  const { filterCategory, fetchCategoryFilter } = useCategoryMaster();
  const { zoneFilter, fetchZoneFilter } = useZone();
  const { serviceL1, fetchSL1Filter } = useServiceLocation1Master();
  const { fetchSL2Filter, serviceL2 } = useServiceLocation2Master();
  const { serviceL3, fetchSL3Filter } = useServiceLocation3Master();
  const { filterSubCategory, fetchSubCategoryFilter } = useSubCategory();
  const { filterUomList, filterUom } = useUOM();

  // Fetch item data when in edit mode
  useEffect(() => {
    if (id) {
      StartEditing(id);
      fetchitemById(id);
    }
  }, [id]);

  useEffect(() => {
    // Set the item type based on URL param
    setItemMasterData((prev) => ({
      ...prev,
      type: type,
      item_type: type,
      status: 1,
    }));

    filterUomList();
    fetchSL1Filter();
    fetchSL2Filter();
    fetchSL3Filter();
    fetchSubCategoryFilter();
    fetchZoneFilter();
    fetchCategoryFilter();
  }, [type]);

  // Save Item Material Data
  // const handleSave = async () => {
  //   // Basic validation
  //   if (!itemMasterData.item_name) {
  //     toast.error("Item name is required");
  //     return;
  //   }

  //   if (!itemMasterData.sub_c_id) {
  //     toast.error("Subcategory is required");
  //     return;
  //   }

  //   const payload = {
  //     ...itemMasterData,
  //     service_location_3_id: Array.isArray(itemMasterData.service_location_3_id)
  //       ? itemMasterData.service_location_3_id
  //       : [],
  //     zone_id: Array.isArray(itemMasterData.zone_id)
  //       ? itemMasterData.zone_id
  //       : [],
  //   };
  //   console.log("payload", payload);

  //   try {
  //     if (id) {
  //       await EditItemMaster(id, payload);
  //       // console.log("payload update", payload);
  //       toast.success("Item Updated Successfully!");
  //       fetchItemMaster();
  //       navigate("/item/item-master");
  //       ResetItemMaster();
  //     } else {
  //       await createItemMaster(payload);
  //       // console.log("item create ", payload);
  //       toast.success("Item Created Successfully!");
  //       navigate("/item/item-master");
  //       fetchItemMaster();
  //       ResetItemMaster();
  //     }
  //   } catch (error) {
  //     console.log("item save error", error);
  //     toast.error("Failed to save item");
  //   }
  // };

  const handleSave = async () => {
    // Basic validation
    if (!itemMasterData.item_name) {
      toast.error("Item name is required");
      return;
    }

    if (!itemMasterData.sub_c_id) {
      toast.error("Subcategory is required");
      return;
    }

    const payload = {
      ...itemMasterData,
      service_location_3_id: Array.isArray(itemMasterData.service_location_3_id)
        ? itemMasterData.service_location_3_id
        : [],
      zone_id: Array.isArray(itemMasterData.zone_id)
        ? itemMasterData.zone_id
        : [],
    };

    try {
      let res;
      if (id) {
        // 🔹 Update Item
        res = await EditItemMaster(id, payload);
        // console.log("res", res);
        // if (res?.status === true) {
        //   toast.success(res?.message || "Item Updated Successfully!");
        //   fetchItemMaster();
        //   ResetItemMaster();
        //   navigate("/item/item-master"); // ✅ navigate only on success
        // } else {
        //   toast.error(res?.message || "Failed to update item");
        // }
      } else {
        // 🔹 Create Item
        res = await createItemMaster(payload);
        // console.log("res creaye", res);
        // if (res?.status === true) {
        //   toast.success(res?.message || "Item Created Successfully!");
        //   fetchItemMaster();
        //   ResetItemMaster();
        //   navigate("/item/item-master"); // ✅ navigate only on success
        // } else {
        //   toast.error(res?.message || "Failed to create item");
        // }
      }
      if (res?.status === true) {
        toast.success(res?.message);
        fetchItemMaster();
        ResetItemMaster();
        navigate("/item/item-master"); // ✅ navigate only on success
      } else {
        toast.error(res?.message || "Failed to update item");
      }
      // console.log("paylod", payload);
    } catch (error) {
      console.error("item save error", error);
      toast.error("Failed to save item");
    }
  };

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card h-100 mt-2">
          <div className="card-body">
            <div className="nav-align-top">
              <div className="tab-content border-0 mx-1">
                <div
                  className="tab-pane fade active show"
                  id="Item"
                  role="tabpanel"
                >
                  <h5 className="modal-title" id="exampleModalLabel2">
                    {/* {id ? "Edit M aterial" : "Add Material"} */}
                  </h5>
                  <div className="row p-3">
                    {/* Type - Hidden */}
                    <div className="col-sm-3 mb-4 d-none">
                      <input type="text" value={type} readOnly />
                    </div>

                    {/* Group */}
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Group" className="form-label">
                        Group
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Group"
                        placeholder="Group"
                        readOnly
                        disabled
                        value={itemMasterData?.group_name || ""}
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
                        readOnly
                        disabled
                        value={itemMasterData?.c_name || ""}
                      />
                    </div>

                    {/* Sub Category */}
                    <div className="col-sm-3 mb-4">
                      <div className="position-relative">
                        <CustomSelect
                          id="selectSubCategory"
                          label="Subcategory"
                          options={filterSubCategory?.map((subcat) => ({
                            value: Number(subcat.id),
                            label: subcat.sub_category_name,
                          }))}
                          value={Number(itemMasterData?.sub_c_id) || null}
                          onChange={(val) => {
                            setItemMasterData((prev) => ({
                              ...prev,
                              sub_c_id: Number(val),
                              item_type: type,
                            }));
                            getCategoryGroupAndItemCodeBySubCategoryId(
                              type,
                              Number(val)
                            );
                          }}
                          placeholder="Select SubCategory"
                        />
                      </div>
                    </div>

                    {/* Item Name */}
                    {type === "material" && (
                      <div className="col-sm-3 mb-4">
                        <label htmlFor="Itemname" className="form-label">
                          Item
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="Itemname"
                          placeholder="Enter Item Name"
                          value={itemMasterData?.item_name || ""}
                          onChange={(e) =>
                            setItemMasterData({
                              ...itemMasterData,
                              item_name: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}

                    {/* Unit Of Measure */}
                    {type === "material" && (
                      <div className="col-sm-3 mb-4">
                        <div className="position-relative">
                          <CustomSelect
                            id="selectuom"
                            label="Unit Of Measure"
                            // options={[
                            //   { value: "kg", label: "KG" },
                            //   { value: "ltr", label: "Ltr" },
                            // ]}
                            options={filterUom.map((uom) => {
                              return {
                                value: uom.id,
                                label: uom.name,
                              };
                            })}
                            value={itemMasterData?.uom || ""}
                            onChange={(val) =>
                              setItemMasterData({
                                ...itemMasterData,
                                uom: val,
                              })
                            }
                            placeholder="Select Unit of Measure"
                          />
                        </div>
                      </div>
                    )}

                    {/* Item Code */}
                    {type === "material" && (
                      <div className="col-sm-3 mb-4">
                        <label htmlFor="ItemCode" className="form-label">
                          Item Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ItemCode"
                          placeholder="Item Code"
                          readOnly
                          disabled
                          value={itemMasterData?.item_code || ""}
                        />
                      </div>
                    )}

                    {/* Service Name */}
                    {type === "service" && (
                      <div className="col-sm-3 mb-4">
                        <label htmlFor="Servicename" className="form-label">
                          Service
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="Servicename"
                          placeholder="Enter Service Name"
                          value={itemMasterData?.item_name || ""}
                          onChange={(e) =>
                            setItemMasterData({
                              ...itemMasterData,
                              item_name: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}

                    {/* Service Code */}
                    {type === "service" && (
                      <div className="col-sm-3 mb-4">
                        <label htmlFor="ServiceCode" className="form-label">
                          Service Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ServiceCode"
                          placeholder="Service Code"
                          readOnly
                          value={itemMasterData?.item_code || ""}
                        />
                      </div>
                    )}

                    {/* Asset Name */}
                    {type === "asset" && (
                      <div className="col-sm-3 mb-4">
                        <label htmlFor="Assetname" className="form-label">
                          Asset
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="Assetname"
                          placeholder="Enter Asset Name"
                          value={itemMasterData?.item_name || ""}
                          onChange={(e) =>
                            setItemMasterData({
                              ...itemMasterData,
                              item_name: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}

                    {/* Asset Code */}
                    {type === "asset" && (
                      <div className="col-sm-3 mb-4">
                        <label htmlFor="AssetCode" className="form-label">
                          Asset Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="AssetCode"
                          placeholder="Service Code"
                          readOnly
                          value={itemMasterData?.item_code || ""}
                        />
                      </div>
                    )}

                    {/* Description */}
                    <div className="col-sm-6 mb-4">
                      <label htmlFor="Description" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="Description"
                        className="form-control"
                        value={itemMasterData?.description || ""}
                        onChange={(e) =>
                          setItemMasterData({
                            ...itemMasterData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Is Purpose Required? */}
                    {type !== "asset" && (
                      <div className="col-sm-3 mb-4">
                        <label className="form-label">
                          Is Purpose Required?
                        </label>
                        <div>
                          <div className="form-check form-check-inline mt-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="purposeRequired"
                              id="purposeYes"
                              value="1"
                              checked={
                                itemMasterData?.is_purpose_required === 1
                              }
                              onChange={(e) =>
                                setItemMasterData({
                                  ...itemMasterData,
                                  is_purpose_required: Number(e.target.value),
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="purposeYes"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="purposeRequired"
                              id="purposeNo"
                              value="0"
                              checked={
                                itemMasterData?.is_purpose_required === 0 ||
                                itemMasterData?.is_purpose_required === null
                              }
                              onChange={(e) =>
                                setItemMasterData({
                                  ...itemMasterData,
                                  is_purpose_required: Number(e.target.value),
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="purposeNo"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Is Approval Required? */}
                    {type !== "asset" && (
                      <div className="col-sm-3 mb-4">
                        <label className="form-label">
                          Is Approval Required?
                        </label>
                        <div>
                          <div className="form-check form-check-inline mt-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="approvalRequired"
                              id="approvalYes"
                              value="1"
                              checked={
                                itemMasterData?.is_approval_required === 1
                              }
                              onChange={(e) =>
                                setItemMasterData({
                                  ...itemMasterData,
                                  is_approval_required: Number(e.target.value),
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="approvalYes"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="approvalRequired"
                              id="approvalNo"
                              value="0"
                              checked={
                                itemMasterData?.is_approval_required === 0 ||
                                itemMasterData?.is_approval_required === null
                              }
                              onChange={(e) =>
                                setItemMasterData({
                                  ...itemMasterData,
                                  is_approval_required: Number(e.target.value),
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="approvalNo"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Is Movable Required? */}
                    {type === "asset" && (
                      <div className="col-sm-3 mb-4">
                        <label className="form-label">Is Movable?</label>
                        <div>
                          <div className="form-check form-check-inline mt-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="isMovable"
                              id="movableYes"
                              value="1"
                              checked={itemMasterData?.is_movable === 1}
                              onChange={(e) =>
                                setItemMasterData({
                                  ...itemMasterData,
                                  is_movable: Number(e.target.value),
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="movableYes"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="isMovable"
                              id="movableNo"
                              value="0"
                              checked={
                                itemMasterData?.is_movable === 0 ||
                                itemMasterData?.is_movable === null
                              }
                              onChange={(e) =>
                                setItemMasterData({
                                  ...itemMasterData,
                                  is_movable: Number(e.target.value),
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="movableNo"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Primary */}
                    {/* service location 1 */}
                    {/* <div className="col-sm-3 mb-4">
                      
                      <div className="select2-primary">
                        <div className="position-relative">
                          <CustomSelect
                            options={serviceL1?.map((loc) => ({
                              value: loc.id,
                              label: loc.service_location_name,
                            }))}
                            value={itemMasterData.service_location_1_id}
                            onChange={(val) =>
                              setItemMasterData((prev) => ({
                                ...itemMasterData,
                                service_location_1_id: val,
                              }))
                            }
                            label="Service Location 1"
                            placeholder="Select Service Location 1"
                            id="serviceLocation1"
                            required
                            multiple
                          />
                        </div>
                      </div>
                    </div> */}
                    {/* service location 2 */}
                    {/* <div className="col-sm-3 mb-4">
                      
                      <div className="select2-primary">
                        <div className="position-relative">
                          <CustomSelect
                            options={serviceL2?.map((loc) => ({
                              value: loc.id,
                              label: loc.service_location_2_name,
                            }))}
                            value={itemMasterData.service_location_2_id}
                            onChange={(val) =>
                              setItemMasterData((prev) => ({
                                ...itemMasterData,
                                service_location_2_id: val,
                              }))
                            }
                            label="Service Location 2"
                            placeholder="Select Service Location 2"
                            id="serviceLocation2"
                            required
                            multiple
                          />
                        </div>
                      </div>
                    </div> */}

                    {/* Service Location 3 */}
                    <div className="col-sm-3 mb-4">
                      <div className="select2-primary">
                        <div className="position-relative">
                          <CustomSelect
                            multiple
                            options={serviceL3?.map((loc) => ({
                              value: Number(loc.id),
                              label: loc.service_location_3_name,
                            }))}
                            value={
                              Array.isArray(
                                itemMasterData?.service_location_3_id
                              )
                                ? itemMasterData.service_location_3_id.map(
                                    Number
                                  )
                                : []
                            }
                            onChange={(val) =>
                              setItemMasterData({
                                ...itemMasterData,
                                service_location_3_id: val.map(Number),
                              })
                            }
                            label="Storage Location"
                            placeholder="Select Storage Location"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Primary Zone */}
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="select2info" className="form-label">
                        Zone
                      </label>
                      <div className="select2-info">
                        <div className="position-relative">
                          <CustomSelect
                            multiple
                            options={zoneFilter?.map((zone) => ({
                              value: Number(zone.id),
                              label: zone.zone_name,
                            }))}
                            value={
                              Array.isArray(itemMasterData?.zone_id)
                                ? itemMasterData.zone_id.map(Number)
                                : []
                            }
                            onChange={(val) =>
                              setItemMasterData({
                                ...itemMasterData,
                                zone_id: val.map(Number),
                              })
                            }
                            placeholder="Select Zone"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stock */}
                    {type === "material" && (
                      <div className="col-sm-3 mb-4">
                        <label htmlFor="Stock" className="form-label">
                          Stock
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="Stock"
                          placeholder="Stock"
                          value={itemMasterData?.stock}
                          onChange={(e) =>
                            setItemMasterData({
                              ...itemMasterData,
                              stock: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                    )}

                    {/* Stock Value */}
                    {type === "material" && (
                      <div className="col-sm-3 mb-4">
                        <label htmlFor="StockValue" className="form-label">
                          Stock Value
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="StockValue"
                          placeholder="Stock Value"
                          value={itemMasterData?.stock_value}
                          onChange={(e) =>
                            setItemMasterData({
                              ...itemMasterData,
                              stock_value: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                    )}

                    {/* Minimum Stock */}
                    {type === "material" && (
                      <div className="col-sm-3 mb-4">
                        <label htmlFor="MinimumStock" className="form-label">
                          Minimum Stock
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="MinimumStock"
                          placeholder="Minimum Stock"
                          value={itemMasterData?.minimum_stock}
                          onChange={(e) =>
                            setItemMasterData({
                              ...itemMasterData,
                              minimum_stock: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                    )}

                    {/* Purchase Date */}
                    {type === "asset" && (
                      <div className="col-sm-3 mb-4">
                        <label htmlFor="PurchaseDate" className="form-label">
                          Purchase Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="PurchaseDate"
                          placeholder="Purchase Date"
                          value={itemMasterData?.purchase_date || ""}
                          onChange={(e) =>
                            setItemMasterData({
                              ...itemMasterData,
                              purchase_date: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}

                    {/* Warranty Expiry */}
                    {type === "asset" && (
                      <div className="col-sm-3 mb-4">
                        <label htmlFor="WarrantyExpiry" className="form-label">
                          Warranty Expiry
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="WarrantyExpiry"
                          placeholder="Warranty Expiry Date"
                          value={itemMasterData?.warranty_expiry || ""}
                          onChange={(e) =>
                            setItemMasterData({
                              ...itemMasterData,
                              warranty_expiry: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}

                    {/* Quantity */}
                    {type === "asset" && (
                      <div className="col-sm-3 mb-4">
                        <label htmlFor="Quantity" className="form-label">
                          Quantity
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="Quantity"
                          placeholder="Enter Quantity"
                          value={itemMasterData?.stock || 0}
                          onChange={(e) =>
                            setItemMasterData({
                              ...itemMasterData,
                              stock: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                    )}

                    {/* Status */}
                    <div className="col-sm-3 mb-4">
                      <div className="position-relative">
                        <CustomSelect
                          id="selectStatus"
                          label="Status"
                          options={[
                            { value: 1, label: "Active" },
                            { value: 0, label: "Deactive" },
                          ]}
                          value={itemMasterData?.status === 0 ? 0 : 1}
                          onChange={(val) =>
                            setItemMasterData({
                              ...itemMasterData,
                              status: Number(val),
                            })
                          }
                          placeholder="Select Status"
                        />
                      </div>
                    </div>

                    {/* Save Btn */}
                    <div className="col-lg-12 text-end">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
