import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserCreation } from "../../../../../Context/Master/UserCreationContext";

export default function User_Creation_Permission() {
  const { id } = useParams();
  const {
    fetchUserPermission,
    userPermission,
    createUserPermission,
    useCreationData,
    fetchUserById,
  } = useUserCreation();

  useEffect(() => {
    if (id) {
      fetchUserById(id);
      fetchUserPermission(id);
    }
  }, [id]);

  // Handle checkbox change
  const handlePermissionChange = async (module_name, type, permission, e) => {
    const isChecked = e.target.checked;

    await createUserPermission({
      user_id: Number(id),
      role_id: useCreationData?.role_id ?? 0,
      module_name,
      type,
      permission,
      status: isChecked ? 1 : 0,
    });

    // ✅ ensure UI updates with latest backend data
    await fetchUserPermission(id);
  };

  return (
    <>
      {/* ----------------START USER CREATION PERMISSION------------------- */}
      <style>
        {`
   .form-check-input:checked[type=checkbox] {
  --bs-form-check-bg-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='17' viewBox='0 0 15 14' fill='none'%3E%3Cpath d='M3.41667 7L6.33333 9.91667L12.1667 4.08333' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}

.form-check-input:checked {
  border-color: #ffab1d;      /* ✅ no quotes */
  background-color: #ffab1d;  /* ✅ no quotes */
  box-shadow: 0 0 0 0.25rem rgba(255, 171, 29, 0.25);
}

.form-check-input[type=checkbox] {
  border-radius: 0.267em;
}

}
    `}
      </style>
      {/* DataTable with Buttons */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-6">
            <div className="card-body">
              {/* Item Management Module */}
              <h5 className="card-title mb-4">Item Management Module</h5>
              <div className="card shadow-none mb-6 border-0">
                <div className="table-responsive border border-top-0 rounded">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-nowrap w-50">Type</th>
                        <th className="text-nowrap text-center w-px-50"></th>
                        <th className="text-nowrap text-center w-px-50"></th>
                        <th className="text-nowrap text-center w-px-50"></th>
                        <th className="text-nowrap text-center w-px-50">
                          {" "}
                          All Rights
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Material Code
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_1"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_2"
                              defaultChecked=""
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_2"
                              defaultChecked=""
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_2"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "Item Management Module" &&
                                    p.type === "Material Code" &&
                                    p.permission === "allrights"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Item Management Module",
                                  "Material Code",
                                  "allrights",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Service Code
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_4"
                              defaultChecked=""
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_5"
                              defaultChecked=""
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_5"
                              defaultChecked=""
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_5"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "Item Management Module" &&
                                    p.type === "Service Code" &&
                                    p.permission === "allrights"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Item Management Module",
                                  "Service Code",
                                  "allrights",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="border-transparent">
                        <td className="text-nowrap text-heading">Asset Code</td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_7"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_8"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center invisible">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_8"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_8"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "Item Management Module" &&
                                    p.type === "Asset Code" &&
                                    p.permission === "allrights"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Item Management Module",
                                  "Asset Code",
                                  "allrights",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Item Request Module */}
              <h5 className="card-title mb-4">Item Request Module</h5>
              <div className="card shadow-none mb-6 border-0">
                <div className="table-responsive border border-top-0 rounded">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-nowrap w-50">Type</th>
                        <th className="text-nowrap text-center w-px-50">
                          View
                        </th>
                        <th className="text-nowrap text-center w-px-50">
                          Add/Edit
                        </th>
                        <th className="text-nowrap text-center w-px-50">
                          Delete
                        </th>
                        <th className="text-nowrap text-center w-px-50">
                          Approval
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Item Request
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              id="defaultCheck_cust_1"
                              type="checkbox"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name === "Item Request Module" &&
                                    p.type === "Item Request" &&
                                    p.permission === "view"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Item Request Module",
                                  "Item Request",
                                  "view",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_2"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name === "Item Request Module" &&
                                    p.type === "Item Request" &&
                                    p.permission === "add_edit"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Item Request Module",
                                  "Item Request",
                                  "add_edit",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_2"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name === "Item Request Module" &&
                                    p.type === "Item Request" &&
                                    p.permission === "delete"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Item Request Module",
                                  "Item Request",
                                  "delete",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Material Approval
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_4"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name === "Item Request Module" &&
                                    p.type === "Material Approval" &&
                                    p.permission === "view"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Item Request Module",
                                  "Material Approval",
                                  "view",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_4"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name === "Item Request Module" &&
                                    p.type === "Material Approval" &&
                                    p.permission === "approve"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Item Request Module",
                                  "Material Approval",
                                  "approve",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="border-transparent">
                        <td className="text-nowrap text-heading">
                          Request History Report
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_7"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name === "Item Request Module" &&
                                    p.type === "Request History Report" &&
                                    p.permission === "view"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Item Request Module",
                                  "Request History Report",
                                  "view",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PO & Material Management Module */}
              <h5 className="card-title mb-4">
                PO &amp; Material Management Module
              </h5>
              <div className="card shadow-none mb-6 border-0">
                <div className="table-responsive border border-top-0 rounded">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-nowrap w-50">Type</th>
                        <th className="text-nowrap text-center w-px-50">
                          View
                        </th>
                        <th className="text-nowrap text-center w-px-50">
                          Add/Generate
                        </th>
                        <th className="text-nowrap text-center w-px-50">
                          Edit
                        </th>
                        <th className="text-nowrap text-center w-px-50">
                          Delete
                        </th>
                        <th className="text-nowrap text-center w-px-50">
                          Approve
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-nowrap text-heading">PI Request</td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_1"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "PI Request" &&
                                    p.permission === "view"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "PI Request",
                                  "view",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_2"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "PI Request" &&
                                    p.permission === "add"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "PI Request",
                                  "add",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td></td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_2"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "PI Request" &&
                                    p.permission === "delete"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "PI Request",
                                  "delete",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_2"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "PI Request" &&
                                    p.permission === "approve"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "PI Request",
                                  "approve",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Get Quotation
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_4"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "Get Quotation" &&
                                    p.permission === "view"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "Get Quotation",
                                  "view",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_5"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "Get Quotation" &&
                                    p.permission === "add"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "Get Quotation",
                                  "add",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_5"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "Get Quotation" &&
                                    p.permission === "edit"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "Get Quotation",
                                  "edit",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_5"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "Get Quotation" &&
                                    p.permission === "delete"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "Get Quotation",
                                  "delete",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className="text-nowrap text-heading">
                          PO Generation
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_7"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "PO Generation" &&
                                    p.permission === "view"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "PO Generation",
                                  "view",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_8"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "PO Generation" &&
                                    p.permission === "add"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "PO Generation",
                                  "add",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_8"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "PO Generation" &&
                                    p.permission === "approve"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "PO Generation",
                                  "approve",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-nowrap text-heading">GRN</td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_7"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "GRN" &&
                                    p.permission === "view"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "GRN",
                                  "view",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_8"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "GRN" &&
                                    p.permission === "add"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "GRN",
                                  "add",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td></td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_8"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "GRN" &&
                                    p.permission === "delete"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "GRN",
                                  "delete",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td></td>
                      </tr>
                      <tr className="border-transparent">
                        <td className="text-nowrap text-heading">
                          Invoice Entry
                        </td>
                        <td></td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_8"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "Invoice Entry" &&
                                    p.permission === "add"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "Invoice Entry",
                                  "add",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_8"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "Invoice Entry" &&
                                    p.permission === "edit"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "Invoice Entry",
                                  "edit",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_8"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "PO & Material Management Module" &&
                                    p.type === "Invoice Entry" &&
                                    p.permission === "delete"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "PO & Material Management Module",
                                  "Invoice Entry",
                                  "delete",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Payment Management Module */}
              <h5 className="card-title mb-4">Payment Management Module</h5>
              <div className="card shadow-none mb-6 border-0">
                <div className="table-responsive border border-top-0 rounded">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-nowrap w-50">Type</th>
                        <th className="text-nowrap text-center w-px-50">
                          View
                        </th>
                        <th className="text-nowrap text-center w-px-50">Add</th>
                        <th className="text-nowrap text-center w-px-50">
                          Approve
                        </th>
                        <th className="text-nowrap text-center w-px-50">
                          Download
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Pending Payment Vendor List
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_1"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "Payment Management Module" &&
                                    p.type === "Pending Payment Vendor List" &&
                                    p.permission === "view"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Payment Management Module",
                                  "Pending Payment Vendor List",
                                  "view",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Payment Request
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_4"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "Payment Management Module" &&
                                    p.type === "Payment Request" &&
                                    p.permission === "view"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Payment Management Module",
                                  "Payment Request",
                                  "view",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_5"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "Payment Management Module" &&
                                    p.type === "Payment Request" &&
                                    p.permission === "add"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Payment Management Module",
                                  "Payment Request",
                                  "add",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Payment Approval
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_8"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "Payment Management Module" &&
                                    p.type === "Payment Approval" &&
                                    p.permission === "approve"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Payment Management Module",
                                  "Payment Approval",
                                  "approve",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className="text-nowrap text-heading">
                          Vendor Payment History
                        </td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_7"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "Payment Management Module" &&
                                    p.type === "Vendor Payment History" &&
                                    p.permission === "view"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Payment Management Module",
                                  "Vendor Payment History",
                                  "view",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                          <div className="form-check d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck_cust_8"
                              checked={
                                !!userPermission?.some(
                                  (p) =>
                                    String(p.user_id) === String(id) && // normalize ID comparison
                                    p.module_name ===
                                      "Payment Management Module" &&
                                    p.type === "Vendor Payment History" &&
                                    p.permission === "download"
                                )
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  "Payment Management Module",
                                  "Vendor Payment History",
                                  "download",
                                  e
                                )
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------END USER CREATION PERMISSION------------------- */}
    </>
  );
}
