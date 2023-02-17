import React, { useEffect, useState } from "react";
import "../style/cart.css";
import { NavLink } from "react-router-dom";
import PriceFormat from "./PriceFormat";
import { useProductContext } from "../context/productContext";
import jwtDecode from "jwt-decode";
import fetchData from "../helper/apiCall";
import Loading from "./Loading";

const MyItems = () => {
  const { id } = jwtDecode(localStorage.getItem("token"));
  const [cart, setCart] = useState([]);

  const { isLoading, setLoading } = useProductContext();

  const getCartItems = async () => {
    setLoading(true);
    const data = await fetchData(`/cart/getcartitems/${id}`);
    let paidItems = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index].paid) {
        paidItems.push(data[index]);
      }
    }
    setCart(paidItems);
    setLoading(false);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  if (isLoading) return <Loading />;

  if (cart.length < 1) {
    return (
      <section className="cart-section">
        <div className="container cart-cont flex-center">
          <h3 className="error-text flex-center">No items</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <div className="container cart-cont">
        <div className="cart-user-profile">
          <h3 className="cart-username">name</h3>
        </div>
        <div className="flex-around grid grid-six cart-top">
          <p>Item</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Payment Date</p>
          <p>Payment Time</p>
        </div>
        <hr />
        {cart.map((ele) => {
          return (
            <div
              key={ele._id}
              className="flex-around grid grid-six cart-mid"
              style={{ gap: "1rem" }}
            >
              <div
                className="cart-name-color"
                style={{ gap: "1.5rem" }}
              >
                <img
                  src={ele?.productId?.images[0]}
                  alt={ele?.productId?.name}
                />
                <div>
                  <p className="cart-name">
                    {ele.productId.name.length > 30
                      ? `${ele.productId.name.slice(0, 30)}...`
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
              <p>{ele.count}</p>
              <p>
                <PriceFormat price={ele.count * ele.productId.price} />
              </p>
              <p>{ele.updatedAt.split("T")[0]}</p>
              <p>{ele.updatedAt.split("T")[1].split(".")[0]}</p>
            </div>
          );
        })}
        <hr />
        <div className="flex-between cart-btns">
          <NavLink to="/products">
            <button className="btn">continue shopping</button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default MyItems;
