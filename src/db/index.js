const mongoose = require("mongoose");

/**
 * 與 mongoDB 建立連連
 * mongodb://[資料庫帳號]:[資料庫密碼]@[MongoDB位置]:[port]/[資料庫名稱]
 * mongoDB 預設的 port 是 27017，這裡可以省略
 * todo 是 database 的名稱，當 app 執行時，mongoose 會自動建立這個 database
 */

mongoose.connect("mongodb://localhost:27017/demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;