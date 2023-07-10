import dotenv from 'dotenv';
dotenv.config();

export default {
  tokenSecrets: {
    access: process.env.JWT_ACCESS_TOKEN_SECRET,
    refresh: process.env.JWT_REFRESH_TOKEN_SECRET,
    password: process.env.JWT_RESET_PASSWORD_TOKEN_SECRET,
  },

  tokenExpiresIn: {
    access: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refresh: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    password: process.env.JWT_RESET_PASSWORD_TOKEN_EXPIRES_IN,
  },
};
