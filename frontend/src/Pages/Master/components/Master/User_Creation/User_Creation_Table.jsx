import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";
import { useUIContext } from "../../../../../Context/UIContext";
import Loader from "../../../../../components/Common/Loader/Loader";
import { decryptData } from "../../../../../utils/decryptData";
import { encryptData } from "../../../../../utils/encryptData";
const fileUrl = import.meta.env.VITE_FILE_URL;
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function User_Creation_Table() {
  const navigate = useNavigate();
  const { handleOpen } = useUIContext();
  const {
    userCreations,
    deleteUser,
    startEditing,
    pagination,
    setUserCreationData,
    loading,
  } = useUserCreation();
  // console.log("userCreations", userCreations);
  // console.log("userCreations", userCreations);
  // Derived filtered list
  // Derived filtered list
  // const filteredUsers = userCreations.filter((user) => {
  //   const s = (search || "").toLowerCase().trim(); // safe string always

  //   // if no search → just return all (backend already filtered by role/zone/dept/status)
  //   if (!s) return true;
  //   console.log(s);

  //   const name = (user?.name || "").toLowerCase();
  //   const email = (user?.email || "").toLowerCase();
  //   const mobileno = (user?.mobileno || "").toLowerCase();
  //   const employeeId = (user?.employee_id || "").toLowerCase();
  //   const role = (user?.role?.role_name || "").toLowerCase();
  //   const department = (user?.department?.department_name || "").toLowerCase();
  //   const zone = (user?.zone?.zone_name || "").toLowerCase();
  //   const registerDate = (user?.register_date || "").toLowerCase();

  //   // status text for search (Active / Deactive)
  //   const statusText = user.status === 1 ? "active" : "deactive";
  //   console.log(statusText);

  //   return (
  //     name.includes(s) ||
  //     email.includes(s) ||
  //     mobileno.includes(s) ||
  //     employeeId.includes(s) ||
  //     role.includes(s) ||
  //     department.includes(s) ||
  //     zone.includes(s) ||
  //     statusText.includes(s) ||
  //     registerDate.includes(s)
  //   );
  // });

  // console.log("sss", search);
  // console.log("filteredUsers", filteredUsers);

  const handleEditClick = (user) => {
    console.log("user", user);
    startEditing(user.id); // set edit data in context
    const encryptId = encryptData(user.id);
    navigate(`/super_admin/master/user-create/${encryptId}`); // then navigate
  };

  return (
    <>
      {/* -------------------START USER CREATION TABLE--------------------- */}
      <table className="table datatables-basic align-middle">
        <thead>
          <tr className="align-items-center">
            <th scope="col" style={{ width: "80px" }}>
              <div className="ms-4">SR#</div>
            </th>
            <th scope="col">Name</th>
            <th scope="col">Employee&nbsp;ID</th>
            <th scope="col">Email&nbsp;ID</th>
            <th scope="col">Department</th>
            <th scope="col">Registration Date</th>
            <th scope="col">Status</th>
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
          ) : userCreations.length === 0 ? (
            <tr>
              <td colSpan="11" className="text-center py-5">
                <p className="mt-2 text-muted fw-semibold">No items found</p>
              </td>
            </tr>
          ) : (
            userCreations?.map((user, index) => {
              return (
                <tr key={user.id}>
                  {console.log(user)}
                  <td>
                    <div className="ms-4">
                      {(pagination.currentPage - 1) * pagination.perPage +
                        (index + 1)}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start align-items-center user-name">
                      <div className="avatar-wrapper">
                        <div className="avatar me-2">
                          <img
                            src={
                              user.profile_photo_url
                                ? user.profile_photo_url
                                : `${publicUrl}/assets/img/avatars/user.png`
                            }
                            alt={user.name}
                            className="rounded-circle"
                          />
                          {console.log(
                            `${publicUrl}assets/img/avatars/user.png`
                          )}
                          {/* to={`${fileUrl}/storage/uploads/invoices/${invoiceDetail.invoice_file}`} */}
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="emp_name text-truncate text-heading fw-medium">
                          {user.name}
                        </span>
                        <small className="emp_post text-truncate">
                          {user?.role?.role_name}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>{user.employee_id}</td>
                  <td>{user.email}</td>
                  <td>
                    <div
                      className="d-flex align-items-center"
                      style={{ marginRight: "10px" }}
                    >
                      <div>
                        <div
                          style={{
                            borderRadius: "100%",
                            backgroundColor: user?.zone?.color_code,
                            padding: "6px",
                            width: "2px",
                          }}
                        ></div>
                      </div>
                      &nbsp;{user?.department?.department_name}
                    </div>
                  </td>
                  <td>{user.register_date}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === 1
                          ? "bg-label-success"
                          : "bg-label-danger"
                      }`}
                    >
                      {/* {console.log(typeof user.status)} */}
                      {user.status === 1 ? "Active" : "Deactive"}
                    </span>
                  </td>
                  <td>
                    {/* <div className="d-inline-flex gap-2">
                    <a
                      href="user-create.html"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                    >
                      <i className="icon-base ti tabler-edit icon-22px"></i>
                    </a>
                    <Link
                      to="/user-permission"
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                    >
                      <i className="icon-base ti tabler-article text-info icon-22px"></i>
                    </Link>
                    <Link
                      to={`/user-permission/${user.id}`}
                      type="button"
                      className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                    >
                      <i className="icon-base ti tabler-article text-info icon-22px"></i>
                    </Link>
                  </div> */}
                    <div className="d-inline-flex gap-2">
                      <a
                        className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="icon-base ti tabler-dots-vertical icon-20px"></i>
                      </a>
                      <div className="d-inline-block">
                        <div
                          className="dropdown-menu dropdown-menu-end m-0"
                          style={{}}
                        >
                          <button
                            key={user.id}
                            className="dropdown-item waves-effect"
                            onClick={() => {
                              handleEditClick(user); // set context
                            }}
                          >
                            Edit
                          </button>

                          <a
                            href="#"
                            className="dropdown-item waves-effect"
                            data-bs-toggle="modal"
                            data-bs-target="#grnCreateModel"
                            onClick={() => {
                              handleOpen("viewUserDetails");
                              setUserCreationData(user);
                            }}
                          >
                            View
                          </a>
                          <div className="dropdown-divider"></div>
                          <a
                            className="dropdown-item text-danger delete-record waves-effect"
                            onClick={() => deleteUser(user.id)}
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

          {/* <tr>
            <td>
              <div className="ms-4">2</div>
            </td>
            <td>HP_000002</td>
            <td>
              <div className="d-flex justify-content-start align-items-center user-name">
                <div className="avatar-wrapper">
                  <div className="avatar me-2">
                    <span className="avatar-initial rounded-circle bg-label-success">
                      RP
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <span className="emp_name text-truncate text-heading fw-medium">
                    Reina Peckett
                  </span>
                  <small className="emp_post text-truncate">
                    Quality Control Specialist
                  </small>
                </div>
              </div>
            </td>
            <td>EMP000002</td>
            <td>abeslier2n@zimbio.com</td>
            <td>
              <div className="d-flex">
                <div>
                  <div
                    style={{
                      borderRadius: "100%",
                      backgroundColor: "red",
                      padding: "8px",
                      width: "2px",
                    }}
                  ></div>
                </div>
                &nbsp;Marketing
              </div>
            </td>
            <td>20-08-2025</td>
            <td>
              <span className="badge bg-label-danger">Deactive</span>
            </td>
            <td>
              <div className="d-inline-flex gap-2">
                <Link
                  to="/user-permission"
                  type="button"
                  className="btn btn-text-secondary rounded-pill btn-icon waves-effect"
                >
                  <i className="icon-base ti tabler-article text-info icon-22px"></i>
                </Link>
              </div>
              <div className="d-inline-flex gap-2">
                <a
                  href="javascript:;"
                  className="btn btn-icon btn-text-secondary waves-effect rounded-pill dropdown-toggle hide-arrow"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="icon-base ti tabler-dots-vertical icon-20px"></i>
                </a>
                <div className="d-inline-block">
                  <div
                    className="dropdown-menu dropdown-menu-end m-0"
                    style={{}}
                  >
                    <a
                      href="user-create.html"
                      className="dropdown-item waves-effect"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="dropdown-item waves-effect"
                      data-bs-toggle="modal"
                      data-bs-target="#grnCreateModel"
                    >
                      View
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      href="javascript:;"
                      className="dropdown-item text-danger delete-record waves-effect"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr> */}
        </tbody>
      </table>
      {/* -------------------END USER CREATION TABLE--------------------- */}
    </>
  );
}
