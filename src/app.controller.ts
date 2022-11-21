import { Controller, Get } from "@nestjs/common";
import { HealthcheckService } from "./healthcheck/healthcheck.service";
import { Diagnostics } from "./healthcheck/interfaces/diagnostics";

@Controller()
export class AppController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Get('/health')
  async getHealthcheck() : Promise<Diagnostics> {
    return this.healthcheckService.getDiagnostics();
  }
}
