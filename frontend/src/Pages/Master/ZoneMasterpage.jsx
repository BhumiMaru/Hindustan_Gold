import React from "react";
import ZoneList from "./components/Master/Zone_Master/ZoneList";
import { ZoneProvider } from "../../Context/Master/ZoneContext";

export default function ZoneMasterpage() {
  return (
    <>
      {/* -------------------Start Zone Master [Page]---------------------- */}
      <ZoneProvider>
        <ZoneList />
      </ZoneProvider>
      {/* -------------------End Zone Master [Page]---------------------- */}
    </>
  );
}
