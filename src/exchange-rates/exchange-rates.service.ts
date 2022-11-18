import { Injectable } from "@nestjs/common";
import { Currency } from "src/domain/currency";
import { CurrencyAmount } from "src/domain/currency-amount";
import { ExchangeRate } from "src/domain/exchange-rate";

@Injectable()
export class ExchangeRatesService {
  constructor() {}

  async getExchangeRate(from: Currency, to: Currency): Promise<ExchangeRate> {
    // TODO Add cache store integration
    return Promise.resolve(null);
  }

  async getExchangeRates(currencies: Currency[]): Promise<ExchangeRate[]> {
    // TODO Add cache store integration
    return Promise.resolve([]);
  }

  async exchange(
    amount: CurrencyAmount,
    to: Currency
  ): Promise<CurrencyAmount> {
    const rate = await this.getExchangeRate(amount.currency, to);
    return this.calculate(amount, rate);
  }

  private calculate(
    amount: CurrencyAmount,
    rate: ExchangeRate
  ): CurrencyAmount {
    const { decimals, overflow } = this.calculateDecimals(
      amount.decimals,
      rate
    );
    const integers = amount.integers * rate.rate + overflow;
    return new CurrencyAmount(rate.to, integers, decimals);
  }

  private calculateDecimals(amount: number, rate): { decimals; overflow } {
    const multiplied = amount * rate;
    const decimals = multiplied % 100;
    const overflow = (multiplied - decimals) / 100;
    return { decimals, overflow };
  }
}
