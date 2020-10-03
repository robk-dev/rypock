import * as express from 'express';
import { injector } from '@rypock/utils';
import { ILogger } from '@rypock/shared';
import { IUsers } from '../models';
import * as status from 'http-status';
const router: express.Router = express.Router();

router.get('/:id?', async (req: express.Request, res: express.Response) => {
    const usersDB = injector.get<IUsers>('users');
    const logger = injector.get<ILogger>('Logger');

    const id: any = req.params.id;
    try {
        const users = await usersDB.find(id);
        return res.status(status['OK']).send(users);
    } catch (error) {
        logger.error('Error getting users', { error });
    }
    return res.status(status['NOT_FOUND']).send([]);
});

router.post('/', async (req: express.Request, res: express.Response) => {
    console.log('users.post()');
    const logger = injector.get<ILogger>('Logger');
    let result;
    try {
        const user = req.body;
        user.joined = Date.now();

        const userDB = injector.get<IUsers>('users');
        result = await userDB.create(user);
        return res.status(status['CREATED']).send(result);
    } catch (error) {
        logger.error('Error creating user', error);
        if (error.code && error.code === 11000) {
            return res.status(status['CONFLICT']).send({ error: { message: status['409_MESSAGE'], code: status['409_NAME'] } });
        }
        return res.status(status['INTERNAL_SERVER_ERROR']).send({ error: { message: status['500_MESSAGE'], code: status['500_NAME'] } });
    }
});

router.put('/:id', async (req: express.Request, res: express.Response) => {
    const logger = injector.get<ILogger>('Logger');
    const id: any = req.params.id;
    let result;
    try {
        const user = req.body;
        user.joined = Date.now();

        const userDB = injector.get<IUsers>('users');
        result = await userDB.update(id, user);
        return res.status(status['OK']).send(result);
    } catch (error) {
        logger.error('Error updating user', error);
        if (error.code && error.code === 11000) {
            return res.status(status['CONFLICT']).send({ error: { message: status['409_MESSAGE'], code: status['409_NAME'] } });
        }
        return res.status(status['NOT_FOUND']).send({ error: { message: status['404_MESSAGE'], code: status['404_NAME'] } });
    }
});

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    const logger = injector.get<ILogger>('Logger');
    const id: any = req.params.id;
    let result;
    try {
        const userDB = injector.get<IUsers>('users');
        result = await userDB.delete(id);
        return res.status(status['OK']).send({ error: { message: status['200_MESSAGE'], code: status['200_NAME'], data: result } });
    } catch (error) {
        logger.error('Error updating user', error);
        return res.status(status['INTERNAL_SERVER_ERROR']).send({ error: { message: status['500_MESSAGE'], code: status['500_NAME'] } });
    }
});

export { router };
