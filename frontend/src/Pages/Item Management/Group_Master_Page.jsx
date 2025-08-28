import React from "react";
import Group_Master_List from "../../components/Item Management/Group_Master/Group_Master_List";
import { GroupMasterProvider } from "../../Context/Item Management/GroupMasterContext";

export default function Group_Master_Page() {
  return (
    <>
      {/* ---------------START GROUP MASTER [PAGE]------------------ */}
      <GroupMasterProvider>
        <Group_Master_List />
      </GroupMasterProvider>
      {/* ---------------END GROUP MASTER [PAGE]------------------ */}
    </>
  );
}
