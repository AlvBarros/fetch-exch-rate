import { Controller, Get } from "@nestjs/common";
import { HealthcheckService } from "./healthcheck/healthcheck.service";
import { Diagnostics } from "./healthcheck/interfaces/diagnostics";

const url = 'https://github.com/AlvBarros/fetch-exch-rate'

@Controller()
export class AppController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Get()
  async helloWorld(): Promise<string> {
    return `Hello World! This is hosting ${url}`
  }
  
  @Get('/health')
  async getHealthcheck() : Promise<Diagnostics> {
    return this.healthcheckService.getDiagnostics();
  }
}
