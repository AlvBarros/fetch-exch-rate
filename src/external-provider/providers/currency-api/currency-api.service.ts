import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { ExchangeRate } from "src/exchange-rates/domain/exchange-rate";
import { IExternalProvider } from "../external-provider";

@Injectable()
export class CurrencyApiService implements IExternalProvider {
  constructor(readonly httpService: HttpService) {
    this.httpService = httpService;
  }

  async getCurrentExchangeRate(from: string, to: string) {
    const params = `base_currency=${from}&currencies=${to}`;
    const url = this.buildLatestUrl(params);
    return firstValueFrom(this.httpService.get(url)).then((response) => {
      if (response.status === 200) {
        return this.responseToExchangeRates(response.data['data'], from)[0];
      } else {
        throw `Currency API Response Code ${response.status}`;
      }
    });
  }

  private buildLatestUrl(params): string {
    const endpoint = process.env["CURRENCY_API_ENDPOINT"];
    const key = process.env["CURRENCY_API_KEY"];
    return `${endpoint}/latest?apikey=${key}&${params}`;
  }

  private responseToExchangeRates(data: Object, baseCurrency: string): ExchangeRate[] {
    let rates = [];
    const currencies = Object.keys(data);
    for(var i=0; i<currencies.length; i++) {
      const currency = data[currencies[i]];
      rates.push(new ExchangeRate(currency['code'], baseCurrency, currency['value']));
    }
    return rates;
  }
}
