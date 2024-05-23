import { registerAs } from "@nestjs/config";

export default registerAs("auth", () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE,
  },
}));
