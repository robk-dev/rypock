import { Aborter, ServiceURL, StorageURL, SharedKeyCredential } from '@azure/storage-blob';

import { Container } from './container.repo';

import { IBlobStorageService, ListContainersResponse } from './blob.repo.interface';

export interface IBlobOptions {
    account: string;
    accountKey: string;
}

/**
 *
 *
 * @export
 * @class BlobStorageService
 */
export class BlobStorageService implements IBlobStorageService {
    private serviceURL: ServiceURL;
    private containers: WeakMap<{ name: string }, Container> = new WeakMap();

    constructor(options: IBlobOptions, private logger: any) {
        const account = options.account;
        const accountKey = options.accountKey;

        const sharedKeyCredential = new SharedKeyCredential(account, accountKey);
        const pipeline = StorageURL.newPipeline(sharedKeyCredential);

        this.serviceURL = new ServiceURL(`https://${account}.blob.core.windows.net`, pipeline);
    }

    /**
     * Given a container name, returns a Container object
     *
     * @param {string} name
     * @returns {Container}
     * @memberof BlobStorageService
     */
    public container(name: string): Container {
        let container: Container | any;
        const key = { name };
        if (this.containers.has(key)) {
            container = this.containers.get(key);
        } else {
            container = new Container({ name, serviceURL: this.serviceURL }, this.logger);
            this.containers.set(key, container);
        }
        return container;
    }

    /**
     * Gets the properties of the currently connected Blob service
     * to check that connection works.
     *
     * @returns
     * @memberof BlobStorageService
     */
    public async connect() {
        this.logger.info('Connecting to Blob');
        return await this.getProperties();
    }

    /**
     * Gets the properties of the currently connected Blob service.
     *
     * @returns
     * @memberof BlobStorageService
     */
    public async getProperties() {
        return await this.serviceURL.getProperties(Aborter.none);
    }

    /**
     * Lists containers up to 200 at a time from any starting point marker, default = null.
     *
     * @param {string} [nextMarker]
     * @returns {Promise<any>}
     * @memberof BlobStorageService
     */
    public async listContainers(nextMarker?: string): Promise<ListContainersResponse> {
        try {
            const listContainersResponse = await this.serviceURL.listContainersSegment(Aborter.none, nextMarker);

            const marker = listContainersResponse.nextMarker;
            const containers = listContainersResponse.containerItems;
            return { nextMarker: marker, containers };
        } catch (error) {
            this.logger.error('Error listing containers', { error });
            throw error;
        }
    }

    /**
     * Aggregates all containers even if it takes multiple LIST operations.
     *
     * @returns {Promise<any>}
     * @memberof BlobStorageService
     */
    public async listAllContainers(): Promise<any> {
        let marker;
        let containers: any[] = [];
        try {
            do {
                const listContainersResponse: any = await this.listContainers(marker);
                marker = listContainersResponse.nextMarker;
                containers = [...containers, ...listContainersResponse.containers];
            } while (marker);
        } catch (error) {
            this.logger.error('Error listing all containers', { error });
        }
        return { containers };
    }
}
