import { POST_ACCOUNT_SCHEMA } from './schemas/accounts-schema';
import * as Joi from '@hapi/joi';
import { ILogger, hash, encrypt, generateAESKey, NoSQLRepo } from 'rypock-utilities';
import { IAccounts, Models } from './';
import { ObjectId } from 'bson';
import {
    DeleteWriteOpResultObject,
    // FindAndModifyWriteOpResultObject,
    // InsertOneWriteOpResult,
    UpdateWriteOpResult,
} from 'mongodb';

import uuid from 'uuid/v4';

export class Accounts implements IAccounts {
    constructor(private userRepo: NoSQLRepo<Models.Account>, private logger: ILogger) {}

    public async create(unsafeAccount: Models.UnsafeAccount): Promise<{ id: string; joined: string } | any> {
        const _validationOptions = {
            abortEarly: false, // abort after the first validation error
            allowUnknown: false, // allow unknown keys that will be ignored
            stripUnknown: true, // remove unknown keys from the validated data
        };

        this.logger.debug('Accounts.create(); // validating body');
        // Validate req.body using the schema and validation options
        const data: Models.UnsafeAccount | any = await Joi.validate(unsafeAccount, POST_ACCOUNT_SCHEMA, _validationOptions);
        const key = generateAESKey() as string;
        const date = new Date().toISOString();

        const account: Models.Account = {
            ...data,
            id: uuid(),
            first_name: encrypt(data.first_name, key),
            last_name: encrypt(data.last_name, key),
            password: await hash(unsafeAccount.password, 11),
            joined: date,
            last_updated: date,
            key_url: key,
        };

        this.logger.info(`Accounts.create(); // creating account:[${account.id}]`, {
            id: account.id,
            joined: account.joined,
        });
        return await this.userRepo.insert(account, { w: 'majority', wtimeout: 5000 });
        // const { ops, result } = await this.userRepo.insert(account);
        // this.logger.info('Accounts.create()', { id: account.id, ops, result });
        // const { ok } = result;
        // if (ok) {
        //     const { id, joined } = account;
        //     return { id, joined };
        // } else {
        //     throw result;
        // }
    }

    public async delete(_id: any): Promise<DeleteWriteOpResultObject> {
        this.logger.debug('Accounts.delete()', { data: { _id } });
        return await this.userRepo.deleteById(new ObjectId(_id));
    }

    public async findById(id?: string): Promise<Models.User[]> {
        this.logger.debug('Accounts.find()', { data: { id } });
        if (!id) {
            return this.userRepo.find({});
        }
        return this.userRepo.find({ id });
    }

    public async find(query: any = {}): Promise<Models.User[]> {
        this.logger.debug('Accounts.find()', { data: query });
        return this.userRepo.find(query);
    }

    public async update(id: string, document: Models.Account | any, options?: any): Promise<any> {
        this.logger.debug('Accounts.update()', { data: { id } });
        return await this.userRepo.update({ id }, { $set: document }, options);
    }

    public async updateMany(query: any, documents: Models.Account[], options: any): Promise<UpdateWriteOpResult> {
        this.logger.debug('Accounts.updateMany()', { data: { query } });
        return await this.userRepo.updateMany(query, documents, options);
    }
}
