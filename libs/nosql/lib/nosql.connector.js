"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSQLConnectionManager = void 0;
const mongodb_1 = require("mongodb");
class NoSQLConnectionManager {
    constructor(configs, logger) {
        this.configs = configs;
        this.logger = logger;
        this.disconnect = async () => {
            if (this.connection) {
                await this.connection.close();
            }
        };
    }
    async connect() {
        return new Promise((resolve, reject) => {
            mongodb_1.MongoClient.connect(this.configs.URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                auth: this.configs.user
                    ? {
                        user: this.configs.user,
                        password: this.configs.password,
                    }
                    : undefined,
            }, (error, connection) => {
                if (error) {
                    this.logger.error('Error connecting to NoSQL database.', { error });
                    return reject(error);
                }
                this.logger.info(`Successfully connected to database:${this.configs.database}.`);
                this.connection = connection;
                this.client = connection.db(this.configs.database);
                return resolve(this.client);
            });
        });
    }
    getClient() {
        if (this.client) {
            return this.client;
        }
    }
}
exports.NoSQLConnectionManager = NoSQLConnectionManager;
//# sourceMappingURL=nosql.connector.js.map