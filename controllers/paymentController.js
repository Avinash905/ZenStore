const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/paymentModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const getkey = async (req, res, next) => {
  try {
    res.send(process.env.RAZORPAY_API_KEY);
  } catch (error) {
    next(error);
  }
};

const checkout = async (req, res, next) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.send(order);
  } catch (error) {
    next(error);
  }
};

const paymentverify = async (req, res, next) => {
  try {
    let body =
      req.body.response.razorpay_order_id +
      "|" +
      req.body.response.razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === req.body.response.razorpay_signature) {
      for (let index = 0; index < req.body.cart.length; index++) {
        const element = req.body.cart[index];
        await Cart.findByIdAndUpdate(req.body.cart[index]._id, {
          paid: true,
        });
      }

      const payment = Payment({
        ...req.body.response,
        userId: req.user.id,
      });
      await payment.save();

      res.send(req.body.response.razorpay_payment_id);
    } else {
      res.status(400).send("Payment Error");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { getkey, checkout, paymentverify };
