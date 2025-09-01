import { createContext, useContext } from "react";

export const UserCreationContext = createContext();

// Custom Hook For [USER CREATION]
export const useUserCreation = () => {
  return useContext(UserCreationContext);
};

// USER CREATION PROVIDER
export const UserCreationProvider = ({ children }) => {
  return (
    <UserCreationContext.Provider>{children}</UserCreationContext.Provider>
  );
};
