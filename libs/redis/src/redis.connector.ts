import { createClient, RedisClient, RedisError } from 'redis';

import { ILogger, IConnectionManager } from '@rypock/shared/lib';

export interface IRedisConnectionConfigs {
    connectTimeout?: number;
    host: string;
    password?: string;
    port: number;
}

export class RedisConnectionManager implements IConnectionManager<RedisClient> {
    private client: RedisClient | null;

    constructor(private configs: IRedisConnectionConfigs, private logger: ILogger) {
        this.client = this.getClient();
    }

    public async connect() {
        return this.getClient();
    }

    public getClient(): RedisClient {
        if (this.client) {
            return this.client;
        }

        const { host: username, password, port, connectTimeout = 30000 } = this.configs;

        const client = createClient({
            host: username,
            port: typeof port === 'string' ? parseInt(port, 10) : port,
            auth_pass: password,
            tls: username === 'localhost' ? false : { servername: username },
            connect_timeout: connectTimeout,
        });

        client.on('error', (error: RedisError) => {
            this.logger.error('Redis error', { error });
        });

        return client;
    }

    public async disconnect() {
        return new Promise(async (resolve) => {
            if (this.client) {
                await this.client.quit();
                this.client = null;
            }
            return resolve();
        });
    }
}
