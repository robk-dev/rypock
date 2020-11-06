import { generateAESKey, encrypt, decrypt, hash, compare } from "../src";

const plainTextPassword = "some_text";

describe("Encryption and hashing suite:", async () => {
    let encryptedPassword: string | any = null;
    let hashedPassword: string | any = null;

    let encryptKey: string | any;

    it("0. Should generate key and iv", () => {
        encryptKey = generateAESKey();
        console.log({ encryptKey });
        expect(encryptKey).to.not.equal(null);
        expect(typeof encryptKey).to.be.equal("string");
    });

    it("1. Should encrypt(password)", () => {
        encryptedPassword = encrypt(plainTextPassword, encryptKey);
        console.log({ encryptedPassword });
        expect(encryptedPassword).to.not.equal(null);
        expect(typeof encryptedPassword).to.be.equal(typeof "string");
    });

    it("2. Should decrypt(password)", () => {
        const decryptResult = decrypt(encryptedPassword, encryptKey);
        console.log({ decryptResult });

        expect(decryptResult).to.not.equal(null);
        expect(typeof encryptedPassword).to.be.equal(typeof "string");
        expect(decryptResult).to.equal(plainTextPassword);
    });

    it("3. Should hash(password)", async () => {
        hashedPassword = await hash(plainTextPassword, 10);
        console.log({ hashedPassword });

        expect(hashedPassword).to.not.equal(null);
        expect(typeof hashedPassword).to.be.equal(typeof "string");
    });

    it("4. Should compare(password, hashedPassword)", async () => {
        const compared = await compare(plainTextPassword, hashedPassword);
        console.log({ compared });

        expect(compared).to.not.equal(null);
        expect(compared).to.be.equal(true);
    });
});
