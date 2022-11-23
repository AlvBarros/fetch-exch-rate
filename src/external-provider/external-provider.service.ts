import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CurrencyApiService } from "./providers/currency-api/currency-api.service";
import { IExternalProvider } from "./providers/external-provider";
import { GoogleScraperService } from "./providers/google-scraper/google-scraper.service";

@Injectable()
export class ExternalProviderService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  public getExternalProvider(): IExternalProvider {
    const currentProvider = this.configService.get(
      "CURRENT_EXCH_RATE_PROVIDER"
    );
    switch (currentProvider) {
      case "CURRENCY-API":
        return new CurrencyApiService(this.httpService);
      case "GOOGLE-SCRAPER":
        return new GoogleScraperService(this.httpService);
      default:
        throw new Error(`Unknown provider: ${currentProvider}`);
    }
  }
}
