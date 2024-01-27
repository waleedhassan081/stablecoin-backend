import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../auth/controller/auth/auth.controller';
import { AuthService } from '../auth/service/auth/auth.service';
import { UserService } from './service/user/user.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || '026b34c921585a8f3c628667244f9fa8de565aef02b7458a7ef6b21ec0c8b126',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule { }
