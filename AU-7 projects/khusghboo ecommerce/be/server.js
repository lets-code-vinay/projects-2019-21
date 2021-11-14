const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//db connections

const mongoose = require("mongoose");
dbUrl = process.env.dbUrl;
mongoose
  .connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Mongo Atlas connected succcesfully");
  })
  .catch((err) => {
    console.log(err);
  });

//cloudinary setup

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    preflightContinue: true,
    credentials: true,
  })
);

//Routes
app.use("/", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/product", require("./routes/product"));
app.use("/category", require("./routes/category"));
app.use("/order", require("./routes/order"));
app.use("/payment", require("./routes/paymentBRoutes"));

//starting server
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
