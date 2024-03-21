import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { BorderRightOutlined, SearchOutlined } from "@ant-design/icons";
import SearchForm from "./form/SearchForm";
import useCategory from "../hooks/useCategory";
import { Badge } from "antd";
import { useCart } from "../context/cart";

const Nav = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useCart();
  //hooks
  const {categories} = useCategory();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light py-2">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to={"/"}>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to={"/shop"}>
            Shop
          </NavLink>
        </li>

        <div className="dropdown">
          <li>
            <a
              className="nav-link pointer dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Categories
            </a>
            <ul
              className="dropdown-menu"
              style={{ height: "300px", overflow: "scroll" }}
            >
              <li>
                <NavLink className="nav-link" to={`/categories`}>
                  All Categories
                </NavLink>
              </li>
              {categories?.map((c) => (
                <li>
                  <NavLink className="nav-link" to={`/category/${c.slug}`}>
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </div>

        <SearchForm />
        <li className="nav-item">
          <Badge count={cart?.length >= 1 && cart.length} showZero={true} offset={[-5, 10]}>
            <NavLink className="nav-link" aria-current="page" to={"/cart"}>
                Cart
            </NavLink>
          </Badge>
        </li>
        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={"/register"}
              >
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to={"/login"}>
                Login
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <button
              className="btn dropdown-toggle auth-btn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {auth?.user?.name}
            </button>
            <ul className="dropdown-menu">
              <li>
                <NavLink
                  className="dropdown-item active"
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <a onClick={logout} className="nav-link pointer">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </ul>
    </>
  );
};

export default Nav;
