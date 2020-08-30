export interface IKeyvault {
    deleteSecret(name: string): Promise<any>;
    getSecret(name: string): Promise<string>;
    setSecret(name: string | {}, value: string, options?: any): Promise<string>;
    getKey(name: string): Promise<string>;
    createKey(name: string, value?: string): Promise<any>;
}
