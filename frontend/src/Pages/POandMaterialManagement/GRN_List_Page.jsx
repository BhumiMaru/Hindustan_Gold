import React from "react";
import GRN_List_List from "./components/POandMaterialManagement/GRN_List/GRN_List_List";
import { GRNProvider } from "../../Context/PIAndPoManagement/GRN";

export default function GRN_List_Page() {
  return (
    <>
      {/* -------------------START GRN LIST PAGE------------------ */}
      <GRNProvider>
        <GRN_List_List />
      </GRNProvider>
      {/* -------------------END GRN LIST PAGE------------------ */}
    </>
  );
}
