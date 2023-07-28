import db from '../models/index';
import throwError from '../helpers/error.helper';
import { verifyToken } from '../utils/token.util';
import grants from '../constants/grant.types';

const validGrants = [grants.RESET_PASSWORD];

export default async (req, res, next) => {
  try {
    const requestedGrant = req.body.grant_type;

    if (requestedGrant && !validGrants.includes(requestedGrant)) {
      next();
      return;
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throwError('No password token provided', 401);

    const decoded = await verifyToken(token, 'password');

    const user = await db.User.findOne({ where: { id: decoded.id } });

    if (!user) throwError('User not found', 404);

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
