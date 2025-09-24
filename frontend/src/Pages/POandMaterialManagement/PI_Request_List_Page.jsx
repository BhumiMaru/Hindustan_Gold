import React from "react";
import PI_Request_List from "./components/POandMaterialManagement/PI Request List/PI_Request_List";
import { PIRequestProvider } from "../../Context/PIAndPoManagement/PIRequestList";
import { ItemMasterProvider } from "../../Context/ItemManagement/ItemMasterContext";

export default function PI_Request_List_Page() {
  return (
    <>
      {/* ---------------------START PI REQUEST LIST PAGE------------------------- */}
      <PIRequestProvider>
        <ItemMasterProvider>
          <PI_Request_List />
        </ItemMasterProvider>
      </PIRequestProvider>
      {/* ---------------------END PI REQUEST LIST PAGE------------------------- */}
    </>
  );
}
