import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SideBar from "../components/Common/SideBar/SideBar";
import Navbar from "../components/Common/Navbar/Navbar";
import AppRoutes from "./AppRoutes";
import Footer from "../components/Common/Footer/Footer";
import LoginPage from "../Pages/Authentication/Login/LoginMasterPage";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import { decryptData } from "../utils/decryptData";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function LayoutPage() {
  const location = useLocation();

  const savedAuth = sessionStorage.getItem("authData");

  let decryptAuthData = null;
  if (savedAuth) {
    try {
      decryptAuthData = decryptData(savedAuth);
    } catch (err) {
      console.error("❌ Error decrypting auth data:", err);
      decryptAuthData = null;
    }
  }

  // console.log("saved", savedAuth);
  // console.log("decryptAuthData", decryptAuthData);

  // ✅ Allow login & forgot password without token
  // ✅ Check if current path is login
  const isLoginPage = location.pathname === "/";
  const isForgotPassword = location.pathname === "/auth-forgot-password";

  if (isLoginPage) {
    return (
      <>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </>
    );
  }

  if (isForgotPassword) {
    return (
      <>
        <Routes>
          <Route path="/auth-forgot-password" element={<ForgotPassword />} />
        </Routes>
      </>
    );
  }

  // ❌ If no token, redirect to login
  if (!decryptAuthData?.token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <link
        rel="stylesheet"
        href={`${publicUrl}/assets/vendor/css/pages/page-auth.css`}
      />
      {/* ---------------START LAYOUT PAGE------------------ */}
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBar />

          <div className="layout-page">
            <Navbar />

            <div className="content-wrapper">
              {/* ----------------Start Content--------------- */}
              <AppRoutes />
              {/* ----------------End Content--------------- */}

              <Footer />
            </div>
          </div>
        </div>
      </div>
      {/* ---------------END LAYOUT PAGE------------------ */}
    </>
  );
}
