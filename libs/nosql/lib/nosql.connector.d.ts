import { Db } from 'mongodb';
import { ILogger, IConnectionManager } from '@rypock/shared/lib';
export interface INoSQLConnectionConfigs {
    URI: string;
    user: string;
    password: string;
    database: string;
}
export declare class NoSQLConnectionManager implements IConnectionManager<Db> {
    private configs;
    private logger;
    private client;
    private connection;
    constructor(configs: INoSQLConnectionConfigs, logger: ILogger);
    connect(): Promise<unknown>;
    getClient(): Db | any;
    disconnect: () => Promise<void>;
}
