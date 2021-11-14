//Todo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillingSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "User" },
  address1: { type: String, required: true },
  landmark: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const Billing = mongoose.model("Billing", BillingSchema);
module.exports = Billing;
