import { IRepo } from "./repository.interface";
import { BlobType, ContainerCreateResponse } from "@azure/storage-blob/typings/src/generated/src/models";
import { IContainerListBlobsSegmentOptions } from "@azure/storage-blob";

// export type BlobType = "AppendBlob" | "BlockBlob";

export interface IBlobStorageService {
    connect(): Promise<any>;
    container(name: string): IContainer;
    getProperties(): Promise<any>;
    listContainers(nextMarker?: string): Promise<ListContainersResponse>;
    listAllContainers(): Promise<ListContainersResponse>;
}

export interface ListContainersResponse {
    nextMarker?: any;
    containers: any[];
}

export interface IContainer extends IRepo<IContainer> {
    name: string;
    properties?: any;
    blob(name: string): IBlob;
    create(): Promise<ContainerCreateResponse>;
    delete(): Promise<any>;
    getProperties(): Promise<any>;
    listBlobs(nextPointer?: string, options?: IContainerListBlobsSegmentOptions): Promise<ListBlobsResponse>;
    listAllBlobs(): Promise<ListBlobsResponse>;
}

export interface ListBlobsResponse {
    nextMarker?: any;
    blobs: any[];
}

export interface IBlob extends IRepo<IBlob> {
    name: string;
    type?: BlobType;
    append(data: any): Promise<any>;
    create(type?: BlobType): Promise<any>;
    delete(): Promise<any>;
    download(): Promise<any>;
    getProperties(): Promise<any>;
    upload(data: any): Promise<any>;
}
