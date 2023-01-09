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
  email: string;

  @ApiProperty()
  martial_status: string;

  @ApiProperty()
  salutation?: string;

  @ApiProperty()
  first_name?: string;

  @ApiProperty()
  last_name?: string;

  @ApiProperty()
  mobile?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  country?: string;

  @ApiProperty()
  postal_code?: string;

  @ApiProperty()
  nat?: string;

  @ApiProperty()
  dob?: string;

  @ApiProperty()
  gender?: string;

  @ApiProperty()
  spouse_salutation?: string;

  @ApiProperty()
  spouse_first_name?: string;

  @ApiProperty()
  spouse_last_name?: string;

  @ApiProperty()
  hobbies?: string;

  @ApiProperty()
  sport?: string;

  @ApiProperty()
  music?: string;

  @ApiProperty()
  movie?: string;

  @ApiProperty()
  marital_status?: string;
}
