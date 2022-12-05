import { Injectable } from "@nestjs/common";
import { ExternalProviderService } from "src/external-provider/external-provider.service";
import { CurrencyAmount } from "../domain/currency-amount";
import { ExchangeRate } from "../domain/exchange-rate";
import { CacheService } from "./cache.service";

@Injectable()
export class ExchangeRatesService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly externalProviderService: ExternalProviderService
  ) {}

  async getExchangeRate(from: string, to: string): Promise<ExchangeRate> {
    const currencies = [from, to];
    // TODO Validate cache before calling external provider
    const externalProvider = this.externalProviderService.getExternalProvider();
    console.log(externalProvider);
    return externalProvider.getCurrentExchangeRate(from, to);
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

  async exchange(amount: CurrencyAmount, to: string): Promise<CurrencyAmount> {
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
