import React, { useState } from "react";
import "../../../../public/assets/vendor/css/core.css";
import "../../../../public/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css";
import { useUIContext } from "../../../Context/UIContext";
import { Link, useNavigate } from "react-router-dom";
import Small_Screen_Sidebar from "../SideBar/Small_Screen_Sidebar";
import { decryptData } from "../../../utils/decryptData";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const fileUrl = import.meta.env.VITE_FILE_URL;

export default function Navbar() {
  const {
    activeMenu,
    toggleMenu,
    activeSubMenu,
    isOpenSmallSidebar,
    setIsOpenSmallSidebar,
    closeSmallSidebar,
    toggleSmallSidebar,
  } = useUIContext();

  const navigate = useNavigate();
  // Decide what to show in Navbar title
  // const pageTitle =
  //   activeSubMenu ||
  //  ( activeMenu == "Dashboard" ||
  //   activeMenu == "Item Request" ||
  //   activeMenu == "Payment List")
  //     ? activeMenu
  //     : "";

  // Auto Page Title Based On Route
  let routeTitle = "";

  switch (true) {
    case location.pathname.startsWith("/po-material/pi-request-get-quote"):
      routeTitle = "PI Request Get Quote";
      break;

    case location.pathname.startsWith("/po-material/po-detail"):
      routeTitle = "PO Detail";
      break;

    case location.pathname.startsWith("/po-material/grn-details"):
      routeTitle = "GRN Detail";
      break;

    case location.pathname.startsWith("/payment-management/invoice-detail"):
      routeTitle = "Invoice Detail";
      break;

    default:
      routeTitle = "";
  }

  const pageTitle =
    routeTitle ||
    activeSubMenu ||
    (["Dashboard", "Item Request", "Payment List", ,].includes(activeMenu)
      ? activeMenu
      : "");

  const getAuthData = sessionStorage.getItem("authData");
  const decryptAuthData = decryptData(getAuthData);
  console.log(decryptAuthData);

  return (
    <>
      {/* ----------------------START NAVBAR--------------------------- */}
      {/* Navbar */}
      <nav
        className="layout-navbar container-xxl navbar-detached navbar navbar-expand-xl align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a
            className="nav-item nav-link px-0 me-xl-6 cursor-pointer"
            onClick={() => {
              setIsOpenSmallSidebar(!isOpenSmallSidebar);
            }}
          >
            <i className="icon-base ti tabler-menu-2 icon-md"></i>
          </a>
        </div>

        <div
          className="navbar-nav-right d-flex align-items-center justify-content-end"
          id="navbar-collapse"
        >
          {/* Search */}
          {/* <!--
                  <div className="navbar-nav align-items-center">
                        <div className="nav-item navbar-search-wrapper px-md-0 px-2 mb-0">
                            <a className="nav-item nav-link search-toggler d-flex align-items-center px-0"
                               href="javascript:void(0);">
                                <span className="d-inline-block text-body-secondary fw-normal" id="autocomplete"></span>
                            </a>
                        </div>
                    </div>
                    --> */}
          <div className="text-center">
            <h4 className="mb-0 me-1">{pageTitle}</h4>
          </div>

          {/* /Search */}

          <ul className="navbar-nav flex-row align-items-center ms-md-auto">
            {/* User */}
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                className={`nav-link dropdown-toggle hide-arrow p-0 ${
                  activeMenu === "avatar" ? "show" : ""
                }`}
                onClick={() => toggleMenu("avatar")}
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <div className="avatar avatar-online">
                  <img
                    src={
                      decryptAuthData?.user?.profile_photo
                        ? `${fileUrl}/storage/users/${decryptAuthData.user.profile_photo}`
                        : `${publicUrl}/assets/img/avatars/user.png`
                    }
                    alt=""
                    className="rounded-circle"
                  />
                </div>
                {/* {console.log(
                  `${fileUrl}/storage/users/${decryptAuthData?.user?.profile_photo}`
                )} */}
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-end ${
                  activeMenu === "avatar" ? "show" : ""
                }`}
                onClick={() => toggleMenu("avatar")}
                data-bs-popper="static"
              >
                <li>
                  <a className="dropdown-item mt-0 waves-effect" href="#">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-2">
                        <div className="avatar avatar-online">
                          <img
                            src={
                              decryptAuthData?.user?.profile_photo
                                ? `${fileUrl}/storage/users/${decryptAuthData.user.profile_photo}`
                                : `${publicUrl}/assets/img/avatars/user.png`
                            }
                            // alt="User Profile"
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{decryptAuthData?.user?.name}</h6>
                        <small className="text-body-secondary">
                          Super Admin
                        </small>
                        <small>user:id {decryptAuthData?.user?.id}</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider my-1 mx-n2"></div>
                </li>
                <li>
                  <Link
                    className="dropdown-item waves-effect"
                    to="/pages-profile-user"
                  >
                    <i className="icon-base ti tabler-user me-3 icon-md"></i>
                    <span className="align-middle">My Profile</span>
                  </Link>
                </li>
                <li>
                  <div className="d-grid px-2 pt-2 pb-1">
                    <a
                      className="btn btn-sm btn-danger d-flex waves-effect waves-light"
                      // href="login.html"
                      // target="_blank"
                      onClick={() => {
                        sessionStorage.clear("authData");
                        navigate("/");
                      }}
                    >
                      <small className="align-middle text-white">Logout</small>
                      <i className="icon-base ti tabler-logout ms-2 icon-14px text-white"></i>
                    </a>
                  </div>
                </li>
              </ul>
            </li>
            {/*/ User */}
          </ul>
        </div>
      </nav>
      {/* </div> */}

      {/* ----------------------END NAVBAR--------------------------- */}
    </>
  );
}
