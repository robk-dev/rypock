// initialize global singleton
import './factory';

import { injector } from '@rypock/utils';
import { ILogger } from '@rypock/shared';
import { Server } from './server';
// import * as setup from "./setup";
const logger = injector.get<ILogger>('Logger');
const server = injector.get<Server>('Server');

import { routes } from './routes';
import { validateMiddleware } from './middlewares';
// import { init } from './setup';
async function start() {
    try {
        // await setup.init();
        const app = await server.init();
        app.use('/api', validateMiddleware(), routes);
    } catch (error) {
        logger.error('Error starting up', { error });
        console.log({ error });
        process.exit(1);
    }
}

start();
