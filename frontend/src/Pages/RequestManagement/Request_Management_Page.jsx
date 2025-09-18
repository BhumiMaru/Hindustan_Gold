import React from "react";
import Item_Request_List from "./components/RequestManagement/Item_Request/Item_Request_List";
import { ItemRequestProvider } from "../../Context/Request Management/Item_Request";

export default function Request_Management_Page() {
  return (
    <>
      {/* -----------------START REQUEST MANAGEMENT [PAGE]-------------------- */}
      <ItemRequestProvider>
        <Item_Request_List />
      </ItemRequestProvider>
      {/* -----------------END REQUEST MANAGEMENT [PAGE]-------------------- */}
    </>
  );
}
