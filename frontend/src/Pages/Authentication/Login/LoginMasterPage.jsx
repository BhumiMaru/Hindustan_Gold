import React from "react";
import { AuthProvider } from "../../../Context/Authentication/LoginContext";
import Login from "./Login";

export default function LoginPage() {
  return (
    <>
      {/* ---------------------START LOGIN MASTER PAGE--------------------- */}
      <AuthProvider>
        <Login />
      </AuthProvider>
      {/* ---------------------END LOGIN MASTER PAGE--------------------- */}
    </>
  );
}
