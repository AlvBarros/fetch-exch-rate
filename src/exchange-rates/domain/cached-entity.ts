export class CachedEntity<T> {
  storedAt: Date;
  entity: T

  constructor(storedAt: Date, entity: T) {
    this.storedAt = storedAt;
    this.entity = entity;
  }

  public isExpired(): boolean {
    const expireDate = new Date(this.storedAt);
    expireDate.setMinutes(this.storedAt.getMinutes() + 1);
    return new Date() > expireDate;
  }
}
