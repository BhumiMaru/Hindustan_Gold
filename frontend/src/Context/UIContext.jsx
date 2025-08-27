import { createContext, useContext, useState } from "react";

const UIContext = createContext();

// Custom Context
export const useUIContext = () => {
  return useContext(UIContext);
};

// UI Context Provider
export const UIProvider = ({ children }) => {
  // Is Open Dropdown in SIDEBAR
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

  //--------------------------SIDEBAR-------------------------- //

  // Popup Modal For All
  const [modal, setModal] = useState({
    addNewDepartment: false,
    addNewZone: false,
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
