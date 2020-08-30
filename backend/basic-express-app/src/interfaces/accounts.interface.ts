import { Models } from '../models/types';
import { IRepo } from 'rypock-utilities';

export interface IAccounts extends IRepo<IAccounts> {
    create(account: Models.UnsafeAccount): Promise<any>;
    findById(id: string): Promise<any>;
    find(query: {}): Promise<any>;
    delete(id: string): Promise<any>;
    update(id: string, document: any, options?: any): Promise<any>;
}
