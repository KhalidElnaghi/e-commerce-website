import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import Orders from "./Components/Orders/Orders";
import Products from "./Components/Products/Products";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";

export default function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Navigate to={"home"} /> },
        { path: "home", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },

        { path: "products", element: <Products /> },
        { path: "categories", element: <Categories /> },
        { path: "brands", element: <Brands /> },
        { path: "cart", element: <Cart /> },
        { path: "orders", element: <Orders /> },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}
