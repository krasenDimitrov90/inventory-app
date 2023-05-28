const Post = require("../models/post");

module.exports.getPosts = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems = null;
    Post.find()
      .countDocuments()
      .then(count => {
        totalItems = count;
        return Post.find()
          .skip((currentPage - 1) * perPage)
          .limit(perPage)
  
      })
      .then((posts) => {
        res.status(200).json({
          message: "Fetched post Successfuly",
          posts: posts,
          totalItems: totalItems
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  
  };