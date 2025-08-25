import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage";
import DepartmentMasterPage from "../Pages/Master/DepartmentMasterPage";
import ZoneMasterpage from "../Pages/Master/ZoneMasterpAGE";
import ServiceLocation1MasterPage from "../Pages/Master/ServiceLocation1MasterPage";
import ServiceLocation2MasterPage from "../Pages/Master/ServiceLocation2MasterPage";
import ServiceLocation3MasterPage from "../Pages/Master/ServiceLocation3MasterPage";
import RoleMasterPage from "../Pages/Master/RoleMasterPage";
import CompanyMasterPage from "../Pages/Master/CompanyMasterPage";
import User_Creation_Form from "../components/Master/User_Creation/User_Creation_Form";
import Group_Master_Page from "../Pages/Item Management/Group_Master_Page";
import SubCategory_Master_Page from "../Pages/Item Management/SubCategory_Master_Page";
import Category_Master_Page from "../Pages/Item Management/Category_Master_Page";
import User_Creation_Page from "../Pages/Master/User_Creation_Page";
import Request_Management_Page from "../Pages/Request Management/Request_Management_Page";
import Item_Request_Form from "../components/Request Management/Item_Request/Item_Request_Form";
import PI_Item_Request_Page from "../Pages/PO_and_Material_Management/PI_Item_Request_Page";
import PI_Request_List_Page from "../Pages/PO_and_Material_Management/PI_Request_List_Page";
import PI_Request_Get_Quote from "../components/PO_and_Material_Management/Get_Quote/PI_Request_Get_Quote";
import Get_Quote_Page from "../Pages/PO_and_Material_Management/Get_Quote_Page";
import PO_Create_Page from "../Pages/PO_and_Material_Management/PO_Create_Page";
import PO_List_Page from "../Pages/PO_and_Material_Management/PO_List_Page";
import GRN_List_Page from "../Pages/PO_and_Material_Management/GRN_List_Page";
import Invoice_List_page from "../Pages/Payment Management/Invoice_List_page";
import Vendor_List_page from "../Pages/Payment Management/Vendor_List_page";

export default function AppRoutes() {
  return (
    <>
      {/* ------------------Start App Routes------------------- */}
      <Routes>
        {/* Default redirect */}
        {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
        {/* Dashboard */}
        <Route path="/" element={<DashboardPage />} />
        {/* Master Routes */}
        <Route path="/master/department" element={<DepartmentMasterPage />} />
        <Route path="/master/zone" element={<ZoneMasterpage />} />
        <Route
          path="/master/service-location-1"
          element={<ServiceLocation1MasterPage />}
        />
        <Route
          path="/master/service-location-2"
          element={<ServiceLocation2MasterPage />}
        />
        <Route
          path="/master/service-location-3"
          element={<ServiceLocation3MasterPage />}
        />
        <Route path="/master/role" element={<RoleMasterPage />} />
        <Route path="/master/company" element={<CompanyMasterPage />} />
        <Route path="/master/user" element={<User_Creation_Page />} />
        <Route path="/master/user-create" element={<User_Creation_Form />} />

        {/* Item Management  */}
        <Route path="/item/group" element={<Group_Master_Page />} />
        <Route path="/item/category" element={<Category_Master_Page />} />
        <Route path="/item/subcategory" element={<SubCategory_Master_Page />} />

        {/* Request Management */}
        <Route
          path="/request/request-list"
          element={<Request_Management_Page />}
        />
        <Route path="/request/request-create" element={<Item_Request_Form />} />

        {/* PO & Material Management */}
        <Route
          path="/po-material/pi-request-create"
          element={<PI_Item_Request_Page />}
        />
        <Route
          path="/po-material/pi-request-list"
          element={<PI_Request_List_Page />}
        />
        <Route
          path="/po-material/get-quote-list"
          element={<Get_Quote_Page />}
        />
        <Route
          path="/po-material/pi-request-get-quote"
          element={<PI_Request_Get_Quote />}
        />

        <Route path="/po-material/po-create" element={<PO_Create_Page />} />
        <Route path="/po-material/po-list" element={<PO_List_Page />} />
        <Route path="/po-material/grn-list" element={<GRN_List_Page />} />

        {/* ---------PAYMENT MANAGMENT-------- */}
        <Route
          path="/payment-management/invoice-list"
          element={<Invoice_List_page />}
        />
        <Route
          path="/payment-management/vendor-list"
          element={<Vendor_List_page />}
        />

        {/* Catch all (404) */}
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>
          }
        />
      </Routes>
      {/* ------------------End App Routes------------------- */}
    </>
  );
}
