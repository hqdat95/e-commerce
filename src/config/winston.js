import { createLogger, format, transports, addColors } from 'winston';

const logger = (() => {
  const levels = { error: 0, warn: 1, info: 2 };
  const colors = { error: 'red', warn: 'yellow', info: 'green' };

  addColors(colors);

  return createLogger({
    levels,
    format: format.combine(
      format.colorize({ level: true, message: false }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS',
      }),
      format.printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`),
    ),
    transports: [new transports.Console()],
  });
})();

export default logger;
