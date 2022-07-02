const mongoose = require("mongoose");

// 與 mongoDB 建立連線
mongoose.connect("mongodb://localhost:27017/demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;