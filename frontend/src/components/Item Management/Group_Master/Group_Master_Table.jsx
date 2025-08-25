import React from "react";

export default function Group_Master_Table() {
  return (
    <>
      {/* -------------------START GROUP MASTER TABLE---------------------- */}
      <table class="table datatables-basic align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              <div class="ms-2">Sr#</div>
            </th>
            <th scope="col">Group</th>
            <th scope="col" style={{ width: "180px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="ms-2">1</div>
            </td>
            <td>Group 1</td>
            <td>
              <div class="d-inline-flex gap-2">
                <button
                  type="button"
                  class="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#smallModal"
                >
                  <i class="icon-base ti tabler-edit icon-22px"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <i class="icon-base ti tabler-trash text-danger icon-22px"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="ms-2">2</div>
            </td>
            <td>Group 2</td>
            <td>
              <div class="d-inline-flex gap-2">
                <button
                  type="button"
                  class="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#smallModal"
                >
                  <i class="icon-base ti tabler-edit icon-22px"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <i class="icon-base ti tabler-trash text-danger icon-22px"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="ms-2">3</div>
            </td>
            <td>Group 3</td>
            <td>
              <div class="d-inline-flex gap-2">
                <button
                  type="button"
                  class="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#smallModal"
                >
                  <i class="icon-base ti tabler-edit icon-22px"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <i class="icon-base ti tabler-trash text-danger icon-22px"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* -------------------END GROUP MASTER TABLE---------------------- */}
    </>
  );
}
