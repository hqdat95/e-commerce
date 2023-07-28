import bcrypt from 'bcryptjs';
import db from '../models/index';
import sendMail from './mail.service';
import throwError from '../helpers/error.helper';
import checkGoogleLogin from '../utils/google.util';
import { signToken, deleteToken } from '../utils/token.util';

const updatePassword = async (user, new_password) => {
  user.password = new_password;
  await user.save();
};

export const forgotPassword = async (email) => {
  const user = await db.User.findOne({ where: { email } });

  if (!user) throwError('Invalid email', 400);

  checkGoogleLogin(user);

  const token = await signToken(user, 'password');

  const mailResponse = await sendMail.resetPassword(email, token);

  return { mailResponse, token };
};

export const resetPassword = async (user, new_password) => {
  checkGoogleLogin(user);

  await updatePassword(user, new_password);

  return await deleteToken(user.id, 'password');
};

export const changePassword = async (user, old_password, new_password) => {
  checkGoogleLogin(user);

  if (user && !bcrypt.compareSync(old_password, user.password)) {
    throwError('Password is incorrect , please try again !', 401);
  }

  return updatePassword(user, new_password);
};
