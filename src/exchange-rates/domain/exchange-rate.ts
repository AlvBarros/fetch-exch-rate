import { CachedEntity } from "./cached-entity";

export class ExchangeRate extends CachedEntity {
  constructor(
    from: string,
    to: string,
    rate: number
  ) {
    super();
    this.from = from;
    this.to = to;
    this.rate = rate;
  }

  from: string;
  to: string;
  rate: number;
}
