export enum HealthStatus {
  Up = "UP",
  Down = "DOWN",
  Slow = "SLOW",
}

export class Diagnostics {
  public readonly serviceHealth: HealthStatus;
  public readonly databaseHealth: HealthStatus;
  public readonly cacheHealth: HealthStatus;
}
