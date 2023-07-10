import bcrypt from 'bcryptjs';
import db from '../models/index';
import throwError from '../helpers/error.helper';
import { getGoogleUser } from './google.service';
import { signToken, deleteToken } from '../utils/token.util';

export const localLogin = async (email, password) => {
  const user = await db.User.findOne({ where: { email } });

  if (user.isGoogleLogin) throwError('Please use Google login', 403);

  if (!user?.password || !password || !bcrypt.compareSync(password, user.password)) {
    throwError('Invalid email or password', 401);
  }

  const access_token = await signToken(user, 'access');
  const refresh_token = await signToken(user, 'refresh');

  return { access_token, refresh_token };
};

export const refreshToken = async (user) => {
  await deleteToken(user.id, 'access');

  return await signToken(user, 'access');
};

export const googleLogin = async (code) => {
  const authorizationCode = decodeURIComponent(code);

  const userInfo = await getGoogleUser(authorizationCode);

  let user = await db.User.findOne({ where: { email: userInfo.email } });

  if (!user) {
    user = await db.User.create({
      fullName: userInfo.name,
      email: userInfo.email,
      isGoogleLogin: true,
    });
  }

  const access_token = await signToken(user, 'access');
  const refresh_token = await signToken(user, 'refresh');

  return { access_token, refresh_token };
};

export const logout = async (user) => {
  await deleteToken(user.id, 'access');
  await deleteToken(user.id, 'refresh');

  return;
};
