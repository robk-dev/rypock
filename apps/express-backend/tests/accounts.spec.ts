// initialize global singleton
import * as path from 'path';
require('dotenv').config({ path: path.resolve(__dirname + '/.env') });

import '../src/factory';

import { injector } from '@rypock/utils';
import { ILogger } from '@rypock/shared';
import { Server } from '../src/server';

const request = require('supertest');

const logger = injector.get<ILogger>('Logger');
const server = injector.get<Server>('Server');
import { expect } from 'chai';
require("dotenv").config({ path: path.resolve(__dirname + "/.env") });

import { routes } from '../src/routes';

const account = {
    username: 'replace-with-faker',
    first_name: 'fname',
    last_name: 'lname',
    email: 'abcd@email.com',
    joined: '2020-08-29T01:00:00Z',
    password: 'rand0mpw123',
    confirm_password: 'rand0mpw123',
    age: 55,
    picture: 'https://someacc143.blob.core.windows.net/container/blob/img.png',
    description: 'profile bio'
};

let app: any;
let insertedId: string | null = null;

describe('Accounts APIs:', () => {
    before(async () => {
        try {
            // await setup.init();
            app = await server.init();
            app.use('/api', routes);
            injector.set('app', app);
            return app;
        } catch (error) {
            logger.error('Error starting up', { error });
            console.log({ error });
            process.exit(1);
        }
    });

    it('0. Should listAccounts()', async () => {
        const { body } = await request(app)
            .get('/api/accounts')
            .expect('Content-Type', /json/);

        console.log({ body });

        expect(body).to.not.equal(null);
        expect(Array.isArray(body)).to.equal(true);
    });

    it('1. Should postAccount()', async () => {
        const { body } = await request(app)
            .post('/api/accounts')
            .send(account)
            .expect('Content-Type', /json/)
            .expect(201);

        const { ops, result } = body;
        insertedId = ops[0]._id;
        // insertedId = result.body.insertedId;
        // console.log({ result });
        console.log({ result, body, ops });
        expect(result).to.not.equal(null);
    });

    it('2. Should getAccount()', async () => {
        const { body } = await request(app)
            .get('/api/accounts/' + insertedId)
            .expect('Content-Type', /json/);

        console.log({ body });

        expect(body).to.not.equal(null);
        expect(Array.isArray(body)).to.equal(true);
    });

    it('3. Should putAccount()', async () => {
        account.first_name = 'John';
        const { body } = await request(app)
            .put('/api/accounts/' + insertedId)
            .send(account)
            .expect('Content-Type', /json/)
            .expect(200);

        console.log({ body });

        expect(body).to.not.equal(null);
        expect(body.ok).to.equal(1);
    });

    it('4. Should deleteAccount()', async () => {
        const { body } = await request(app)
            .delete('/api/accounts/' + insertedId)
            .expect('Content-Type', /json/)
            .expect(200);

        const { result } = body;
        // console.log({ result });
        console.log({ result, body });
        expect(result).to.not.equal(null);
    });
});
