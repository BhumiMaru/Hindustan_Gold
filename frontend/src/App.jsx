// import "./App.css";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Common/Footer/Footer";
import Navbar from "./components/Common/Navbar/Navbar";
import SideBar from "./components/Common/SideBar/SideBar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  // Is Open Dropdown in sidebar
  const [activeMenu, setActiveMenu] = useState(null); // For parent menu
  const [activeSubMenu, setActiveSubMenu] = useState(null); // For submenu item
  // Toggle parent menu
  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
    setActiveSubMenu(null); // reset submenu when switching parent
  };

  // Handle submenu click (keep parent open)
  const handleSubMenuClick = (parentMenu, subMenu) => {
    setActiveMenu(parentMenu); // 🔑 ensure parent stays open
    setActiveSubMenu(subMenu); // highlight submenu
  };

  return (
    <>
      {/* ----------Start App---------- */}
      <BrowserRouter>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <SideBar
              activeMenu={activeMenu}
              toggleMenu={toggleMenu}
              activeSubMenu={activeSubMenu}
              handleSubMenuClick={handleSubMenuClick}
            />

            <div className="layout-page">
              <Navbar
                activeMenu={activeMenu}
                toggleMenu={toggleMenu}
                activeSubMenu={activeSubMenu}
              />

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
