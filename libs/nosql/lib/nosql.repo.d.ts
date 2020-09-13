import { IRepo, IConnectionManager } from '@rypock/shared/lib';
import { CollectionInsertManyOptions, CollectionInsertOneOptions, CommonOptions, Db, DeleteWriteOpResultObject, FindAndModifyWriteOpResultObject, FindOneOptions, FindOneAndUpdateOption, UpdateWriteOpResult, UpdateManyOptions, ObjectId } from 'mongodb';
export declare class NoSQLRepo<T> implements IRepo<T> {
    private collection;
    private db;
    constructor(collection: string, db: IConnectionManager<Db>);
    find(query?: any, projection?: any, options?: any & FindOneOptions<T>): Promise<any[]>;
    insert(document: T, options?: CollectionInsertOneOptions): Promise<any>;
    insertMany(documents: T[], options?: CollectionInsertManyOptions): Promise<any>;
    update(query: any, document: T | any, options?: FindOneAndUpdateOption<T>): Promise<FindAndModifyWriteOpResultObject<T>>;
    updateMany(query: any, documents: T[] | any, options?: UpdateManyOptions): Promise<UpdateWriteOpResult>;
    deleteById(_id: ObjectId): Promise<DeleteWriteOpResultObject>;
    deleteMany(query: any, options?: CommonOptions): Promise<DeleteWriteOpResultObject>;
}
