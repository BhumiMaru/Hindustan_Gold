import React, { useEffect } from "react";
import "../../../../public/assets/vendor/css/core.css";
import "../../../../public/assets/css/demo.css";
import "../../../../public/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../../../../public/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css";
import { Link, useLocation } from "react-router-dom";
import { useUIContext } from "../../../Context/UIContext";
import { decryptData } from "../../../utils/decryptData";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function SideBar() {
  const {
    activeMenu,
    toggleMenu,
    activeSubMenu,
    handleSubMenuClick,
    isSidebarCollapsed,
    toggleSidebar,
    isOpenSmallSidebar,
  } = useUIContext();

  // Add/remove HTML classes based on sidebar state
  useEffect(() => {
    const html = document.documentElement;

    html.classList.add(
      "layout-navbar-fixed",
      "layout-menu-fixed",
      "layout-compact",
      "layout-menu-100vh"
    );

    if (isSidebarCollapsed) {
      html.classList.add("layout-menu-collapsed");
    } else {
      html.classList.remove("layout-menu-collapsed");
    }
  }, [isSidebarCollapsed]);

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
    "Item Request": "/user/request/request-list",
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
      {/* Sidebar Menu */}
      <aside
        id="layout-menu"
        className={`layout-menu menu-vertical menu ${
          isSidebarCollapsed ? "layout-menu-collapsed" : ""
        }`}
        // className="layout-menu menu-vertical menu"
        style={{
          touchAction: "none",
          userSelect: "none",
          WebkitUserDrag: "none",
          WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
        }}
        onMouseEnter={() => {
          if (isSidebarCollapsed) {
            document.documentElement.classList.add("layout-menu-hover");
          }
        }}
        onMouseLeave={() => {
          document.documentElement.classList.remove("layout-menu-hover");
        }}
      >
        <div className="app-brand demo">
          <a href="index.html" className="app-brand-link me-4">
            <span className="app-brand-logo demo">
              <span className="text-primary">
                <img
                  src={`${publicUrl}/assets/img/logo.png`}
                  className="img-fluid"
                />
              </span>
            </span>
          </a>
          <a
            className="layout-menu-toggle menu-link text-large ms-auto cursor-pointer"
            onClick={toggleSidebar}
          >
            <i className="icon-base ti menu-toggle-icon d-none d-xl-block"></i>
            <i className="icon-base ti tabler-x d-block d-xl-none"></i>
          </a>
        </div>

        <ul className="menu-inner py-1 ps ps--active-y">
          {/* Dashboard */}
          <li
            className={`menu-item ${
              activeMenu === "Dashboard" ? "active" : ""
            }`}
            onClick={() => toggleMenu("Dashboard")}
          >
            <Link to="/dashboard" className="menu-link cursor-pointer">
              <i className="menu-icon icon-base ti tabler-smart-home"></i>
              <div data-i="Dashboard">Dashboard</div>
            </Link>
          </li>

          {/* ✅ Master menu only for Admin */}
          {isAdmin && (
            <li
              className={`menu-item ${
                activeMenu === "Master" ? "open active" : ""
              }`}
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
                      className="menu-link cursor-pointer"
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
                      className="menu-link cursor-pointer"
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
                      className="menu-link cursor-pointer"
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
                      className="menu-link cursor-pointer"
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
                      className="menu-link cursor-pointer"
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
    </>
  );
}
