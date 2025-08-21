// import "./App.css";
import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import SideBar from "./components/SideBar/SideBar";

function App() {
  // Is Open Dropdown in sidebar
  const [activeMenu, setActiveMenu] = useState(null);
  // Toggle function for dropdown menus
  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };
  return (
    <>
      {/* ----------SIDEBAR---------- */}
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBar activeMenu={activeMenu} toggleMenu={toggleMenu} />

          <div className="layout-page">
            <Navbar activeMenu={activeMenu} toggleMenu={toggleMenu} />

            <div class="content-wrapper">
              {/* ----------------Start Content--------------- */}
              <Dashboard />
              {/* ----------------End Content--------------- */}

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
