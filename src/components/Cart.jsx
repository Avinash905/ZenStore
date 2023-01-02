import React from "react";
import "../style/cart.css";
import { useCartContext } from "../context/cartContext";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Amount from "./Amount";
import PriceFormat from "./PriceFormat";
import { useAuth0 } from "@auth0/auth0-react";

const Cart = () => {
  const {
    cart,
    removeItem,
    clearCart,
    setDec,
    setInc,
    total_amount,
    shipping_fee,
  } = useCartContext();
  const { isAuthenticated, user } = useAuth0();

  if (cart.length < 1) {
    return (
      <section className="cart-section">
        <div className="container cart-cont">
          <h3 className="empty-cart">No items in cart</h3>
        </div>
      </section>
    );
  }
  return (
    <section className="cart-section">
      <div className="container cart-cont">
        {isAuthenticated && (
          <div className="cart-user-profile">
            <img src={user.picture} alt={user.name} />
            <h3 className="cart-username">{user.name}</h3>
          </div>
        )}
        <div className="flex-around grid grid-five cart-top">
          <p>Item</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>
          <p>Remove</p>
        </div>
        <hr />
        {cart.map((ele) => {
          return (
            <div key={ele.id} className="flex-around grid grid-five cart-mid">
              <div className="cart-name-color">
                <img src={ele.image} alt={ele.name} />
                <div className="cart-color">
                  <p className="cart-name">{ele.name}</p>
                  <p className="cart-color-box">
                    Color:{" "}
                    <button
                      className="cartColor"
                      style={{ backgroundColor: `${ele.color}` }}
                    ></button>
                  </p>
                </div>
              </div>
              <p>
                <PriceFormat price={ele.price} />
              </p>

              <Amount
                amount={ele.amount}
                incFunc={() => {
                  setInc(ele.id);
                }}
                decFunc={() => {
                  setDec(ele.id);
                }}
              />

              <p>
                <PriceFormat price={ele.amount * ele.price} />
              </p>
              <p>
                <FaTrash
                  onClick={() => {
                    removeItem(ele.id);
                  }}
                  className="trash"
                />
              </p>
            </div>
          );
        })}
        <hr />
        <div className="flex-between cart-btns">
          <NavLink to="/ZenStore/products">
            <button className="btn">continue shopping</button>
          </NavLink>
          <button className="clear-btn" onClick={clearCart}>
            clear cart
          </button>
        </div>
        <div className="cart-price-cont">
          <div className="cart-price">
            <p>
              Subtotal:{" "}
              <span>
                <PriceFormat price={total_amount} />
              </span>
            </p>
            <p>
              Shipping Fee:{" "}
              <span>
                <PriceFormat price={shipping_fee} />
              </span>
            </p>
            <hr />
            <p className="total-price">
              Order Total:{" "}
              <span>
                <PriceFormat price={total_amount + shipping_fee} />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
