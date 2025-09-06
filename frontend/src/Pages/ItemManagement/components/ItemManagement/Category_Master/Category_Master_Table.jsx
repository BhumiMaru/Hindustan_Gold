import React from "react";
import { useUIContext } from "../../../../../Context/UIContext";
import { useCategoryMaster } from "../../../../../Context/ItemManagement/CategoryMasterContext";

export default function Category_Master_Table() {
  const { handleOpen } = useUIContext();
  const { categories, startEditing, deleteCategory } = useCategoryMaster();
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
          {categories.map((category, index) => {
            return (
              <tr key={category.id}>
                <td>
                  <div className="ms-4">{index + 1}</div>
                </td>
                <td>{category.category_name}</td>
                <td>{category.group.group_name}</td>
                <td>{category.prefix_code}</td>
                <td>
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
                      onClick={() => deleteCategory(category.id)}
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
                    </button>
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
