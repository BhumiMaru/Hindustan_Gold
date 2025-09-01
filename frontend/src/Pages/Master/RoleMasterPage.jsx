import React from "react";
import Role_Master_List from "../../components/Master/Role_Master/Role_Master_List";
import { RoleMasterProvider } from "../../Context/Master/RoleMasterContext";

export default function RoleMasterPage() {
  return (
    <>
      {/* -----------------START ROLE MASTER [PAGE]------------------ */}
      <RoleMasterProvider>
        <Role_Master_List />
      </RoleMasterProvider>
      {/* -----------------END ROLE MASTER [PAGE]------------------ */}
    </>
  );
}
