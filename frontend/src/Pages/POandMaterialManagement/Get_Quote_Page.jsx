import React from "react";
import Get_Quote_List from "./components/POandMaterialManagement/Get_Quote/Get_Quote_List";
import { GetQuoteProvider } from "../../Context/PIAndPoManagement/GetQuote";
import { DepartmentProvider } from "../../Context/Master/DepartmentContext";
import { UserCreationProvider } from "../../Context/Master/UserCreationContext";

export default function Get_Quote_Page() {
  return (
    <>
      {/* -------------------START GET QUOTE PAGE------------------ */}
      <GetQuoteProvider>
        <DepartmentProvider>
          <UserCreationProvider>
            <Get_Quote_List />
          </UserCreationProvider>
        </DepartmentProvider>
      </GetQuoteProvider>
      {/* -------------------END GET QUOTE PAGE------------------ */}
    </>
  );
}
