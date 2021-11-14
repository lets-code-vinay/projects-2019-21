const Product = require("../models/product");
const multiparty = require("multiparty");
const product = require("../models/product");
const cloudinary = require("cloudinary").v2;

exports.getProductById = (req, res, next, id) => {
  // console.log("in get product by id")
  Product.findById(id)
    .populate("category")
    .exec()
    .then((product) => {
      req.product = product;
      // console.log(req.product)
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        error: "product not found",
      });
    });
};

exports.createProduct = (req, res) => {
  var form = new multiparty.Form({});

  form.parse(req, function (err, fields, files) {
    var data = {};
    //  console.log("files", files);
    if (files.photo[0].size != 0) {
      cloudinary.uploader
        .upload(files.photo[0].path)
        .then((result) => {
          data.photo = result.url;
          const {
            name,
            description,
            price,
            category,
            discount,
            stock,
          } = fields;
          if (
            !name ||
            !description ||
            !price ||
            !category ||
            !stock ||
            !discount
          ) {
            return res.status(400).json({
              error: "Please include all fields",
            });
          }
          (data.name = name[0]),
            (data.description = description[0]),
            (data.price = price[0]),
            (data.category = category[0]),
            (data.stock = stock[0]),
            (data.discount = discount[0]),
            (data.discountedPrice = data.price * ((100 - data.discount) / 100));

          let product = new Product(data);
          product
            .save()
            .then((product) => {
              //  console.log(product);
              res.json(product);
            })
            .catch((err) => {
              //  console.log(err);
              return res.status(400).json({
                error: "saving product in DB failed",
              });
            });
        })
        .catch((err) => {
          console.log(err);

          return res.status(400).json({
            error: "Unable to upload image in cloudinary",
          });
        });
    }
  });
};

exports.getProduct = (req, res) => {
  return res.json(req.product);
};

exports.getSearch = async (req, res) => {
  var search = req.query.q;
  try {
    let findData = await product.find({
      $or: [
        { name: new RegExp(search, "gi") },
        { description: new RegExp(search, "gi") },
      ],
    });
    res.json(findData);
  } catch (error) {
    console.log("ERR", error);
  }
};

exports.updateProduct = (req, res) => {
  var form = new multiparty.Form({});
  form.parse(req, async function (err, fields, files) {
    var data = {};
    // if (files.photo[0].size != 0) {
    //   await cloudinary.uploader
    //     .upload(files.photo[0].path)
    //     .then((result) => {
    //       data.photo = result.url;
    //     })
    //     .catch((err) => {
    //       return res.status(400).json({
    //         error: "Unable to upload image in cloudinary",
    //       });
    //     });
    // }
    const { name, description, price, category, stock, discount } = fields;
    if (name) {
      data.name = name[0];
    }
    if (description) {
      data.description = description[0];
    }
    if (price) {
      data.price = price[0];
    }
    if (category) {
      data.category = category[0];
    }
    if (stock) {
      data.stock = stock[0];
    }
    if (discount) {
      data.discount = discount[0];
      data.discountedPrice = data.price * ((100 - data.discount) / 100)
    }
    Product.findByIdAndUpdate(
      { _id: req.product.id },
      { $set: data },
      { new: true, useFindAndModify: false }
    )
      .then((updatedProduct) => {
        res.json(updatedProduct);
      })
      .catch((err) => {
        return res.status(400).json({
          error: "update product in DB failed",
        });
      });
  });
};

exports.removeProduct = (req, res) => {
  let product = req.product;
  product
    .remove()
    .then((deletedProduct) => {
      res.json({
        message: "Product deleted succesfully",
        deletedProduct,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: "failed to delete product",
      });
    });
};

exports.getAllProduct = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .populate("category")
    .sort([[sortBy, "asc"]])
    //   .limit(limit)
    .exec()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      return res.status(400).json({
        error: "No product Found",
      });
    });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {})
    .then((product) => {
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        error: "bulk opration failed",
      });
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {})
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      return res.status(400).json({
        error: "No category found",
      });
    });
};


exports.getProductByCategory = (req, res) => {
  const limit = 8;
  const page = parseInt(req.params.pageNum)
  Product.find({ category: req.params.categoryId }).limit(limit * page).skip(limit * (page - 1))
    .exec()
    .then(products => {
      return res.json({
        products: products,
        isNext: products.length === limit
      })

    })
    .catch((err) => {
      return res.status(400).json({
        error: "No Product found for this category",
      });
    });
}