import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { ExchangeRate } from "src/exchange-rates/domain/exchange-rate";
import { IExternalProvider } from "../external-provider";
import { CurrencyNames } from "./currency-names";

@Injectable()
export class GoogleScraperService implements IExternalProvider {
  constructor(readonly httpService: HttpService) {
    this.httpService = httpService;
  }

  getCurrentExchangeRate(from: string, to: string) {
    const url = `https://www.google.com/search?q=1+${from}+TO+${to}&hl=en`;
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
      new RegExp("=[0-9]+.[0-9]+", "g"),
      rateString
    );
    const rate = parseFloat((match + "").substring(1));
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

    const regex = new RegExp(`(${fromName}) =[0-9]+.[0-9]+ (${toName})`, "g");
    const cleanedHtml = html.replace(/<[^>]*>/g, "");
    return this.matchFromRegex(regex, cleanedHtml);
  }

  private matchFromRegex(regexp: RegExp, text: string): string {
    return text.match(regexp) + "";
  }
}
