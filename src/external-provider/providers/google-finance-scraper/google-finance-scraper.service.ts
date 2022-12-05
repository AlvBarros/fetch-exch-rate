import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { ExchangeRate } from "src/exchange-rates/domain/exchange-rate";
import { IExternalProvider } from "../external-provider";
import { CurrencyNames } from "../google-scraper/currency-names";

@Injectable()
export class GoogleFinanceScraperService implements IExternalProvider {
  constructor(readonly httpService: HttpService) {
    this.httpService = httpService;
  }

  getCurrentExchangeRate(from: string, to: string) {
    const url = `https://www.google.com/finance/quote/${from}-${to}`;
    return firstValueFrom(this.httpService.get(url)).then((response) => {
      if (response.status === 200) {
        return this.convertHTMLToExchangeRate(from, to, response.data);
      } else {
        throw `Currency API Response Code ${response.status}`;
      }
    });
  }

  private convertHTMLToExchangeRate(
    from: string,
    to: string,
    html: string
  ): ExchangeRate {
    const rateString = this.findRate(from, to, html);
    const match = this.matchFromRegex(
      new RegExp(`data-last-price="[0-9]+[.,][0-9]+"`, "g"),
      rateString
    ).split("=")[1];
    const rate = parseFloat(
      (match.substring(1, match.length - 1) + "").substring(1)
    );
    if (!rate) {
      throw new Error(`Failed to gather exchange rate`);
    }
    return new ExchangeRate(from, to, rate);
  }

  private findRate(from: string, to: string, html: string): string {
    const [fromName, toName] = [CurrencyNames[from], CurrencyNames[to]];

    if (!fromName || !toName) {
      throw new Error(`Currency ${from} not supported`);
    }

    const regex = new RegExp(
      `<div.+data-source="${from}" data-target="${to}".+</div>`,
      "g"
    );
    return this.matchFromRegex(regex, html);
  }

  private matchFromRegex(regexp: RegExp, text: string): string {
    return text.match(regexp) + "";
  }
}
