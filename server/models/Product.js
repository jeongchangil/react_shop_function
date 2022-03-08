const mongoose = require("mongoose");
const moment = require("moment");
const { Schema } = require("mongoose");

//몽고디비 스키마 형식
const productSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
    default: [],
  },
  category: {
    type: Number,
    default: 1,
  },
  sold: {
    type: Number,
    maxlength: 100,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
});
const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
