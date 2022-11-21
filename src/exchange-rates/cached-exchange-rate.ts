import { ExchangeRate } from "src/domain/exchange-rate";

export class CachedExchangeRate extends ExchangeRate {
    storedAt: Date;
    expireAt: Date;
}