const { validationResult } = require("express-validator");
const Post = require("../../schemas/Post");
const User = require("../../schemas/User");

module.exports = async (req, res) => {
  let { textOfThePost } = req.body;
  const errors = validationResult(req);
  console.log('list of errors', errors);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    let user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json("User not found");

    console.log('list of errors', errors);

    let newPost = new Post({
      textOfThePost,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });
    await newPost.save();
    console.log('list of newpost', newPost);
    console.log('list of newpost name', newPost.name);

    console.log('list of errors', errors);

    res.json("Post is created, congratulations!", newPost);
    console.log('new post is --', newPost)
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...", error);
  }
};
