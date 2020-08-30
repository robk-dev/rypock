import { expect } from "chai";
import { NoSQLConnectionManager, Logger, NoSQLRepo } from "../src/lib";
import * as path from "path";

require("dotenv").config({ path: path.resolve(__dirname + "/.env") });

const logger = new Logger({ env: process.env.NODE_ENV, filePath: "../.test_output/" });

const manager = new NoSQLConnectionManager(
    {
        URI: process.env.MONGO_DB_URI as string,
        database: process.env.MONGO_DB_NAME as string,
        password: process.env.MONGO_PASSWORD as string,
        user: process.env.MONGO_USER as string
    },
    logger
);

const usersRepo = new NoSQLRepo("User", manager);

describe("MongoDB:", () => {
    let documentId: any | string = null;

    before(async () => {
        await manager.connect();
    });

    after(async () => {
        await manager.disconnect();
    });

    it("1. Insert should work.", async () => {
        const {
            result: { n, ok },
            insertedId
        } = await usersRepo.insert({ username: "test123" });
        documentId = insertedId;
        const expectedResult = { n: 1, ok: 1 };
        console.log({ insertedId, insertResult: { n, ok }, expectedResult });

        expect(n).to.equal(expectedResult.n);
        expect(ok).to.equal(expectedResult.ok);
    });

    it("2. Update should work.", async () => {
        const { ok, value, ...rest } = await usersRepo.update({ _id: documentId }, { $set: { name: "John" } });

        const expectedResult = { _id: documentId, username: "test123" };
        console.log({ ok, insertResult: rest, expectedResult, actualResult: value });
        expect(ok).to.equal(1);
    });

    it("3. Delete by Id should work.", async () => {
        const {
            result: { ok }
        } = await usersRepo.deleteById(documentId);
        console.log({ ok });
        expect(ok).to.equal(1);
    });

    it("4. Insert many should work.", async () => {
        const users = [{ username: "user1", name: "Name1" }, { username: "user2", name: "Name2" }];

        const {
            result: { n, ok },
            insertedCount,
            insertedIds,
            ...rest
        } = await usersRepo.insertMany(users);
        // documentId = insertedId;
        const expectedResult = { n: 2, ok: 1 };
        console.log({ rest, insertResult: { n, ok }, expectedResult, insertedCount, usersCount: users.length });

        expect(n).to.equal(expectedResult.n);
        expect(insertedCount).to.equal(users.length);
        expect(ok).to.equal(1);
    });

    it("5. Delete many should work.", async () => {
        const { result, deletedCount } = await usersRepo.deleteMany({ username: { $regex: /user/ } });
        // documentId = insertedId;
        console.log({ deleteResult: result, deletedCount });

        expect(result.ok).to.equal(1);
        expect(deletedCount).to.be.above(1);
    });
});
