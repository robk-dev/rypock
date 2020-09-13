/**
 * Wrapped object with get/set method for getting dependencies on demand.
 *
 * @class Injector
 */
class Injector {
    private singleton: any = {};

    public get<T>(key: string): T {
        if (!this.singleton[key]) {
            throw new Error(`No such object: [${key}]`);
        }

        return this.singleton[key];
    }

    public set<T>(key: string, object: any): T {
        if (this.singleton[key]) {
            throw new Error(`Object [${key}] already exists.`);
        }

        return (this.singleton[key] = object);
    }
}

// global singleton (single instance) injector
const injector = new Injector();

export { injector };
