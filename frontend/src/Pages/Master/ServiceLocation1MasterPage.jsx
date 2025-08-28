import React from "react";
import ServiceLocation_1_Master_List from "../../components/Master/Service_Location_1_Master/ServiceLocation_1_Master_List";
import { ServiceLocation1MasterProvider } from "../../Context/Master/ServiceLocation1MasterContext";

export default function ServiceLocation1MasterPage() {
  return (
    <>
      {/* ---------------START SERVICE LOCATION 1 MASTER [PAGE]----------------- */}
      <ServiceLocation1MasterProvider>
        <ServiceLocation_1_Master_List />
      </ServiceLocation1MasterProvider>
      {/* ---------------END SERVICE LOCATION 1 MASTER [PAGE]----------------- */}
    </>
  );
}
