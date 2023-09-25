/** @format */

// routes/videos.js

const express = require("express");
const router = express.Router();
const uuid = require("uuid");

// GET /videos
router.get("/", (req, res) => {
  const videoList = req.videos.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      description: video.description,
      views: video.views,
      likes: video.likes,
      duration: video.duration,
      video: video.video,
      timestamp: video.timestamp,
      comments: video.comments,
    };
  });
  res.json(videoList);
});

// GET /videos/:id
router.get("/:id", (req, res) => {
  const video = req.videos.find((video) => video.id === req.params.id);
  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

// POST /videos
router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (title && description) {
    const newVideo = {
      id: uuid.v4(),
      title: req.body.title,
      description: req.body.description,
      channel: req.body.channel,
      image: req.body.image,
      views: 123,
      likes: 43,
      duration: "4:05",
      video: "new video",
      timestamp: new Date().toISOString(),
      comments: [],
    };
    req.videos.push(newVideo);
    res.json(newVideo);
  } else {
    res.status(400).json({ message: "Please provide title and description" });
  }
});

// PUT /videos/:id
router.put("/:id", (req, res) => {
  const video = req.videos.find((video) => video.id === req.params.id);
  if (video) {
    const { title, description } = req.body;
    if (title && description) {
      video.title = title;
      video.description = description;
      res.json(video);
    } else {
      res.status(400).json({ message: "Please provide title and description" });
    }
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

module.exports = router;
