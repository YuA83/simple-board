import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NestMiddleware,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    // const userAgent = req.get("user-agent");
    const start = Date.now();

    res.on("finish", () => {
      const { statusCode } = res;
      const duration = Date.now() - start; // ms

      this.logger.log(
        `[ ${method} ] ${statusCode} | ${duration}ms | \t ${originalUrl} |`,
      );
    });

    next();
  }
}
