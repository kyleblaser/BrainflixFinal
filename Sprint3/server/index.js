/** @format */

const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const { PORT, SERV_URL } = process.env;

if (!PORT || !SERV_URL) {
  console.error("Please define PORT and SERV_URL in your .env file.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

const videoRoutes = require("./routes/videos");

// Read the video data from the JSON file
const filePath = path.join(__dirname, "data", "video.json");
let videos = [];

try {
  videos = JSON.parse(fs.readFileSync(filePath, "utf-8"));
} catch (error) {
  console.error("Error reading video data:", error);
}

// Pass the videos array to the videoRoutes
app.use(express.static("public/images"));
app.use(
  "/videos",
  (req, res, next) => {
    req.videos = videos;
    next();
  },
  videoRoutes
);

// POST /videos
app.post("/videos", (req, res) => {
  const { title, description } = req.body;
  if (title && description) {
    const newVideo = {
      id: uuid.v4(),
      title: req.body.title,
      description: req.body.description,
      channel: req.body.channel || "some random channel",
      image: req.body.image || "", // add in image data later kyle
      views: 123,
      likes: 123,
      duration: "10:23",
      video: "", // add in video data later kyle
      timestamp: new Date().toISOString(),
      comments: [],
    };
    req.videos.push(newVideo);

    // Write the updated videos array to the JSON file
    fs.writeFile(filePath, JSON.stringify(req.videos), (err) => {
      if (err) {
        console.error("Error writing to JSON file:", err);
        res.status(500).json({ message: "Internal server error" });
      } else {
        // Send a JSON response with the new video data
        res.status(201).json(newVideo); // Use a 201 status code for successful resource creation
      }
    });
  } else {
    res.status(400).json({ message: "Please provide title and description" });
  }
});

// PUT /videos/:id
app.put("/videos/:id", (req, res) => {
  const videoIndex = req.videos.findIndex(
    (video) => video.id === req.params.id
  );
  if (videoIndex !== -1) {
    const { title, description } = req.body;
    if (title && description) {
      req.videos[videoIndex].title = title;
      req.videos[videoIndex].description = description;

      // Write the updated videos array to the JSON file
      fs.writeFile(filePath, JSON.stringify(req.videos), (err) => {
        if (err) {
          console.error("Error writing to JSON file:", err);
          res.status(500).json({ message: "Internal server error" });
        } else {
          res.json(req.videos[videoIndex]);
        }
      });
    } else {
      res.status(400).json({ message: "Please provide title and description" });
    }
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
