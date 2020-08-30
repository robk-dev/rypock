import { expect } from "chai";
import { Logger } from "../src/lib";

describe("Logger:", async () => {
    const logger = new Logger({ env: process.env.NODE_ENV, filePath: "../.test_output/" });

    it("1. info log level should work.", done => {
        const invoke = () => {
            logger.info("info test log");
        };
        expect(invoke).not.to.throw();
        done();
    });

    it("2. silly log level should work.", done => {
        const invoke = () => {
            logger.silly("silly test log");
        };
        expect(invoke).not.to.throw();
        done();
    });

    it("3. verbose log level should work.", done => {
        const invoke = () => {
            logger.verbose("verbose test log");
        };
        expect(invoke).not.to.throw();
        done();
    });

    it("4. trace log level should work.", done => {
        const invoke = () => {
            logger.trace("trace test log");
        };
        expect(invoke).not.to.throw();
        done();
    });

    it("5. debug log level should work.", done => {
        const invoke = () => {
            logger.debug("debug test log");
        };
        expect(invoke).not.to.throw();
        done();
    });

    it("6. warn log level should work.", done => {
        const invoke = () => {
            logger.warn("warn test log");
        };
        expect(invoke).not.to.throw();
        done();
    });

    it("7. error log level should work.", done => {
        const invoke = () => {
            logger.error("error test log");
        };
        expect(invoke).not.to.throw();
        done();
    });

    it("8. fatal log level should work.", done => {
        const invoke = () => {
            logger.fatal("fatal test log");
        };
        expect(invoke).not.to.throw();
        done();
    });
});
