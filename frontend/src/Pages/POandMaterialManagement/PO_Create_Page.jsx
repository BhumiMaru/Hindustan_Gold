import React from "react";
import PO_Create from "./components/POandMaterialManagement/PO_Create/PO_Create";
import { POProvider } from "../../Context/PIAndPoManagement/POCreate";

export default function PO_Create_Page() {
  return (
    <>
      {/* -------------START PO CREATE [PAGE]----------------- */}
      <POProvider>
        <PO_Create />
      </POProvider>
      {/* -------------END PO CREATE [PAGE]----------------- */}
    </>
  );
}
