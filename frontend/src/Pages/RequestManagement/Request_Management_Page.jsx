import React from "react";
import Item_Request_List from "./components/RequestManagement/Item_Request/Item_Request_List";
import { ItemRequestProvider } from "../../Context/Request Management/Item_Request";
import { PIRequestProvider } from "../../Context/PIAndPoManagement/PIRequestList";

export default function Request_Management_Page() {
  return (
    <>
      {/* -----------------START REQUEST MANAGEMENT [PAGE]-------------------- */}
      <PIRequestProvider>
        <ItemRequestProvider>
          <Item_Request_List />
        </ItemRequestProvider>
      </PIRequestProvider>
      {/* -----------------END REQUEST MANAGEMENT [PAGE]-------------------- */}
    </>
  );
}
