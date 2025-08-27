import React from "react";
import { useDepartment } from "../../../Context/Master/DepartmentContext";
import { useUIContext } from "../../../Context/UIContext";

export default function DepartmentTable() {
  const { departments, startEdit, deleteDepartment } = useDepartment();
  const { handleOpen } = useUIContext();

  return (
    <>
      {/* ---------------------Start DepartmentTable----------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-2">Sr#</div>
            </th>
            <th scope="col">Department</th>
            <th scope="col" style={{ width: "180px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {departments?.data?.data.map((department, index) => {
            return (
              <tr key={department.id}>
                <td>
                  <div className="ms-2">{index + 1}</div>
                </td>
                <td>{department.department_name}</td>
                <td>
                  <div className="d-inline-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#smallModal"
                      onClick={() => {
                        startEdit(department.id, department.department_name);
                        handleOpen("addNewDepartment");
                      }}
                    >
                      <i className="icon-base ti tabler-edit icon-22px"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => {
                        deleteDepartment(department.id);
                      }}
                    >
                      <i className="icon-base ti tabler-trash text-danger icon-22px"></i>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}

          {/* <tr>
            <td>
              <div className="ms-2">2</div>
            </td>
            <td>Marketing</td>
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
            <td>Information Technology (IT)</td>
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
          </tr> */}
        </tbody>
      </table>
      {/* ---------------------End DepartmentTable----------------------- */}
    </>
  );
}
