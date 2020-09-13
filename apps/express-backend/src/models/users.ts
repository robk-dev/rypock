import { NoSQLRepo, ILogger } from 'rypock-utilities';
import { Models, IUsers } from './';
// import { ObjectId } from "bson";
import {
    DeleteWriteOpResultObject,
    // FindAndModifyWriteOpResultObject,
    // InsertOneWriteOpResult,
    UpdateWriteOpResult,
} from 'mongodb';

import uuid from 'uuid/v4';
export class Users implements IUsers {
    constructor(private userRepo: NoSQLRepo<Models.User>, private logger: ILogger) {}

    public async create(user: Models.User): Promise<any> {
        // user.id = hash(user);
        user.id = uuid();
        return await this.userRepo.insert(user);
    }

    public async delete(id: any): Promise<DeleteWriteOpResultObject> {
        this.logger.debug('Users.delete()', { data: { id } });
        return await this.userRepo.deleteById(id);
    }

    public async find(id?: string): Promise<Models.User[]> {
        this.logger.debug('Users.find()', { data: { id } });
        if (!id) {
            return this.userRepo.find({});
        }
        return this.userRepo.find({ id });
    }

    public async update(id: string, document: Models.User | any, options?: any): Promise<any> {
        this.logger.debug('Users.update()', { data: { id } });
        return await this.userRepo.update({ id }, { $set: document }, options);
    }

    public async updateMany(query: any, documents: Models.User[], options: any): Promise<UpdateWriteOpResult> {
        this.logger.debug('Users.updateMany()', { data: { query } });
        return await this.userRepo.updateMany(query, documents, options);
    }
}
