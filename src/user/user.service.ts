import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findUserByEmailOrUsername(email: string, username: string) {
    const res= await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });
    return res;
  }

  async findUseByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: {
        username: username
      }
    })
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: email
      }
    })
  }

  async findUser(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id
      }
    })
    return user;
  }

  async validateUser(identifier: string, password: string) {
    const user = await this.findUserByEmailOrUsername(identifier, identifier);
    if (!user) {
      throw new NotFoundException('User not found. Try signup.')
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new UnauthorizedException('Incorrect Password!')
    }
    return user;
  }


  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.findUserByEmailOrUsername(createUserDto.email, createUserDto.username);
    if (existingUser) {
      throw new ConflictException('User already exists. Try SignIn.')
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const { password, dob, ...userData } = createUserDto;
    return this.prisma.user.create({ data: { ...userData, password: hashedPassword, dob: new Date(dob) } })
  }

  async updateUser(id, updateUserDto) {
    const { username, password, ...updatedData } = updateUserDto;
  
    if (username) {
      const existingUser = await this.findUseByUsername(username);
      if (existingUser) {
        throw new ConflictException('Username unavailable');
      }
    }
  
    const user = await this.prisma.user.findUnique({
      where: { id }
    });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }
  
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updatedData
    });
  
    return updatedUser;
  }
  
}
