import React, { useEffect } from "react";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;
import { useDashboard } from "../../../../Context/Dashboard/DashboardContext";
import { useUserCreation } from "../../../../Context/Master/UserCreationContext";
import { decryptData } from "../../../../utils/decryptData";

export default function Dashboard() {
  const { getDashboardList, dashboardList } = useDashboard();
  const { userPermission, fetchUserPermission } = useUserCreation();

  useEffect(() => {
    getDashboardList();
  }, []);

  const getAuthData = sessionStorage.getItem("authData");
  const decryptAuthData = decryptData(getAuthData);
  const user = decryptAuthData?.user;

  console.log("user ", user);

  useEffect(() => {
    fetchUserPermission(user?.id);
  }, [user?.id]);

  console.log("userPermission", userPermission);

  // ✅ Check if current user is Admin (id === 54)
  const isAdmin = user?.id === 56;

  console.log("DashboardList", dashboardList);

  return (
    <>
      {/* -------------------------------STRAT DASHBOARD--------------------------------- */}
      <>
        <link
          rel="stylesheet"
          href={`${publicUrl}assets/vendor/css/core.css`}
        />
        <link
          rel="stylesheet"
          href={`${publicUrl}assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css`}
        />
        <div className="container-xxl flex-grow-1 container-p-y">
          {isAdmin && (
            <div className="row g-6">
              {/* Card Border Shadow */}
              {/* Total Department */}
              <div className="col-lg-3 col-sm-6">
                <div className="card card-border-shadow-primary h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <div className="avatar me-4">
                        <span className="avatar-initial rounded bg-label-primary">
                          <i className="icon-base ti tabler-truck icon-28px"></i>
                        </span>
                      </div>
                      <h4 className="mb-0">
                        {dashboardList?.master_count?.total_department}
                      </h4>
                    </div>
                    <p className="mb-1">Total Department</p>
                    {/* <!--  <p className="mb-0">
                                        <span className="text-heading fw-medium me-2">+18.2%</span>
                                        <small className="text-body-secondary">than last week</small>
                                      </p>--> */}
                  </div>
                </div>
              </div>
              {/* Total Zone */}
              <div className="col-lg-3 col-sm-6">
                <div className="card card-border-shadow-warning h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <div className="avatar me-4">
                        <span className="avatar-initial rounded bg-label-warning">
                          <i className="icon-base ti tabler-alert-triangle icon-28px"></i>
                        </span>
                      </div>
                      <h4 className="mb-0">
                        {dashboardList?.master_count?.total_zone}
                      </h4>
                    </div>
                    <p className="mb-1">Total Zone</p>
                    {/* <!-- <p className="mb-0">
                                       <span className="text-heading fw-medium me-2">-8.7%</span>
                                       <small className="text-body-secondary">than last week</small>
                                     </p>--> */}
                  </div>
                </div>
              </div>
              {/* Total Service Location */}
              <div className="col-lg-3 col-sm-6">
                <div className="card card-border-shadow-danger h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <div className="avatar me-4">
                        <span className="avatar-initial rounded bg-label-danger">
                          <i className="icon-base ti tabler-git-fork icon-28px"></i>
                        </span>
                      </div>
                      <h4 className="mb-0">
                        {dashboardList?.master_count?.total_services_location_3}
                      </h4>
                    </div>
                    <p className="mb-1">Total Service Location</p>
                    {/* <!-- <p className="mb-0">
                                       <span className="text-heading fw-medium me-2">+4.3%</span>
                                       <small className="text-body-secondary">than last week</small>
                                     </p>--> */}
                  </div>
                </div>
              </div>
              {/* Total User */}
              <div className="col-lg-3 col-sm-6">
                <div className="card card-border-shadow-info h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <div className="avatar me-4">
                        <span className="avatar-initial rounded bg-label-info">
                          <i className="icon-base ti tabler-clock icon-28px"></i>
                        </span>
                      </div>
                      <h4 className="mb-0">
                        {dashboardList?.master_count?.total_user}
                      </h4>
                    </div>
                    <p className="mb-1">Total User</p>
                    {/* <!--<p className="mb-0">
                                      <span className="text-heading fw-medium me-2">-2.5%</span>
                                      <small className="text-body-secondary">than last week</small>
                                    </p>--> */}
                  </div>
                </div>
              </div>
              {/*/ Card Border Shadow */}
            </div>
          )}

          {/* Item Management */}
          {!isAdmin &&
            userPermission.some(
              (perm) =>
                perm.type == "Material Code" ||
                perm.type == "Service Code" ||
                perm.type == "Asset Code" ||
                perm.permission == "allrights"
            ) && (
              <div className="pt-5">
                <h5
                  className="mb-3 fw-semibold text-uppercase"
                  style={{ color: "#6d6b77" }}
                >
                  Item Management
                </h5>

                <div className="row g-6">
                  {/*  Total Item */}

                  {(() => {
                    const hasMaterial = userPermission.some(
                      (perm) =>
                        perm.type === "Material Code" &&
                        perm.permission === "allrights"
                    );
                    const hasService = userPermission.some(
                      (perm) =>
                        perm.type === "Service Code" &&
                        perm.permission === "allrights"
                    );
                    const hasAsset = userPermission.some(
                      (perm) =>
                        perm.type === "Asset Code" &&
                        perm.permission === "allrights"
                    );

                    // ✅ Show card only if user has ALL THREE permissions
                    if (hasMaterial && hasService && hasAsset) {
                      return (
                        <div className="col-lg-3 col-sm-6">
                          <div className="card card-border-shadow-primary h-100">
                            <div className="card-body">
                              <div className="d-flex align-items-center mb-2">
                                <div className="avatar me-4">
                                  <span className="avatar-initial rounded bg-label-primary">
                                    <i className="icon-base ti tabler-package icon-28px"></i>
                                  </span>
                                </div>
                                <h4 className="mb-0">
                                  {dashboardList?.item_count?.item_count}
                                </h4>
                              </div>
                              <p className="mb-1">Total Item</p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {/*  Total Material */}
                  {userPermission.some(
                    (perm) =>
                      perm.type == "Material Code" &&
                      perm.permission == "allrights"
                  ) && (
                    <div className="col-lg-3 col-sm-6">
                      <div className="card card-border-shadow-light-success h-100">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <div className="avatar me-4">
                              <span className="avatar-initial rounded bg-label-lightsuccess">
                                <i className="icon-base ti tabler-tools icon-28px"></i>
                              </span>
                            </div>
                            <h4 className="mb-0">
                              {dashboardList?.item_count?.total_material}
                            </h4>
                          </div>
                          <p className="mb-1">Total Material</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/*  Total Service */}
                  {userPermission.some(
                    (perm) =>
                      perm.type == "Service Code" &&
                      perm.permission == "allrights"
                  ) && (
                    <div className="col-lg-3 col-sm-6">
                      <div className="card card-border-shadow-info h-100">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <div className="avatar me-4">
                              <span className="avatar-initial rounded bg-label-info">
                                <i className="icon-base ti tabler-briefcase icon-28px"></i>
                              </span>
                            </div>
                            <h4 className="mb-0">
                              {dashboardList?.item_count?.total_service}
                            </h4>
                          </div>
                          <p className="mb-1">Total Service</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/*  Total Asset */}
                  {userPermission.some(
                    (perm) =>
                      perm.type === "Asset Code" &&
                      perm.permission === "allrights"
                  ) && (
                    <div className="col-lg-3 col-sm-6">
                      <div className="card card-border-shadow-warning h-100">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <div className="avatar me-4">
                              <span className="avatar-initial rounded bg-label-warning">
                                <i className="icon-base ti tabler-building icon-28px"></i>
                              </span>
                            </div>
                            <h4 className="mb-0">
                              {dashboardList?.item_count?.total_asset}
                            </h4>
                          </div>
                          <p className="mb-1">Total Asset</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* Item Request */}
          {!isAdmin &&
            userPermission.some(
              (perm) =>
                [
                  "Item Request",
                  "Material Approval",
                  "Request History Report",
                ].includes(perm.type) &&
                ["add", "view", "approve"].includes(perm.permission)
            ) && (
              <div className="pt-5">
                {/* {userPermission.some(
                  (perm) =>
                    [
                      "Item Request",
                      "Material Approval",
                      "Request History Report",
                    ].includes(perm.type) &&
                    ["add", "view", "approve"].includes(perm.permission)
                ) && ( */}
                <h5
                  className="mb-3 fw-semibold text-uppercase"
                  style={{ color: "#6d6b77" }}
                >
                  Item Request
                </h5>
                {/* )} */}

                <div className="row g-6">
                  {/* Total My Request */}
                  {userPermission.some(
                    (perm) =>
                      perm.type === "Item Request" && perm.permission === "add"
                  ) && (
                    <div className="col-lg-3 col-sm-6">
                      <div className="card card-border-shadow-primary h-100">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <div className="avatar me-4">
                              <span className="avatar-initial rounded bg-label-primary">
                                <i className="icon-base ti tabler-clipboard icon-28px"></i>
                              </span>
                            </div>
                            <h4 className="mb-0">
                              {dashboardList?.item_request?.my_request}
                            </h4>
                          </div>
                          <p className="mb-1">Total My Request</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Total Pending Request */}
                  {userPermission.some(
                    (perm) =>
                      perm.type === "Item Request" && perm.permission === "view"
                  ) && (
                    <div className="col-lg-3 col-sm-6">
                      <div className="card card-border-shadow-warning h-100">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <div className="avatar me-4">
                              <span className="avatar-initial rounded bg-label-warning">
                                <i className="icon-base ti tabler-hourglass icon-28px"></i>
                              </span>
                            </div>
                            <h4 className="mb-0">
                              {dashboardList?.item_request?.pending}
                            </h4>
                          </div>
                          <p className="mb-1">Total Pending Request</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Total Pending Approval Request */}
                  {userPermission.some(
                    (perm) =>
                      perm.type === "Item Request" &&
                      perm.permission === "approve"
                  ) && (
                    <div className="col-lg-3 col-sm-6">
                      <div className="card card-border-shadow-success h-100">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <div className="avatar me-4">
                              <span className="avatar-initial rounded bg-label-success">
                                <i className="icon-base ti tabler-circle-check icon-28px"></i>
                              </span>
                            </div>
                            <h4 className="mb-0">
                              {dashboardList?.item_request?.approve}
                            </h4>
                          </div>
                          <p className="mb-1">Total Pending Approval Request</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Total Pending Handover Approval */}
                  {userPermission.some(
                    (perm) =>
                      perm.type === "Material Approval" &&
                      perm.permission === "approve"
                  ) && (
                    <div className="col-lg-3 col-sm-6">
                      <div className="card card-border-shadow-success h-100">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <div className="avatar me-4">
                              <span className="avatar-initial rounded bg-label-success">
                                <i className="icon-base ti tabler-circle-check icon-28px"></i>
                              </span>
                            </div>
                            <h4 className="mb-0">
                              {dashboardList?.item_request?.handover_approve ??
                                0}
                            </h4>
                          </div>
                          <p className="mb-1">
                            Total Pending Handover Approval
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* Po Generate */}
          {!isAdmin && (
            <div className="pt-5">
              <h5
                className="mb-3 fw-semibold text-uppercase"
                style={{ color: "#6d6b77" }}
              >
                PO Generate
              </h5>

              {/* <div className="row g-6">
                Total PO Pending
                <div className="col-lg-3 col-sm-6">
                  <div className="card card-border-shadow-primary h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-2">
                        <div className="avatar me-4">
                          <span className="avatar-initial rounded bg-label-primary">
                            <i className="icon-base ti tabler-clipboard icon-28px"></i>
                          </span>
                        </div>
                        <h4 className="mb-0">
                          {dashboardList?.po_generate?.po_pending}
                        </h4>
                      </div>
                      <p className="mb-1">Total PO Pending</p>
                    </div>
                  </div>
                </div>

                Total Pending GRN Generate
                <div className="col-lg-3 col-sm-6">
                  <div className="card card-border-shadow-warning h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-2">
                        <div className="avatar me-4">
                          <span className="avatar-initial rounded bg-label-warning">
                            <i className="icon-base ti tabler-hourglass icon-28px"></i>
                          </span>
                        </div>
                        <h4 className="mb-0">
                          {dashboardList?.po_generate?.pending_grn_generate}
                        </h4>
                      </div>
                      <p className="mb-1">Total Pending GRN Generate</p>
                    </div>
                  </div>
                </div>

                Total PO Generate Pending
                <div className="col-lg-3 col-sm-6">
                  <div className="card card-border-shadow-success h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-2">
                        <div className="avatar me-4">
                          <span className="avatar-initial rounded bg-label-success">
                            <i className="icon-base ti tabler-circle-check icon-28px"></i>
                          </span>
                        </div>
                        <h4 className="mb-0">
                          {dashboardList?.po_generate?.po_generate_pending}
                        </h4>
                      </div>
                      <p className="mb-1">Total PO Generate Pending</p>
                    </div>
                  </div>
                </div>

                Total Po GRN
                <div className="col-lg-3 col-sm-6">
                  <div className="card card-border-shadow-success h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-2">
                        <div className="avatar me-4">
                          <span className="avatar-initial rounded bg-label-success">
                            <i className="icon-base ti tabler-circle-check icon-28px"></i>
                          </span>
                        </div>
                        <h4 className="mb-0">{dashboardList?.po_grn_total}</h4>
                      </div>
                      <p className="mb-1">Total PO GRN</p>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="row g-6">
                {/* Total MY PI Request */}

                {userPermission.some(
                  (perm) =>
                    perm.type === "PI Request" && perm.permission === "add"
                ) && (
                  <div className="col-lg-3 col-sm-6">
                    <div className="card card-border-shadow-primary h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <div className="avatar me-4">
                            <span
                              className="avatar-initial rounded"
                              style={{
                                color: "#4e73df",
                              }}
                            >
                              <i className="icon-base ti tabler-clipboard icon-28px"></i>
                            </span>
                          </div>
                          <h4 className="mb-0">
                            {dashboardList?.po_generate?.po_pending}
                          </h4>
                        </div>
                        <p className="mb-1">Total MY PI Request</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Pending PI Request */}
                {userPermission.some(
                  (perm) =>
                    perm.type === "PI Request" && perm.permission === "add"
                ) && (
                  <div className="col-lg-3 col-sm-6">
                    <div className="card card-border-shadow-primary h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <div className="avatar me-4">
                            <span
                              className="avatar-initial rounded"
                              style={{
                                color: "#36b9cc",
                              }}
                            >
                              <i className="icon-base ti tabler-hourglass icon-28px"></i>
                            </span>
                          </div>
                          <h4 className="mb-0">
                            {dashboardList?.po_generate?.po_pending}
                          </h4>
                        </div>
                        <p className="mb-1">Total Pending PI Request</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Pending GRN Approvals */}
                {userPermission.some(
                  (perm) =>
                    perm.type === "PI Request" && perm.permission === "add"
                ) && (
                  <div className="col-lg-3 col-sm-6">
                    <div className="card card-border-shadow-primary h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <div className="avatar me-4">
                            <span
                              className="avatar-initial rounded"
                              style={{
                                color: "#f6c23e",
                              }}
                            >
                              <i className="icon-base ti tabler-file-check icon-28px"></i>
                            </span>
                          </div>
                          <h4 className="mb-0">
                            {dashboardList?.po_generate?.po_pending}
                          </h4>
                        </div>
                        <p className="mb-1">Total Pending GRN Approvals</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Pending Get Quote */}
                {userPermission.some(
                  (perm) =>
                    perm.type === "Get Quotation" && perm.permission === "add"
                ) && (
                  <div className="col-lg-3 col-sm-6">
                    <div className="card card-border-shadow-primary h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <div className="avatar me-4">
                            <span
                              className="avatar-initial rounded"
                              style={{
                                color: "#1cc88a",
                              }}
                            >
                              <i className="icon-base ti tabler-quote icon-28px"></i>
                            </span>
                          </div>
                          <h4 className="mb-0">
                            {dashboardList?.po_generate?.po_pending}
                          </h4>
                        </div>
                        <p className="mb-1">Total Pending Get Quote</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Pending PO Generate */}
                {userPermission.some(
                  (perm) =>
                    perm.type === "Get Quotation" && perm.permission === "add"
                ) && (
                  <div className="col-lg-3 col-sm-6">
                    <div className="card card-border-shadow-primary h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <div className="avatar me-4">
                            <span
                              className="avatar-initial rounded"
                              style={{
                                color: "#fd7e14",
                              }}
                            >
                              <i className="icon-base ti tabler-file-plus icon-28px"></i>
                            </span>
                          </div>
                          <h4 className="mb-0">
                            {dashboardList?.po_generate?.po_pending}
                          </h4>
                        </div>
                        <p className="mb-1">Total Pending PO Generate</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Vendor */}
                {userPermission.some(
                  (perm) =>
                    perm.type === "Get Quotation" && perm.permission === "add"
                ) && (
                  <div className="col-lg-3 col-sm-6">
                    <div className="card card-border-shadow-primary h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <div className="avatar me-4">
                            <span
                              className="avatar-initial rounded"
                              style={{
                                color: "#6610f2",
                              }}
                            >
                              <i className="icon-base ti tabler-users icon-28px"></i>
                            </span>
                          </div>
                          <h4 className="mb-0">
                            {dashboardList?.po_generate?.po_pending}
                          </h4>
                        </div>
                        <p className="mb-1">Total Vendor</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Pending PI Approval */}
                {userPermission.some(
                  (perm) =>
                    perm.type === "PI Request" && perm.permission === "approve"
                ) && (
                  <div className="col-lg-3 col-sm-6">
                    <div className="card card-border-shadow-primary h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <div className="avatar me-4">
                            <span
                              className="avatar-initial rounded"
                              style={{
                                color: "#20c997",
                              }}
                            >
                              <i className="icon-base ti tabler-checklist icon-28px"></i>
                            </span>
                          </div>
                          <h4 className="mb-0">
                            {dashboardList?.po_generate?.po_pending}
                          </h4>
                        </div>
                        <p className="mb-1">Total Pending PI Approval</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Pending PO Approval */}
                {userPermission.some(
                  (perm) =>
                    perm.type === "PO Generation" &&
                    perm.permission === "approve"
                ) && (
                  <div className="col-lg-3 col-sm-6">
                    <div className="card card-border-shadow-primary h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <div className="avatar me-4">
                            <span
                              className="avatar-initial rounded"
                              style={{
                                color: "#dc3545",
                              }}
                            >
                              <i className="icon-base ti tabler-clipboard-check icon-28px"></i>
                            </span>
                          </div>
                          <h4 className="mb-0">
                            {dashboardList?.po_generate?.po_pending}
                          </h4>
                        </div>
                        <p className="mb-1">Total Pending PO Approval</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total GRN */}
                {userPermission.some(
                  (perm) => perm.type === "GRN" && perm.permission === "add"
                ) && (
                  <div className="col-lg-3 col-sm-6">
                    <div className="card card-border-shadow-primary h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <div className="avatar me-4">
                            <span
                              className="avatar-initial rounded"
                              style={{
                                color: "#198754",
                              }}
                            >
                              <i className="icon-base ti tabler-truck icon-28px"></i>
                            </span>
                          </div>
                          <h4 className="mb-0">
                            {dashboardList?.po_generate?.po_pending}
                          </h4>
                        </div>
                        <p className="mb-1">Total GRN</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Running/continue InProgress PO */}
                {userPermission.some(
                  (perm) => perm.type === "GRN" && perm.permission === "add"
                ) && (
                  <div className="col-lg-3 col-sm-6">
                    <div className="card card-border-shadow-primary h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <div className="avatar me-4">
                            <span
                              className="avatar-initial rounded"
                              style={{
                                color: "#0dcaf0",
                              }}
                            >
                              <i className="icon-base ti tabler-progress icon-28px"></i>
                            </span>
                          </div>
                          <h4 className="mb-0">
                            {dashboardList?.po_generate?.po_pending}
                          </h4>
                        </div>
                        <p className="mb-1">Total In-Progress PO</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Pending GRN Approval */}
                {userPermission.some(
                  (perm) => perm.type === "GRN" && perm.permission === "add"
                ) && (
                  <div className="col-lg-3 col-sm-6">
                    <div className="card card-border-shadow-primary h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <div className="avatar me-4">
                            <span
                              className="avatar-initial rounded"
                              style={{
                                color: "#6f42c1",
                              }}
                            >
                              <i className="icon-base ti tabler-clipboard-x icon-28px"></i>
                            </span>
                          </div>
                          <h4 className="mb-0">
                            {dashboardList?.po_generate?.po_pending}
                          </h4>
                        </div>
                        <p className="mb-1">Total Pending GRN Approval</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Po Generate */}
          {/* {!isAdmin && (
            <div className="pt-5">
              <h5
                className="mb-3 fw-semibold text-uppercase"
                style={{ color: "#6d6b77" }}
              >
                Po GRN total
              </h5>
              <div className="row g-6">
                {[
                  {
                    title: "Total PO GRN",
                    value: dashboardList?.po_grn_total,
                    color: "primary",
                    icon: "tabler-clipboard",
                  },
                ].map((card, index) => (
                  <div key={index} className="col-lg-3 col-sm-6">
                    <div
                      className={`card card-border-shadow-${card.color} h-100`}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <div className="avatar me-4">
                            <span
                              className={`avatar-initial rounded bg-label-${card.color}`}
                            >
                              <i
                                className={`icon-base ti ${card.icon} icon-28px`}
                              ></i>
                            </span>
                          </div>
                          <h4 className="mb-0">{card.value}</h4>
                        </div>
                        <p className="mb-1">{card.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </>
      {/* -------------------------------END DASHBOARD--------------------------------- */}
    </>
  );
}
