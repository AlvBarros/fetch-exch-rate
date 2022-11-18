import { Controller, Get, Param } from "@nestjs/common";
import { Currencies } from "src/domain/currencies";
import { ExchangeRate } from "src/domain/exchange-rate";
import { ExchangeRatesService } from "./exchange-rates.service";

@Controller("exchange-rates")
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get("/:from/to/:to")
  async getExchangeRate(
    @Param("from") from: string,
    @Param("to") to: string
  ): Promise<ExchangeRate> {
    const [fromCurrency, toCurrency] = this.transformToCurrency([from, to]);
    return this.exchangeRatesService.getExchangeRate(fromCurrency, toCurrency);
  }

  private transformToCurrency(currencies: string[]) {
    let results = [];
    for (const currencyCode in currencies) {
      const tryCurrency = Currencies[currencyCode];
      if (!tryCurrency) {
        throw `Invalid currency: ${currencyCode}`;
      }
      results.push(tryCurrency);
    }
    return results;
  }
}
