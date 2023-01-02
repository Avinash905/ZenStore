import React from "react";
import "../style/hero.css";
import image from "../assets/images/hero.jpg";
import { NavLink } from "react-router-dom";

function Hero(props) {
  return (
    <section className="hero-section">
      <div className="container grid grid-two">
        <div className="hero-left">
          <span>welcome to</span>
          <h1>Zen {props.name}</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quae
            facere expedita qui eveniet repellat exercitationem fuga laborum eos
            commodi. Lorem ipsum dolor sit amet.
          </p>
          <NavLink to="/ZenStore/products">
            <button className="btn">Shop Now</button>
          </NavLink>
        </div>
        <div className="hero-right">
          <img src={image} alt="hero" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
