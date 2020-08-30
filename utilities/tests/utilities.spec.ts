import { wait, tryParse, stringify, flattenValues } from "../src/lib/utils";
import { expect } from "chai";

const json = {
    a: "a",
    b: "b"
};

const nested = {
    a: {
        b: {
            c: {
                d: {
                    e: {
                        f: {
                            g: {
                                h: {
                                    json,
                                    potato: [{ i: "a", j: "b" }]
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
describe("Utilities functions:", () => {
    it("1. Should wait at least wait time duration", async () => {
        const start = Date.now();
        const wait_time = 1000;
        const in_1000_ms = start + wait_time - 1;
        await wait(wait_time);
        const now = Date.now();
        expect(now).to.be.greaterThan(in_1000_ms);
    });

    it("2. Should parse JSON successfully", async () => {
        const parsed = tryParse(JSON.stringify(json));
        console.log({ json, parsed });
        expect(typeof parsed).to.equal("object");
    });

    it("3. Should stringify JSON successfully", async () => {
        const stringified = stringify(json);
        console.log({ json, stringified });
        expect(typeof stringified).to.equal("string");
    });

    it("4. Should parse JSON successfully", async () => {
        const stringified = stringify(nested);
        const parsed = tryParse(stringified);
        console.log({ json, stringified, parsed });
        expect(typeof parsed).to.equal("object");
        expect(typeof stringified).to.equal("string");
    });

    it("4. Should flatten JSON successfully", async () => {
        const flattened = flattenValues(nested);
        console.log({ flattened });
        const length = Object.keys(flattened).length;
        expect(length).to.equal(4);
    });
});
