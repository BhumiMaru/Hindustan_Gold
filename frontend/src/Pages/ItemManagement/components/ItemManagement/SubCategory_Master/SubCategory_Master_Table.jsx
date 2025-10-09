import React from "react";
import { useSubCategory } from "../../../../../Context/ItemManagement/SubCategoryContext";
import { useUIContext } from "../../../../../Context/UIContext";
import View_Sub_Cat_Owners_Name from "./View_Sub_Cat_Owners_Name";

export default function SubCategory_Master_Table() {
  const {
    subCategory,
    StartEditing,
    deleteSubCategory,
    pagination,
    setSubCategoryData,
  } = useSubCategory();
  const { handleOpen, modal } = useUIContext();
  return (
    <>
      {/* ---------------START CATEGORY MASTER TABLE----------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-4">Sr#</div>
            </th>
            <th scope="col">Subcategory</th>
            <th scope="col">Category</th>
            <th scope="col">Group</th>
            <th scope="col">Type</th>
            <th scope="col">Prefix Code</th>
            <th scope="col">Sub Category Owners</th>
            <th scope="col" style={{ width: "180px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {subCategory.map((subCat, index) => {
            return (
              <tr key={subCat?.id}>
                <td>
                  <div className="ms-4">
                    {" "}
                    {(pagination.currentPage - 1) * pagination.perPage +
                      (index + 1)}
                  </div>
                </td>

                <td>{subCat?.sub_category_name}</td>
                <td>{subCat?.category?.category_name}</td>
                <td>{subCat?.group?.group_name}</td>
                <td>{subCat?.type}</td>
                <td>{subCat?.prefix_code}</td>
                <td>
                  {/* {subCat?.owners?.map((owner, i) => (
                    <span key={owner.id}>
                      {owner?.user?.name}
                      {i < subCat.owners.length - 1 && ", "}
                    </span>
                  ))} */}
                  <span>{subCat?.owners[0]?.user?.name}</span>

                  {subCat?.owners?.length > 1 && (
                    <span>
                      <a
                        href="#"
                        type="button"
                        className="btn btn-text-info rounded-pill btn-icon waves-effect"
                        data-bs-toggle="modal"
                        data-bs-target="#smallModal"
                        onClick={() => {
                          handleOpen("viewSubCatOwnersName");
                          setSubCategoryData(subCat);
                        }}
                      >
                        <i className="icon-base ti tabler-eye text-info icon-18px" />
                      </a>
                    </span>
                  )}
                </td>

                {/* <td>
                  <div className="d-inline-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#smallModal"
                      onClick={() => {
                        handleOpen("addNewSubCategory");
                        StartEditing(subCat.id, subCat);
                      }}
                    >
                      <i className="icon-base ti tabler-edit icon-22px"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => deleteSubCategory(subCat.id)}
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-text-info rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#smallModal"
                      onClick={() => {
                        handleOpen("viewSubCategory");
                        setSubCategoryData(subCat);
                      }}
                    >
                      <i className="icon-base ti tabler-eye text-info icon-22px" />
                    </button>
                  </div>
                </td> */}

                <td>
                  <div className="d-inline-flex gap-2">
                    <a
                      className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="icon-base ti tabler-dots-vertical icon-20px"></i>
                    </a>
                    <div className="d-inline-block">
                      <div className="dropdown-menu dropdown-menu-end m-0">
                        <button
                          key={subCat.id}
                          className="dropdown-item waves-effect"
                          onClick={() => {
                            handleOpen("addNewSubCategory");
                            StartEditing(subCat.id, subCat);
                          }}
                        >
                          Edit
                        </button>

                        <a
                          href="#"
                          className="dropdown-item waves-effect"
                          data-bs-toggle="modal"
                          data-bs-target="#grnCreateModel"
                          onClick={() => {
                            handleOpen("viewSubCategory");
                            setSubCategoryData(subCat);
                          }}
                        >
                          View
                        </a>
                        <div className="dropdown-divider"></div>
                        <a
                          className="dropdown-item text-danger delete-record waves-effect"
                          onClick={() => deleteSubCategory(subCat.id)}
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ---------------END CATEGORY MASTER TABLE----------------- */}
    </>
  );
}
