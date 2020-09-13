import { RedisClient } from 'redis';
import { ILogger, IConnectionManager } from '@rypock/shared/lib';
export interface IRedisConnectionConfigs {
    connectTimeout?: number;
    host: string;
    password?: string;
    port: number;
}
export declare class RedisConnectionManager implements IConnectionManager<RedisClient> {
    private configs;
    private logger;
    private client;
    constructor(configs: IRedisConnectionConfigs, logger: ILogger);
    connect(): Promise<RedisClient>;
    getClient(): RedisClient;
    disconnect(): Promise<unknown>;
}
