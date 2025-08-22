import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage";
import DepartmentMasterPage from "../Pages/Master/DepartmentMasterPage";
import ZoneMasterpage from "../Pages/Master/ZoneMasterpAGE";
import ServiceLocation1MasterPage from "../Pages/Master/ServiceLocation1MasterPage";
import ServiceLocation2MasterPage from "../Pages/Master/ServiceLocation2MasterPage";

export default function AppRoutes() {
  return (
    <>
      {/* ------------------Start App Routes------------------- */}
      <Routes>
        {/* Default redirect */}
        {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Master Routes */}
        <Route path="/master/department" element={<DepartmentMasterPage />} />
        <Route path="/master/zone" element={<ZoneMasterpage />} />
        <Route
          path="/master/service-location-1"
          element={<ServiceLocation1MasterPage />}
        />
        <Route
          path="/master/service-location-2"
          element={<ServiceLocation2MasterPage />}
        />
        {/* Catch all (404) */}
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>
          }
        />
      </Routes>
      {/* ------------------End App Routes------------------- */}
    </>
  );
}
