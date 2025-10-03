import React from "react";
import PO_List_List from "./components/POandMaterialManagement/PO_List/PO_List_List";
import { POProvider } from "../../Context/PIAndPoManagement/POCreate";
import { UserCreationProvider } from "../../Context/Master/UserCreationContext";

export default function PO_List_Page() {
  return (
    <>
      {/* --------------START PO LIST PAGE----------------- */}
      <POProvider>
        <UserCreationProvider>
          <PO_List_List />
        </UserCreationProvider>
      </POProvider>
      {/* --------------END PO LIST PAGE----------------- */}
    </>
  );
}
