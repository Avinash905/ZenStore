const Item = require("../models/itemModel");

const getitems = async (req, res, next) => {
  try {
    const { min, max, ...others } = req.query;

    const items = await Item.find({
      ...others,
      price: { $gte: min || 1, $lte: max || 999999 },
    });

    return res.send(items);
  } catch (error) {
    next(error);
  }
};

const getitem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.itemid);
    return res.send(item);
  } catch (error) {
    next(error);
  }
};

const createitem = async (req, res, next) => {
  try {
    const item = await Item({
      ...req.body,
    });

    const result = await item.save();

    return res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

const updateitem = async (req, res, next) => {
  try {
    if (req.body.type === "inc") {
      await Item.findByIdAndUpdate(req.params.itemid, {
        count: count + 1,
      });
    } else {
      await Item.findByIdAndUpdate(req.params.itemid, {
        count: count - 1,
      });
    }

    return res.status(201).send("Item updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteitem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.itemid);

    return res.status(201).send("Item deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getitems,
  getitem,
  createitem,
  updateitem,
  deleteitem,
};
