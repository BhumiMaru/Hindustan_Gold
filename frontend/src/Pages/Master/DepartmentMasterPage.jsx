import React from "react";
import { DepartmentProvider } from "../../Context/Master/DepartmentContext";
import DepartmentList from "./components/Master/DepartmentMaster/DepartmentList";

export default function DepartmentMasterPage() {
  return (
    <>
      {/* -----------------Start Department Master Page-------------------- */}
      <DepartmentProvider>
        <DepartmentList />
      </DepartmentProvider>
      {/* -----------------End Department Master Page-------------------- */}
    </>
  );
}
