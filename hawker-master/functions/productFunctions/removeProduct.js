const Product = require("../../schemas/product");

module.exports = async (req, res) => {
  try {
    let product = await Product.findById(req.params.product_id);

    if (!product) return res.status(404).json("product not found");

    if (product.user.toString() !== req.user.id.toString())
      return res.status(401).json("You are not allowed to do that!");

    await product.remove();

    res.json("product is removed!");
    console.log('The', product , 'has been deleted successfully!!!!!!!!!')
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};
