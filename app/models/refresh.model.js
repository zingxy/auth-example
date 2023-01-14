import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    expireDate: Date,
  },
  {
    statics: {
      /* 创建refreshToken */
      async createToken(user) {
        // 过期时间
        const expireDate = new Date();
        expireDate.setSeconds(expireDate.getSeconds() + 10 * 60);

        const token = new this({
          user: user._id,
          expireDate,
        });
        const refreshToken = await token.save();
        return refreshToken._id;
      },
      /* 验证是否过期 */
      verifyExpiration(token) {
        return token.expireDate.getTime() < new Date().getTime();
      },
    },
  }
);

export const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
