import React from "react";
import { useUIContext } from "../../Context/UIContext";
import { useUOM } from "../../Context/UomContext";
import Loader from "../../components/Common/Loader/Loader";

export default function UOMTable() {
  const { pagination, uom, startEditing, DestroyUom, loading } = useUOM();
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
          {loading ? (
            <tr>
              <td colSpan="11">
                <Loader />
              </td>
            </tr>
          ) : (
            uom.map((uom, index) => {
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
                    {/* <div className="d-inline-flex gap-2">
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
                  </div> */}

                    <div className="d-inline-flex gap-2">
                      <a
                        className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                        aria-expanded="true"
                      >
                        <i className="icon-base ti tabler-dots-vertical icon-20px" />
                      </a>
                      <div className="d-inline-block">
                        <div
                          className="dropdown-menu dropdown-menu-end m-0"
                          style={{
                            position: "absolute",
                            inset: "auto 0px 0px auto",
                            margin: 0,
                            transform: "translate(-24px, -136px)",
                          }}
                          data-popper-placement="top-end"
                        >
                          <button
                            // key={user.id}
                            className="dropdown-item waves-effect"
                            onClick={() => {
                              handleOpen("addNewUOM");
                              startEditing(uom.id, uom.name);
                            }}
                          >
                            Edit
                          </button>

                          <div className="dropdown-divider" />
                          <a
                            className="dropdown-item text-danger delete-record waves-effect"
                            onClick={() => DestroyUom(uom.id)}
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
      {/* --------------END UOM TABLE------------------ */}
    </>
  );
}
