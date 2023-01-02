import React from "react";
import { NavLink } from "react-router-dom";
import "../style/card.css";
import PriceFormat from "./PriceFormat";

const SingleProduct = (props) => {
  return (
    <NavLink to={`/ZenStore/product/${props.prod.id}`}>
      <div className="card">
        <figure>
          <img src={props.prod.image} alt={props.prod.name} />
          <figcaption>{props.prod.category}</figcaption>
        </figure>
        <div className="card-image-bottom">
          <p>{props.prod.name}</p>
          <p className="card-price">
            <PriceFormat price={props.prod.price} />
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default SingleProduct;
