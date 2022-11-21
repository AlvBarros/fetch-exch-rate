export class CurrencyAmount {
  integers: number;
  decimals: number;
  currency: string;

  constructor(currency: string, integers: number, decimals: number) {
    this.currency = currency;
    this.integers = integers;
    this.decimals = decimals;
  }
}
