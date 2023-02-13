import React from "react";
import { RiInstagramLine } from "react-icons/ri";
import { FaDiscord } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import "../style/footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-top-left">
          <h3>Ready to get started?</h3>
          <h3>Talk to us today</h3>
        </div>
        <div className="footer-top-right flex-center">
          <NavLink
            to={"/contact"}
            className="btn"
          >
            get started
          </NavLink>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container grid grid-four footer-bottom-top">
          <div className="footer-one">
            <h3>Zen Store</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="footer-two">
            <h3>Subscribe to get important updates</h3>
            <input
              type="text"
              placeholder="YOUR E-MAIL"
            />
            <button className="btn">subscribe</button>
          </div>
          <div className="footer-three">
            <h3>Follow Us</h3>
            <div className="social-links">
              <FaDiscord />
              <AiFillYoutube />
              <RiInstagramLine />
            </div>
          </div>
          <div className="footer-four">
            <h3>Call Us</h3>
            <a href="tel:+91 9876543210">+91 9876543210</a>
          </div>
        </div>
        <hr />
        <div className="container grid grid-two privacy">
          <p>{new Date().getFullYear()} ZenStore. Made by Avinash</p>
          <div>
            <p>PRIVACY POLICY</p>
            <p>TERMS & CONDITIONS</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
