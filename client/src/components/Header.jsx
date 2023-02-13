import React from "react";
import Navbar from "./Navbar";
import image from "../assets/images/logo.png";
import "../style/header.css";

function Header() {
  return (
    <header>
      <div className="header-cont">
        <div className="logo">
          <img src={image} alt="logo" />
        </div>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
