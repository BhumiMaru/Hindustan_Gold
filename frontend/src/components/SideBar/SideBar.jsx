import React, { useEffect, useState } from "react";
import "../../../public/assets/vendor/css/core.css";
import "../../../public/assets/css/demo.css";
import "../../../public/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../../../public/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css";
// import "../../../public/assets/vendor/libs/node-waves/node-waves.css";

export default function SideBar({ activeMenu, toggleMenu }) {
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
                {/* <!--  <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  </svg>--> */}
                <img src="assets/img/logo.png" className="img-fluid" />
              </span>
            </span>
            {/* <!-- </span>
                           <span className="app-brand-text demo menu-text fw-bold ms-3">
                               <h4 className="brand-text mb-0"
                                   style={{"fontSize":"1.1rem","fontWeight":"600","lineHeight":"1.1","marginBottom":"0","textAlign":"center","letterSpacing":"0.5px"}}>Hindustan Gold</h4>
                                 <div style={{"fontSize":"0.7rem","fontWeight":"400","letterSpacing":"0.5px","textAlign":"center","marginTop":"0.15rem","marginBottom":"0.5rem","color":"#888"}}>ERP Management System</div></span>--> */}
          </a>

          <a
            // href="javascript:void(0);"
            className="layout-menu-toggle menu-link text-large ms-auto"
          >
            <i className="icon-base ti menu-toggle-icon d-none d-xl-block"></i>
            <i className="icon-base ti tabler-x d-block d-xl-none"></i>
          </a>
        </div>

        <div className="menu-inner-shadow" style={{ display: "none" }}></div>

        <ul className="menu-inner py-1 ps ps--active-y">
          {/* Dashboards */}
          <li className="menu-item active">
            <a href="index.html" className="menu-link">
              <i className="menu-icon icon-base ti tabler-smart-home"></i>
              <div data-i="Dashboard">Dashboard</div>
            </a>
          </li>

          {/* Master */}
          <li
            className={`menu-item ${
              activeMenu === "master" ? "open" : ""
            } cursor-pointer`}
            onClick={() => toggleMenu("master")}
          >
            <a
              // href="javascript:void(0);"
              className="menu-link menu-toggle"
            >
              <i className="menu-icon icon-base ti tabler-book"></i>
              <div data-i="Master">Master</div>
            </a>

            <ul
              className={`menu-sub dropdown ${
                activeMenu === "master" ? "open" : ""
              }`}
            >
              <li className="menu-item">
                <a href="department-master.html" className="menu-link">
                  <div data-i="Department Master">Department Master</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="zone-master.html" className="menu-link">
                  <div data-i="Zone Master">Zone Master</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="service-location-master-1.html" className="menu-link">
                  <div data-i="Service Location 1 Master">
                    Service Location 1 Master
                  </div>
                </a>
              </li>
              <li className="menu-item">
                <a href="service-location-master-2.html" className="menu-link">
                  <div data-i="Service Location 2 Master">
                    Service Location 2 Master
                  </div>
                </a>
              </li>
              <li className="menu-item">
                <a href="service-location-master-3.html" className="menu-link">
                  <div data-i="Service Location 3 Master">
                    Service Location 3 Master
                  </div>
                </a>
              </li>
              <li className="menu-item">
                <a href="role-master.html" className="menu-link">
                  <div data-i="Role Master">Role Master</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="company-master.html" className="menu-link">
                  <div data-i="Company Master">Company Master</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="user-list.html" className="menu-link">
                  <div data-i="User Creation">User Creation</div>
                </a>
              </li>
            </ul>
          </li>
          {/* Item Management  */}
          <li
            className={`menu-item ${
              activeMenu === "item" ? "open" : ""
            } cursor-pointer`}
            onClick={() => toggleMenu("item")}
          >
            <a
              // href="javascript:void(0);"
              className="menu-link menu-toggle"
            >
              <i className="menu-icon icon-base ti tabler-color-swatch"></i>
              <div data-i="Item Management">Item Management</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a href="group-master.html" className="menu-link">
                  <div data-i="Group Master">Group Master</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="categary-master.html" className="menu-link">
                  <div data-i="Category Master">Category Master</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="sub-categary-master.html" className="menu-link">
                  <div data-i="Subcategory Master">Subcategory Master</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="Item-list.html" className="menu-link">
                  <div data-i="Item Master">Item Master</div>
                </a>
              </li>

              <li className="menu-item">
                <a href="item-create.html" className="menu-link">
                  <div data-i="Item Create">Item Create</div>
                </a>
              </li>
            </ul>
          </li>

          {/* Request Management  */}
          <li
            className={`menu-item ${
              activeMenu === "request" ? "open" : ""
            } cursor-pointer`}
            onClick={() => toggleMenu("request")}
          >
            <a
              // href="javascript:void(0);"
              className="menu-link menu-toggle"
            >
              <i className="menu-icon icon-base ti tabler-forms"></i>
              <div data-i="Layouts">Request Management</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a href="request-list.html" className="menu-link">
                  <div data-i="Collapsed menu">Item Request</div>
                </a>
              </li>
            </ul>
          </li>

          {/* PO & Material Management   */}
          <li
            className={`menu-item ${
              activeMenu === "po" ? "open" : ""
            } cursor-pointer`}
            onClick={() => toggleMenu("po")}
          >
            <a
              // href="javascript:void(0);"
              className="menu-link menu-toggle"
            >
              <i className="menu-icon icon-base ti tabler-truck"></i>
              <div data-i="Layouts">PO &amp; Material Management</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a href="pi-request-create.html" className="menu-link">
                  <div data-i="Collapsed menu">PI Item Request</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="pi-request-list.html" className="menu-link">
                  <div data-i="Content navbar">PI Request List</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="get-quote-list.html" className="menu-link">
                  <div data-i="Get Quote">Get Quote</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="po-create.html" className="menu-link">
                  <div data-i="Content navbar">Po Create</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="po-list.html" className="menu-link">
                  <div data-i="Content navbar">Po List</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="grn-list.html" className="menu-link">
                  <div data-i="Content navbar">GRN List</div>
                </a>
              </li>
            </ul>
          </li>

          {/* Payment Management */}
          <li
            className={`menu-item ${
              activeMenu === "payment" ? "open" : ""
            } cursor-pointer`}
            onClick={() => toggleMenu("payment")}
          >
            <a
              // href="javascript:void(0);"
              className="menu-link menu-toggle"
            >
              <i className="menu-icon icon-base ti tabler-file-dollar"></i>
              <div data-i="Layouts">Payment Management</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a href="invoice-list.html" className="menu-link">
                  <div data-i="Collapsed menu">Invoice List</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="vendor-list.html" className="menu-link">
                  <div data-i="Collapsed menu">Vendor List</div>
                </a>
              </li>
            </ul>
          </li>

          <div className="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
            <div
              className="ps__thumb-x"
              tabIndex="0"
              style={{ left: "0px", width: "0px" }}
            ></div>
          </div>
          <div className="ps__rail-y" style={{ top: "0px", right: "4px" }}>
            <div
              className="ps__thumb-y"
              tabIndex="0"
              style={{ top: "0px", height: "0px" }}
            ></div>
          </div>
        </ul>
      </aside>
    </>
  );
}
