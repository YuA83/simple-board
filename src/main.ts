import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { winstonLogger } from "./utils/logger.util";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger, // 내장 로거 대체
  });

  app.setGlobalPrefix("api");

  await app.listen(process.env.PORT || 7000);
}
bootstrap();
