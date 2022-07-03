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

const auth = require("./middlewares/auth.middleware");
WebServer.use(auth);
require("./routes")(WebServer, cors);

// 捕獲錯誤
const errors = [
  { key: 'WRONG_TOKEN', message: "TOKEN 無效" },
  { key: 'WRONG_ACCOUNT', message: "帳號錯誤" },
  { key: 'WRONG_PASSWORD', message: "密碼錯誤" },
  { key: 'DUPLICATE_ACCOUNT', message: "該帳號已被註冊" }
];

WebServer.use((err, req, res, next) => {
  const errorIndex = errors.findIndex(item => item.key === err.message);

  if (errorIndex > -1)
    return res.status(401).send({ success: false, message: errors[errorIndex].message });
  else
    res.status(500).send({ success: false, message: "伺服器端錯誤" });
});

module.exports = WebServer;