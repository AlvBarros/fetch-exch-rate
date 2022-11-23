import { Module } from '@nestjs/common';
import { ExternalProviderModule } from 'src/external-provider/external-provider.module';
import { ExchangeRatesController } from './exchange-rates.controller';
import { ExchangeRatesService } from './services/exchange-rates.service';
import { CacheService } from './services/cache.service';

@Module({
    imports: [ExternalProviderModule],
    controllers: [ExchangeRatesController],
    providers: [ExchangeRatesService, CacheService],
  })
export class ExchangeRatesModule {}
