import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { randomBytes } from "crypto";

@Injectable()
export class AuthService{
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    ){}

  register(registerDto: RegisterDto){
    return this.userService.createUser(registerDto)
  }

  async login(loginDto: LoginDto){
    const {identifier, password} = loginDto;
    const user = await this.userService.validateUser(identifier, password)
    const payload = {username: user.username, role: user.role, sub: user.id}
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

   async getProfile(user){
    const userProfile = await this.userService.findUser(user.userId)
    const { password, createdAt, updatedAt, ...userData} = userProfile;
    return userData;
   }

   async forgotPassword(email: string){
    const user = await this.userService.findUserByEmail(email)
    if(!user){
      throw new NotFoundException('User not found.')
    }
    const { password, createdAt, updatedAt, ...userData} = user;
    return userData
   }

   async resetPassword(id: string, password: string){
    return this.userService.updateUser(id, {password})
   }
}