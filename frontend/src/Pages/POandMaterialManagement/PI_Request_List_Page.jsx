import React from "react";
import PI_Request_List from "./components/POandMaterialManagement/PI Request List/PI_Request_List";
import { PIRequestProvider } from "../../Context/PIAndPoManagement/PIRequestList";
import { ItemMasterProvider } from "../../Context/ItemManagement/ItemMasterContext";
import { ItemRequestProvider } from "../../Context/Request Management/Item_Request";
import { DepartmentProvider } from "../../Context/Master/DepartmentContext";
import { UserCreationProvider } from "../../Context/Master/UserCreationContext";
import { GetQuoteProvider } from "../../Context/PIAndPoManagement/GetQuote";

export default function PI_Request_List_Page() {
  return (
    <>
      {/* ---------------------START PI REQUEST LIST PAGE------------------------- */}
      <ItemRequestProvider>
        <DepartmentProvider>
          <UserCreationProvider>
            <ItemMasterProvider>
              <PIRequestProvider>
                <GetQuoteProvider>
                  <PI_Request_List />
                </GetQuoteProvider>
              </PIRequestProvider>
            </ItemMasterProvider>
          </UserCreationProvider>
        </DepartmentProvider>
      </ItemRequestProvider>
      {/* ---------------------END PI REQUEST LIST PAGE------------------------- */}
    </>
  );
}
