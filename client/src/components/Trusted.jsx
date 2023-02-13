import React from "react";
import "../style/trusted.css";
import youtube from "../assets/images/youtube.png";
import facebook from "../assets/images/facebook.png";
import netflix from "../assets/images/netflix.png";
import telegram from "../assets/images/telegram.png";
import twitter from "../assets/images/twitter.png";

const Trusted = () => {
  return (
    <section className="trusted-section">
      <div className="container trusted-cont">
        <h3>Trusted By 1000+ Companies</h3>
        <div className="grid grid-five">
          <div className="slide">
            <img
              src={youtube}
              alt="trusted-brands"
            />
          </div>
          <div className="slide">
            <img
              src={netflix}
              alt="trusted-brands"
            />
          </div>
          <div className="slide">
            <img
              src={telegram}
              alt="trusted-brands"
            />
          </div>
          <div className="slide">
            <img
              src={facebook}
              alt="trusted-brands"
            />
          </div>
          <div className="slide">
            <img
              src={twitter}
              alt="trusted-brands"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trusted;
