import { Controller, Get, Param } from "@nestjs/common";
import { ExchangeRate } from "./domain/exchange-rate";
import { ExchangeRatesService } from "./services/exchange-rates.service";

@Controller("exchange-rates")
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get("/:from/to/:to")
  async getExchangeRate(
    @Param("from") from: string,
    @Param("to") to: string
  ): Promise<ExchangeRate> {
    return this.exchangeRatesService.getExchangeRate(from, to);
  }
}
