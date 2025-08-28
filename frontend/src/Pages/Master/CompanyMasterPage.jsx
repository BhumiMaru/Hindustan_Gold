import React from "react";
import Company_Master_List from "../../components/Master/Company_Master/Company_Master_List";
import { CompanyMasterProvider } from "../../Context/Master/CompanyMasterContext";

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
