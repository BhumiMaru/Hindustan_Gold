// import "./App.css";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Common/Footer/Footer";
import Navbar from "./components/Common/Navbar/Navbar";
import SideBar from "./components/Common/SideBar/SideBar";
import AppRoutes from "./routes/AppRoutes";
import { useUIContext } from "./Context/UIContext";

function App() {
  return (
    <>
      {/* ----------Start App---------- */}
      <BrowserRouter>
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
      </BrowserRouter>
      <ToastContainer />
      {/* ----------End App---------- */}
    </>
  );
}

export default App;
