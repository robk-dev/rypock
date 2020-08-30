const ESAPI = require("node-esapi");

// removes all duplicates properties of type object from JSON while stringifying
export const stringify = (object: any): string => {
    const cache = new WeakSet();
    const replacer = (key: string, value: any) => {
        if (key && value && typeof value === "object") {
            if (cache.has(value)) {
                return;
            }
            cache.add(value);
        }
        return value;
    };
    const data = JSON.stringify(object, replacer);
    return data;
};

export const replaceSensitive = (str: string, from: string, to: string): string => {
    const length = from.length + to.length;
    if (typeof str !== "string") {
        return str;
    }

    from = from.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    to = to.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

    const regex = new RegExp(`${from}[\\d\\D]*?${to}`, "g");
    return str.replace(regex, match => {
        let start = "";
        for (let i = 0, max = match.length - length; i < max; i++) {
            start += "*";
        }
        return start;
    });
};

export const antiCRLF = (data: any): string => {
    if (data) {
        let str = typeof data !== "string" ? stringify(data) : data;
        str = str.replace(/(\r\n|\r|\n)/g, "_");
        return ESAPI.encoder().encodeForJavaScript(str);
    } else {
        return "undefined";
    }
};

export const tryParse = (data: string) => {
    let parsed;
    try {
        parsed = JSON.parse(data);
    } catch (error) {
        parsed = {};
        console.log({ message: "failed to parse data", data });
    }
    return parsed;
};

export const wait = async (time: number): Promise<any> => {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve();
        }, time);
    });
};
