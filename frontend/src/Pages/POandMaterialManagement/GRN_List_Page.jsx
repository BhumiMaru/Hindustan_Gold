import React from "react";
import GRN_List_List from "./components/POandMaterialManagement/GRN_List/GRN_List_List";
import { GRNProvider } from "../../Context/PIAndPoManagement/GRN";
import { VendorProvider } from "../../Context/PaymentManagement/Vendor";
import { ItemRequestProvider } from "../../Context/Request Management/Item_Request";
import { InvoiceProvider } from "../../Context/PIAndPoManagement/Invoice";

export default function GRN_List_Page() {
  return (
    <>
      {/* -------------------START GRN LIST PAGE------------------ */}
      <GRNProvider>
        <InvoiceProvider>
          <VendorProvider>
            <ItemRequestProvider>
              <GRN_List_List />
            </ItemRequestProvider>
          </VendorProvider>
        </InvoiceProvider>
      </GRNProvider>
      {/* -------------------END GRN LIST PAGE------------------ */}
    </>
  );
}
