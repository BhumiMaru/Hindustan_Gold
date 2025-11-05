import React from "react";

export default function DashboardCard({ title, value, icon, color }) {
  {
    /* // Define color map for consistent styling */
  }
  const colorMap = {
    primary: "#6610f2",
    success: "#198754",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#0dcaf0",
    secondary: "#6c757d",
    lightsuccess: "#28c76f",
  };

  const mainColor = colorMap[color];
  return (
    <>
      {/* -------------------------START DASHBOARD CARD------------------------- */}
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
              <h4 className="mb-0">{dashboardList?.po_generate?.po_pending}</h4>
            </div>
            <p className="mb-1">Total Pending PI Approval</p>
          </div>
        </div>
      </div>
      {/* -------------------------END DASHBOARD CARD------------------------- */}
    </>
  );
}
