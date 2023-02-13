const Cart = require("../models/cartModel");

const getcartitems = async (req, res, next) => {
  try {
    const cart = await Cart.find({ userId: req.params.id }).populate(
      "productId"
    );
    return res.send(cart);
  } catch (error) {
    next(error);
  }
};

const createcartitem = async (req, res, next) => {
  try {
    const found = await Cart.findOne({
      productId: req.body.productId,
      color: req.body.color,
    });
    if (found) {
      const result = await Cart.findByIdAndUpdate(found._id, {
        count: found.count + req.body.count,
      });
      return res.status(201).send(result);
    }

    const cart = Cart({
      ...req.body,
    });
    const result = await cart.save();

    return res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

const updatecount = async (req, res, next) => {
  try {
    const item = await Cart.findOne({ _id: req.params.cartid }).populate(
      "productId"
    );

    if (req.body.type === "inc") {
      if (item.productId.stock <= item.count) {
        return res.send("No more stock available");
      }
      await Cart.findByIdAndUpdate(req.params.cartid, {
        count: item.count + 1,
      });
    } else if (req.body.type === "dec") {
      await Cart.findByIdAndUpdate(req.params.cartid, {
        count: item.count - 1,
      });
    }

    return res.status(201).send("Item updated successfully");
  } catch (error) {
    next(error);
  }
};

const deletecartitem = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.cartid);

    return res.status(201).send("Cart item deleted successfully");
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const deleteall = async (req, res, next) => {
  try {
    const cart = await Cart.deleteMany({ userId: req.params.id });

    return res.status(201).send("Cart items deleted successfully");
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

module.exports = {
  getcartitems,
  createcartitem,
  updatecount,
  deletecartitem,
  deleteall,
};
