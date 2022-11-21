import { Injectable } from "@nestjs/common";
import { CacheContainer } from "node-ts-cache";
import { MemoryStorage } from "node-ts-cache-storage-memory";
import { Currency } from "../domain/currency";
import { CurrencyAmount } from "../domain/currency-amount";
import { ExchangeRate } from "../domain/exchange-rate";
import { CachedExchangeRate } from "../domain/cached-exchange-rate";

const ratesCache = new CacheContainer(new MemoryStorage());

@Injectable()
export class ExchangeRatesService {
  constructor() {}

  async getExchangeRate(from: string, to: string): Promise<ExchangeRate> {
    const currencies = [from, to];
    // const externalProvider = this.currencyApi.getCurrencyApi();
    return Promise.resolve(null);
  }

  async getExchangeRates(currencies: string[]): Promise<ExchangeRate[]> {
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
    to: string
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
