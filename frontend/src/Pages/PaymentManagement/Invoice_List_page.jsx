import React from "react";
import Invoice_List_List from "./components/PaymentManagement/Invoice_List/Invoice_List_List";
import { InvoiceProvider } from "../../Context/PIAndPoManagement/Invoice";
import { VendorProvider } from "../../Context/PaymentManagement/Vendor";
import { SubCategoryProvider } from "../../Context/ItemManagement/SubCategoryContext";
import { ItemRequestProvider } from "../../Context/Request Management/Item_Request";

export default function Invoice_List_page() {
  return (
    <>
      {/* ----------------START INVOICE LIST [PAGE]------------------ */}
      <InvoiceProvider>
        <VendorProvider>
          <SubCategoryProvider>
            <ItemRequestProvider>
              <Invoice_List_List />
            </ItemRequestProvider>
          </SubCategoryProvider>
        </VendorProvider>
      </InvoiceProvider>
      {/* ----------------END INVOICE LIST [PAGE]------------------ */}
    </>
  );
}
