import jwt from 'jsonwebtoken';
import config from '../config/auth';
import redis from '../config/redis';
import payload from '../helpers/payload.helper';
import throwError from '../helpers/error.helper';
import tokenTypes from '../constants/token.prefixes';

const tokenPrefix = (type) => {
  const prefix = tokenTypes[type];

  if (!prefix) {
    throwError('Invalid token type', 400);
  }
  return prefix;
};

export const signToken = async (user, type) => {
  let prefix = tokenPrefix(type);

  const token = jwt.sign(payload(user), config.tokenSecrets[type], {
    expiresIn: parseInt(config.tokenExpiresIn[type]),
  });

  await redis.set(`${prefix}:${user.id}`, token);
  await redis.expire(`${prefix}:${user.id}`, config.tokenExpiresIn[type]);

  return token;
};

export const getToken = async (userId, type) => {
  let prefix = tokenPrefix(type);

  return await redis.get(`${prefix}:${userId}`);
};

export const deleteToken = async (userId, type) => {
  let prefix = tokenPrefix(type);

  return await redis.del(`${prefix}:${userId}`);
};

export const verifyToken = async (token, type) => {
  try {
    const decodedToken = jwt.verify(token, config.tokenSecrets[type]);
    const redisToken = await getToken(decodedToken.id, type);

    if (!redisToken || redisToken !== token) {
      throwError(`Invalid or expired ${type} token`, 401);
    }

    return decodedToken;
  } catch (err) {
    throwError('Invalid token', 400);
  }
};
