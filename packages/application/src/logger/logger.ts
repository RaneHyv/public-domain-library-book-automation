import { config, createLogger, format, transports } from "winston";

const SYSLOG_COLORS: Record<string, string> = {
  debug: "magenta",
  info: "white",
  notice: "green",
  warning: "yellow",
  error: "bold red",
  crit: "inverse yellow",
  alert: "bold inverse red",
  emerg: "bold inverse magenta",
} as const;

const logger = createLogger({
  levels: config.syslog.levels,
  format: format.combine(
    format.timestamp({ format: "DD-MM-YY HH:mm:ss" }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      const metaString = Object.keys(meta).length
        ? JSON.stringify(meta, null, 2)
        : "";
      return `[${timestamp.replace(" ", "] [")}] [${level.toLocaleUpperCase()}]: ${message} ${metaString}`;
    }),
    format.colorize({ all: true, colors: SYSLOG_COLORS })
  ),
  transports: [new transports.Console()],
});

export default logger;
