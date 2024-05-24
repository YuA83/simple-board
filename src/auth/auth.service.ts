import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { AuthEntity } from "./entities/auth.entity";
import authConfig from "../config/auth.config";
import { JwtService } from "../jwt/jwt.service";
import { UserEntity } from "../user/entities/user.entity";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,

    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private jwt: JwtService,
  ) {}

  // create and return token
  async login(createAuthDto: CreateAuthDto): Promise<string> {
    const { id, pw } = createAuthDto;

    const user = await this.userRepository.findOne({
      select: ["pw", "user_code"],
      where: { id, del: "N" },
    });

    const isMatch = await bcrypt.compare(pw, user.pw);

    if (!isMatch) throw new UnauthorizedException();

    const token = this.jwt.create({ id, pk: user.user_code });

    await this.authRepository.insert({ user_code: user.user_code, token });

    return token;
  }

  // remove token in DB
  async logout(token: string): Promise<void> {
    const decoded = this.jwt.verify(token);

    await this.authRepository.update(
      { user_code: decoded.pk, token },
      { del: "Y" },
    );
  }
}
