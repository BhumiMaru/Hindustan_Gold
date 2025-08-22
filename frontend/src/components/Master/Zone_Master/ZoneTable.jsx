import React from "react";

export default function ZoneTable() {
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
          <tr>
            <td>
              <div className="ms-2">1</div>
            </td>
            <td>RED</td>
            <td>
              <div
                style={{
                  borderRadius: "100%",
                  backgroundColor: "red",
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
                >
                  <i className="icon-base ti tabler-edit icon-22px"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ms-2">2</div>
            </td>
            <td>GREEN</td>
            <td>
              <div
                style={{
                  borderRadius: "100%",
                  backgroundColor: "#34a521",
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
                >
                  <i className="icon-base ti tabler-edit icon-22px"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ms-2">3</div>
            </td>
            <td>YELLO</td>
            <td>
              <div
                style={{
                  borderRadius: "100%",
                  backgroundColor: "#ffe600",
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
                >
                  <i className="icon-base ti tabler-edit icon-22px"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="ms-2">3</div>
            </td>
            <td> UNDEFINE</td>
            <td>
              <div
                style={{
                  borderRadius: "100%",
                  backgroundColor: "#000000",
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
                >
                  <i className="icon-base ti tabler-edit icon-22px"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* -----------------END ZONE TABLE------------------ */}
    </>
  );
}
