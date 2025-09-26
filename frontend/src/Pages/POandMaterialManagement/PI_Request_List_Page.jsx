import React from "react";
import PI_Request_List from "./components/POandMaterialManagement/PI Request List/PI_Request_List";
import { PIRequestProvider } from "../../Context/PIAndPoManagement/PIRequestList";
import { ItemMasterProvider } from "../../Context/ItemManagement/ItemMasterContext";
import { ItemRequestProvider } from "../../Context/Request Management/Item_Request";
import { DepartmentProvider } from "../../Context/Master/DepartmentContext";
import { UserCreationProvider } from "../../Context/Master/UserCreationContext";

export default function PI_Request_List_Page() {
  return (
    <>
      {/* ---------------------START PI REQUEST LIST PAGE------------------------- */}
      <ItemRequestProvider>
        <DepartmentProvider>
          <UserCreationProvider>
            <ItemMasterProvider>
              <PIRequestProvider>
                <PI_Request_List />
              </PIRequestProvider>
            </ItemMasterProvider>
          </UserCreationProvider>
        </DepartmentProvider>
      </ItemRequestProvider>
      {/* ---------------------END PI REQUEST LIST PAGE------------------------- */}
    </>
  );
}
