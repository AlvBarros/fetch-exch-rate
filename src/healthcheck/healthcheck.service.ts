import { Injectable } from "@nestjs/common";
import { Diagnostics, HealthStatus } from "./interfaces/diagnostics";

@Injectable()
export class HealthcheckService {
  constructor() {}

  getDiagnostics(): Promise<Diagnostics> {
    return Promise.resolve({
      serviceHealth: HealthStatus.Up,
      databaseHealth: HealthStatus.Down,
      cacheHealth: HealthStatus.Down,
    });
  }
}
