import { Aborter, ContainerURL, ServiceURL, IContainerListBlobsSegmentOptions } from "@azure/storage-blob";

import { ListBlobsFlatSegmentResponse } from "@azure/storage-blob/typings/src/generated/src/models";

import { IContainer, ILogger } from "../interfaces";
import { Blob } from "./repo-blob";

export interface ContainerOptions {
    serviceURL: ServiceURL;
    name: string;
}

export class Container implements IContainer {
    public name: string;
    public properties: any;
    private containerURL: ContainerURL;
    private blobs: WeakMap<{ name: string }, Blob> = new WeakMap();

    constructor(options: ContainerOptions, private logger: ILogger) {
        this.name = options.name;
        this.containerURL = ContainerURL.fromServiceURL(options.serviceURL, this.name);
    }

    public blob(name: string) {
        const key = { name };
        let blob: any;
        if (this.blobs.has(key)) {
            blob = this.blobs.get(key);
        } else {
            blob = new Blob({ name, containerURL: this.containerURL }, this.logger);
            this.blobs.set(key, blob);
        }
        return blob;
    }

    public async create() {
        return await this.containerURL.create(Aborter.none);
    }

    public async delete() {
        return await this.containerURL.delete(Aborter.none);
    }

    public async listBlobs(nextMarker?: string, options?: IContainerListBlobsSegmentOptions) {
        const listResponse: ListBlobsFlatSegmentResponse = await this.containerURL.listBlobFlatSegment(
            Aborter.none,
            nextMarker,
            options
        );

        this.logger.debug("List blobs", { listResponse });

        return { nextMarker: listResponse.nextMarker, blobs: listResponse.segment.blobItems };
    }

    public async listAllBlobs() {
        let nextMarker: any;
        let blobs: any[] = [];
        do {
            const listResponse: ListBlobsFlatSegmentResponse = await this.containerURL.listBlobFlatSegment(
                Aborter.none,
                nextMarker
            );

            this.logger.debug("List blobs", { listResponse });
            nextMarker = listResponse.nextMarker;
            blobs = [...blobs, ...listResponse.segment.blobItems];
        } while (nextMarker);

        return { blobs };
    }

    public async getProperties() {
        if (this.properties) {
            return this.properties;
        }
        const properties = await this.containerURL.getProperties(Aborter.none);
        console.log({ properties: properties });
        this.properties = properties;
        return properties;
    }
}
