import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useUIContext } from "../../../../../Context/UIContext";
import { useCategoryMaster } from "../../../../../Context/ItemManagement/CategoryMasterContext";
import { useGroupMasterContext } from "../../../../../Context/ItemManagement/GroupMasterContext";
import { validateTextInput } from "../../../../../utils/validation";
import CustomSelect from "../../../../../components/Common/CustomSelect/CustomSelect";

export default function Category_Master_Form() {
  const { handleClose } = useUIContext();
  const {
    categoryData,
    setCategoryData,
    categoryEditId,
    setCategoryEditId,
    createCategory,
    updateCategory,
  } = useCategoryMaster();
  const { fetchGroupData, groups } = useGroupMasterContext();

  useEffect(() => {
    fetchGroupData();
  }, []);

  const handleSubmit = async () => {
    try {
      const { valid, error } = validateTextInput(
        categoryData.category_name,
        categoryData.group_id,
        categoryData.prefix_code
      );
      if (!valid) {
        toast.error(error);
        return;
      }
      console.log("category Data", categoryData);

      if (categoryEditId) {
        // Update
        await updateCategory(categoryEditId, categoryData);
      } else {
        // Create
        await createCategory(categoryData);
      }

      // Reset after save
      setCategoryEditId(null);
      setCategoryData({
        categoryName: "",
        groupId: "",
        prefixCode: "",
        status: null,
      });
      handleClose("addNewCategory");
    } catch (error) {
      toast.error(error.message);
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
          aria-modal="true"
          role="dialog"
          style={{ display: "block" }}
        >
          <div
            className="modal-dialog modal-sm modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel2">
                  {categoryEditId ? "Edit Category" : "Add Category"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    handleClose("addNewCategory");
                    setCategoryData({
                      categoryName: "",
                      groupId: "",
                      prefixCode: "",
                      status: null,
                    });
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <label htmlFor="select2Basic" className="form-label">
                      Group
                    </label>
                    <div className="position-relative">
                      <CustomSelect
                        placeholder="Select Group"
                        options={groups.map((grp) => ({
                          value: grp.id,
                          label: grp.group_name,
                        }))}
                        value={categoryData?.group_id}
                        onChange={(opt) =>
                          setCategoryData({
                            ...categoryData,
                            group_id: opt,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-2">
                    <label htmlFor="nameSmall" className="form-label">
                      Category Name
                    </label>
                    <input
                      type="text"
                      id="nameSmall"
                      className="form-control"
                      placeholder="Enter Category Name"
                      value={categoryData?.category_name}
                      onChange={(e) =>
                        setCategoryData({
                          ...categoryData,
                          category_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-12 mb-2">
                    <label htmlFor="prefix" className="form-label">
                      Prefix Code
                    </label>
                    <input
                      type="text"
                      id="prefix"
                      className="form-control"
                      max="3"
                      placeholder="Enter Prefix Code"
                      value={categoryData?.prefix_code}
                      onChange={(e) =>
                        setCategoryData({
                          ...categoryData,
                          prefix_code: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-label-secondary waves-effect"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleClose("addNewCategory");
                    setCategoryData({
                      categoryName: "",
                      groupId: "",
                      prefixCode: "",
                      status: null,
                    });
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  onClick={handleSubmit}
                >
                  Save changes
                </button>
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
