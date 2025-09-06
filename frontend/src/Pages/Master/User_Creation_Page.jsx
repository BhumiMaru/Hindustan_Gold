import React from "react";
import User_Creation_List from "./components/Master/User_Creation/User_Creation_List";
import { UserCreationProvider } from "../../Context/Master/UserCreationContext";
import { RoleMasterProvider } from "../../Context/Master/RoleMasterContext";
import { DepartmentProvider } from "../../Context/Master/DepartmentContext";
import { ZoneProvider } from "../../Context/Master/ZoneContext";

export default function User_Creation_Page() {
  return (
    <>
      {/* -----------------START USER CREATION [PAGE]------------------- */}
      <UserCreationProvider>
        <RoleMasterProvider>
          <DepartmentProvider>
            <ZoneProvider>
              <User_Creation_List />
            </ZoneProvider>
          </DepartmentProvider>
        </RoleMasterProvider>
      </UserCreationProvider>
      {/* -----------------END USER CREATION [PAGE]------------------- */}
    </>
  );
}
