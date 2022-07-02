const User = require("../models/User");

module.exports = function (app, cors) {
  // post /user 註冊用戶
  app.post("/user", async (req, res) => {
    try {
      // 新增一個 User model 的實例(instance)
      const user = new User(req.body);
      // 將資料保存到 db 中
      await user.save();
      res.send(user);
    } catch (e) {
      res.status(404).send(e);
    }
  });

  // get /user/list 獲取用戶列表
  app.get("/user/list", (req, res) => {
    User.find({}, (err, doc) => {
      if (err) res.status(404).send(err);
      res.send(doc);
    });
  });

  // put /user 修改用戶資料
  app.put("/user", (req, res) => {
    const { account } = req.query;
    const filter = { account }; // 欲修改的用戶
    const update = req.body; // 修改的內容

    // 不能修改帳號
    if ("account" in req.body) {
      res.status(403).send({ success: false, message: "無法修改帳號。" });
    } else {
      // 找到該用戶並修改資料
      User.updateOne(filter, update, (err, doc) => {
        if (err) res.status(404).send(err);
        // 沒找到該用戶
        if (!doc.matchedCount) {
          res.status(404).send({ success: false, message: `使用者${account}並不存在。` });
        }
        res.send({ success: true, message: `修改使用者${account}成功！` });
      });
    }
  });

  // delete /user 刪除使用者
  app.delete("/user", (req, res) => {
    const { account } = req.query;

    User.deleteOne({ account }, (err, doc) => {
      if (err) res.status(404).send(err);
      // 沒找到該用戶
      if (!doc.deletedCount) {
        res.status(404).send({ success: false, message: `使用者${account}並不存在。` });
      }
      res.send({ success: true, message: `刪除使用者${account}成功！` });
    });
  });
}