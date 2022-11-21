import { Injectable } from "@nestjs/common";
import { CacheContainer } from "node-ts-cache";
import { MemoryStorage } from "node-ts-cache-storage-memory";
import { Currency } from "src/domain/currency";
import { CurrencyAmount } from "src/domain/currency-amount";
import { ExchangeRate } from "src/domain/exchange-rate";
import { CachedExchangeRate } from "./cached-exchange-rate";

const ratesCache = new CacheContainer(new MemoryStorage());

@Injectable()
export class ExchangeRatesService {
  constructor() {}

  async getExchangeRate(from: Currency, to: Currency): Promise<ExchangeRate> {
    const currencies = [from, to];
    // fetch each
    return Promise.resolve(null);
  }

  async getExchangeRates(currencies: Currency[]): Promise<ExchangeRate[]> {
    let promises = [];
    for (let toIndex = 0; toIndex < currencies.length; toIndex++) {
      for (let fromIndex = 0; fromIndex < currencies.length; fromIndex++) {
        if (fromIndex !== toIndex) {
          promises.push(
            this.getExchangeRate(currencies[fromIndex], currencies[toIndex])
          );
        }
      }
    }
    return Promise.all(promises);
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
