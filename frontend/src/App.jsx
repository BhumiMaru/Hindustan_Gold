import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutPage from "./routes/LayoutPage";
import { AuthProvider } from "./Context/Authentication/LoginContext";

function App() {
  return (
    <>
      {/* ----------Start App---------- */}
      <BrowserRouter>
        <AuthProvider>
          <LayoutPage />
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer position="bottom-center" autoClose={500} />
      {/* ----------End App---------- */}
    </>
  );
}

export default App;
