import { Logger, injector, NoSQLRepo, NoSQLConnectionManager, RedisConnectionManager } from 'rypock-utilities';
import { ILogger } from '@rypock/shared/lib';
import { Users, IUsers, Accounts /* IPosts */ } from './models';
import { IAccounts } from './interfaces';
import { Server } from './server';

import * as path from 'path';
require('dotenv').config({ path: path.resolve(__dirname + '/.env') });

const logger: ILogger = new Logger({ filePath: path.resolve('../..', './logs'), env: process.env['NODE_ENV'] });
injector.set<ILogger>('Logger', logger);

const DAO_MANAGER = new NoSQLConnectionManager(
    {
        database: process.env.MONGO_DB_NAME as string,
        password: process.env.CUSTOMCONNSTR_MONGO_DB_PASSWORD as string,
        URI: process.env.CUSTOMCONNSTR_MONGO_DB_URI as string,
        user: process.env.MONGO_DB_USER as string,
    },
    logger
);

injector.set<NoSQLConnectionManager>('DB', DAO_MANAGER);

const REDIS_MANAGER = new RedisConnectionManager(
    {
        host: process.env.REDIS_HOST as string,
        password: process.env.CUSTOMCONNSTR_REDIS_PASSWORD as string,
        port: parseInt(process.env.REDIS_PORT as string, 10),
        connectTimeout: 30000,
    },
    logger
);
injector.set<RedisConnectionManager>('Redis', REDIS_MANAGER);

const server = new Server({
    dbConnectionManager: DAO_MANAGER,
    sessionStore: REDIS_MANAGER as any,
    // routes,
    logger,
    configs: {
        port: process.env.PORT || 8080,
        sessionSecret: process.env.SESSION_SECRET || 'secret',
        name: process.env.NAME || 'node-express-template',
        description: process.env.NAME || "generic template'",
    },
});
injector.set('Server', server);

injector.set<IAccounts>('accounts', new Accounts(new NoSQLRepo('accounts', DAO_MANAGER), logger));
injector.set<IUsers>('users', new Users(new NoSQLRepo('users', DAO_MANAGER), logger));
// injector.set<IPosts>('posts', new Posts(new NoSQLRepo('users', DAO_MANAGER), logger));
