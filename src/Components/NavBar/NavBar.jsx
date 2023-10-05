import React, { useContext } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

export default function NavBar() {
  let { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext);
  let navigate = useNavigate();

  function logout() {
    setIsUserLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-main-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="collapsibleNavId"
          >
            {isUserLoggedIn ? (
              <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/orders">
                    All Orders
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/products">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/categories">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/brands">
                    Brands
                  </NavLink>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav pe-5 mt-lg-0">
              <li className="nav-item">
                <i className="fa-brands fa-twitter mx-2"></i>
                <i className="fa-brands fa-facebook mx-2"></i>
                <i className="fa-brands fa-instagram mx-2"></i>
                <i className="fa-brands fa-threads mx-2"></i>
                <i className="fa-brands fa-pinterest mx-2"></i>
              </li>
            </ul>
            <ul className="d-flex list-unstyled mt-3">
              {!isUserLoggedIn ? (
                <>
                  <li className=" mx-2">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="mx-2">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <li className="mx-2 nav-link">
                  <a onClick={logout} href="/" className=" cursor-pointer nav-link">
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
