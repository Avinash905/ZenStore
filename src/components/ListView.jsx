import React from "react";
import { NavLink } from "react-router-dom";
import "../style/listview.css";
import PriceFormat from "./PriceFormat";

const ListView = (props) => {
  return (
    <div className="grid grid-two list-card">
      <figure>
        <img src={props.prod.image} alt={props.prod.name} />
      </figure>
      <div className="list-card-right">
        <p className="list-card-name">{props.prod.name}</p>
        <p className="card-price">
          <PriceFormat price={props.prod.price} />
        </p>
        <p className="list-card-desc">
          {props.prod.description.slice(0, 100)}...
        </p>
        <NavLink to={`/ZenStore/product/${props.prod.id}`}>
          <button className="btn">Read More</button>
        </NavLink>
      </div>
    </div>
  );
};

export default ListView;
