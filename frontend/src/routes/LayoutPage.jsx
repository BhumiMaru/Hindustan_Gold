import React, { useEffect } from "react";
import {
  matchPath,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SideBar from "../components/Common/SideBar/SideBar";
import Navbar from "../components/Common/Navbar/Navbar";
import AppRoutes from "./AppRoutes";
import Footer from "../components/Common/Footer/Footer";
import LoginPage from "../Pages/Authentication/Login/LoginMasterPage";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import { decryptData } from "../utils/decryptData";
import { useUIContext } from "../Context/UIContext";
import Small_Screen_Sidebar from "../components/Common/SideBar/Small_Screen_Sidebar";
import { UserCreationProvider } from "../Context/Master/UserCreationContext";
import ResetPasswordMasterPage from "../Pages/Authentication/ResetPassword/ResetPasswordMasterPage";
import { GetQuoteProvider } from "../Context/PIAndPoManagement/GetQuote";
import Vendor_fill_quote from "../Pages/POandMaterialManagement/components/POandMaterialManagement/Get_Quote/Vendor_fill_quote";
const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function LayoutPage() {
  // const location = useLocation();
  // const { isOpenSmallSidebar, closeSmallSidebar } = useUIContext();

  // const savedAuth = sessionStorage.getItem("authData");

  // let decryptAuthData = null;
  // if (savedAuth) {
  //   try {
  //     decryptAuthData = decryptData(savedAuth);
  //   } catch (err) {
  //     console.error("❌ Error decrypting auth data:", err);
  //     decryptAuthData = null;
  //   }
  // }

  // console.log("publicUrl", publicUrl);

  // // console.log("saved", savedAuth);
  // // console.log("decryptAuthData", decryptAuthData);

  // // ✅ Allow login & forgot password without token
  // // ✅ Check if current path is login
  // const isLoginPage = location.pathname === "/";
  // const isForgotPassword = location.pathname === "/auth-forgot-password";
  // const isSendRequest = location.pathname === "/send-request";
  // const isResetPassword = location.pathname === "/auth-reset-password";
  // const isProfile = location.pathname === "/pages-profile-user";
  // console.log("isSendRequest", isSendRequest);

  // if (isLoginPage) {
  //   return (
  //     <>
  //       <Routes>
  //         <Route path="/" element={<LoginPage />} />
  //       </Routes>
  //     </>
  //   );
  // }

  // if (isForgotPassword) {
  //   return (
  //     <>
  //       <Routes>
  //         <Route path="/auth-forgot-password" element={<ForgotPassword />} />
  //       </Routes>
  //     </>
  //   );
  // }

  // if (isResetPassword) {
  //   return (
  //     <>
  //       <Routes>
  //         <Route
  //           path="/auth-reset-password"
  //           element={<ResetPasswordMasterPage />}
  //         />
  //       </Routes>
  //     </>
  //   );
  // }

  // // if (isSendRequest) {
  // //   return (
  // //     <>
  // //       <Routes>
  // //         <Route path="/send-request" element={<Vendor_fill_quote />} />
  // //       </Routes>
  // //     </>
  // //   );
  // // }

  // if (isSendRequest) {
  //   return (
  //     <>
  //       <Routes>
  //         <Route path="/send-request" element={<h1>hello</h1>} />
  //       </Routes>
  //     </>
  //   );
  // }

  // if (isLoginPage) {
  //   return (
  //     <>
  //       <Routes>
  //         <Route path="/" element={<LoginPage />} />
  //       </Routes>
  //     </>
  //   );
  // }

  // // ❌ If no token, redirect to login
  // if (!decryptAuthData?.token) {
  //   return <Navigate to="/" replace />;
  // }

  const location = useLocation();
  const { isOpenSmallSidebar, closeSmallSidebar } = useUIContext();

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

  // ✅ Public routes that do NOT require token
  const publicPaths = [
    "/",
    "/auth-forgot-password",
    "/auth-reset-password",
    "/send-request",
    "/pages-profile-user",
  ];

  // inside your LayoutPage
  const sendRequestMatch = matchPath("/send-request", location.pathname);
  // console.log("sendRequestMatch", sendRequestMatch);

  const isPublicRoute =
    location.pathname === "/" ||
    location.pathname === "/auth-forgot-password" ||
    location.pathname === "/auth-reset-password" ||
    location.pathname === "/pages-profile-user" ||
    sendRequestMatch; // ✅ include dynamic send-request route

  console.log(isPublicRoute);

  // const isSendRequestRoute = matchPath(
  //   "/send-request/:data",
  //   location.pathname
  // );
  // const isPublicRoute = publicPaths.includes(location.pathname);
  // console.log("isPublicRoute", isPublicRoute);
  // console.log("location", location.pathname);

  // const emailData = `FhwtPUYt8u7wXFMExaqqpebnEa/vIO3/xxxktNZufHs6woZy/eNbEXaM+DstrUsCxXEnorsPb3rmtcK5Ge7WyNNqF9ROePGSOcUE5Zy/Yc6qluAMxpVuxUcKly82V6Bt`;
  // let decryptEmailData = null;
  // if (emailData) {
  //   decryptEmailData = decryptData(emailData);
  // }
  // const emailParam = encodeURIComponent(JSON.stringify(decryptEmailData));
  // console.log("email params", emailParam);

  // console.log("decryptEmailData", decryptEmailData);

  //  Redirect to login if token is missing and route is NOT public
  if (!isPublicRoute && !decryptAuthData?.token) {
    return <Navigate to="/" replace />;
  }

  // ----------------- Handle public routes separately -----------------
  if (location.pathname === "/") {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    );
  }

  if (location.pathname === "/auth-forgot-password") {
    return (
      <Routes>
        <Route path="/auth-forgot-password" element={<ForgotPassword />} />
      </Routes>
    );
  }

  if (location.pathname === "/auth-reset-password") {
    return (
      <Routes>
        <Route
          path="/auth-reset-password"
          element={<ResetPasswordMasterPage />}
        />
      </Routes>
    );
  }
  // console.log("/send-request");
  if (sendRequestMatch) {
    return (
      <Routes>
        <Route
          path="/send-request"
          element={
            <GetQuoteProvider>
              <Vendor_fill_quote />
            </GetQuoteProvider>
          }
        />
      </Routes>
    );
  }

  if (location.pathname === "/pages-profile-user") {
    return (
      <Routes>
        <Route path="/pages-profile-user" element={<h1>Profile Page</h1>} />
      </Routes>
    );
  }

  return (
    <>
      <link
        rel="stylesheet"
        href={`${publicUrl}assets/vendor/css/pages/page-auth.css`}
      />
      <link
        rel="stylesheet"
        // href="../../assets/vendor/libs/spinkit/spinkit.css"
        href={`${publicUrl}assets/vendor/libs/spinkit/spinkit.css`}
      />
      {/* ---------------START LAYOUT PAGE------------------ */}
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <UserCreationProvider>
            <SideBar />
          </UserCreationProvider>

          <div className="layout-page">
            <Navbar />

            <div className="content-wrapper">
              {/* <h4>{location.pathname}</h4> */}
              {/* ----------------Start Content--------------- */}
              <AppRoutes />
              {/* ----------------End Content--------------- */}

              <Footer />
            </div>
          </div>

          {isOpenSmallSidebar && (
            <Small_Screen_Sidebar onClose={closeSmallSidebar} />
          )}
        </div>
      </div>
      {/* ---------------END LAYOUT PAGE------------------ */}
    </>
  );
}
