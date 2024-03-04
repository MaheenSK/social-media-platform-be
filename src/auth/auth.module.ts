import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./guards/auth.guard";

@Module({
  imports:[UserModule, JwtModule.register({
    global:true,
    secret:'This is a secret key',
    signOptions:{
      expiresIn:'1h'
    }
  })],
  providers: [AuthService, JwtStrategy, {
    provide:APP_GUARD,
    useClass: JwtAuthGuard
  }],
  controllers: [AuthController]
})
export class AuthModule{}