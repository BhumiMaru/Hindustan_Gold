import React from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useCategoryMaster } from "../../../../../Context/ItemManagement/CategoryMasterContext";
import Loader from "../../../../../components/Common/Loader/Loader";

export default function Category_Master_Table() {
  const { handleOpen } = useUIContext();
  const { categories, startEditing, deleteCategory, pagination, loading } =
    useCategoryMaster();
  return (
    <>
      {/* ---------------START CATEGORY MASTER TABLE----------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-2">Sr#</div>
            </th>
            <th scope="col">Category</th>
            <th scope="col">Group</th>
            <th scope="col">Prefix Code</th>
            <th scope="col" style={{ width: "180px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="11">
                <Loader />
              </td>
            </tr>
          ) : categories.length === 0 ? (
            <tr>
              <td colSpan="11" className="text-center py-5">
                <p className="mt-2 text-muted fw-semibold">No result found</p>
              </td>
            </tr>
          ) : (
            categories.map((category, index) => {
              return (
                <tr key={category?.id}>
                  <td>
                    <div className="ms-4">
                      {" "}
                      {(pagination.currentPage - 1) * pagination.perPage +
                        (index + 1)}
                    </div>
                  </td>
                  <td>{category?.category_name}</td>
                  <td>{category?.group?.group_name}</td>
                  <td>{category?.prefix_code}</td>
                  {/* <td>
                  <div className="d-inline-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#smallModal"
                      onClick={() => {
                        handleOpen("addNewCategory");
                        startEditing(category);
                      }}
                    >
                      <i className="icon-base ti tabler-edit icon-22px"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => deleteCategory(category?.id)}
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
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
                            className="dropdown-item waves-effect"
                            onClick={() => {
                              handleOpen("addNewCategory");
                              startEditing(category);
                            }}
                          >
                            Edit
                          </button>
                          {/* <a
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
                        </a> */}
                          {/* <div className="dropdown-divider"></div> */}
                          <a
                            className="dropdown-item text-danger delete-record waves-effect"
                            onClick={() => deleteCategory(category?.id)}
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {/* ---------------END CATEGORY MASTER TABLE----------------- */}
    </>
  );
}
