import React from "react";
import { NavLink } from "react-router-dom";
import "../style/card.css";
import PriceFormat from "./PriceFormat";

const Card = ({ prod }) => {
  return (
    <NavLink to={`/product/${prod._id}`}>
      <div className="card">
        <figure>
          <img
            src={prod.images[0]}
            alt={prod.name}
          />
          <figcaption>{prod.category}</figcaption>
        </figure>
        <div className="card-image-bottom">
          <p>
            {prod.name.length > 24 ? `${prod.name.slice(0, 24)}...` : prod.name}
          </p>
          <p className="card-price">
            <PriceFormat price={prod.price} />
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
