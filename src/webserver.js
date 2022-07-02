const express = require("express");
const WebServer = express();
const cors = require("cors");

WebServer.use(cors());
WebServer.use(express.json());
WebServer.use(express.urlencoded({ extended: false }));

WebServer.get("/health", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send({ message: "I'm alive." });
});

WebServer.get("/", (req, res) => {
  res.send("Hello, World!");
});

require("./router")(WebServer, cors);

WebServer.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(err);
});

module.exports = WebServer;