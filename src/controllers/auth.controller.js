import * as authService from '../services/auth.service';
import * as googleService from '../services/google.service';
import * as passwordService from '../services/password.service';
import throwError from '../helpers/error.helper';
import grant from '../constants/grant.types';

export const login = async (req, res, next) => {
  const { grant_type, email, password, code } = req.body;

  let tokens;

  switch (grant_type) {
    case grant.LOCAL_LOGIN:
      tokens = await authService.localLogin(email, password);

      res.success(tokens);
      break;

    case grant.REFRESH_TOKEN:
      const access_token = await authService.refreshToken(req.user);

      res.success({ access_token });
      break;

    case grant.GOOGLE_LOGIN:
      tokens = await authService.googleLogin(code);

      res.success({ tokens });
      break;

    default:
      throwError('Invalid grant type', 400);
  }
};

export const getGoogleAuthUrl = (req, res, next) => {
  const url = googleService.getGoogleAuthUrl();

  res.success({ url });
};

export const logout = async (req, res, next) => {
  await authService.logout(req.user);

  res.success('User logged out successfully');
};

export const handlePassword = async (req, res, next) => {
  const { grant_type, email, old_password, new_password } = req.body;

  switch (grant_type) {
    case grant.FORGOT_PASSWORD:
      await passwordService.forgotPassword(email);

      res.success('Please check your email!');
      break;

    case grant.RESET_PASSWORD:
      await passwordService.resetPassword(req.user, new_password);

      res.success('Password has been reset');
      break;

    case grant.CHANGE_PASSWORD:
      await passwordService.changePassword(req.user, old_password, new_password);

      res.success('Password has been changed');
      break;

    default:
      throwError('Invalid grant_type', 400);
  }
};
