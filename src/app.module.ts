import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthcheckService } from './healthcheck/healthcheck.service';
import { ExchangeRatesService } from './exchange-rates/services/exchange-rates.service';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';

@Module({
  imports: [ExchangeRatesModule],
  controllers: [AppController],
  providers: [HealthcheckService],
})
export class AppModule {}
