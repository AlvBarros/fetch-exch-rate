import { Controller, Get, HttpStatus } from "@nestjs/common";
import { HealthcheckService } from "./healthcheck/healthcheck.service";
import { Diagnostics, HealthStatus } from "./healthcheck/interfaces/diagnostics";

@Controller()
export class AppController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Get('/health')
  async getHealthcheck() : Promise<Diagnostics> {
    return this.healthcheckService.getDiagnostics();
  }
}
