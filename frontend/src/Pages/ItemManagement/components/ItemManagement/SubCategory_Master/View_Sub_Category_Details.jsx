import React from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useSubCategory } from "../../../../../Context/ItemManagement/SubCategoryContext";

export default function View_Sub_Category_Details() {
  const { handleClose } = useUIContext();
  const { subCategoryData } = useSubCategory();
  return (
    <>
      {/* ------------START VIEW SUB CATEGORY DETAILS------------- */}
      <div
        className="modal fade show"
        id="smallModal"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        style={{ display: "block", paddingLeft: 0 }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose("viewSubCategory")}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <h5 className="modal-title mb-3" id="exampleModalLabel2">
                    View Detail
                  </h5>
                  <div className="row">
                    <div className="col-lg-4">
                      <label className="form-label">SubCategory Name</label>
                      <p>{subCategoryData.sub_category_name} </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Category Name</label>
                      <p>{subCategoryData?.category.category_name}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Group&nbsp;Name</label>
                      <p>{subCategoryData?.group.group_name}</p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Type</label>
                      <p>{subCategoryData.type} </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Prefix code</label>
                      <p>{subCategoryData.prefix_code} </p>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">SubCategory Owners </label>
                      <p>
                        {subCategoryData.owners.map((owner) => {
                          return (
                            <span key={owner?.user?.id}>
                              {owner?.user?.name}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {/* ------------END VIEW SUB CATEGORY DETAILS------------- */}
    </>
  );
}
