const Product = require("../../schemas/product");

module.exports = async (req, res) => {
  try {
    let products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};
