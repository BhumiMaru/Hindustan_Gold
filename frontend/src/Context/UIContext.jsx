import { createContext, useContext, useState } from "react";

const UIContext = createContext();

// Custom Context
export const useUIContext = () => {
  return useContext(UIContext);
};

// UI Context Provider
export const UIProvider = ({ children }) => {
  // Popup Modal
  const [modal, setModal] = useState({
    addNewDepartment: false,
  });

  const handleOpen = (name) => {
    setModal((prev) => ({ ...prev, [name]: true }));
  };

  const handleClose = (name) => {
    setModal((prev) => ({ ...prev, [name]: false }));
  };

  return (
    <UIContext.Provider value={{ modal, handleClose, handleOpen }}>
      {children}
    </UIContext.Provider>
  );
};
