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
                  "store_head Approval",
                  "Request History Report",
                ].includes(perm.type) &&
                ["add", "view", "approve"].includes(perm.permission)
            ) && (
              <div className="pt-5">
                {/* {userPermission.some(
                  (perm) =>
                    [
                      "Item Request",
                      "store_head Approval",
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
                      perm.type === "store_head Approval" &&
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
          {!isAdmin &&
            userPermission.some(
              (perm) =>
                [
                  "PI Request",
                  "Get Quotation",
                  "PO Generation",
                  "GRN",
                ].includes(perm.type) &&
                ["view", "add", "approve"].includes(perm.permission)
            ) && (
              <div className="pt-5">
                <h5
                  className="mb-3 fw-semibold text-uppercase"
                  style={{ color: "#6d6b77" }}
                >
                  PO & Material Management
                </h5>

                <div className="row g-6">
                  {[
                    {
                      title: "Total MY PI Request",
                      value: dashboardList?.pi_request?.my_pi_request,
                      type: "PI Request",
                      permission: "add",
                      icon: "tabler-clipboard",
                      color: "warning",
                    },
                    {
                      title: "Total Pending PI Request",
                      value: dashboardList?.pi_request?.pending_pi_request,
                      type: "PI Request",
                      permission: "add",
                      icon: "tabler-hourglass",
                      color: "primary",
                    },
                    {
                      title: "Total Pending PI Approval",
                      value: dashboardList?.pi_request?.pending_pi_approvels,
                      type: "PI Request",
                      permission: "approve",
                      icon: "tabler-checklist",
                      color: "success",
                    },
                    {
                      title: "Total Pending Get Quote",
                      value: dashboardList?.pi_request?.pending_get_approval,
                      type: "Get Quotation",
                      permission: "add",
                      icon: "tabler-quote",
                      color: "primary",
                    },
                    {
                      title: "Total Pending PO Generate",
                      value: dashboardList?.po_generate?.pending_po_generate,
                      type: "Get Quotation",
                      permission: "add",
                      icon: "tabler-file-plus",
                      color: "primary",
                    },
                    {
                      title: "Total In-Progress PO",
                      value: dashboardList?.po_generate?.total_running_po,
                      type: "GRN",
                      permission: "add",
                      icon: "tabler-progress",
                      color: "info",
                    },

                    {
                      title: "Total Pending PO Approval",
                      value: dashboardList?.po_generate?.pending_po_approvel,
                      type: "PO Generation",
                      permission: "approve",
                      icon: "tabler-clipboard-check",
                      color: "primary",
                    },
                    {
                      title: "Total GRN",
                      value: dashboardList?.po_generate?.pending_grn_generate,
                      type: "GRN",
                      permission: "add",
                      icon: "tabler-truck",
                      color: "warning",
                    },
                    {
                      title: "Total GRN Approvals",
                      value: dashboardList?.grn_approvel_total,
                      type: "GRN",
                      permission: "add",
                      icon: "tabler-clipboard-check",
                      color: "success",
                    },
                    {
                      title: "Total Pending GRN Approvals",
                      value: dashboardList?.po_generate?.pending_grn_approvel,
                      type: "PI Request",
                      permission: "add",
                      icon: "tabler-file-check",
                      color: "success",
                    },
                    {
                      title: "Total Vendor",
                      value: dashboardList?.po_generate?.total_active_vender,
                      type: "Get Quotation",
                      permission: "add",
                      icon: "tabler-users",
                      color: "warning",
                    },

                    // {
                    //   title: "Total Pending GRN Generate",
                    //   value: dashboardList?.po_generate?.pending_grn_generate,
                    //   type: "GRN",
                    //   permission: "add",
                    //   icon: "tabler-clipboard-x",
                    //   color: "success",
                    // },
                  ]
                    .filter((card) =>
                      userPermission.some(
                        (perm) =>
                          perm.type === card.type &&
                          perm.permission === card.permission
                      )
                    )
                    .map((card, idx) => (
                      <div key={idx} className="col-lg-3 col-sm-6">
                        {console.log("cc", card)}
                        <div
                          className={`card card-border-shadow-${card?.color} h-100`}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center mb-2">
                              <div className="avatar me-4">
                                <span
                                  className={`avatar-initial rounded bg-label-${card?.color}`}
                                  // style={{ color: card.color }}
                                >
                                  <i
                                    className={`icon-base ti ${card?.icon} icon-28px`}
                                  ></i>
                                </span>
                              </div>
                              <h4 className="mb-0">{card?.value}</h4>
                            </div>
                            <p className="mb-1">{card?.title}</p>
                          </div>
                        </div>
                      </div>
                    ))}
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

          {/* Item Request */}
          {!isAdmin &&
            userPermission.some(
              (perm) =>
                [
                  "Payment Request",
                  // "store_head Approval",
                  // "Request History Report",
                ].includes(perm.type) &&
                ["add", "view", "approve"].includes(perm.permission)
            ) && (
              <div className="pt-5">
                {/* {userPermission.some(
                  (perm) =>
                    [
                      "Item Request",
                      "store_head Approval",
                      "Request History Report",
                    ].includes(perm.type) &&
                    ["add", "view", "approve"].includes(perm.permission)
                ) && ( */}
                <h5
                  className="mb-3 fw-semibold text-uppercase"
                  style={{ color: "#6d6b77" }}
                >
                  Payment List
                </h5>
                {/* )} */}

                <div className="row g-6">
                  {/* Total My Request */}
                  {userPermission.some(
                    (perm) =>
                      perm.type === "Payment Request" &&
                      (perm.permission === "view" ||
                        perm.permission === "add" ||
                        perm.permission === "approve")
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
                          <p className="mb-1">Total Pending for Approvals</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Total Pending Request */}
                  {userPermission.some(
                    (perm) =>
                      perm.type === "Payment Request" &&
                      (perm.permission === "view" ||
                        perm.permission === "add" ||
                        perm.permission === "approve")
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
                          <p className="mb-1">Total Pending for Pay</p>
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
                      perm.type === "store_head Approval" &&
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
        </div>
      </>
      {/* -------------------------------END DASHBOARD--------------------------------- */}
    </>
  );
}
