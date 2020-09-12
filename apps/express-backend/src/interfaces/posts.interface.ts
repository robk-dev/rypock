import { Models } from '../models/types';

export interface IPosts {
    publish(post: Models.Post): Promise<any>;
    get(_id: string): Promise<Models.Post>;
    delete(_id: string): Promise<any>;
    update(_id: string, document: any, options?: any): Promise<Models.Post>;
}
