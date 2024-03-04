import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto){
    return this.userService.updateUser(req.user.userId, updateUserDto)
  }
}
