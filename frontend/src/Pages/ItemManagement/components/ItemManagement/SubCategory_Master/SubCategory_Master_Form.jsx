import React, { useState } from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useGroupMasterContext } from "../../../../../Context/ItemManagement/GroupMasterContext";
import { useCategoryMaster } from "../../../../../Context/ItemManagement/CategoryMasterContext";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import { useSubCategory } from "../../../../../Context/ItemManagement/SubCategoryContext";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";

export default function SubCategory_Master_Form() {
  const { handleClose } = useUIContext();
  const { filterGroup } = useGroupMasterContext();
  const { filterCategory } = useCategoryMaster();
  const { filterUser } = useUserCreation();
  const {
    createSubCategory,
    EditSubCategory,
    isSubEditId,
    setSubCategoryData,
    subCategoryData,
    ReserSubCategory,
    btnLoading,
  } = useSubCategory();

  const handleSave = (e) => {
    e.preventDefault();

    const payload = { ...subCategoryData };

    try {
      if (isSubEditId) {
        EditSubCategory(isSubEditId, payload);
      } else {
        createSubCategory(payload);
      }
      // console.log("payload", payload);
      // handleClose("addNewSubCategory");
    } catch (error) {
      console.log("Sub Category Error", error);
    }
  };

  return (
    <>
      {/* ---------------START CATEGORY MASTER FORM----------------- */}
      <>
        <div
          className="modal fade show"
          id="smallModal"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="modal-dialog modal-sm modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel2">
                  {isSubEditId ? "Edit Subcategory" : "Add Subcategory"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    handleClose("addNewSubCategory");
                    ReserSubCategory();
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 mb-2">
                    {/* <label htmlFor="typeSelect" className="form-label">
                      Type
                    </label> */}
                    <CustomSelect
                      id="typeSelect"
                      label="Type"
                      options={[
                        { value: "service", label: "Service" },
                        { value: "material", label: "Material" },
                      ]}
                      value={subCategoryData.type}
                      onChange={(val) =>
                        setSubCategoryData({
                          ...subCategoryData,
                          type: val,
                        })
                      }
                      placeholder="Select Type"
                      required
                      isTextRequired
                    />
                  </div>

                  <div className="col-md-12 mb-2">
                    {/* <label htmlFor="select2Basic" className="form-label">
                      Group
                    </label> */}
                    <div className="position-relative">
                      <CustomSelect
                        id="selectGroup"
                        label="Group"
                        options={filterGroup.map((group) => ({
                          value: group.id,
                          label: group.group_name,
                        }))}
                        value={subCategoryData.group_id}
                        onChange={(val) => {
                          setSubCategoryData({
                            ...subCategoryData,
                            group_id: val,
                          });
                        }}
                        placeholder="Select Group"
                        required
                        isTextRequired
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-2">
                    {/* <label htmlFor="select3Basic" className="form-label">
                      Category
                    </label> */}
                    <div className="position-relative">
                      <CustomSelect
                        id="selectCategory"
                        label="Category"
                        options={filterCategory.map((cat) => ({
                          value: cat.id,
                          label: cat.category_name,
                        }))}
                        value={subCategoryData.category_id}
                        onChange={(val) =>
                          setSubCategoryData({
                            ...subCategoryData,
                            category_id: val,
                          })
                        }
                        placeholder="Select Category"
                        required
                        isTextRequired
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-2">
                    <label htmlFor="nameSmall" className="form-label">
                      Subcategory <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="nameSmall"
                      className="form-control"
                      placeholder="Enter Subcategory Name"
                      value={subCategoryData.sub_category_name}
                      onChange={(e) => {
                        setSubCategoryData({
                          ...subCategoryData,
                          sub_category_name: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  {/* Primary */}
                  <div className="col-md-12 mb-4">
                    <div className="select2-info">
                      <div className="position-relative">
                        <CustomSelect
                          id="selectOwner"
                          label="Category Owner"
                          multiple={true}
                          options={filterUser.map((user) => ({
                            value: user.id,
                            label: user.name,
                          }))}
                          value={subCategoryData.owners} // must be an array, e.g. ["1", "2"]
                          onChange={(val) => {
                            setSubCategoryData({
                              ...subCategoryData,
                              owners: val,
                            });
                          }}
                          isTextRequired
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-2">
                    <label htmlFor="prefix" className="form-label">
                      Prefix Code <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="prefix"
                      className="form-control"
                      max="3"
                      placeholder="Enter Prefix Code"
                      value={subCategoryData.prefix_code}
                      onChange={(e) => {
                        setSubCategoryData({
                          ...subCategoryData,
                          prefix_code: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div>
                  <button
                    type="button"
                    className="btn btn-label-secondary waves-effect btn-sm"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      handleClose("addNewSubCategory");
                      ReserSubCategory();
                    }}
                  >
                    Close
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light btn-sm"
                    onClick={handleSave}
                    disabled={btnLoading}
                  >
                    {btnLoading && (
                      <div
                        className="spinner-border spinner-white me-2"
                        role="status"
                      ></div>
                    )}
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
      </>
      {/* ---------------END CATEGORY MASTER FORM----------------- */}
    </>
  );
}
