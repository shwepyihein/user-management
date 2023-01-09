import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guard/roles.guard';
import { UserSignUpAndLoginDto, userUpateDto } from './model/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private _userService: UserService) {}

  @Post('login')
  loginAdmin(@Body() data: UserSignUpAndLoginDto) {
    return this._userService.loginWithEmailandPassword(data);
  }

  @Post('signup')
  signup(@Body() data: UserSignUpAndLoginDto) {
    return this._userService.UserSignUp(data);
  }

  @Get('getInfo')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getOne(@User() id) {
    return this._userService.getUserDetail({ id: id });
  }

  @Put('update')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  UpdateInfo(@User() id: number, @Body() data: userUpateDto) {
    return this._userService.getUpdateUser({ id: id, data: data });
  }
}
