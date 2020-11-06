import { RedisConnectionManager, RedisRepo } from "../src";
import * as path from "path";
import { ILogger } from "@rypock/shared";

require("dotenv").config({ path: path.resolve(__dirname + "/.env") });

let redis: any;

const config = {
    host: process.env.REDIS_HOST as string,
    port: parseInt(process.env.REDIS_PORT as string, 10),
    password: process.env.REDIS_PASSWORD as string,
    connectTimeout: 30000
};

const logger: ILogger & any = console;
const manager = new RedisConnectionManager(config, logger);

describe("Redis:", () => {
    before(async () => {
        await manager.connect();
        redis = new RedisRepo(manager, logger);
    });

    after(async () => {
        await manager.disconnect();
    });

    it("1. Should return the value passed to it.", async () => {
        const setResult = await redis.set("key1", "123");
        const getResult = await redis.find("key1");

        console.log({ setResult, getResult });
        expect(getResult).to.equal("123");
    });

    it("2. Should set and return an object of key-values passed to it.", async () => {
        const mockObj = { a: "a", b: "b", c: "3" };
        const setResult = await redis.hmSet("hmSetKey-1", mockObj);
        const getResult = await redis.hGetAll("hmSetKey-1");

        console.log({ setResult, mockObj, getResult });
        expect(getResult).to.deep.equal(mockObj);
    });

    it("3. Should always return string values.", async () => {
        const mockObj = { someNumberValue: 1 };
        await redis.hmSet("hmSetKey-2", mockObj);
        const getResult = await redis.hGetAll("hmSetKey-2");

        console.log({ mockObj, getResult });
        expect(getResult).to.not.deep.equal(mockObj);
    });

    it("4. Should list existing keys.", async () => {
        const listResponse = await redis.list("*");

        console.log({ listResponse });
        expect(listResponse).to.not.equal(null);
    });
});
