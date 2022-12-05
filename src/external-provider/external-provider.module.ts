import { Module } from "@nestjs/common";
import { CurrencyApiModule } from "./providers/currency-api/currency-api.module";
import { ExternalProviderService } from "./external-provider.service";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { GoogleScraperModule } from './providers/google-scraper/google-scraper.module';
import { GoogleFinanceScraperModule } from './providers/google-finance-scraper/google-finance-scraper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CurrencyApiModule,
    HttpModule,
    GoogleScraperModule,
    GoogleFinanceScraperModule
  ],
  providers: [ExternalProviderService],
  exports: [ExternalProviderService]
})
export class ExternalProviderModule {}
