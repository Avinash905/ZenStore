import React, { useState } from "react";
import "../style/addcart.css";
import { TiTick } from "react-icons/ti";
import Amount from "./Amount.jsx";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/cartContext";

const AddCart = ({ prod }) => {
  const { colors, stock, id } = prod;
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const { addToCart } = useCartContext();

  const decFunc = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const incFunc = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };
  return (
    <>
      <p className="color-cont">
        Color:
        {colors.map((col) => {
          return (
            <button
              key={col}
              className={
                activeColor === col ? "cartColor active-tick" : "cartColor"
              }
              onClick={() => {
                setActiveColor(col);
              }}
              style={{ backgroundColor: `${col}` }}
            >
              {activeColor === col ? (
                <TiTick className="activeColor-tick" />
              ) : null}
            </button>
          );
        })}
      </p>
      <Amount
        stock={stock}
        decFunc={decFunc}
        incFunc={incFunc}
        amount={amount}
      />
      <NavLink to="/ZenStore/cart">
        <button
          className="btn addtocart"
          onClick={() => {
            addToCart(id, activeColor, prod, amount);
          }}
        >
          add to cart
        </button>
      </NavLink>
    </>
  );
};

export default AddCart;
