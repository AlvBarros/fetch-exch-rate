import { CachedEntity } from "../domain/cached-entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CacheService {
  async getValue<T extends CachedEntity>(key: String): Promise<T> {
    return Promise.resolve({} as T);
  }
}
