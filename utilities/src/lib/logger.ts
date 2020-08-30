import { createLogger, format, transports as Transport, Logger as WinstonLogger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import { ILogger } from "./interfaces";

export class Logger implements ILogger {
    private logger: WinstonLogger | any;

    private levels = {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4,
        verbose: 5,
        trace: 6,
        silly: 7
    };

    private static getFileTransport(logPath: string, level: string) {
        return new DailyRotateFile({
            filename: path.join(logPath, level, `${level}-%DATE%.log`),
            datePattern: "YYYY-MM-DD",
            level
        });
    }

    private static getConsoleTransport(level: string) {
        return new Transport.Console({
            level
        });
    }

    constructor(
        private options?: {
            filePath?: string;
            env?: string;
        }
    ) {
        const filePath = this.options && this.options.filePath ? this.options.filePath : __dirname;

        const transports = [
            Logger.getConsoleTransport("silly"),
            Logger.getFileTransport(filePath, "error"),
            Logger.getFileTransport(filePath, "trace")
        ];

        this.logger = createLogger({
            levels: this.levels,
            format: format.combine(format.timestamp(), format.json()),
            transports
        });
    }

    public log(level: string, message: string | any, meta?: {}) {
        this.logger[level](message, meta);
    }

    public silly(message: string, data?: {} | any) {
        this.log("silly", message, data);
    }

    public verbose(message: string, data?: {}) {
        this.log("verbose", message, data);
    }

    public trace(message: string, data?: {}) {
        this.log("trace", message, data);
    }

    public debug(message: string, data?: {}) {
        this.log("debug", message, data);
    }

    public info(message: string, data?: {}) {
        this.log("info", message, data);
    }

    public warn(message: string, data?: {}) {
        this.log("warn", message, data);
    }

    public error(message: string, data?: {}) {
        this.log("error", message, data);
    }

    public fatal(message: string, data?: {}) {
        this.log("fatal", message, data);
    }
}
