const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");

dotenv.config();
require("./db");

const app = express();

app.set("view engine", "hbs");
app.set("view options", { layout: "layout" });

hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    name: "sequelizeSession",
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    }
  })
);

// Routes
app.use(require("./routes/userRoutes"));

app.get("/", (_, res) => res.send("Hello world"));

module.exports = app;
