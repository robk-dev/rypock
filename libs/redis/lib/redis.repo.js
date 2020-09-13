"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisRepo = void 0;
class RedisRepo {
    constructor(cache, logger) {
        this.cache = cache;
        this.logger = logger;
    }
    /**
     * Given a key, finds a value
     *
     * @param {string} key unique key associated with a value
     * @returns {Promise<any>}
     * @memberof RedisRepo
     */
    async find(key) {
        return new Promise((resolve, reject) => {
            this.cache.getClient().get(key, (error, result) => {
                if (error) {
                    this.logger.error('Redis.find(): error getting key', { key, error });
                    return reject(error);
                }
                if (!result) {
                    this.logger.info('Redis.find(): missing value', { key, result });
                    return resolve(null);
                }
                return resolve(result);
            });
        });
    }
    /**
     * Given a key deletes it from cache.
     *
     * @param {string} key unique key associated with a value
     * @returns {Promise<any>}
     * @memberof RedisRepo
     */
    async delete(key) {
        return new Promise((resolve) => {
            this.cache.getClient().del(key, (error, result) => {
                if (error) {
                    this.logger.error('Redis.delete(): error deleting key', { key, error });
                    return resolve(null);
                }
                else {
                    return resolve(result);
                }
            });
        });
    }
    /**
     * Given a key and a value, sets them in cache.
     *
     * @param {string} key unique key associated with a value
     * @param {string} value value to be inserted
     * @param {IRedisInsertOptions} options
     * @returns {Promise<any>}
     * @memberof RedisRepo
     */
    async set(key, value, options = {}) {
        return new Promise((resolve, reject) => {
            // return this.cache.getClient().set(key, value);
            this.cache.getClient().set(key, value, options.command || 'EX', options.expiryTime || 3600, (error, result) => {
                if (error) {
                    this.logger.error('Redis.set(): error setting value', { key, value, error });
                    return reject(error);
                }
                else {
                    return resolve(result);
                }
            });
        });
    }
    /**
     * Given a key and object of values, sets them in cache.
     *
     * @param {string} key unique key associated with a value
     * @param {{}} object JSON object of key value pairs
     * @returns {Promise<any>}
     * @memberof RedisRepo
     */
    async hmSet(key, object) {
        return new Promise((resolve, reject) => {
            this.cache.getClient().hmset(key, object, (error, result) => {
                if (error) {
                    this.logger.error('Redis.hmSet(): error setting value', { key, object, error });
                    return reject(error);
                }
                else {
                    return resolve(result);
                }
            });
        });
    }
    /**
     * Given a key, sets its expiry time.
     *
     * @param {string} key unique key associated with a value
     * @param {number} timeToLive TTL for the key.
     * @returns {Promise<any>}
     * @memberof RedisRepo
     */
    async expire(key, timeToLive) {
        return new Promise((resolve, reject) => {
            this.cache.getClient().expire(key, timeToLive, (error, result) => {
                if (error) {
                    this.logger.error('Redis.expire(): error setting TTL:', { key, error });
                    return reject(error);
                }
                else {
                    return resolve(result);
                }
            });
        });
    }
    /**
     * Given a key associated with an object/array of, sets its expiry time.
     *
     * @param {string} key unique key associated with a value
     * @returns {Promise<any>}
     * @memberof RedisRepo
     */
    async hGetAll(key) {
        return new Promise((resolve, reject) => {
            this.cache.getClient().hgetall(key, (error, result) => {
                if (error) {
                    this.logger.error('Redis.hgetall(): error getting key', {
                        key,
                        error,
                    });
                    return reject(error);
                }
                if (!result) {
                    this.logger.info('Redis.hgetall(): missing value', { key, result });
                    return reject('missing value');
                }
                return resolve(result);
            });
        });
    }
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
    async multi(queries) {
        return new Promise((resolve, reject) => {
            this.cache
                .getClient()
                .multi(queries)
                .exec((error, result) => {
                if (error) {
                    this.logger.error('Redis.multi(): error executing queries.', {
                        queries,
                        error,
                    });
                    return reject(error);
                }
                if (!result) {
                    this.logger.info('Redis.multi(): missing results', {
                        queries,
                        result,
                    });
                    return reject('missing value');
                }
                return resolve(result);
            });
        });
    }
    async list(query) {
        return new Promise((resolve, reject) => {
            this.cache.getClient().KEYS(query, (error, result) => {
                if (error) {
                    this.logger.error('Redis.list(): error executing query.', {
                        query,
                        error,
                    });
                    return reject(error);
                }
                if (!result) {
                    this.logger.info('Redis.list(): missing results', {
                        query,
                        result,
                    });
                    return resolve([]);
                }
                return resolve(result);
            });
        });
    }
}
exports.RedisRepo = RedisRepo;
//# sourceMappingURL=redis.repo.js.map