import { utilities, WinstonModule } from "nest-winston";
import * as winston from "winston";
import * as winstonDaily from "winston-daily-rotate-file";

const { simple, combine, timestamp, colorize } = winston.format;

/**
 * 0: error
 * 1: warn
 * 2: info
 * 3: http
 * 4: verbose
 * 5: debug
 * 6: silly
 */

const isProd = process.env.NODE_ENV === "production";

const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: "YYYY-MM-DD",
    dirname: `${__dirname}/../../logs/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 30, // 30 days
    zippedArchive: true,
  };
};

const level = isProd ? "http" : "silly";
const format = isProd
  ? simple()
  : combine(
      timestamp(),
      colorize(), // nest-winston 1.10.x 이상일 경우, appName 미출력
      utilities.format.nestLike("SimpleBoard", { prettyPrint: true }),
    );

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({ level, format }),

    // save as file
    new winstonDaily(dailyOptions("error")),
    new winstonDaily(dailyOptions("warn")),
    new winstonDaily(dailyOptions("info")),
  ],
});
