import React from "react";
import "../../../../public/assets/vendor/css/core.css";
import "../../../../public/assets/css/demo.css";
import "../../../../public/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../../../../public/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css";
import { Link } from "react-router-dom";

export default function SideBar({
  activeMenu,
  toggleMenu,
  activeSubMenu,
  handleSubMenuClick,
}) {
  const masterRoutes = {
    "Department Master": "/master/department",
    "Zone Master": "/master/zone",
    "Service Location 1 Master": "/master/service-location-1",
    "Service Location 2 Master": "/master/service-location-2",
    "Service Location 3 Master": "/master/service-location-3",
    "Role Master": "/master/role",
    "Company Master": "/master/company",
    "User Creation": "/master/user",
  };

  return (
    <>
      {/* Sidebar Menu */}
      <aside
        id="layout-menu"
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
                <img
                  src="../../../../public/assets/img/logo.png"
                  className="img-fluid"
                />
              </span>
            </span>
          </a>
          <a className="layout-menu-toggle menu-link text-large ms-auto">
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

          {/* Master */}
          <li
            className={`menu-item ${
              activeMenu === "Master" ? "open" : ""
            } cursor-pointer`}
            onClick={() => toggleMenu("Master")}
          >
            <a className="menu-link menu-toggle">
              <i className="menu-icon icon-base ti tabler-book"></i>
              <div data-i="Master">Master</div>
            </a>
            {/* import {Link} from "react-router-dom"; */}
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

          {/* Item Management */}
          <li
            className={`menu-item ${
              activeMenu === "Item" ? "open" : ""
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
              {[
                "Group Master",
                "Category Master",
                "Subcategory Master",
                "Item Master",
                "Item Create",
              ].map((item) => (
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
                  <a className="menu-link cursor-pointer">
                    <div data-i={item}>{item}</div>
                  </a>
                </li>
              ))}
            </ul>
          </li>

          {/* Request Management */}
          <li
            className={`menu-item ${
              activeMenu === "Request" ? "open" : ""
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
              {["Item Request"].map((item) => (
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
                  <a className="menu-link cursor-pointer">
                    <div data-i={item}>{item}</div>
                  </a>
                </li>
              ))}
            </ul>
          </li>

          {/* PO & Material Management */}
          <li
            className={`menu-item ${
              activeMenu === "PO" ? "open" : ""
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
              {[
                "PI Item Request",
                "PI Request List",
                "Get Quote",
                "PO Create",
                "PO List",
                "GRN List",
              ].map((item) => (
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
                  <a className="menu-link cursor-pointer">
                    <div data-i={item}>{item}</div>
                  </a>
                </li>
              ))}
            </ul>
          </li>

          {/* Payment Management */}
          <li
            className={`menu-item ${
              activeMenu === "Payment" ? "open" : ""
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
              {["Invoice List", "Vendor List"].map((item) => (
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
                  <a className="menu-link cursor-pointer">
                    <div data-i={item}>{item}</div>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </aside>
    </>
  );
}
