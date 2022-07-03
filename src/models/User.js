const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// 用戶 Schema
const UserSchema = new mongoose.Schema({
  account: {
    type: String, // 類型
    required: true, // 是否必要
    trim: true, // 是否需要消除前後空格
    unique: true, // 是否為一
    minLength: [5, "帳號需至少 5 個字符以上"], // [最小長度, 錯誤訊息]
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [5, "密碼需至少 5 個字符以上"],
    maxLength: 255,
    // 驗證密碼
    validate(value) {
      if (value.toLowerCase().includes("123456")) {
        throw new Error("密碼不能為123456!");
      }
    },
  },
  authority: {
    type: Number,
    required: true,
  }
}, {
  // 存入的 document 是否要有 createdAt 和 updatedAt 時間
  timestamps: true
});

// 產生 token 方法
UserSchema.methods.generateAuthToken = async function () {
  // this: 當前用戶實例
  const user = this;
  // 將使用者資料加密產生成 token
  const payload = { account: this.account, _id: user._id.toString() };
  const token = jwt.sign(payload, 'pluto', { expiresIn: '24h' });
  // 回傳 token
  return token;
}

// 驗證用戶是否存在
UserSchema.statics.findByCredentials = async (account, password) => {
  // 根據帳號至資料庫找尋該用戶資料
  const user = await User.findOne({ account });
  if (!user) throw new Error("WRONG_ACCOUNT");
  // 驗證密碼
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("WRONG_PASSWORD");
  // 驗證成功回傳該用戶完整資料
  return user;
}

// 會在 mongo 中建立名為 User 的 collection
const User = mongoose.model("User", UserSchema);

module.exports = User;