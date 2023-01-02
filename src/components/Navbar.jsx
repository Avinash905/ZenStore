import React from "react";
import { NavLink } from "react-router-dom";
import "../style/navbar.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCartContext } from "../context/cartContext";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [iconActive, setIconActive] = useState(false);
  const { total_items } = useCartContext();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <nav>
      <div className={iconActive ? "navbar active" : "navbar"}>
        <ul className="nav-lists">
          <li key="home">
            <NavLink
              to="/ZenStore"
              onClick={() => {
                setIconActive(false);
              }}
            >
              Home
            </NavLink>
          </li>
          <li key="prod">
            <NavLink
              to="/ZenStore/products"
              onClick={() => {
                setIconActive(false);
              }}
            >
              Products
            </NavLink>
          </li>
          <li key="about">
            <NavLink
              to="/ZenStore/about"
              onClick={() => {
                setIconActive(false);
              }}
            >
              About
            </NavLink>
          </li>
          <li key="contact">
            <NavLink
              to="/ZenStore/contact"
              onClick={() => {
                setIconActive(false);
              }}
            >
              Contact
            </NavLink>
          </li>
          {isAuthenticated && <h4>{user.name}</h4>}
          {isAuthenticated ? (
            <li key="logout">
              <button
                className="btn"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log Out
              </button>
            </li>
          ) : (
            <li key="login">
              <button className="btn" onClick={() => loginWithRedirect()}>
                Login
              </button>
            </li>
          )}

          <li key="cart-icon">
            <NavLink className="cart-icon-cont" to="/ZenStore/cart">
              <AiOutlineShoppingCart className="cart-icon" />
              <span>{total_items}</span>
            </NavLink>
          </li>
        </ul>
        <div className="menu-icons">
          {!iconActive && (
            <FiMenu
              className="menu-open"
              onClick={() => {
                setIconActive(true);
              }}
            />
          )}
          {iconActive && (
            <RxCross1
              className="menu-close"
              onClick={() => {
                setIconActive(false);
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
