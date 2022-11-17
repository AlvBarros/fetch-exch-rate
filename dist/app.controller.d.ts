import { HealthcheckService } from "./healthcheck/healthcheck.service";
import { Diagnostics } from "./healthcheck/interfaces/diagnostics";
export declare class AppController {
    private readonly healthcheckService;
    constructor(healthcheckService: HealthcheckService);
    getHealthcheck(): Promise<Diagnostics>;
}
