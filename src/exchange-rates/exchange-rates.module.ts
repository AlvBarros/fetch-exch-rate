import { CacheModule, Module } from '@nestjs/common';
import { ExternalProviderModule } from 'src/external-provider/external-provider.module';
import { ExchangeRatesController } from './exchange-rates.controller';
import { ExchangeRatesService } from './services/exchange-rates.service';

@Module({
    imports: [ExternalProviderModule, CacheModule.register({
      store: 'memory'
    })],
    controllers: [ExchangeRatesController],
    providers: [ExchangeRatesService],
  })
export class ExchangeRatesModule {}
