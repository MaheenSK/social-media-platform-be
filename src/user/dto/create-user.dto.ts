import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Matches, MinLength, IsAlpha, IsEnum } from 'class-validator';

enum Gender {
  Male = 'M',
  Female = 'F',
  Other = 'O',
}

export class CreateUserDto {
  @ApiProperty({ description: 'User email address' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ 
    description: 'Username can only contain letters, numbers, and underscores. It must start with a letter or underscore.',
    pattern: '^[a-zA-Z_][a-zA-Z0-9_]*$'
  })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z_][a-zA-Z0-9_]*$/, { message: 'Username can only contain letters, numbers, and underscores. It must start with a letter or underscore.' })
  username: string;

  @ApiProperty({ minLength: 6, description: 'User password' })
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;

  @ApiProperty({ description: 'User full name' })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s]*$/, { message: 'Full name can only contain letters and spaces.' })
  fullName: string;

  @ApiProperty({ enum: Gender, description: 'User gender (M for Male, F for Female, O for Other)' })
  @IsNotEmpty()
  @IsEnum(Gender, { message: 'Gender must be one of: M, F, O' })
  gender: Gender

  @ApiProperty({ description: 'User date of birth' })
  @IsNotEmpty()
  dob: string;
}
