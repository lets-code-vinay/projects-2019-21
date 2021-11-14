const Category = require("../../schemas/category");

module.exports = async (req, res) => {
  try {
    let category = await Category.findById(req.params.category_id);
    res.json(category);
    console.log('here is category by id', category)
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};
