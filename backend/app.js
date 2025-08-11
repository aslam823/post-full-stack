require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();
const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.error("Connection failed!", error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post
    .save()
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

app.get("/api/posts", (req, res, next) => {
  Post.find().then((posts) => {
    console.log("Posts fetched:", posts);
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: posts
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
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

module.exports = app;