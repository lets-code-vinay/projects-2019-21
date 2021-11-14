const Category = require('../models/category')


exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec()
    .then((cate) => {
      req.category = cate
      next()
    })
    .catch((err) => {
      return res.status(400).json({
        error: "category not found in DB"
      })
    })

}

exports.createCategory = (req, res) => {
  const category = new Category(req.body)
  category.save()
    .then((cat) => {
      res.json({ cat })
    })
    .catch((err) => {
      return res.status(400).json({
        error: "not able to save category in DB"
      })
    })


}


exports.getCategory = (req, res) => {
  return res.json(req.category)
}



exports.getAllCategory = (req, res) => {
  Category.find().exec()
    .then((categories) => {
      //console.log(categories)
      res.json({ categories })
    })
    .catch((err) => {
      return res.status(400).json({
        error: "not able to find all category"
      })
    })
}

exports.updateCategory = (req, res) => {
  const category = req.category
  category.name = req.body.name
  category.save()
    .then((updatedCat) => {
      res.json(updatedCat)
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Failed to update category"
      })
    })

}


exports.removeCategory = (req, res) => {
  const category = req.category
  category.remove()
    .then((cat) => {
      res.json({ message: `${cat} Successfully deleted` })
    })
    .catch((err) => {
      return res.status(400).json({
        error: "not able delete category"
      })
    })

}
