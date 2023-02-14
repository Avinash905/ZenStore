import React, { useState } from "react";
import "../style/addcart.css";
import { TiTick } from "react-icons/ti";
import Amount from "./Amount.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";
import { useCartContext } from "../context/cartContext";
// import { useCartContext } from "../context/cartContext";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AddCart = ({ prod }) => {
  const navigate = useNavigate();
  const id = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token")).id
    : null;
  const { colors, stock, _id } = prod;
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const { total_items, setCartCount } = useCartContext();

  const decFunc = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const incFunc = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };

  const addToCart = async (productId, color, count) => {
    try {
      const { data } = await toast.promise(
        axios.post(
          `/cart/createcartitem/${id}`,
          {
            userId: id,
            productId,
            color,
            count,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Added to cart",
          error: "Unable to add to cart",
          loading: "Adding to cart...",
        }
      );
      setCartCount(total_items + count);
      navigate("/cart");
    } catch (error) {}
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
        max={stock}
        setDec={decFunc}
        setInc={incFunc}
        amount={amount}
      />
      <button
        className="btn addtocart"
        onClick={() => {
          addToCart(_id, activeColor, amount);
        }}
      >
        add to cart
      </button>
    </>
  );
};

export default AddCart;
