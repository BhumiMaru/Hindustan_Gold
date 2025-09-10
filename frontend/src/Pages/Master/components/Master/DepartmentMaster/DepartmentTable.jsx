import React from "react";
import { useDepartment } from "../../../../../Context/Master/DepartmentContext";
import { useUIContext } from "../../../../../Context/UIContext";

export default function DepartmentTable() {
  const { departments, startEdit, deleteDepartment, pagination } =
    useDepartment();
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
          {departments?.map((department, index) => {
            return (
              <tr key={department.id}>
                <td>
                  <div className="ms-2">
                    {(pagination.currentPage - 1) * pagination.perPage +
                      (index + 1)}
                  </div>
                </td>
                <td>{department.department_name}</td>

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
                          // key={user.id}
                          className="dropdown-item waves-effect"
                          onClick={() => {
                            startEdit(
                              department.id,
                              department.department_name
                            );
                            handleOpen("addNewDepartment");
                          }}
                        >
                          Edit
                        </button>

                        {/* <div className="dropdown-divider"></div> */}
                        <a
                          className="dropdown-item text-danger delete-record waves-effect"
                          onClick={() => {
                            deleteDepartment(department.id);
                          }}
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* ---------------------End DepartmentTable----------------------- */}
    </>
  );
}
