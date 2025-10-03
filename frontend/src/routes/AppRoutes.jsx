import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "../Pages/Dashboard/DashboardPage";
import DepartmentMasterPage from "../Pages/Master/DepartmentMasterPage";
import ZoneMasterpage from "../Pages/Master/ZoneMasterpAGE";
import ServiceLocation1MasterPage from "../Pages/Master/ServiceLocation1MasterPage";
import ServiceLocation2MasterPage from "../Pages/Master/ServiceLocation2MasterPage";
import ServiceLocation3MasterPage from "../Pages/Master/ServiceLocation3MasterPage";
import RoleMasterPage from "../Pages/Master/RoleMasterPage";
import { RoleMasterProvider } from "../Context/Master/RoleMasterContext";
import Role_Permission from "../Pages/Master/components/Master/Role_Master/Role_Permission";
import User_Creation_Permission from "../Pages/Master/components/Master/User_Creation/User_Creation_Permission";
import { UserCreationProvider } from "../Context/Master/UserCreationContext";
import User_Creation_Page from "../Pages/Master/User_Creation_Page";
import { ServiceLocation1MasterProvider } from "../Context/Master/ServiceLocation1MasterContext";
import { ServiceLocation2MasterProvider } from "../Context/Master/ServiceLocation2MasterContext";
import { ServiceLocation3MasterProvider } from "../Context/Master/ServiceLocation3MasterContext";
import { ZoneProvider } from "../Context/Master/ZoneContext";
import { DepartmentProvider } from "../Context/Master/DepartmentContext";
import User_Creation_Form from "../Pages/Master/components/Master/User_Creation/User_Creation_Form";
import Group_Master_Page from "../Pages/ItemManagement/Group_Master_Page";
import Category_Master_Page from "../Pages/ItemManagement/Category_Master_Page";
import SubCategory_Master_Page from "../Pages/ItemManagement/SubCategory_Master_Page";
import Item_Master_Page from "../Pages/ItemManagement/Item_Master_Page";
import { ItemMasterProvider } from "../Context/ItemManagement/ItemMasterContext";
import { CategoryMasterProvider } from "../Context/ItemManagement/CategoryMasterContext";
import { SubCategoryProvider } from "../Context/ItemManagement/SubCategoryContext";
import Request_Management_Page from "../Pages/RequestManagement/Request_Management_Page";
import Item_Request_Form from "../Pages/RequestManagement/components/RequestManagement/Item_Request/Item_Request_Form";
import PI_Item_Request_Page from "../Pages/POandMaterialManagement/PI_Item_Request_Page";
import PI_Request_List_Page from "../Pages/POandMaterialManagement/PI_Request_List_Page";
import Get_Quote_Page from "../Pages/POandMaterialManagement/Get_Quote_Page";
import PI_Request_Get_Quote from "../Pages/POandMaterialManagement/components/POandMaterialManagement/Get_Quote/PI_Request_Get_Quote";
import PO_Create_Page from "../Pages/POandMaterialManagement/PO_Create_Page";
import PO_List_Page from "../Pages/POandMaterialManagement/PO_List_Page";
import GRN_List_Page from "../Pages/POandMaterialManagement/GRN_List_Page";
import Invoice_List_page from "../Pages/PaymentManagement/Invoice_List_page";
import CompanyMasterPage from "../Pages/Master/CompanyMasterPage";
import { CompanyMasterProvider } from "../Context/Master/CompanyMasterContext";
import Item_Create_Material_Form from "../Pages/ItemManagement/components/ItemManagement/Item_Create/Item_Create_Material_Form";
import Vendor_List_page from "../Pages/PaymentManagement/Vendor_List_page";
import { useUIContext } from "../Context/UIContext";
import { ItemRequestProvider } from "../Context/Request Management/Item_Request";
import UOMPage from "../Pages/UOM/UOMPage";
import { VendorProvider } from "../Context/PaymentManagement/Vendor";
import Vendor_fill_quote from "../Pages/POandMaterialManagement/components/POandMaterialManagement/Get_Quote/vendor_fill_quote";
import { GetQuoteProvider } from "../Context/PIAndPoManagement/GetQuote";
import Vendor_List_Form from "../Pages/PaymentManagement/components/PaymentManagement/Vendor_List/Vendor_List_Form";
import PO_Details from "../Pages/POandMaterialManagement/components/POandMaterialManagement/PO_List/PO_Details";
import { POProvider } from "../Context/PIAndPoManagement/POCreate";

export default function AppRoutes() {
  const { isOpenSmallSidebar, closeSmallSidebar, modal } = useUIContext();
  return (
    <>
      {/* ------------------Start App Routes------------------- */}
      <Routes>
        {/* Default redirect */}
        {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
        {/* Login Routes */}

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Master Routes */}
        <Route
          path="/super_admin/master/department"
          element={<DepartmentMasterPage />}
        />
        <Route path="/super_admin/master/zone" element={<ZoneMasterpage />} />
        <Route
          path="/super_admin/master/service-location-1"
          element={<ServiceLocation1MasterPage />}
        />
        <Route
          path="/super_admin/master/service-location-2"
          element={<ServiceLocation2MasterPage />}
        />
        <Route
          path="/super_admin/master/service-location-3"
          element={<ServiceLocation3MasterPage />}
        />
        <Route path="/super_admin/master/role" element={<RoleMasterPage />} />

        <Route
          path="/super_admin/role-permission"
          element={
            <div className="container-xxl flex-grow-1 container-p-y">
              <RoleMasterProvider>
                <Role_Permission />
              </RoleMasterProvider>
            </div>
          }
        />
        <Route
          path="/super_admin/role-permission/:id"
          element={
            <div className="container-xxl flex-grow-1 container-p-y">
              <RoleMasterProvider>
                <Role_Permission />
              </RoleMasterProvider>
            </div>
          }
        />

        <Route
          path="/super_admin/user-permission"
          element={
            <div className="container-xxl flex-grow-1 container-p-y">
              <RoleMasterProvider>
                <UserCreationProvider>
                  <User_Creation_Permission />
                </UserCreationProvider>
              </RoleMasterProvider>
            </div>
          }
        />

        <Route
          path="/super_admin/user-permission/:id"
          element={
            <div className="container-xxl flex-grow-1 container-p-y">
              <RoleMasterProvider>
                <UserCreationProvider>
                  <User_Creation_Permission />
                </UserCreationProvider>
              </RoleMasterProvider>
            </div>
          }
        />

        <Route
          path="/super_admin/master/company"
          element={<CompanyMasterPage />}
        />
        <Route
          path="/super_admin/master/user"
          element={
            <UserCreationProvider>
              <User_Creation_Page />
            </UserCreationProvider>
          }
        />
        <Route
          path="/super_admin/master/user-create"
          element={
            <UserCreationProvider>
              <RoleMasterProvider>
                <CompanyMasterProvider>
                  <ServiceLocation1MasterProvider>
                    <ServiceLocation2MasterProvider>
                      <ServiceLocation3MasterProvider>
                        <ZoneProvider>
                          <DepartmentProvider>
                            <User_Creation_Form />
                          </DepartmentProvider>
                        </ZoneProvider>
                      </ServiceLocation3MasterProvider>
                    </ServiceLocation2MasterProvider>
                  </ServiceLocation1MasterProvider>
                </CompanyMasterProvider>
              </RoleMasterProvider>
            </UserCreationProvider>
          }
        />

        <Route
          path="/super_admin/master/user-create/:id"
          element={
            <UserCreationProvider>
              <RoleMasterProvider>
                <CompanyMasterProvider>
                  <ServiceLocation1MasterProvider>
                    <ServiceLocation2MasterProvider>
                      <ServiceLocation3MasterProvider>
                        <ZoneProvider>
                          <DepartmentProvider>
                            <User_Creation_Form />
                          </DepartmentProvider>
                        </ZoneProvider>
                      </ServiceLocation3MasterProvider>
                    </ServiceLocation2MasterProvider>
                  </ServiceLocation1MasterProvider>
                </CompanyMasterProvider>
              </RoleMasterProvider>
            </UserCreationProvider>
          }
        />

        {/* UOM (unit of measure) */}
        <Route path="/suprer_admin/uom" element={<UOMPage />} />

        {/* Item Management  */}
        <Route path="/item/group" element={<Group_Master_Page />} />
        <Route path="/item/category" element={<Category_Master_Page />} />
        <Route path="/item/subcategory" element={<SubCategory_Master_Page />} />
        <Route
          path="/item/item-master"
          element={
            <ItemMasterProvider>
              <Item_Master_Page />
            </ItemMasterProvider>
          }
        />
        <Route
          path="/item/item-create/:type"
          element={
            <ItemMasterProvider>
              <CategoryMasterProvider>
                <SubCategoryProvider>
                  <ZoneProvider>
                    <ServiceLocation1MasterProvider>
                      <ServiceLocation2MasterProvider>
                        <ServiceLocation3MasterProvider>
                          <Item_Create_Material_Form />
                        </ServiceLocation3MasterProvider>
                      </ServiceLocation2MasterProvider>
                    </ServiceLocation1MasterProvider>
                  </ZoneProvider>
                </SubCategoryProvider>
              </CategoryMasterProvider>
            </ItemMasterProvider>
          }
        />
        <Route
          path="/item/item-create/:type/:id"
          element={
            <ItemMasterProvider>
              <CategoryMasterProvider>
                <SubCategoryProvider>
                  <ZoneProvider>
                    <ServiceLocation1MasterProvider>
                      <ServiceLocation2MasterProvider>
                        <ServiceLocation3MasterProvider>
                          <Item_Create_Material_Form />
                        </ServiceLocation3MasterProvider>
                      </ServiceLocation2MasterProvider>
                    </ServiceLocation1MasterProvider>
                  </ZoneProvider>
                </SubCategoryProvider>
              </CategoryMasterProvider>
            </ItemMasterProvider>
          }
        />
        {/* <Route
          path="/item/item-create-service"
          element={<Item_Create_Service_Form />}
        />
        <Route
          path="/item/item-create-asset"
          element={<Item_Create_Asset_Form />}
        /> */}

        {/* Request Management */}
        <Route
          path="/user/request/request-list"
          element={<Request_Management_Page />}
        />
        <Route
          path="/user/request/request-create/:type"
          element={
            <ItemRequestProvider>
              <ItemMasterProvider>
                <ServiceLocation3MasterProvider>
                  <Item_Request_Form />
                </ServiceLocation3MasterProvider>
              </ItemMasterProvider>
            </ItemRequestProvider>
          }
        />
        <Route
          path="/user/request/request-create/:type/:id"
          element={
            <ItemRequestProvider>
              <ItemMasterProvider>
                <ServiceLocation3MasterProvider>
                  <Item_Request_Form />
                </ServiceLocation3MasterProvider>
              </ItemMasterProvider>
            </ItemRequestProvider>
          }
        />

        {/* PO & Material Management */}
        <Route
          path="/po-material/pi-request-create/:type"
          element={<PI_Item_Request_Page />}
        />
        {/* PO & Material Management [for edit] */}
        <Route
          path="/po-material/pi-request-create/:type/:id"
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
          path="/po-material/pi-request-get-quote/:id"
          element={
            <VendorProvider>
              <GetQuoteProvider>
                <UserCreationProvider>
                  <PI_Request_Get_Quote />
                </UserCreationProvider>
              </GetQuoteProvider>
            </VendorProvider>
          }
        />

        <Route path="/po-material/po-create/:id" element={<PO_Create_Page />} />
        <Route path="/po-material/po-list" element={<PO_List_Page />} />
        <Route
          path="/po-material/po-detail/:id"
          element={
            <POProvider>
              <PO_Details />
            </POProvider>
          }
        />
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

        {/* UOM (unit of measure) */}
        {/* <Route path="/uom" element={<UOMPage />} /> */}

        {/* Catch all (404) */}
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>
          }
        />
      </Routes>
      {modal.addNewVendor && (
        <>
          <VendorProvider>
            <Vendor_List_Form />
          </VendorProvider>
        </>
      )}

      {/* ------------------End App Routes------------------- */}
    </>
  );
}
