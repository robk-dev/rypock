import { IConnectionManager, IRepo, ILogger } from '@rypock/shared/lib';
import { RedisClient } from 'redis';
export interface IRedisInsertOptions {
    command?: string;
    expiryTime?: number;
}
export declare class RedisRepo<T> implements IRepo<T> {
    private cache;
    private logger;
    constructor(cache: IConnectionManager<RedisClient>, logger: ILogger);
    /**
     * Given a key, finds a value
     *
     * @param {string} key unique key associated with a value
     * @returns {Promise<any>}
     * @memberof RedisRepo
     */
    find(key: string): Promise<any>;
    /**
     * Given a key deletes it from cache.
     *
     * @param {string} key unique key associated with a value
     * @returns {Promise<any>}
     * @memberof RedisRepo
     */
    delete(key: string): Promise<any>;
    /**
     * Given a key and a value, sets them in cache.
     *
     * @param {string} key unique key associated with a value
     * @param {string} value value to be inserted
     * @param {IRedisInsertOptions} options
     * @returns {Promise<any>}
     * @memberof RedisRepo
     */
    set(key: string, value: string, options?: IRedisInsertOptions): Promise<any>;
    /**
     * Given a key and object of values, sets them in cache.
     *
     * @param {string} key unique key associated with a value
     * @param {{}} object JSON object of key value pairs
     * @returns {Promise<any>}
     * @memberof RedisRepo
     */
    hmSet(key: string, object: {}): Promise<any>;
    /**
     * Given a key, sets its expiry time.
     *
     * @param {string} key unique key associated with a value
     * @param {number} timeToLive TTL for the key.
     * @returns {Promise<any>}
     * @memberof RedisRepo
     */
    expire(key: string, timeToLive: number): Promise<any>;
    /**
     * Given a key associated with an object/array of, sets its expiry time.
     *
     * @param {string} key unique key associated with a value
     * @returns {Promise<any>}
     * @memberof RedisRepo
     */
    hGetAll(key: string): Promise<any>;
    /**
     * Given an array of commands and keys, executes them.
     *
     *      ["mget", "multifoo", "multibar", redis.print],
     *      ["incr", "multifoo"],
     *      ["incr", "multibar"]
     *
     * @param {any[]} queries
     * @returns
     * @memberof RedisRepo
     */
    multi(queries: any[]): Promise<unknown>;
    list(query: any): Promise<unknown>;
}
