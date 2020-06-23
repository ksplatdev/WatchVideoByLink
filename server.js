"use strict";
const path = require("path");
const express = require("express");
const favicon = require("serve-favicon");
const app = express();

// show website icon on tab
app.use(favicon(path.join(__dirname, "client", "images", "favicon", "favicon.ico")));

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