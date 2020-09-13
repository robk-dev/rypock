import { Db, MongoClient } from 'mongodb';
import { ILogger, IConnectionManager } from '@rypock/shared';

export interface INoSQLConnectionConfigs {
    URI: string;
    user: string;
    password: string;
    database: string;
}

export class NoSQLConnectionManager implements IConnectionManager<Db> {
    private client: Db | any;
    private connection: any;

    constructor(private configs: INoSQLConnectionConfigs, private logger: ILogger) {}

    public async connect() {
        return new Promise((resolve, reject) => {
            console.log({ config: this.configs, URI: this.configs.URI });
            MongoClient.connect(
                this.configs.URI,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    auth: this.configs.user
                        ? {
                              user: this.configs.user,
                              password: this.configs.password,
                          }
                        : undefined,
                },
                (error: Error, connection: any) => {
                    if (error) {
                        this.logger.error('Error connecting to NoSQL database.', { error });
                        return reject(error);
                    }
                    this.logger.info(`Successfully connected to database:${this.configs.database}.`);
                    this.connection = connection;
                    this.client = connection.db(this.configs.database);
                    return resolve(this.client);
                }
            );
        });
    }

    public getClient(): Db | any {
        if (this.client) {
            return this.client;
        }
    }

    public disconnect = async () => {
        if (this.connection) {
            await this.connection.close();
        }
    };
}
