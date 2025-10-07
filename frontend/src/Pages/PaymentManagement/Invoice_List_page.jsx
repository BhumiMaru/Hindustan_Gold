import React from "react";
import Invoice_List_List from "./components/PaymentManagement/Invoice_List/Invoice_List_List";
import { InvoiceProvider } from "../../Context/PIAndPoManagement/Invoice";

export default function Invoice_List_page() {
  return (
    <>
      {/* ----------------START INVOICE LIST [PAGE]------------------ */}
      <InvoiceProvider>
        <Invoice_List_List />
      </InvoiceProvider>
      {/* ----------------END INVOICE LIST [PAGE]------------------ */}
    </>
  );
}
