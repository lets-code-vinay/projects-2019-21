const Post = require("../../schemas/Post");

module.exports = async (req, res) => {
  try {
    let posts = await Post.find();
    let userPosts = posts.filter(
      (post) => post.user.toString() === req.user.id.toString()
    );
    res.json(userPosts, posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...", error);
  }
};
