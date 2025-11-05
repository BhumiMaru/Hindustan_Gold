import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import { useParams } from "react-router-dom";
import { DashboardProvider } from "../../Context/Dashboard/DashboardContext";

export default function DashboardPage() {
  // const { data } = useParams();
  // console.log("dash", data);
  return (
    <>
      {/* ------------------START DASHBOARD [PAGE]-------------------- */}
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
      {/* ------------------END DASHBOARD [PAGE]-------------------- */}
    </>
  );
}
