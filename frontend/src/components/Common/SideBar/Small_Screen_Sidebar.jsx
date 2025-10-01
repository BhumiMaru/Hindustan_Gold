import React from "react";
import { useUIContext } from "../../../Context/UIContext";
import { Link } from "react-router-dom";
import { decryptData } from "../../../utils/decryptData";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function Small_Screen_Sidebar({ onClose }) {
  const {
    isOpenSmallSidebar,
    activeMenu,
    activeSubMenu,
    toggleMenu,
    handleSubMenuClick,
  } = useUIContext();
  // ✅ Get saved auth data
  const savedAuth = sessionStorage.getItem("authData");
  let user = null;

  if (savedAuth) {
    try {
      const decrypted = decryptData(savedAuth);
      user = decrypted?.user || null;
    } catch (error) {
      console.error("Error decrypting auth data", error);
    }
  }

  // ✅ Check if current user is Admin (id === 54)
  const isAdmin = user?.id === 56;

  const masterRoutes = {
    "Department Master": "/super_admin/master/department",
    "Zone Master": "/super_admin/master/zone",
    "Service Location 1 Master": "/super_admin/master/service-location-1",
    "Service Location 2 Master": "/super_admin/master/service-location-2",
    "Service Location 3 Master": "/super_admin/master/service-location-3",
    "Role Master": "/super_admin/master/role",
    "Company Master": "/super_admin/master/company",
    "User Creation": "/super_admin/master/user",
  };

  const itemRoutes = {
    "Group Master": "/item/group",
    "Category Master": "/item/category",
    "Subcategory Master": "/item/subcategory",
    "Item Master": "/item/item-master",
    // "Item Create": "/item/item-create-material",
  };

  const requestManagementRoutes = {
    "Item Request": "/request/request-list",
  };

  const piAndMaterialManagementRoutes = {
    // "PI Item Request": "/po-material/pi-request-create",
    "PI Request List": "/po-material/pi-request-list",
    "Get Quote": "/po-material/get-quote-list",
    "PO Create": "/po-material/po-create",
    "PO List": "/po-material/po-list",
    "GRN List": "/po-material/grn-list",
  };

  const paymentManagementRoutes = {
    "Invoice List": "/payment-management/invoice-list",
    "Vendor List": "/payment-management/vendor-list",
  };
  return (
    <>
      {/* --------------------START SMALL SCREEN SIDEBAR------------------------ */}
      <link rel="stylesheet" href={`${publicUrl}assets/vendor/css/core.css`} />
      <link rel="stylesheet" href={`${publicUrl}assets/css/demo.css`} />
      <aside
        id="layout-menu"
        // className={`layout-menu menu-vertical menu bg-white shadow-lg fixed top-0 left-0 h-full transition-transform duration-300 ${
        //   isOpenSmallSidebar ? "translate-x-0" : "-translate-x-full"
        // }`}
        className="layout-menu menu-vertical menu"
        style={{
          touchAction: "none",
          userSelect: "none",
          WebkitUserDrag: "none",
          WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
        }}
      >
        <div className="app-brand demo">
          <a href="index.html" className="app-brand-link me-4">
            <span className="app-brand-logo demo">
              <span className="text-primary">
                {/*  <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                      fill="currentColor"/>
              <path
                      opacity="0.06"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                      fill="#161616"/>
              <path
                      opacity="0.06"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                      fill="#161616"/>
              <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                      fill="currentColor"/>
            </svg>*/}
                <img
                  src={`${publicUrl}/assets/img/logo.png`}
                  className="img-fluid"
                />
              </span>
            </span>
            {/* </span>
                     <span class="app-brand-text demo menu-text fw-bold ms-3">
                         <h4 class="brand-text mb-0"
                             style="font-size:1.1rem;font-weight:600;line-height:1.1;margin-bottom:0;text-align:center;letter-spacing:0.5px;">Hindustan Gold</h4>
                           <div style="font-size: 0.7rem;font-weight:400;letter-spacing:0.5px;text-align:center;margin-top:0.15rem;margin-bottom:0.5rem;color:#888;">ERP Management System</div></span>*/}
          </a>
          <a
            // href="javascript:void(0);"
            className="layout-menu-toggle menu-link text-large ms-auto"
          >
            <i className="icon-base ti menu-toggle-icon d-none d-xl-block" />
            <i
              className="icon-base ti tabler-x d-block d-xl-none"
              onClick={onClose}
            />
          </a>
        </div>
        <div className="menu-inner-shadow" />

        <ul className="menu-inner py-1 ps ps--active-y">
          {/* Dashboard */}
          <li
            className={`menu-item ${
              activeMenu === "Dashboard" ? "active" : ""
            }`}
            onClick={() => toggleMenu("Dashboard")}
          >
            <Link
              to="/dashboard"
              className="menu-link cursor-pointer text-decoration-none"
            >
              <i className="menu-icon icon-base ti tabler-smart-home"></i>
              <div data-i="Dashboard">Dashboard</div>
            </Link>
          </li>

          {/* ✅ Master menu only for Admin */}
          {isAdmin && (
            <li
              className={`menu-item ${
                activeMenu === "Master" ? "open active" : ""
              } cursor-pointer`}
              onClick={() => toggleMenu("Master")}
            >
              <a className="menu-link menu-toggle">
                <i className="menu-icon icon-base ti tabler-book"></i>
                <div data-i="Master">Master</div>
              </a>
              <ul
                className={`menu-sub dropdown ${
                  activeMenu === "Master" ? "open" : ""
                }`}
              >
                {Object.keys(masterRoutes).map((item) => (
                  <li
                    key={item}
                    className={`menu-item ${
                      activeSubMenu === item ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubMenuClick("Master", item);
                    }}
                  >
                    <Link
                      to={masterRoutes[item]}
                      className="menu-link cursor-pointer text-decoration-none"
                    >
                      <div>{item}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}

          {/* Item Management */}
          {!isAdmin && (
            <li
              className={`menu-item ${
                activeMenu === "Item" ? "open active" : ""
              } cursor-pointer`}
              onClick={() => toggleMenu("Item")}
            >
              <a className="menu-link menu-toggle">
                <i className="menu-icon icon-base ti tabler-color-swatch"></i>
                <div data-i="Item Management">Item Management</div>
              </a>
              <ul
                className={`menu-sub dropdown ${
                  activeMenu === "Item" ? "open" : ""
                }`}
              >
                {Object.keys(itemRoutes).map((item) => (
                  <li
                    key={item}
                    className={`menu-item ${
                      activeSubMenu === item ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubMenuClick("Item", item);
                    }}
                  >
                    <Link
                      to={itemRoutes[item]}
                      className="menu-link cursor-pointer text-decoration-none"
                    >
                      <div data-i={item}>{item}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}

          {/* Request Management */}
          {!isAdmin && (
            <li
              className={`menu-item ${
                activeMenu === "Request" ? "open active" : ""
              } cursor-pointer`}
              onClick={() => toggleMenu("Request")}
            >
              <a className="menu-link menu-toggle">
                <i className="menu-icon icon-base ti tabler-forms"></i>
                <div data-i="Request Management">Request Management</div>
              </a>
              <ul
                className={`menu-sub dropdown ${
                  activeMenu === "Request" ? "open" : ""
                }`}
              >
                {Object.keys(requestManagementRoutes).map((item) => (
                  <li
                    key={item}
                    className={`menu-item ${
                      activeSubMenu === item ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubMenuClick("Request", item);
                    }}
                  >
                    <Link
                      to={requestManagementRoutes[item]}
                      className="menu-link cursor-pointer text-decoration-none"
                    >
                      <div data-i={item}>{item}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}

          {/* PO & Material Management */}
          {!isAdmin && (
            <li
              className={`menu-item ${
                activeMenu === "PO" ? "open active" : ""
              } cursor-pointer`}
              onClick={() => toggleMenu("PO")}
            >
              <a className="menu-link menu-toggle">
                <i className="menu-icon icon-base ti tabler-truck"></i>
                <div data-i="PO & Material Management">
                  PO & Material Management
                </div>
              </a>
              <ul
                className={`menu-sub dropdown ${
                  activeMenu === "PO" ? "open" : ""
                }`}
              >
                {Object.keys(piAndMaterialManagementRoutes).map((item) => (
                  <li
                    key={item}
                    className={`menu-item ${
                      activeSubMenu === item ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubMenuClick("PO", item);
                    }}
                  >
                    <Link
                      to={piAndMaterialManagementRoutes[item]}
                      className="menu-link cursor-pointer text-decoration-none"
                    >
                      <div data-i={item}>{item}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}

          {/* Payment Management */}
          {!isAdmin && (
            <li
              className={`menu-item ${
                activeMenu === "Payment" ? "open active" : ""
              } cursor-pointer`}
              onClick={() => toggleMenu("Payment")}
            >
              <a className="menu-link menu-toggle">
                <i className="menu-icon icon-base ti tabler-file-dollar"></i>
                <div data-i="Payment Management">Payment Management</div>
              </a>
              <ul
                className={`menu-sub dropdown ${
                  activeMenu === "Payment" ? "open" : ""
                }`}
              >
                {Object.keys(paymentManagementRoutes).map((item) => (
                  <li
                    key={item}
                    className={`menu-item ${
                      activeSubMenu === item ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubMenuClick("Payment", item);
                    }}
                  >
                    <Link
                      to={paymentManagementRoutes[item]}
                      className="menu-link cursor-pointer text-decoration-none"
                    >
                      <div data-i={item}>{item}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </aside>

      <div className="modal-backdrop fade show"></div>

      {/* --------------------END SMALL SCREEN SIDEBAR------------------------ */}
    </>
  );
}
