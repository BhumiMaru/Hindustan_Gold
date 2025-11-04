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
              <td colSpan="11">
                <Loader />
              </td>
            </tr>
          ) : (
            filteredData.map((item, index) => {
              // console.log("item", item);
              return (
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
                        item.status === 1
                          ? "bg-label-success"
                          : "bg-label-danger"
                      }`}
                    >
                      {item?.status === 1 ? "Active" : "Deactive"}
                    </span>
                  </td>
                  {/* <td>
                  <div className="d-inline-flex gap-2">
                    <Link
                      to={`/item/item-create/${item.type}/${item.id}`}
                      onClick={() => {
                        StartEditing(item.id);
                        // console.log("id", item.id);
                      }}
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                    >
                      <i className="icon-base ti tabler-edit icon-22px" />
                    </Link>
                    <a
                      href="#"
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      onClick={() => deleteItemMaster(item.id)}
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-22px" />
                    </a>
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
                            onClick={() => handleEditClick(item)}
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
                            onClick={() => deleteItemMaster(item.id)}
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
      {/* -----------------END ITEM MASTER TABLE----------------- */}
    </>
  );
}
