import React from "react";
import PO_List_List from "./components/POandMaterialManagement/PO_List/PO_List_List";
import { POProvider } from "../../Context/PIAndPoManagement/POCreate";
import { UserCreationProvider } from "../../Context/Master/UserCreationContext";
import { ItemRequestProvider } from "../../Context/Request Management/Item_Request";
import { VendorProvider } from "../../Context/PaymentManagement/Vendor";

export default function PO_List_Page() {
  return (
    <>
      {/* --------------START PO LIST PAGE----------------- */}
      <POProvider>
        <UserCreationProvider>
          <ItemRequestProvider>
            <VendorProvider>
              <PO_List_List />
            </VendorProvider>
          </ItemRequestProvider>
        </UserCreationProvider>
      </POProvider>
      {/* --------------END PO LIST PAGE----------------- */}
    </>
  );
}
