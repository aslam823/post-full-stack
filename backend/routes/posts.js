const express = require("express");
const multer = require("multer");
const router = express.Router();
const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post("", checkAuth, multer({storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
  });
  post.save()
    .then((createdPost) => {
      console.log("Post created:", createdPost);
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    })
    .catch((error) => {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Creating post failed!" });
    });
});

router.put("/:id", checkAuth, multer({storage: storage}).single('image'), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });
  console.log("Updating post:", post);
  Post.updateOne({
    _id: req.params.id
  }, post).then((result) => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", checkAuth, (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery.then((posts) => {
    fetchedPosts = posts;
    return Post.countDocuments();
  }).then((count) => {
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: fetchedPosts,
      maxPosts: count
  });
  });
});

router.get("/:id", checkAuth, (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        console.log("Post fetched:", post);
        res.status(200).json(post);
      } else {
        console.log("Post not found");
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch((error) => {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Fetching post failed!" });
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log("Post deleted:", result);
      res.status(200).json({ message: "Post deleted!" });
    })
    .catch((error) => {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Deleting post failed!" });
    });
});

module.exports = router;