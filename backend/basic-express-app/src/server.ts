import bodyParser = require('body-parser');
import express = require('express');
import helmet = require('helmet');
// import session = require('express-session');
import cookieParser = require('cookie-parser');
import hpp = require('hpp');
import csurf = require('csurf');
import cors = require('cors');
const pino = require('express-pino-logger')();

const stoppable = require('stoppable');
const http = require('http');

import { injector, ILogger, IConnectionManager, compare } from 'rypock-utilities';

// types
import { RedisClient } from 'redis';
import { Db } from 'mongodb';
import { IAccounts } from './models';

// const RedisStore = require('connect-redis')(session);

/**
 * Generic server to be used with dynamic routes and middlewares.
 *
 * @class Server
 */
export class Server {
    private logger: ILogger;

    constructor(
        private readonly options: {
            configs: {
                port: number | any;
                sessionSecret?: string;
                name?: string;
                description?: string;
            };
            sessionStore: IConnectionManager<RedisClient>;
            logger: ILogger;
            dbConnectionManager: IConnectionManager<Db>;
            // routes: express.Router[] | any;
        }
    ) {
        this.logger = options.logger;
    }

    /**
     * Only function for triggering async startup of the server.
     * Returns express app on success.
     *
     * @returns {Promise<any>}
     * @memberof Server
     */
    public async init(): Promise<any> {
        this.logger.info(`Starting server up on port ${this.options.configs.port}.`);

        await this.options.dbConnectionManager.connect();
        await this.options.sessionStore.connect();

        const app = await this.setupExpress();
        return app;
    }

    private async setupExpress(): Promise<any> {
        return new Promise((resolve, reject) => {
            const app: Express.Application | any = express();
            const port = this.options.configs.port;
            const server = stoppable(http.createServer(app));

            app.shutdown = (error: any, code?: any) => {
                // clean up your resources and exit
                this.logger.error('app shutting down', { error, code });
                server.stop();
                process.exit();
            };

            process
                .on('SIGINT', () => {
                    app.shutdown('SIGINT');
                })
                .on('unhandledRejection', (error: any) => {
                    app.shutdown(error, 'unhandledRejection');
                })
                .on('uncaughtException', (error: any) => {
                    app.shutdown(error, 'uncaughtException');
                })
                .on('SIGTERM', () => {
                    app.shutdown('SIGTERM');
                });

            app.use(bodyParser.json({ limit: '2mb' }));
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(pino);
            app.use(cookieParser(this.options.configs.sessionSecret));
            app.use(hpp());
            app.use(helmet());
            app.use(
                cors({
                    origin: 'http://localhost:3000',
                    credentials: true,
                    allowedHeaders: ['x-xsrf-token', 'Content-Type', 'Content-Length']
                })
            );

            // app.use(session({
            //     store: new RedisStore({ client: this.options.sessionStore.getClient() }),
            //     secret: this.options.configs.sessionSecret || 'secret',
            //     name: 'sid',
            //     cookie: {
            //         secure: false,
            //         httpOnly: false,
            //         expires: new Date(new Date().getTime() + 12000000),
            //         sameSite: false,
            //         path: '/',
            //         signed: true
            //     },
            //     saveUninitialized: false,
            //     resave: false // redis supports TOUCH
            // }));

            const csurf_middleware = csurf({
                cookie: {
                    key: 'csrf_s',
                    expires: new Date(new Date().getTime() + 100),
                    secure: false, // states whether cookie should be transmitted only over SSL/https; true for non-local
                    httpOnly: true,
                    path: '/', // can set it for a specific path/apis only
                    sameSite: false,
                    signed: true
                } as any
            });
            app.use(csurf_middleware);

            app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
                // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
                // change to specific origin for fewer cross-origin requests; doesnt stop people from spoofing header

                res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // you might not want all HTTP verbs in use
                res.header('Access-Control-Allow-Headers', 'Content-Type Content-Length x-xsrf-token');

                // explicitly states it's okay to include cookies on requests; client must set withCredentials: true for XMLHttpRequest
                res.header('Access-Control-Allow-Credentials', 'true');

                res.cookie('XSRF-TOKEN', req.csrfToken(), {
                    expires: new Date(new Date().getTime() + 172800000),
                    secure: false, // states whether cookie should be transmitted only over SSL/https; true for non-local
                    httpOnly: false,
                    path: '/',
                    sameSite: false,
                    signed: false
                } as any); // set token for double submit cookie every time

                next();
            });

            app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
                if (err.code !== 'EBADCSRFTOKEN') {
                    console.log({ headers: req.headers });
                    return next(err);
                }

                res.status(403);
                res.send('form tampered with');
            });

            // app.use(middleware);
            app.get('/login', function (req: express.Request, res: express.Response) {
                // pass the csrfToken to the view
                res.send(`
                <h1>Hello, </h1>
                <form action="/login" method="POST">
                    <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
                      <div>
                        <label for="name">Enter your username:</label><br/>
                        <input id="username" name="username" type="text" />
                        <input id="password" name="password" type="text" />
                      </div>
                      <input type="submit" value="Submit" />
                </form>
            `);
            });

            // app.post('/login', (req: any, res: any) => {
            //     const { body = {} } = req;
            //     const { username = '', password = '' } = body;
            //     if (username === 'bla' && password === 'bla') {
            //         console.log('success');
            //     }
            //     req.session.username = req.body.username;
            //     res.json({ msg: 'yay', session: req.session });
            // });

            app.get('/', (req: express.Request, res: express.Response) => {
                res.json({ cookies: req.cookies, signed_cookies: req.signedCookies, session: req.session });
            });

            app.post('/login', async function (req: express.Request, res: express.Response) {
                const { username = '', password = '' } = req.body;
                if (!username || !password) {
                    return res.sendStatus(401);
                }
                const accounts = injector.get<IAccounts>('accounts');
                const result: any = await accounts.find({ username });

                const { password: hashedPassword } = result[0];
                const match = await compare(password, hashedPassword);

                if (!match) {
                    return res.sendStatus(401);
                }

                res.cookie(
                    'sid',
                    { data: 'some-user-data', username },
                    {
                        secure: false,
                        httpOnly: true,
                        expires: new Date(new Date().getTime() + 172800000),
                        sameSite: false,
                        path: '/',
                        signed: true
                        // secret: 'secret'
                    }
                );

                res.redirect('/');
            });

            app.listen(port, (error: Error) => {
                if (error) {
                    return reject(error);
                } else {
                    this.logger.debug('======================================================');
                    this.logger.info(`Server [${this.options.configs.name}] listening on port:${port}.`);
                    this.logger.debug('======================================================');
                    return resolve(app);
                }
            });
        });
    }
}
