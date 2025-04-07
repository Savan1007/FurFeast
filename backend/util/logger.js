const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const logFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.json()
);

const transport = new transports.DailyRotateFile({
  filename: 'logs/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    transport,
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  ]
});

module.exports = logger;
