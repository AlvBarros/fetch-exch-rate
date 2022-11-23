import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { HealthcheckService } from "./healthcheck/healthcheck.service";
import { ExchangeRatesModule } from "./exchange-rates/exchange-rates.module";
import { ConfigModule } from "@nestjs/config";
import { ExternalProviderModule } from "./external-provider/external-provider.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ExchangeRatesModule,
    ExternalProviderModule
  ],
  controllers: [AppController],
  providers: [HealthcheckService],
})
export class AppModule {}
