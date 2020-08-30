export const flattenValues = (data: any): any => {
    const result: any = {};

    const recurse = (obj: any, prop: string): any => {
        if (Object(obj) !== obj) {
            return (result[prop] = obj);
        }

        if (Array.isArray(obj)) {
            let j: number = obj.length;
            for (let i = 0; i < j; i++) {
                return recurse(obj[i], prop + "[" + i + "]");
            }
            if (j === 0) {
                return (result[prop] = []);
            }
        }

        const keys = Object.keys(obj);
        if (keys.length < 1) {
            return (result[prop] = {});
        } else {
            keys.forEach(k => {
                recurse(obj[k], prop ? prop + "." + k : k);
            });
        }
    };

    recurse(data, "");
    return result;
};
