import session from 'express-session';
import RedisStore from 'connect-redis';
import redis from '../config/redis';

export default session({
  store: new RedisStore({
    client: redis,
    ttl: 24 * 60 * 60,
  }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
});
