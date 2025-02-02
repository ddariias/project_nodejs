import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,

  mongo_url: process.env.MONGO_URL,

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
};
