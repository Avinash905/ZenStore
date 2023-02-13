import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/navbar.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCartContext } from "../context/cartContext";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import fetchData from "../helper/apiCall";
import jwtDecode from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const [iconActive, setIconActive] = useState(false);
  const id = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token")).id
    : null;
  const token = localStorage.getItem("token") || null;
  const { total_items, setCartCount } = useCartContext();

  const logoutFunc = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getCartCount = async () => {
    const data = await fetchData(`/cart/getcartitems/${id}`);
    let items = 0;
    for (let index = 0; index < data.length; index++) {
      items += data[index].count;
    }
    setCartCount(items);
  };

  useEffect(() => {
    if (id) {
      getCartCount();
    }
  }, [total_items]);

  return (
    <nav>
      <div className={iconActive ? "navbar active" : "navbar"}>
        <ul className="nav-lists">
          <li key="home">
            <NavLink
              to="/"
              onClick={() => {
                setIconActive(false);
              }}
            >
              Home
            </NavLink>
          </li>
          <li key="prod">
            <NavLink
              to="/products"
              onClick={() => {
                setIconActive(false);
              }}
            >
              Products
            </NavLink>
          </li>
          <li key="about">
            <NavLink
              to="/about"
              onClick={() => {
                setIconActive(false);
              }}
            >
              About
            </NavLink>
          </li>
          <li key="contact">
            <NavLink
              to="/contact"
              onClick={() => {
                setIconActive(false);
              }}
            >
              Contact
            </NavLink>
          </li>
          {/* {id && <h4>{user.name}</h4>} */}
          {token ? (
            <li key="logout">
              <button
                className="btn"
                onClick={logoutFunc}
              >
                Log Out
              </button>
            </li>
          ) : (
            <NavLink
              to={"/login"}
              className="btn login-btn"
              onClick={() => {
                setIconActive(false);
              }}
            >
              Login
            </NavLink>
          )}

          <li key="cart-icon">
            <NavLink
              className="cart-icon-cont"
              to="/cart"
            >
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
