import React from "react";
import PI_Item_Request_Form from "./components/POandMaterialManagement/PI_Item_Request/PI_Item_Request_Form";
import { ItemMasterProvider } from "../../Context/ItemManagement/ItemMasterContext";
import { PIRequestProvider } from "../../Context/PIAndPoManagement/PIRequestList";

export default function PI_Item_Request_Page() {
  return (
    <>
      {/* -----------------START PI ITEM REQUEST [PAGE]-------------------- */}
      <ItemMasterProvider>
        <PIRequestProvider>
          <PI_Item_Request_Form />
        </PIRequestProvider>
      </ItemMasterProvider>
      {/* -----------------END PI ITEM REQUEST [PAGE]-------------------- */}
    </>
  );
}
