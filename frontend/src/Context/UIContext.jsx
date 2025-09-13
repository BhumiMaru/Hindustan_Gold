import { createContext, useContext, useState } from "react";

const UIContext = createContext();

// Custom Context
export const useUIContext = () => {
  return useContext(UIContext);
};

// UI Context Provider
export const UIProvider = ({ children }) => {
  // Is Open Dropdown in SIDEBAR
  // const [activeMenu, setActiveMenu] = useState(null); // For parent menu
  // const [activeSubMenu, setActiveSubMenu] = useState(null); // For submenu item
  // Toggle parent menu
  // const toggleMenu = (menuName) => {
  //   setActiveMenu(activeMenu === menuName ? null : menuName);
  //   setActiveSubMenu(null); // reset submenu when switching parent
  // };

  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem("activeMenu") || null
  );
  const [activeSubMenu, setActiveSubMenu] = useState(
    localStorage.getItem("activeSubMenu") || null
  );

  const toggleMenu = (menuName) => {
    const newMenu = activeMenu === menuName ? null : menuName;
    setActiveMenu(newMenu);
    localStorage.setItem("activeMenu", newMenu);
    setActiveSubMenu(null);
    localStorage.removeItem("activeSubMenu");
  };

  // Handle submenu click (keep parent open)
  // const handleSubMenuClick = (parentMenu, subMenu) => {
  //   setActiveMenu(parentMenu); // 🔑 ensure parent stays open
  //   setActiveSubMenu(subMenu); // highlight submenu
  // };

  const handleSubMenuClick = (parentMenu, subMenu) => {
    setActiveMenu(parentMenu);
    setActiveSubMenu(subMenu);  
    localStorage.setItem("activeMenu", parentMenu);
    localStorage.setItem("activeSubMenu", subMenu);
  };

  //--------------------------SIDEBAR-------------------------- //

  // Popup Modal For All
  const [modal, setModal] = useState({
    // MASTER
    addNewDepartment: false,
    addNewZone: false,
    addNewServiceLocation1: false,
    addNewServiceLocation2: false,
    addNewServiceLocation3: false,
    addNewRole: false,
    addNewCompany: false,
    viewUserDetails: false,
    // ITEM MANAGEMENT
    addNewGroup: false,
    addNewCategory: false,
    addNewSubCategory: false,
    viewSubCategory: false,
  });

  const handleOpen = (name) => {
    setModal((prev) => ({ ...prev, [name]: true }));
  };

  const handleClose = (name) => {
    setModal((prev) => ({ ...prev, [name]: false }));
  };

  return (
    <UIContext.Provider
      value={{
        modal,
        handleClose,
        handleOpen,
        activeMenu,
        toggleMenu,
        activeSubMenu,
        handleSubMenuClick,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
