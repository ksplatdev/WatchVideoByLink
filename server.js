"use strict";
const path = require("path");
const express = require("express");
const favicon = require("serve-favicon");
const streamVideoFile = require("./streamVideo");
const app = express();

// show website icon on tab
app.use(favicon(path.join(__dirname, "client", "images", "favicon", "favicon.ico")));

app.get("/thumbnail/:videoID/:thumbnailID", streamImageById);
function streamImageById(req, res){
  streamVideoFile.streamThumbnail(req, res, req.params.videoID, req.params.thumbnailID);
}

app.get("/delete-video-data-permanently/:id", deletevideoData);
function deletevideoData(req, res){
  streamVideoFile.deletevideoData(req, res, req.params.id);
}

app.get("/video/:id", streamVideoById);
function streamVideoById(req, res){
  streamVideoFile.streamVideo(req, res, req.params.id);
}

app.get("/video-data/:id", findVideosByID);
function findVideosByID(req, res){
  res.json(streamVideoFile.findVideosByID(req.params.id));
}


app.get("/all-available-video-data", getAllAvailableVideos);
function getAllAvailableVideos(req, res){
  res.json(streamVideoFile.getAllAvailableVideos());
}


app.post("/downloadVideoStream", express.json(), downloadVideoStream);
function downloadVideoStream(req, res){
  streamVideoFile.downloadVideoStream(req, res);
}

app.post("/downloadVideo", express.json(), downloadVideo);
function downloadVideo(req, res){
  streamVideoFile.downloadVideo(req, res);
}

app.post("/trimVideo", express.json(), trimVideo);
function trimVideo(req, res){
  streamVideoFile.trimVideo(req, res);
}

app.post("/stopDownloadVideoStream", express.json(), stopDownloadVideoStream);
function stopDownloadVideoStream(req, res){
  streamVideoFile.stopDownloadVideoStream(req, res);
}

// load path name /saved/videos with index.html page
app.all("/saved/videos", savedVideos);
function savedVideos(req, res){
  res.sendFile(path.join(__dirname, "client", "index.html"));
}

// adds html as extensions, dont need to write index.html
app.use(express.static("client", { extensions: ["html"] }));

// if page not found redirect to home page
app.get("*", function(req, res){
   res.status(404).redirect("/");
});

// application runs on port 8080
app.set("port", (process.env.PORT || 8080));
app.listen(app.get("port"), function() {
  console.log("Server running at:" + app.get("port"));
});
