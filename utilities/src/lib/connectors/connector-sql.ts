import { ILogger, IConnectionManager } from "../interfaces";
import * as Knex from "knex";

interface ISQLConnectionConfigs {
    client: string;
    options: {
        host: string;
        user: string;
        password: string;
        database: string;
    };
    pool?: any;
}

export class SQLConnectionManager implements IConnectionManager<Knex> {
    private knex: Knex;

    constructor(private config: ISQLConnectionConfigs, private logger: ILogger) {
        this.knex = require("knex")(config);
    }

    public getClient(): Knex {
        return this.knex;
    }

    public async connect(): Promise<Knex> {
        this.logger.debug(`Connecting to database ${this.config.options.database}`);

        try {
            await this.knex.raw("SELECT 1;");
            return this.knex;
        } catch (error) {
            const message = "Error running query against SQL on connect.";
            this.logger.error(message, { error });
            throw new Error(message);
        }
    }

    public async disconnect() {
        this.logger.info("Disconnecting from SQL database.");

        if (this.knex) {
            await this.knex.destroy();
        }
    }
}
