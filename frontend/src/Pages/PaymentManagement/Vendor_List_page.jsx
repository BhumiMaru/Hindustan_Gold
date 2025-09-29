import React from "react";
import Vendor_List_List from "../../Pages/PaymentManagement/components/PaymentManagement/Vendor_List/Vendor_List_List";
import { VendorProvider } from "../../Context/PaymentManagement/Vendor";

export default function Vendor_List_page() {
  return (
    <>
      {/* ----------------START VENDOR LIST [PAGE]----------------- */}
      <VendorProvider>
        <Vendor_List_List />
      </VendorProvider>
      {/* ----------------END VENDOR LIST [PAGE]----------------- */}
    </>
  );
}
