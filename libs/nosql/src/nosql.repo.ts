import { IRepo, IConnectionManager } from '@rypock/shared/lib';
import {
    CollectionInsertManyOptions,
    CollectionInsertOneOptions,
    CommonOptions,
    Db,
    DeleteWriteOpResultObject,
    FindAndModifyWriteOpResultObject,
    FindOneOptions,
    FindOneAndUpdateOption,
    /*  InsertWriteOpResult,
      InsertOneWriteOpResult, */
    UpdateWriteOpResult,
    UpdateManyOptions,
    ObjectId,
} from 'mongodb';

export class NoSQLRepo<T> implements IRepo<T> {
    constructor(private collection: string, private db: IConnectionManager<Db>) {}

    public async find(query: any = {}, projection?: any, options?: any & FindOneOptions<T>): Promise<any[]> {
        return await this.db.getClient().collection(this.collection).find(query, options).project(projection).toArray();
    }

    public async insert(document: T, options?: CollectionInsertOneOptions): Promise<any> {
        return await this.db.getClient().collection(this.collection).insertOne(document, options);
    }

    public async insertMany(documents: T[], options?: CollectionInsertManyOptions): Promise<any> {
        return await this.db.getClient().collection(this.collection).insertMany(documents, options);
    }

    public async update(query: any, document: T | any, options?: FindOneAndUpdateOption<T>): Promise<FindAndModifyWriteOpResultObject<T>> {
        return await this.db.getClient().collection(this.collection).findOneAndUpdate(query, document, options);
    }

    public async updateMany(query: any, documents: T[] | any, options?: UpdateManyOptions): Promise<UpdateWriteOpResult> {
        return await this.db.getClient().collection(this.collection).updateMany(query, documents, options);
    }

    public async deleteById(_id: ObjectId): Promise<DeleteWriteOpResultObject> {
        return await this.db.getClient().collection(this.collection).deleteOne({ _id });
    }
    public async deleteMany(query: any, options?: CommonOptions): Promise<DeleteWriteOpResultObject> {
        return await this.db.getClient().collection(this.collection).deleteMany(query, options);
    }
}
