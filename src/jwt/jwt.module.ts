import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";

import { JwtService } from "./jwt.service";

@Module({
  imports: [
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService], // 주입
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>("auth.jwt.secret"),
        signOptions: { expiresIn: config.get<string>("auth.jwt.expire") },
      }),
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
