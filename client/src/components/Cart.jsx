import React, { useEffect, useState } from "react";
import "../style/cart.css";
import { useCartContext } from "../context/cartContext";
import { FaTrash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Amount from "./Amount";
import PriceFormat from "./PriceFormat";
import { useProductContext } from "../context/productContext";
import jwtDecode from "jwt-decode";
import fetchData from "../helper/apiCall";
import Loading from "./Loading";
import axios from "axios";
import logo from "../assets/images/logo1.png";

const Cart = () => {
  const { id } = jwtDecode(localStorage.getItem("token"));
  const [total, setTotal] = useState(0);
  const { removeItem, clearCart, shipping_fee, setDec, setInc } =
    useCartContext();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const { isLoading, setLoading } = useProductContext();

  const getCartItems = async () => {
    setLoading(true);
    const data = await fetchData(`/cart/getcartitems/${id}`);
    let totPrice = 0;
    let notPaidItems = [];
    for (let index = 0; index < data.length; index++) {
      if (!data[index].paid) {
        totPrice += data[index].count * data[index].productId.price;
        notPaidItems.push(data[index]);
      }
    }
    setTotal(totPrice);
    setCart(notPaidItems);
    setLoading(false);
  };

  const checkoutHandler = async (amount) => {
    try {
      const key = await fetchData(`/payment/getkey/${id}`);

      const { data } = await axios.post(
        `/payment/checkout/${id}`,
        {
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const options = {
        key,
        amount: data.amount,
        currency: "INR",
        name: "ZenStore",
        description: "Online shopping transaction",
        image: logo,
        order_id: data.id,
        handler: function (response) {
          axios
            .post(
              `/payment/paymentverify/${id}`,
              {
                response,
                cart,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => navigate(`/paymentsuccess?reference=${res.data}`))
            .catch((err) => console.log(err));
        },
        prefill: {
          name: cart[0].userId.name,
          email: cart[0].userId.email,
          contact: cart[0].userId.mobile,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#5271FF",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  if (isLoading) return <Loading />;

  if (cart.length < 1) {
    return (
      <section className="cart-section">
        <div className="container cart-cont flex-center">
          <h3 className="error-text flex-center">No items in cart</h3>
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
          <p>Subtotal</p>
          <p>Status</p>
          <p>Remove</p>
        </div>
        <hr />
        {cart.map((ele) => {
          return (
            <div
              key={ele._id}
              className="flex-around grid grid-six cart-mid"
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
              <p className="cart-name">{ele.paid ? "Paid" : "Pending"}</p>
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
            <button
              className="btn paybtn"
              onClick={() => {
                checkoutHandler(total + shipping_fee);
              }}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
