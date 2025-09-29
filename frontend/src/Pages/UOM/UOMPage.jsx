import React from "react";
import UOMList from "./UOMList";
import { UOMProvider } from "../../Context/UomContext";

export default function UOMPage() {
  return (
    <>
      {/* ---------------start uom----------------- */}
      <UOMProvider>
        <UOMList />
      </UOMProvider>
      {/* ---------------end uom----------------- */}
    </>
  );
}
