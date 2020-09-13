import { Models } from '../models/types';
export interface IUsers {
    create(user: Models.User): Promise<any>;
    find(_id?: string): Promise<any>;
    delete(_id: string): Promise<any>;
    update(_id: string, document: any, options?: any): Promise<any>;
}
