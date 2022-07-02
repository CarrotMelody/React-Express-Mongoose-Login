const app = require("./webserver");
const port = process.env.PORT || 8080;

// 取得資料庫連線狀態
const mongoose = require('./db');
const db = mongoose.connection;
db.on("error", (err) => console.error("connection error", err)); // 連線異常
db.once("open", (db) => console.log("Connected to MongoDB")); // 連線成功

app.listen(port);