export interface ILogger {
    silly(message: string, data?: {}): void;
    verbose(message: string, data?: {}): void;
    trace(message: string, data?: {}): void;
    debug(message: string, data?: {}): void;
    info(message: string, data?: {}): void;
    warn(message: string, data?: {}): void;
    error(message: string, data?: {}): void;
    fatal(message: string, data?: {}): void;
}
