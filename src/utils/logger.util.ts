import { utilities, WinstonModule } from "nest-winston";
import * as winston from "winston";
import * as winstonDaily from "winston-daily-rotate-file";

/**
 * 0: error
 * 1: warn
 * 2: info
 * 3: http
 * 4: verbose
 * 5: debug
 * 6: silly
 */

const environment = process.env.NODE_ENV;

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

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: environment === "production" ? "http" : "silly",
      format:
        environment === "production"
          ? winston.format.simple()
          : winston.format.combine(
              winston.format.timestamp(),
              winston.format.colorize(),
              utilities.format.nestLike("SimpleBoard", { prettyPrint: true }),
            ),
    }),

    // save as file
    new winstonDaily(dailyOptions("error")),
    new winstonDaily(dailyOptions("warn")),
    new winstonDaily(dailyOptions("info")),
  ],
});
