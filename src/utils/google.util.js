import throwError from '../helpers/error.helper';

export default (user) => {
  if (user.isGoogleLogin) {
    throwError('Operation not available for Google logged in users', 400);
  }
};
