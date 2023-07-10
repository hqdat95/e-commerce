import Redis from 'ioredis';
import logger from './winston';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: process.env.REDIS_DB,
  password: process.env.REDIS_PASSWORD,
});

redis.on('ready', () => {
  logger.info('Server is connection to Redis');
});

redis.on('error', (err) => {
  logger.error('Error connecting to Redis:', err);
});

export default redis;
