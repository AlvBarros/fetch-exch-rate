import { CurrencyAmount } from "./currency-amount";

export class CachedEntity {
  storedAt: Date;
  expireAt: Date;
  currencyCode: string;
  amountInUSD: CurrencyAmount
}
