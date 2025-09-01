import React from "react";
import User_Creation_List from "../../components/Master/User_Creation/User_Creation_List";
import { UserCreationProvider } from "../../Context/Master/UserCreationContext";

export default function User_Creation_Page() {
  return (
    <>
      {/* -----------------START USER CREATION [PAGE]------------------- */}
      <UserCreationProvider>
        <User_Creation_List />
      </UserCreationProvider>
      {/* -----------------END USER CREATION [PAGE]------------------- */}
    </>
  );
}
