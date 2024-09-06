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
      return `[${timestamp.replace(" ", "] [")}] ${
        meta.ID ? `[${meta.ID}] ` : ""
      }[${level.toLocaleUpperCase()}]: ${message} ${
        meta && meta.error ? meta.error : ""
      }`;
    }),
    format.colorize({ all: true, colors: SYSLOG_COLORS })
  ),
  transports: [new transports.Console()],
});

export default logger;
