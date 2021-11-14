const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    stokes: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);
