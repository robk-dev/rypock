import { BlobStorageService } from "../src/lib/connectors/connector-blob";
import { expect } from "chai";
import { Logger } from "../src/lib";
import * as path from "path";

require("dotenv").config({ path: path.resolve(__dirname + "/.env") });

const logger = new Logger({ env: process.env.NODE_ENV, filePath: "../.test_output/" });

const containerName = "container123";
const blobName = "blob123.txt";

describe("Blob Storage:", async () => {
    const manager = new BlobStorageService(
        {
            account: process.env.BLOB_ACCOUNT as string,
            accountKey: process.env.BLOB_ACCOUNT_KEY as string
        },
        logger
    );

    before(async () => {
        await manager.connect();
    });

    it("1. Should getProperties()", async () => {
        const getPropertiesResponse = await manager.getProperties();
        logger.info("response", { getPropertiesResponse });
        expect(getPropertiesResponse).to.not.equal(null);
    });
    it("2. Should listContainers()", async () => {
        const listContainersResponse = await manager.listContainers();
        logger.info("response", { listContainersResponse });

        expect(listContainersResponse).to.not.equal(null);
    });
    it("3. Should listAllContainers()", async () => {
        const listContainersResponse = await manager.listAllContainers();
        logger.info("response", { listContainersResponse });

        expect(listContainersResponse).to.not.equal(null);
    });
    it("4. Should get container()", async () => {
        const container = manager.container(containerName);
        logger.info("response", { container });

        expect(container).to.not.equal(null);
    });

    it("5. Should container.create()", async () => {
        const container = manager.container(containerName);
        const createContainerResponse = await container.create();
        logger.info("response", { createContainerResponse });
        expect(createContainerResponse).to.not.equal(null);
    });

    it("6. Should container.getProperties()", async () => {
        const container = manager.container(containerName);
        const getPropertiesResponse = await container.getProperties();
        logger.info("response", { getPropertiesResponse });
        expect(container).to.not.equal(null);
    });

    it("7. Should container.blob()", async () => {
        const container = manager.container(containerName);
        const blob = container.blob(blobName);

        expect(blob).to.not.equal(null);
    });

    it("8. Should upload()", async () => {
        const container = manager.container(containerName);
        const blob = container.blob(blobName);
        const data = "Hello World";
        const uploadResponse = await blob.upload(data);
        console.log({ uploadResponse });
        expect(uploadResponse).to.not.equal(null);
    });

    it("9. Should blob.getProperties()", async () => {
        const container = manager.container(containerName);
        const blob = container.blob(blobName);
        const getPropertiesResponse = await blob.getProperties();
        logger.info("response", { getPropertiesResponse });
        expect(container).to.not.equal(null);
    });

    it("10. Should blob.download()", async () => {
        const container = manager.container(containerName);
        const blob = container.blob(blobName);
        const downloadResponse = await blob.download();
        logger.info("response", { downloadResponse });
        expect(container).to.not.equal(null);
    });

    it("11. Should blob.create()", async () => {
        const container = manager.container(containerName);
        const blob = container.blob("appendBlob.txt");
        const createResponse = await blob.create();
        logger.info("response", { createResponse });
        expect(container).to.not.equal(null);
    });

    it("12. Should blob.append()", async () => {
        const container = manager.container(containerName);
        const blob = container.blob("appendBlob.txt");
        const data = "someText";
        const appendResponse = await blob.append(data);
        logger.info("response", { appendResponse });
        expect(container).to.not.equal(null);
    });

    it("13. Should container.listBlobs()", async () => {
        const container = manager.container(containerName);
        const listBlobsResponse = await container.listBlobs();
        logger.info("response", { listBlobsResponse });
        expect(container).to.not.equal(null);
    });

    it("14. Should container.listAllBlobs()", async () => {
        const container = manager.container(containerName);
        const listAllBlobsResponse = await container.listAllBlobs();
        logger.info("response", { listAllBlobsResponse });
        expect(container).to.not.equal(null);
    });

    it("15. Should blob.delete()", async () => {
        const appendBlob = manager.container(containerName).blob("appendBlob.txt");
        const blockBlob = manager.container(containerName).blob(blobName);
        const deleteResponse1 = await appendBlob.delete();
        const deleteResponse2 = await blockBlob.delete();
        logger.info("response", { deleteResponse1, deleteResponse2 });
        expect(deleteResponse1).to.not.equal(null);
    });

    it("16. Should container.delete()", async () => {
        const deleteResponse = await manager.container(containerName).delete();
        logger.info("response", { deleteResponse });
        expect(deleteResponse).to.not.equal(null);
    });
});
