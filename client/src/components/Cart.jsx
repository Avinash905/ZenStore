import React, { useEffect, useState } from "react";
import "../style/cart.css";
import { useCartContext } from "../context/cartContext";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Amount from "./Amount";
import PriceFormat from "./PriceFormat";
import { useProductContext } from "../context/productContext";
import jwtDecode from "jwt-decode";
import fetchData from "../helper/apiCall";
import Loading from "./Loading";

const Cart = () => {
  const { id } = jwtDecode(localStorage.getItem("token"));
  const [total, setTotal] = useState(0);
  const { removeItem, clearCart, shipping_fee, setDec, setInc, total_items } =
    useCartContext();
  const [cart, setCart] = useState([]);

  const { isLoading, setLoading } = useProductContext();

  const getCartItems = async () => {
    const data = await fetchData(`/cart/getcartitems/${id}`);
    let totPrice = 0;
    for (let index = 0; index < data.length; index++) {
      totPrice += data[index].count * data[index].productId.price;
    }
    setTotal(totPrice);
    setCart(data);
  };

  useEffect(() => {
    setLoading(true);
    getCartItems();
    setLoading(false);
  }, [total_items]);

  if (cart.length < 1) {
    return (
      <section className="cart-section">
        <div className="container cart-cont flex-center">
          <h3 className="error-text flex-center">No items in cart</h3>
        </div>
      </section>
    );
  }

  return isLoading ? (
    <Loading />
  ) : (
    <section className="cart-section">
      <div className="container cart-cont">
        <div className="cart-user-profile">
          <h3 className="cart-username">name</h3>
        </div>
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
            <div
              key={ele._id}
              className="flex-around grid grid-five cart-mid"
            >
              <div className="cart-name-color">
                <img
                  src={ele.productId.images[0]}
                  alt={ele.productId.name}
                />
                <div>
                  <p className="cart-name">
                    {ele.productId.name.length > 15
                      ? `${ele.productId.name.slice(0, 15)}...`
                      : ele.productId.name}
                  </p>
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
                <PriceFormat price={ele.productId.price} />
              </p>
              <Amount
                amount={ele.count}
                id={ele._id}
                setDec={setDec}
                setInc={setInc}
                max={ele.productId.stock}
              />
              <p>
                <PriceFormat price={ele.count * ele.productId.price} />
              </p>
              <p>
                <FaTrash
                  onClick={() => {
                    removeItem(id, ele._id);
                  }}
                  className="trash"
                />
              </p>
            </div>
          );
        })}
        <hr />
        <div className="flex-between cart-btns">
          <NavLink to="/products">
            <button className="btn">continue shopping</button>
          </NavLink>
          <button
            className="clear-btn"
            onClick={() => clearCart(id)}
          >
            clear cart
          </button>
        </div>
        <div className="cart-price-cont">
          <div className="cart-price">
            <p>
              Subtotal:{" "}
              <span>
                <PriceFormat price={total} />
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
                <PriceFormat price={total + shipping_fee} />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
