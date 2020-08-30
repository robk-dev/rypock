// initialize global singleton
import * as path from 'path';
require('dotenv').config({ path: path.resolve(__dirname + '/.env') });

import '../src/factory';

import { injector } from 'rypock-utilities';
const request = require('supertest');
import { expect } from 'chai';

const user = {
    username: `user${Date.now()}`,
    email: `abcd${Date.now()}@gmail.com`,
    joined: new Date().toISOString(),
    picture: 'https://someacc143.blob.core.windows.net/container/blob/img.png',
    description: 'profile bio'
};

// let app: any;
let insertedId: string | null = null;
let app: any;

describe('Users APIs:', () => {
    it('0. Should listUsers()', async () => {
        app = injector.get('app');
        const { body } = await request(app)
            .get('/api/users')
            .expect('Content-Type', /json/);

        console.log({ body });

        expect(body).to.not.equal(null);
        expect(Array.isArray(body)).to.equal(true);
    });

    it('1. Should postUser()', async () => {
        const { body } = await request(app)
            .post('/api/users')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(201);

        const { ops, result } = body;
        insertedId = ops[0]._id;
        // insertedId = result.body.insertedId;
        // console.log({ result });
        console.log({ result, body, ops });
        expect(result).to.not.equal(null);
    });

    it('2. Should getUser()', async () => {
        const { body } = await request(app)
            .get('/api/accounts/' + insertedId)
            .expect('Content-Type', /json/);

        console.log({ body });

        expect(body).to.not.equal(null);
        expect(Array.isArray(body)).to.equal(true);
    });

    it('3. Should putUser()', async () => {
        user.description = 'new description';
        const { body } = await request(app)
            .put('/api/accounts/' + insertedId)
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        console.log({ body });

        expect(body).to.not.equal(null);
        expect(body.ok).to.equal(1);
    });

    it('4. Should deleteUser()', async () => {
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
