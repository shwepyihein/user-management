import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { catchError, flatMap, map, switchMap } from 'rxjs/operators';
import { User, UserSignUpAndLoginDto } from './model/user.dto';
import { UserEntity } from './model/user.entity';
import { from } from 'rxjs';
import { AuthService } from '../shared/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  async loginWithEmailandPassword(data: UserSignUpAndLoginDto) {
    const user = await this.userRepo.findOne({
      where: { user_Id: data.user_Id },
    });
    if (!user) throw new BadRequestException('Please Register First!');
    if (!user.password)
      throw new UnauthorizedException('You have not set password yet!');

    const match = this.authService.comparePasswords(
      data.password,
      user.password,
    );

    if (match) {
      return this.authService
        .generateJWT({ id: user.id, role: user.role })
        .pipe(
          map((jwt) => {
            return { token: jwt };
          }),
        );
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }

  UserSignUp(data: UserSignUpAndLoginDto) {
    return this.authService.hashPassword(data.password).pipe(
      switchMap((passwordHash: string) => {
        const newUser = {
          user_Id: data.user_Id,
          password: passwordHash,
        };
        return from(
          this.userRepo.save(newUser).catch((err) => {
            switch (err.name) {
              case 'QueryFailedError':
                throw new BadRequestException(err.detail);
              default:
                throw new BadRequestException(err);
            }
          }),
        ).pipe(
          flatMap((user) => {
            return this.authService
              .generateJWT({ id: user.id, role: user.role })
              .pipe(
                map((jwt: string) => {
                  return { token: jwt };
                }),
              );
          }),
        );
      }),
    );
  }

  async getUserDetail({ id }) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    delete user.password;
    return user;
  }

  async getUpdateUser({ id, data }) {
    await this.userRepo.update(id, { ...data });

    return { message: 'success' };
  }
}
