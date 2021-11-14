const Product = require("../../schemas/product");

module.exports = async (req, res) => {
  try {
    let products = await Product.find().sort({ date: -1 });
    res.json(products);
    console.log('consoling products', products)
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
    console.log('consoling error', error)
  }
};
