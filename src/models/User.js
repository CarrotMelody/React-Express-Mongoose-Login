const mongoose = require("mongoose");

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

// 添加使用者相關方法
UserSchema.method("getAccount", function () {
  return this.account;
});

UserSchema.method("getAuthority", function () {
  return this.authority;
});

// 會在 mongo 中建立名為 User 的 collection
const User = mongoose.model("User", UserSchema);

module.exports = User;