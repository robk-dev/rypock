import { expect } from "chai";
import { injector } from "../src/lib";

const mockObject = { foo: "bar" };

describe("Injector:", () => {
    it("1. Should return the object passed to it on set.", (done: any) => {
        const key = "key1";
        const setObject = injector.set<"Generic">(key, mockObject);

        console.log({ mockObject, setObject });
        expect(mockObject).to.deep.equal(setObject);
        done();
    });

    it("2. Should throw an error if trying to set an object with existing key object more than once.", (done: any) => {
        const key = "key2";

        const invoke = () => {
            injector.set(key, mockObject);
        };
        invoke();

        expect(invoke).to.throw();
        done();
    });

    it("3. Should throw an error if trying to get an object that doesn't exist.", (done: any) => {
        const key = "key3";

        const invoke = () => {
            injector.get(key);
        };

        expect(invoke).to.throw();
        done();
    });

    it("4. Should return object passed to it on get.", (done: any) => {
        const key = "key4";

        injector.set(key, mockObject);

        const result = injector.get(key);

        expect(result).to.deep.equal(mockObject);
        done();
    });
});
