import React from "react";
import { ServiceLocation3MasterProvider } from "../../Context/Master/ServiceLocation3MasterContext";
import { ServiceLocation2MasterProvider } from "../../Context/Master/ServiceLocation2MasterContext";
import { ServiceLocation1MasterProvider } from "../../Context/Master/ServiceLocation1MasterContext";
import ServiceLocation_3_Master_List from "./components/Master/Service_Location_3_Master/ServiceLocation_3_Master_List";

export default function ServiceLocation3MasterPage() {
  return (
    <>
      {/* ---------------START SERVICE LOCATION 3 MASTER [PAGE]----------------- */}
      <ServiceLocation3MasterProvider>
        <ServiceLocation2MasterProvider>
          <ServiceLocation1MasterProvider>
            <ServiceLocation_3_Master_List />
          </ServiceLocation1MasterProvider>
        </ServiceLocation2MasterProvider>
      </ServiceLocation3MasterProvider>
      {/* ---------------END SERVICE LOCATION 3 MASTER [PAGE]----------------- */}
    </>
  );
}
