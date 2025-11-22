import React from "react";
import { useItemMaster } from "../../../../../Context/ItemManagement/ItemMasterContext";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../../../components/Common/Loader/Loader";

export default function Item_Master_Table({ search }) {
  const {
    itemMaster,
    deleteItemMaster,
    StartEditing,
    pagination,
    setItemMasterData,
    fetchItemSubCategoryById,
    getCategoryGroupAndItemCodeBySubCategoryId,
    loading,
  } = useItemMaster();
  const navigate = useNavigate();

  // Local filter on top of context data
  const filteredData = itemMaster.filter((item) => {
    const term = search.toLowerCase();
    return (
      item.item_name?.toLowerCase().includes(term) ||
      item.item_code?.toLowerCase().includes(term) ||
      item.type?.toLowerCase().includes(term) ||
      item?.category?.category_name?.toLowerCase().includes(term) ||
      item?.subcategory?.sub_category_name?.toLowerCase().includes(term)
    );
  });

  // console.log("itemMaster", itemMaster);

  const handleEditClick = async (item) => {
    // Fetch only subcategory
    navigate(`/item/item-create/${item.type}/${item.id}`);
    const subCategoryData = await fetchItemSubCategoryById(item.id);

    // Update only the sub_c_id in your state
    setItemMasterData((prev) => ({
      ...prev,
      sub_c_id: subCategoryData.sub_c_id,
      sub_c_name: subCategoryData.sub_c_name,
    }));

    // If needed, also update category/group/item code
    if (subCategoryData.sub_c_id && item.type) {
      await getCategoryGroupAndItemCodeBySubCategoryId(
        item.type,
        subCategoryData.sub_c_id
      );
    }
  };

  // console.log("filteredData", filteredData);

  return (
    <>
      {/* -----------------START ITEM MASTER TABLE----------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr className="align-items-center">
            <th scope="col" style={{ width: 80 }}>
              <div className="ms-4">Sr.#</div>
            </th>
            <th scope="col">Type</th>
            <th scope="col">Code</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Subcategory</th>
            <th scope="col">Stock</th>
            <th scope="col">Status</th>
            <th scope="col" style={{ width: 180 }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="11" className="text-center py-5">
                <Loader />
              </td>
            </tr>
          ) : filteredData.length === 0 ? (
            <tr>
              <td colSpan="11" className="text-center py-5">
                <p className="mt-2 text-muted fw-semibold">No items found</p>
              </td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={item?.id}>
                <td>
                  <div className="ms-4">
                    {(pagination?.currentPage - 1) * pagination?.perPage +
                      (index + 1)}
                  </div>
                </td>
                <td>{item?.type}</td>
                <td>{item?.item_code}</td>
                <td>{item?.item_name}</td>
                <td>{item?.category?.category_name}</td>
                <td>{item?.subcategory?.sub_category_name}</td>
                <td>{item?.stock}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === 1 ? "bg-label-success" : "bg-label-danger"
                    }`}
                  >
                    {item?.status === 1 ? "Active" : "Deactive"}
                  </span>
                </td>
                <td>
                  <div className="d-inline-flex gap-2">
                    <a
                      className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="icon-base ti tabler-dots-vertical icon-20px"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end m-0">
                      <button
                        className="dropdown-item waves-effect"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                      <a
                        className="dropdown-item text-danger delete-record waves-effect"
                        onClick={() => deleteItemMaster(item.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* -----------------END ITEM MASTER TABLE----------------- */}
    </>
  );
}
