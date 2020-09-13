"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConnectionManager = void 0;
const redis_1 = require("redis");
class RedisConnectionManager {
    constructor(configs, logger) {
        this.configs = configs;
        this.logger = logger;
        this.client = this.getClient();
    }
    async connect() {
        return this.getClient();
    }
    getClient() {
        if (this.client) {
            return this.client;
        }
        const { host: username, password, port, connectTimeout = 30000 } = this.configs;
        const client = redis_1.createClient({
            host: username,
            port: typeof port === 'string' ? parseInt(port, 10) : port,
            auth_pass: password,
            tls: username === 'localhost' ? false : { servername: username },
            connect_timeout: connectTimeout,
        });
        client.on('error', (error) => {
            this.logger.error('Redis error', { error });
        });
        return client;
    }
    async disconnect() {
        return new Promise(async (resolve) => {
            if (this.client) {
                await this.client.quit();
                this.client = null;
            }
            return resolve();
        });
    }
}
exports.RedisConnectionManager = RedisConnectionManager;
//# sourceMappingURL=redis.connector.js.map