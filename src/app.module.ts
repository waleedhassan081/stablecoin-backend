import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoinModule } from './coin/coin.module';

@Module({
  imports: [AuthModule, CoinModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
