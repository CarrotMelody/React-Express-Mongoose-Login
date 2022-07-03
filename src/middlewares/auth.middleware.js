const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  // 登入及註冊不需要 token
  if (['/login', '/register'].includes(req.url)) {
    next();
  } else {
    try {
      // 從來自客戶端請求的 header 取得和擷取 JWT
      let token = req.headers.authorization;
      // headers 中存在 token
      if (token) {
        // 將 token 前方 Bearer 刪掉
        token = token.replace("Bearer ", "");
        // 驗證 Token 是否有效
        const decoded = jwt.verify(token, "pluto");
        // 查詢 token 解密出來所包含的 id 與帳號是否在 db 中存在
        const user = await User.findOne({
          _id: decoded._id,
          account: decoded.account,
        });
        // 沒找到該用戶代表 token 無效
        if (!user) {
          throw new Error('WRONG_TOKEN');
        }
        // token 有效
        next();
      } else {
        // headers 中並無 token
        throw new Error('WRONG_TOKEN');
      }
    } catch (err) {
      res.status(403).send({ success: false, message: `您無權進行此操作。${err}` });
    }
  }
};