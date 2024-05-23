import { Injectable } from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import { CreateJwtDto } from "./dto/create-jwt.dto";

@Injectable()
export class JwtService {
  constructor(private readonly jwt: NestJwtService) {}

  create(payload: CreateJwtDto): string {
    return this.jwt.sign(payload);
  }

  verify(token: string) {
    return this.jwt.verify(token);
  }
}
