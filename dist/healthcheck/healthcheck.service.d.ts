import { Diagnostics } from "./interfaces/diagnostics";
export declare class HealthcheckService {
    constructor();
    getDiagnostics(): Promise<Diagnostics>;
}
