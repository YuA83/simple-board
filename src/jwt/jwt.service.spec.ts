import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtService } from "./jwt.service";
import authConfig from "../config/auth.config";

describe("JwtService", () => {
  let service: JwtService;
  let configService: ConfigService;
  let token: string;

  const payload = { id: "test01", name: "MJKim" };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: [`${__dirname}/../config/env/.test.env`],
          load: [authConfig],
        }),
        JwtModule.registerAsync({
          imports: [ConfigModule.forFeature(authConfig)],
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => ({
            secret: config.get<string>("auth.jwt.secret"),
            signOptions: { expiresIn: config.get<string>("auth.jwt.expire") },
          }),
        }),
      ],
      providers: [JwtService],
    }).compile();

    service = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe("Config", () => {
    it("secret", () => {
      const secret = configService.get<string>("auth.jwt.secret");

      expect(secret).toEqual("testkey");
    });

    it("expire", () => {
      const expire = configService.get<string>("auth.jwt.expire");

      expect(expire).toEqual("1h");
    });
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("create", () => {
    const gentoken = service.create(payload);

    console.log(gentoken);
    token = gentoken;

    expect(typeof gentoken).toEqual("string");
  });

  it("verify", () => {
    const decoded = service.verify(token);
    const { id, name } = decoded;

    console.log(decoded);

    expect({ id, name }).toEqual(payload);
  });
});
