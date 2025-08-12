const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save()
    .then((createdPost) => {
      console.log("Post created:", createdPost);
      res.status(201).json({
        message: "Post added successfully",
        postId: createdPost._id
      });
    })
    .catch((error) => {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Creating post failed!" });
    });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({
    _id: req.params.id
  }, post).then((result) => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Post.find().then((posts) => {
    console.log("Posts fetched:", posts);
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: posts
    });
  });
});

router.get("/:id", (req, res, next) => {
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

router.delete("/:id", (req, res, next) => {
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