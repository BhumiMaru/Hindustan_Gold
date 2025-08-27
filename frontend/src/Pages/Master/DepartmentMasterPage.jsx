import React from "react";
import DepartmentList from "../../components/Master/DepartmentMaster/DepartmentList";
import { DepartmentProvider } from "../../Context/Master/DepartmentContext";

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
