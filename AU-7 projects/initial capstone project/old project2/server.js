const express = require("express");
const app = express();
const connectToDatabase = require("./config/connectToDatabase");
const cors = require("cors");
const env = require('dotenv');
const path = require('path');

env.config();
//Function that connects express app to database
connectToDatabase();

//We prevent from cors policy warning
app.use(cors());

//Allows us to use body json thing to create posts
app.use(express.json({ extended: false }));

//uploading file  connecting 
app.use('/public/', express.static(path.join(__dirname, 'uploads')))

//Routes
app.use("/api/posts", require("./routes/posts.js"));
app.use("/api/users", require("./routes/users.js"));
app.use("/api/categories", require("./routes/category.js"));
app.use("/api", require("./routes/products.js"));

//We specified variable on which port our app will run (depends if heroku will give us port or we specify on 5000)
let PORT = process.env.PORT || 5000;

//Method to specify on which port we want our app to be with callback function to see if method works
app.listen(PORT, () => console.log(`---Server is on port: ${PORT}---`));
