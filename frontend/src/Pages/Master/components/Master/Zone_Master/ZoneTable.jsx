import React from "react";
import { useZone } from "../../../../../Context/Master/ZoneContext";
import { useUIContext } from "../../../../../Context/UIContext";
import Loader from "../../../../../components/Common/Loader/Loader";

export default function ZoneTable() {
  const { handleOpen } = useUIContext();
  const { zones, deleteZone, startEdit, pagination, loading } = useZone();
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
          {loading ? (
            <tr>
              <td colSpan="11">
                <Loader />
              </td>
            </tr>
          ) : (
            zones.map((zone, index) => {
              return (
                <tr key={zone.id}>
                  <td>
                    <div className="ms-2">
                      {" "}
                      {(pagination.currentPage - 1) * pagination.perPage +
                        (index + 1)}
                    </div>
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
                    <div
                      className={`d-inline-flex gap-2 ${
                        zone.id === 2 ? "d-none" : ""
                      }`}
                    >
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
                            // key={user.id}
                            className="dropdown-item waves-effect"
                            onClick={() => {
                              startEdit(zone);
                              handleOpen("addNewZone");
                            }}
                          >
                            Edit
                          </button>

                          {/* <div className="dropdown-divider"></div> */}
                          <a
                            className="dropdown-item text-danger delete-record waves-effect"
                            onClick={() => deleteZone(zone.id)}
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
      {/* -----------------END ZONE TABLE------------------ */}
    </>
  );
}
