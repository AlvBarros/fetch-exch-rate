import { Controller, Get } from "@nestjs/common";
import { Currencies } from "src/domain/currencies";
import { Currency } from "src/domain/currency";

@Controller("currencies")
export class CurrenciesController {
  constructor() {}

  @Get()
  async getHealthcheck(): Promise<Currency[]> {
    return Currencies;
  }
}
