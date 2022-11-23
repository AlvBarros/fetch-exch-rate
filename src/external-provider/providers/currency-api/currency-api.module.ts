import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CurrencyApiService } from './currency-api.service';

@Module({
  imports: [HttpModule],
  providers: [CurrencyApiService]
})
export class CurrencyApiModule {}
