import React from "react";
import { useZone } from "../../../../../Context/Master/ZoneContext";
import { useUIContext } from "../../../../../Context/UIContext";

export default function ZoneTable() {
  const { handleOpen } = useUIContext();
  const { zones, deleteZone, startEdit } = useZone();
  return (
    <>
      {/* -----------------START ZONE TABLE------------------ */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-2">Sr#</div>
            </th>
            <th scope="col">Zone</th>
            <th scope="col">color</th>
            <th scope="col" style={{ width: "180px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone, index) => {
            return (
              <tr key={zone.id}>
                <td>
                  <div className="ms-2">{index + 1}</div>
                </td>
                <td>{zone.zone_name}</td>
                <td>
                  <div
                    style={{
                      borderRadius: "100%",
                      backgroundColor: zone.color_code,
                      padding: "6px",
                      width: "2px",
                    }}
                  ></div>
                </td>
                <td>
                  <div className="d-inline-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#smallModal"
                      onClick={() => {
                        startEdit(zone);
                        handleOpen("addNewZone");
                      }}
                    >
                      <i className="icon-base ti tabler-edit icon-22px"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => deleteZone(zone.id)}
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
      {/* -----------------END ZONE TABLE------------------ */}
    </>
  );
}
