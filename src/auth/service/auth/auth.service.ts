// src/auth/auth.service.ts

import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { UserService } from '../../service/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../interface/user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(user: User): Promise<{ accessToken: string; statusCode: number }> {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      statusCode: HttpStatus.OK,
    };
  }
}
