export class Currency {
  constructor(
    readonly name: string,
    readonly code: string,
    readonly countryFlag: string
  ) {}

  equals(currency: Currency) : boolean {
    return this.code === currency.code;
  }
}
