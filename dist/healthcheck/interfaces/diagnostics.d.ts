export declare enum HealthStatus {
    Up = "UP",
    Down = "DOWN",
    Slow = "SLOW"
}
export declare class Diagnostics {
    readonly serviceHealth: HealthStatus;
    readonly databaseHealth: HealthStatus;
    readonly cacheHealth: HealthStatus;
}
