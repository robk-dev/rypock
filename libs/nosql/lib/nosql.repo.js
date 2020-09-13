"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSQLRepo = void 0;
class NoSQLRepo {
    constructor(collection, db) {
        this.collection = collection;
        this.db = db;
    }
    async find(query = {}, projection, options) {
        return await this.db.getClient().collection(this.collection).find(query, options).project(projection).toArray();
    }
    async insert(document, options) {
        return await this.db.getClient().collection(this.collection).insertOne(document, options);
    }
    async insertMany(documents, options) {
        return await this.db.getClient().collection(this.collection).insertMany(documents, options);
    }
    async update(query, document, options) {
        return await this.db.getClient().collection(this.collection).findOneAndUpdate(query, document, options);
    }
    async updateMany(query, documents, options) {
        return await this.db.getClient().collection(this.collection).updateMany(query, documents, options);
    }
    async deleteById(_id) {
        return await this.db.getClient().collection(this.collection).deleteOne({ _id });
    }
    async deleteMany(query, options) {
        return await this.db.getClient().collection(this.collection).deleteMany(query, options);
    }
}
exports.NoSQLRepo = NoSQLRepo;
//# sourceMappingURL=nosql.repo.js.map