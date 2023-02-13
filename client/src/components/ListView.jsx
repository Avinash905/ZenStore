import React from "react";
import { NavLink } from "react-router-dom";
import "../style/listview.css";
import PriceFormat from "./PriceFormat";

const ListView = (props) => {
  return (
    <div className="grid grid-two list-card">
      <figure>
        <img
          src={props.prod.images[0]}
          alt={props.prod.name}
        />
      </figure>
      <div className="list-card-right">
        <p className="list-card-name">{props.prod.name}</p>
        <p className="card-price">
          <PriceFormat price={props.prod.price} />
        </p>
        <p className="list-card-desc">
          {props.prod.description.slice(0, 100)}...
        </p>
        <button className="btn">
          <NavLink
            to={`/product/${props.prod._id}`}
            className="read-more-btn"
          >
            Read More
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default ListView;
