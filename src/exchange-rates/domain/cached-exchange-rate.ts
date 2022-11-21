import { ExchangeRate } from "./exchange-rate";

export class CachedExchangeRate extends ExchangeRate {
    storedAt: Date;
    expireAt: Date;
}