import { router as accountRoutes } from './accounts';
import { router as userRoutes } from './users';
import { router as postRoutes } from './posts';

import { Router } from 'express';

const routes = Router();

routes.use(
    '/accounts',
    (req, res, next) => {
        if (!req.signedCookies.sid) {
            return res.sendStatus(401);
        }

        // verify signed cookie here
        next();
    },
    accountRoutes
);
routes.use('/users', userRoutes);

routes.use('/posts', postRoutes);

export { routes };
