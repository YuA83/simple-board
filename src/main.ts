import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { winstonLogger } from "./utils/logger.util";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger, // 내장 로거 대체
  });

  await app.listen(3000);
}
bootstrap();
