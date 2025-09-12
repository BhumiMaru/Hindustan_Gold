import React from "react";
import { useItemMaster } from "../../../../../Context/ItemManagement/ItemMasterContext";
import { Link } from "react-router-dom";

export default function Item_Master_Table({ search }) {
  const { itemMaster, deleteItemMaster, StartEditing } = useItemMaster();

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
            <th scope="col">Quantity</th>
            <th scope="col">Status</th>
            <th scope="col" style={{ width: 180 }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>
                  <div className="ms-4">{index + 1}</div>
                </td>
                <td>{item.type}</td>
                <td>{item.item_code}</td>
                <td>{item.item_name}</td>
                <td>{item?.category?.category_name}</td>
                <td>{item?.subcategory?.sub_category_name}</td>
                <td>{item.stock_value}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === 1 ? "bg-label-success" : "bg-label-danger"
                    }`}
                  >
                    {item.status === 1 ? "Active" : "Deactive"}
                  </span>
                </td>
                <td>
                  <div className="d-inline-flex gap-2">
                    <Link
                      to={`/item/item-create/${item.type}/${item.id}`}
                      onClick={() => {
                        StartEditing(item.id);
                        console.log("id", item.id);
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* -----------------END ITEM MASTER TABLE----------------- */}
    </>
  );
}
