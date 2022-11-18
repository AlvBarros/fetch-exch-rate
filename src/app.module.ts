import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthcheckService } from './healthcheck/healthcheck.service';
import { ExchangeRatesService } from './exchange-rates/exchange-rates.service';
import { CurrenciesController } from './currencies/currencies.controller';
import { ExchangeRatesController } from './exchange-rates/exchange-rates.controller';

@Module({
  imports: [],
  controllers: [AppController, CurrenciesController, ExchangeRatesController],
  providers: [HealthcheckService, ExchangeRatesService],
})
export class AppModule {}
