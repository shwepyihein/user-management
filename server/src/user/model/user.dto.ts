import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export interface User {
  id: number;
  email: string;
  userId: string;
  password: string;
  role: string;
}

export class UserSignUpAndLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  user_Id: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class userUpateDto {
  @ApiProperty()
  @IsNotEmpty()
  user_Id: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  martial_status: string;
}
