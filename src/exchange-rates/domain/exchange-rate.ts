import { CachedEntity } from "./cached-entity";

export class ExchangeRate {
  constructor(
    from: string,
    to: string,
    rate: number
  ) {
    this.from = from;
    this.to = to;
    this.rate = rate;
  }

  from: string;
  to: string;
  rate: number;
}
