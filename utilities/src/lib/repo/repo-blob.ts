import { IBlob, ILogger } from "../interfaces";
import {
    Aborter,
    AppendBlobURL,
    BlockBlobURL,
    BlobURL,
    ContainerURL,
    HttpRequestBody,
    PageBlobURL
} from "@azure/storage-blob";

import {
    BlobType,
    BlobGetPropertiesResponse,
    BlobDownloadResponse,
    BlockBlobUploadResponse,
    AppendBlobAppendBlockResponse
} from "@azure/storage-blob/typings/src/generated/src/models";

export interface BlobOptions {
    containerURL: ContainerURL;
    name: string;
    type?: BlobType;
}

export interface BlobCreateOptions {
    type?: BlobType;
    size?: number;
}

export class Blob implements IBlob {
    public name: string;
    public type: BlobType | any;

    private blob: AppendBlobURL | BlockBlobURL | PageBlobURL | any;
    private blobURL: BlobURL;
    private properties: any;

    constructor(options: BlobOptions, private logger: ILogger) {
        this.name = options.name;
        this.type = options.type;
        this.blobURL = BlobURL.fromContainerURL(options.containerURL, this.name);
    }

    public async create(options: BlobCreateOptions | any) {
        let response;
        switch (this.type || (options && options.type)) {
            case "BlockBlob":
                {
                    this.blob = this.getBlockBlob();
                    response = "Error, can't create BlockBlob, can only upload";
                    this.logger.warn(response);
                }
                break;
            case "AppendBlob":
            // tslint:disable-next-line: no-switch-case-fall-through
            default:
                {
                    this.blob = this.getAppendBlob();
                    response = await this.blob.create(Aborter.none, options);
                }
                break;
        }
        return response;
    }

    public async append(data: HttpRequestBody | any): Promise<AppendBlobAppendBlockResponse> {
        if (!this.blob) {
            this.blob = this.getAppendBlob();
        }

        if (this.blob.appendBlock) {
            return await this.blob.appendBlock(Aborter.none, data, data.length);
        }

        throw new Error("Blob operation exception.");
    }

    /**
     * Uploads binary/string/blob/stream data to blob storage.
     *
     * @param {(HttpRequestBody | any)} data
     * @returns
     * @memberof Blob
     */
    public async upload(data: HttpRequestBody | any): Promise<BlockBlobUploadResponse> {
        if (!this.blob) {
            this.blob = this.getBlockBlob();
        }

        if (this.blob.upload) {
            return await this.blob.upload(Aborter.none, data, data.length);
        }

        throw new Error("Blob operation exception.");
    }

    public async download(): Promise<BlobDownloadResponse> {
        return await this.blobURL.download(Aborter.none, 0);
    }

    /**
     * Deletes the current blob on blob storage.
     *
     * @returns
     * @memberof Blob
     */
    public async delete() {
        return await this.blobURL.delete(Aborter.none);
    }

    /**
     * Gets the properties of the current blob from blob storage.
     *
     * @returns
     * @memberof Blob
     */
    public async getProperties(): Promise<BlobGetPropertiesResponse> {
        if (this.properties) {
            return this.properties;
        }
        return (this.properties = await this.blobURL.getProperties(Aborter.none));
    }

    /**
     * Returns an Append Blob URL.
     *
     * @private
     * @returns {AppendBlobURL}
     * @memberof Blob
     */
    private getAppendBlob(): AppendBlobURL {
        return AppendBlobURL.fromBlobURL(this.blobURL);
    }

    /**
     * Returns a BlockBlobURL.
     *
     * @private
     * @returns {BlockBlobURL}
     * @memberof Blob
     */
    private getBlockBlob(): BlockBlobURL {
        return BlockBlobURL.fromBlobURL(this.blobURL);
    }
}
