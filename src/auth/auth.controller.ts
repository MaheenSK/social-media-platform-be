import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { Public } from "./decorators/SkipAuth.decorator";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@Controller('auth')
export class AuthController{
  constructor(private readonly authService: AuthService){}

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto){
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto)
  }

  @Get('profile')
  getProfile(@Req() req){
    return this.authService.getProfile(req.user);
  }

  @Public()
  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto:ForgotPasswordDto){
    return this.authService.forgotPassword(forgotPasswordDto.email)
  }

  @Public()
  @Post('reset-password/:id')
  resetPassword(@Param('id') id:string, @Body() resetPasswordDto:ResetPasswordDto){
    return this.authService.resetPassword(id,resetPasswordDto.password)
  }
}