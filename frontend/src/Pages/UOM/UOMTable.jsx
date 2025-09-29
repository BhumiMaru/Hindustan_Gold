import React from "react";
import { useUIContext } from "../../Context/UIContext";
import { useUOM } from "../../Context/UomContext";

export default function UOMTable() {
  const { pagination, uom, startEditing, DestroyUom } = useUOM();
  const { handleOpen } = useUIContext();
  return (
    <>
      {/* --------------START UOM TABLE------------------ */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-2">Sr#</div>
            </th>
            <th scope="col">UOM</th>
            <th scope="col" style={{ width: "180px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {uom.map((uom, index) => {
            return (
              <tr key={uom.id}>
                <td>
                  <div className="ms-2">
                    {" "}
                    {(pagination.currentPage - 1) * pagination.perPage +
                      (index + 1)}
                  </div>
                </td>
                <td>{uom.name}</td>
                <td>
                  <div className="d-inline-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#smallModal"
                      onClick={() => {
                        handleOpen("addNewUOM");
                        startEditing(uom.id, uom.name);
                      }}
                    >
                      <i className="icon-base ti tabler-edit icon-22px"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => DestroyUom(uom.id)}
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
      {/* --------------END UOM TABLE------------------ */}
    </>
  );
}
