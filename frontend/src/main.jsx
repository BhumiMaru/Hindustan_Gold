import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UIProvider } from "./Context/UIContext";
import { UserCreationProvider } from "./Context/Master/UserCreationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UIProvider>
      <UserCreationProvider>
        <App />
      </UserCreationProvider>
    </UIProvider>
  </StrictMode>
);
