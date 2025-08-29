import React from "react";
import ServiceLocation_2_Master_List from "../../components/Master/Service_Location_2_Master/ServiceLocation_2_Master_List";
import { ServiceLocation1MasterProvider } from "../../Context/Master/ServiceLocation1MasterContext";
import { ServiceLocation2MasterProvider } from "../../Context/Master/ServiceLocation2MasterContext";

export default function ServiceLocation2MasterPage() {
  return (
    <>
      {/* ---------------START SERVICE LOCATION 2 MASTER [PAGE]----------------- */}
      <ServiceLocation1MasterProvider>
        <ServiceLocation2MasterProvider>
          <ServiceLocation_2_Master_List />
        </ServiceLocation2MasterProvider>
      </ServiceLocation1MasterProvider>
      {/* ---------------END SERVICE LOCATION 2 MASTER [PAGE]----------------- */}
    </>
  );
}
