import { IRepo, IConnectionManager } from "../interfaces";

export class SQLRepo<T> implements IRepo<T> {
    constructor(private name: string, private db: IConnectionManager<any>) {}

    public async find(query: any): Promise<any[]> {
        return this.db
            .getClient()
            .getRepository(this.name)
            .find(query);
    }

    public async insert(document: T): Promise<any> {
        return this.db
            .getClient()
            .getRepository(this.name)
            .insert(document);
    }

    public async insertMany(documents: T[]): Promise<any> {
        return this.db
            .getClient()
            .getRepository(this.name)
            .insert(documents);
    }

    public async update(query: any, document: T, options?: any): Promise<any> {
        return this.db
            .getClient()
            .getRepository(this.name)
            .find(query)
            .update(document, options);
    }

    public async delete(query: any): Promise<any> {
        return this.db
            .getClient()
            .getRepository(this.name)
            .delete(query);
    }

    updateMany?(query: any, documents: T[], options?: any): Promise<any>;
    raw?(query: any, options?: any): Promise<any>;
}
