import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import { useParams } from "react-router-dom";

export default function DashboardPage() {
  // const { data } = useParams();
  // console.log("dash", data);
  return (
    <>
      {/* ------------------START DASHBOARD [PAGE]-------------------- */}
      <Dashboard />
      {/* ------------------END DASHBOARD [PAGE]-------------------- */}
    </>
  );
}
