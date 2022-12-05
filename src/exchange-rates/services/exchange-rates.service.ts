import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { ExternalProviderService } from "src/external-provider/external-provider.service";
import { ExchangeRate } from "../domain/exchange-rate";
import { Cache } from "cache-manager";
import { CachedEntity } from "../domain/cached-entity";

@Injectable()
export class ExchangeRatesService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private readonly externalProviderService: ExternalProviderService
  ) {}

  async getExchangeRate(
    from: string,
    to: string
  ): Promise<CachedEntity<ExchangeRate>> {
    const key = `${from}-${to}`;
    const cached = await this.getEntityFromCache(key);
    if (!cached || cached.isExpired()) {
      const externalProvider =
        this.externalProviderService.getExternalProvider();
      const exchangeRate = await externalProvider.getCurrentExchangeRate(
        from,
        to
      );
      const cachedRate = new CachedEntity<ExchangeRate>(
        new Date(),
        new ExchangeRate(from, to, exchangeRate.rate)
      );
      this.cacheManager.set(key, cachedRate).then(() => {
        console.log(`Updating cached ${key}`);
      });
      return cachedRate;
    }
    const cachedRate = new CachedEntity(cached.storedAt, cached.entity);
    return cachedRate;
  }

  private async getEntityFromCache(
    key: string
  ): Promise<CachedEntity<ExchangeRate>> {
    const cached = await this.cacheManager.get(key);
    if (cached) {
      const entity = cached.entity;
      return new CachedEntity(
        cached.storedAt,
        new ExchangeRate(entity.from, entity.to, entity.rate)
      );
    } else {
      return undefined;
    }
  }
}
