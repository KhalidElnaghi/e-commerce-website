import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import AuthContextProvider from "../../Contexts/AuthContext";

export default function Layout() {
  return (
    <>
      <AuthContextProvider>
        <NavBar />
        <div className="container ">
          <Outlet />
        </div>
        <Footer />
      </AuthContextProvider>
    </>
  );
}
