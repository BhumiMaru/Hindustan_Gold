import React from "react";
import Get_Quote_List from "./components/POandMaterialManagement/Get_Quote/Get_Quote_List";
import { GetQuoteProvider } from "../../Context/PIAndPoManagement/GetQuote";

export default function Get_Quote_Page() {
  return (
    <>
      {/* -------------------START GET QUOTE PAGE------------------ */}
      <GetQuoteProvider>
        <Get_Quote_List />
      </GetQuoteProvider>
      {/* -------------------END GET QUOTE PAGE------------------ */}
    </>
  );
}
