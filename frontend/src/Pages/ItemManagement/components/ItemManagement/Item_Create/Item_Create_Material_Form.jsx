import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useItemMaster } from "../../../../../Context/ItemManagement/ItemMasterContext";
import { useCategoryMaster } from "../../../../../Context/ItemManagement/CategoryMasterContext";
import { useZone } from "../../../../../Context/Master/ZoneContext";
import { useServiceLocation1Master } from "../../../../../Context/Master/ServiceLocation1MasterContext";
import { useServiceLocation2Master } from "../../../../../Context/Master/ServiceLocation2MasterContext";
import { useServiceLocation3Master } from "../../../../../Context/Master/ServiceLocation3MasterContext";
import { useSubCategory } from "../../../../../Context/ItemManagement/SubCategoryContext";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";

export default function Item_Create_Material_Form() {
  const {
    itemMasterData,
    setItemMasterData,
    isItemEditId,
    EditItemMaster,
    createItemMaster,
  } = useItemMaster();
  const navigate = useNavigate();
  const { filterCategory, fetchCategoryFilter } = useCategoryMaster();
  const { zoneFilter, fetchZoneFilter } = useZone();
  const { serviceL1, fetchSL1Filter } = useServiceLocation1Master();
  const { fetchSL2Filter, serviceL2 } = useServiceLocation2Master();
  const { serviceL3, fetchSL3Filter } = useServiceLocation3Master();
  const { filterSubCategory, fetchSubCategoryFilter } = useSubCategory();

  useEffect(() => {
    fetchSL1Filter();
    fetchSL2Filter();
    fetchSL3Filter();
    fetchSubCategoryFilter();
    fetchZoneFilter();
    fetchCategoryFilter();
  }, []);

  // Save Item Material Data
  const handleSave = async () => {
    const payload = { ...itemMasterData };
    try {
      if (isItemEditId) {
        await EditItemMaster(isItemEditId, payload);
      } else {
        await createItemMaster(payload);
      }

      navigate("/item/item-master");
    } catch (error) {
      console.log("item save error", error);
    }
  };
  return (
    <>
      {/* ---------------START ITEM CREATE MATERIAL FORM-------------- */}
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* DataTable with Buttons */}
        <div className="card h-100 mt-2">
          <div className="card-body">
            <div className="nav-align-top">
              {/* <ul
                className="nav nav-tabs nav-fill rounded-0 timeline-indicator-advanced"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    type="button"
                    className="nav-link waves-effect active"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Item"
                    aria-controls="Item"
                    aria-selected="true"
                    tabIndex={-1}
                  >
                    Material
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    type="button"
                    className="nav-link waves-effect"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Services"
                    aria-controls="Services"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    Services
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    type="button"
                    className="nav-link waves-effect "
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Assets"
                    aria-controls="Assets"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    Assets
                  </button>
                </li>
              </ul> */}

              <div className="tab-content border-0  mx-1">
                <div
                  className="tab-pane fade active show"
                  id="Item"
                  role="tabpanel"
                >
                  <h5 className="modal-title" id="exampleModalLabel2">
                    {/* {isItemEditId ? "Edit Material" : "Add Material"} */}
                  </h5>
                  <div className="row p-3">
                    {/* Type */}
                    <div className="col-sm-3 mb-4 d-none">
                      <label htmlFor="Group" className="form-label">
                        Type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="type"
                        placeholder="type"
                        disabled=""
                        readOnly=""
                        value="material"
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Group" className="form-label">
                        Group
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Group"
                        placeholder="Group"
                        // defaultValue=""
                        disabled=""
                        readOnly=""
                        value={itemMasterData.group_id}
                        onChange={(e) =>
                          setItemMasterData({
                            ...itemMasterData,
                            group_id: e.target.value,
                          })
                        }
                      />
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
                        disabled=""
                        defaultValue="Categary"
                        readOnly=""
                        value={itemMasterData.c_id}
                        onChange={(e) =>
                          setItemMasterData({
                            ...itemMasterData,
                            c_id: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <div className="position-relative">
                        <CustomSelect
                          id="selectSubCategory"
                          label="Subcategory"
                          options={filterSubCategory?.map((subcat) => ({
                            value: subcat.id,
                            label: subcat.sub_category_name,
                          }))}
                          value={itemMasterData.sub_c_id}
                          onChange={(val) =>
                            setItemMasterData({
                              ...itemMasterData,
                              sub_c_id: val,
                            })
                          }
                          placeholder="Select SubCategory"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Itemname" className="form-label">
                        Item
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Itemname"
                        placeholder="Enter Item Name"
                        value={itemMasterData.item_name}
                        onChange={(e) =>
                          setItemMasterData({
                            ...itemMasterData,
                            item_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <div className="position-relative">
                        <CustomSelect
                          id="selectuom"
                          label="Unit Of Measure"
                          options={[
                            {
                              value: "kg",
                              label: "KG",
                            },
                            {
                              value: "ltr",
                              label: "Ltr",
                            },
                          ]}
                          value={itemMasterData.uom}
                          onChange={(val) =>
                            setItemMasterData({
                              ...itemMasterData,
                              uom: val,
                            })
                          }
                          placeholder="Select Unit of Measure"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="ItemCode" className="form-label">
                        Item Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ItemCode"
                        placeholder="Item Code"
                        defaultValue="AS-DN-001"
                        disabled=""
                        readOnly=""
                        value={itemMasterData.item_code}
                        onChange={(e) =>
                          setItemMasterData({
                            ...itemMasterData,
                            item_code: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-sm-6 mb-4">
                      <label htmlFor="Description" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="Description"
                        className="form-control"
                        defaultValue={""}
                        value={itemMasterData.description}
                        onChange={(e) =>
                          setItemMasterData({
                            ...itemMasterData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* Is Purpose Required? */}
                    <div className="col-sm-3 mb-4">
                      <label className="form-label">Is Purpose Required?</label>
                      <div>
                        <div className="form-check form-check-inline mt-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="purposeRequired"
                            id="purposeYes"
                            value="1"
                            checked={itemMasterData.is_purpose_required === 1}
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
                            checked={itemMasterData.is_purpose_required === 0}
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

                    {/* Is Approval Required? */}
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
                            checked={itemMasterData.is_approval_required === 1}
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
                            checked={itemMasterData.is_approval_required === 0}
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

                    {/* Primary */}
                    {/* service location 1 */}
                    <div className="col-sm-3 mb-4">
                      {/* <label htmlFor="select2Primary" className="form-label">
                        Storage Location
                      </label> */}
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
                          />
                        </div>
                      </div>
                    </div>
                    {/* service location 2 */}
                    <div className="col-sm-3 mb-4">
                      {/* <label htmlFor="select2Primary" className="form-label">
                        Storage Location
                      </label> */}
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
                          />
                        </div>
                      </div>
                    </div>
                    {/* service location 2 */}
                    <div className="col-sm-3 mb-4">
                      {/* <label htmlFor="select2Primary" className="form-label">
                        Storage Location
                      </label> */}
                      <div className="select2-primary">
                        <div className="position-relative">
                          <CustomSelect
                            options={serviceL3?.map((loc) => ({
                              value: loc.id,
                              label: loc.service_location_3_name,
                            }))}
                            value={itemMasterData.service_location_3_id}
                            onChange={(val) =>
                              setItemMasterData((prev) => ({
                                ...itemMasterData,
                                service_location_3_id: val,
                              }))
                            }
                            label="Service Location 3"
                            placeholder="Select Service Location 3"
                            id="serviceLocation3"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    {/* Primary */}
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="select2info" className="form-label">
                        Zone
                      </label>
                      <div className="select2-info">
                        <div className="position-relative">
                          <CustomSelect
                            id="selectZone"
                            options={zoneFilter?.map((zone) => ({
                              value: zone.id,
                              label: zone.zone_name,
                            }))}
                            value={itemMasterData.zone_id}
                            onChange={(val) =>
                              setItemMasterData({
                                ...itemMasterData,
                                zone_id: val,
                              })
                            }
                            placeholder="Select Zone"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="Stock" className="form-label">
                        Stock
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="Stock"
                        placeholder="Stock"
                        value={itemMasterData.stock}
                        onChange={(e) =>
                          setItemMasterData({
                            ...itemMasterData,
                            stock: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="StockValue" className="form-label">
                        Stock Value
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="StockValue"
                        placeholder="Stock Value"
                        value={itemMasterData.stock_value}
                        onChange={(e) =>
                          setItemMasterData({
                            ...itemMasterData,
                            stock_value: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      <label htmlFor="MinimumStock" className="form-label">
                        Minimum Stock
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="MinimumStock"
                        placeholder="Minimum Stock"
                        value={itemMasterData.minimum_stock}
                        onChange={(e) =>
                          setItemMasterData({
                            ...itemMasterData,
                            minimum_stock: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-sm-3 mb-4">
                      {/* <label htmlFor="status" className="form-label">
                        Status
                      </label> */}
                      <div className="position-relative">
                        <CustomSelect
                          id="selectStatus"
                          label="Status"
                          options={[
                            {
                              value: 1,
                              label: "Active",
                            },
                            {
                              value: 0,
                              label: "Deactive",
                            },
                          ]}
                          value={itemMasterData?.status}
                          onChange={(val) =>
                            setItemMasterData({
                              ...itemMasterData,
                              status: val,
                            })
                          }
                          placeholder="Select Status"
                          // data-select2-id="10"
                          required
                        />
                      </div>
                    </div>
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

      {/* ---------------END ITEM CREATE MATERIAL FORM-------------- */}
    </>
  );
}
