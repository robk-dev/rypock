export interface IConnectionManager<T> {
    connect(): Promise<any>;
    disconnect(): Promise<any>;
    getClient(): T;
}
