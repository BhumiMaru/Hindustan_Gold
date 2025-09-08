import React from "react";
import { CompanyMasterProvider } from "../../Context/Master/CompanyMasterContext";
import Company_Master_List from "./components/Master/Company_Master/Company_Master_List";

export default function CompanyMasterPage() {
  return (
    <>
      {/* --------------------START COMPANY MASTER [PAGE]----------------------- */}
      <CompanyMasterProvider>
        <Company_Master_List />
      </CompanyMasterProvider>
      {/* --------------------END COMPANY MASTER [PAGE]----------------------- */}
    </>
  );
}
