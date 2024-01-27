import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CoinController } from './controller/coin/coin.controller';
import { CoinService } from './service/coin/coin.service';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || '026b34c921585a8f3c628667244f9fa8de565aef02b7458a7ef6b21ec0c8b126',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CoinController],
  providers: [CoinService]
})
export class CoinModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CoinController); // Apply AuthMiddleware to all routes
  }
}