import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthEntity } from "./entities/auth.entity";
import { JwtService } from "../jwt/jwt.service";
import { UserEntity } from "../user/entities/user.entity";
import { JwtModule } from "../jwt/jwt.module";

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity, UserEntity]), JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
