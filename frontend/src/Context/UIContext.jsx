// import { createContext, useContext, useEffect, useState } from "react";

// const UIContext = createContext();

// // Custom Context
// export const useUIContext = () => {
//   return useContext(UIContext);
// };

// // UI Context Provider
// export const UIProvider = ({ children }) => {
//   // Is Open Dropdown in SIDEBAR
//   // const [activeMenu, setActiveMenu] = useState(null); // For parent menu
//   // const [activeSubMenu, setActiveSubMenu] = useState(null); // For submenu item
//   // Toggle parent menu
//   // const toggleMenu = (menuName) => {
//   //   setActiveMenu(activeMenu === menuName ? null : menuName);
//   //   setActiveSubMenu(null); // reset submenu when switching parent
//   // };

//   const [activeMenu, setActiveMenu] = useState(
//     sessionStorage.getItem("activeMenu") || null
//   );
//   const [activeSubMenu, setActiveSubMenu] = useState(
//     sessionStorage.getItem("activeSubMenu") || null
//   );

//   // small screen sidebar toggle state
//   const [isOpenSmallSidebar, setIsOpenSmallSidebar] = useState(false);

//   const toggleMenu = (menuName) => {
//     const newMenu = activeMenu === menuName ? null : menuName;
//     setActiveMenu(newMenu);
//     sessionStorage.setItem("activeMenu", newMenu);
//     setActiveSubMenu(null);
//     sessionStorage.removeItem("activeSubMenu");
//   };

//   // Handle submenu click (keep parent open)
//   // const handleSubMenuClick = (parentMenu, subMenu) => {
//   //   setActiveMenu(parentMenu); // 🔑 ensure parent stays open
//   //   setActiveSubMenu(subMenu); // highlight submenu
//   // };

//   const handleSubMenuClick = (parentMenu, subMenu) => {
//     setActiveMenu(parentMenu);
//     setActiveSubMenu(subMenu);
//     sessionStorage.setItem("activeMenu", parentMenu);
//     sessionStorage.setItem("activeSubMenu", subMenu);
//   };

//   //--------------------------SIDEBAR-------------------------- //

//   // Popup Modal For All
//   const [modal, setModal] = useState({
//     // MASTER
//     addNewDepartment: false,
//     addNewZone: false,
//     addNewServiceLocation1: false,
//     addNewServiceLocation2: false,
//     addNewServiceLocation3: false,
//     addNewRole: false,
//     addNewCompany: false,
//     viewUserDetails: false,
//     // ITEM MANAGEMENT
//     addNewGroup: false,
//     addNewCategory: false,
//     addNewSubCategory: false,
//     viewSubCategory: false,
//   });

//   useEffect(() => {
//     const html = document.documentElement;

//     html.classList.add(
//       "layout-navbar-fixed",
//       "layout-menu-fixed",
//       "layout-compact"
//     );

//     if (isOpenSmallSidebar) {
//       html.classList.add("layout-menu-expanded");
//     } else {
//       html.classList.remove("layout-menu-expanded");
//     }
//   }, [isOpenSmallSidebar]);

//   const handleOpen = (name) => {
//     setModal((prev) => ({ ...prev, [name]: true }));
//   };

//   const handleClose = (name) => {
//     setModal((prev) => ({ ...prev, [name]: false }));
//   };

//   // ✅ Small sidebar toggler
//   const toggleSidebar = () => {
//     setIsSidebarCollapsed((prev) => !prev);
//   };

//   const closeSmallSidebar = () => setIsOpenSmallSidebar(false);

//   return (
//     <UIContext.Provider
//       value={{
//         modal,
//         handleClose,
//         handleOpen,
//         activeMenu,
//         toggleMenu,
//         activeSubMenu,
//         handleSubMenuClick,
//         setActiveMenu,
//         setActiveSubMenu,
//         isOpenSmallSidebar,
//         setIsOpenSmallSidebar,
//         closeSmallSidebar,
//         toggleSidebar,
//       }}
//     >
//       {children}
//     </UIContext.Provider>
//   );
// };
import { createContext, useContext, useEffect, useState } from "react";

const UIContext = createContext();

export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(
    sessionStorage.getItem("activeMenu") || "Dashboard"
  );
  const [activeSubMenu, setActiveSubMenu] = useState(
    sessionStorage.getItem("activeSubMenu") || null
  );

  // ✅ Load sidebar state from sessionStorage
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    sessionStorage.getItem("isSidebarCollapsed") === "true" ? true : false
  );
  const [isOpenSmallSidebar, setIsOpenSmallSidebar] = useState(
    sessionStorage.getItem("isOpenSmallSidebar") === "true" ? true : false
  );

  const toggleMenu = (menuName) => {
    const newMenu = activeMenu === menuName ? null : menuName;
    setActiveMenu(newMenu);
    sessionStorage.setItem("activeMenu", newMenu || "");
    setActiveSubMenu(null);
    sessionStorage.removeItem("activeSubMenu");
  };

  const handleSubMenuClick = (parentMenu, subMenu) => {
    setActiveMenu(parentMenu);
    setActiveSubMenu(subMenu);
    sessionStorage.setItem("activeMenu", parentMenu);
    sessionStorage.setItem("activeSubMenu", subMenu);
  };

  // ✅ Watch & persist sidebar state in sessionStorage
  useEffect(() => {
    sessionStorage.setItem("isSidebarCollapsed", isSidebarCollapsed);
  }, [isSidebarCollapsed]);

  useEffect(() => {
    sessionStorage.setItem("isOpenSmallSidebar", isOpenSmallSidebar);
  }, [isOpenSmallSidebar]);

  // ✅ Add/remove HTML classes based on sidebar state
  useEffect(() => {
    const html = document.documentElement;

    html.classList.add(
      "layout-navbar-fixed",
      "layout-menu-fixed",
      "layout-compact"
    );

    if (isOpenSmallSidebar) {
      html.classList.add("layout-menu-expanded");
    } else {
      html.classList.remove("layout-menu-expanded");
    }
  }, [isOpenSmallSidebar]);

  const handleOpen = (name) => {
    setModal((prev) => ({ ...prev, [name]: true }));
  };

  const handleClose = (name) => {
    setModal((prev) => ({ ...prev, [name]: false }));
  };

  // ✅ Sidebar togglers
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);
  const closeSmallSidebar = () => setIsOpenSmallSidebar(false);

  // Popup Modal State
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
    viewSubCatOwnersName: false,
    viewSubCategory: false,
    // REQUEST MANAGEMENT
    viewItemRequest: false,
    viewApprove: false,
    viewReject: false,
    // PO & MATERIAL MANAGEMENT
    viewRejectPi: false,
    viewRejectPo: false,
    // UOM
    addNewUOM: false,
    // PAYMENT MANAGEMENT
    addNewVendor: false,
    // Get Quote
    viewVendorQuoteDetails: false,
    addQuote: false,
    editGRN: false,
    viewRejectGRN: false,
    vendorApprove: false,
    // INVOICE
    addInvoice: false,
    rejectInvoice: false,
    paymentPartials: false,
    markaspaid: false,
    // Vendor
    viewVendorDetails: false,
  });

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
        setActiveMenu,
        setActiveSubMenu,
        isSidebarCollapsed,
        toggleSidebar,
        isOpenSmallSidebar,
        setIsOpenSmallSidebar,
        closeSmallSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
