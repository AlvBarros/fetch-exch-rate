import { Module } from '@nestjs/common';
import { CurrencyApiModule } from './providers/currency-api/currency-api.module';

@Module({
    imports: [CurrencyApiModule]
})
export class ExternalProviderModule {}
