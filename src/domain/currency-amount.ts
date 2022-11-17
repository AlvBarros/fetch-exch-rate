import { Currency } from "./currency";

export class CurrencyAmount {
  integers: number;
  decimals: number;
  currency: Currency;

  constructor(currency: Currency, integers: number, decimals: number) {
    this.currency = currency;
    this.integers = integers;
    this.decimals = decimals;
  }
}
