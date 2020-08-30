export interface IRepo<T> {
    delete?(_id: any): Promise<any>;
    find?(query: any, projection?: any, options?: any): Promise<any>;
    insert?(document: T, options?: any): Promise<any>;
    set?(key: string, value: string, options?: any): Promise<any>;
    insertMany?(documents: T[] | any, options?: any): Promise<any>;
    update?(query: any, document: T | any, options?: any): Promise<any>;
    updateMany?(query: any, documents: T[] | any, options?: any): Promise<any>;
    raw?(query: any, options?: any): Promise<any>;
}
