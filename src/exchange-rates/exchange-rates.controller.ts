import { Controller, Get, Param } from "@nestjs/common";
import { CachedEntity } from "./domain/cached-entity";
import { ExchangeRate } from "./domain/exchange-rate";
import { ExchangeRatesService } from "./services/exchange-rates.service";

type TstoredAt = CachedEntity<ExchangeRate>["storedAt"];
type Tfrom = CachedEntity<ExchangeRate>["entity"]["from"];
type Tto = CachedEntity<ExchangeRate>["entity"]["to"];
type Trate = CachedEntity<ExchangeRate>["entity"]["rate"];
class ExchangeRateDTO {
  storedAt: TstoredAt;
  from: Tfrom;
  to: Tto;
  rate: Trate;
}

@Controller("exchange-rates")
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get("/:from/to/:to")
  async getExchangeRate(
    @Param("from") from: string,
    @Param("to") to: string
  ): Promise<ExchangeRateDTO> {
    const cachedEntity = await this.exchangeRatesService.getExchangeRate(
      from,
      to
    );
    return this.cachedEntityToDTO(cachedEntity);
  }

  private cachedEntityToDTO(
    cachedEntity: CachedEntity<ExchangeRate>
  ): ExchangeRateDTO {
    return {
      storedAt: cachedEntity.storedAt,
      from: cachedEntity.entity.from,
      to: cachedEntity.entity.to,
      rate: cachedEntity.entity.rate,
    };
  }
}
