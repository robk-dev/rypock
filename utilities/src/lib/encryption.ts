import * as bcrypt from "bcryptjs";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

/**
 * Given a password and number of iterations, auto generates salt and hashes a password.
 *
 * @export
 * @param {string} password plaintext password
 * @param {number} iterations number of hashing iterations
 * @returns {Promise<string>}
 */
export async function hash(password: string, iterations: number): Promise<string> {
    return await bcrypt.hash(password, iterations);
}

/**
 * Given a password and a hashed password, compares if the 2 are equivalent.
 * Returns true if yes.
 *
 * @export
 * @param {string} password plaintext password
 * @param {string} hashedPassword previously hashed password
 * @returns {Promise<boolean>}
 */
export async function compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}

/**
 * Returns the key as string in format "iv.key" unless as_object flag is passed
 * In which case returns it as { key, iv }
 *
 * @export
 * @param {number} [key_length_in_bytes=32]
 * @param {number} [iv_length_in_bytes=16]
 * @param {boolean} [as_object=false]
 * @returns {(string | EncryptDecryptOptions)}
 */
export function generateAESKey(
    key_length_in_bytes: number = 32,
    iv_length_in_bytes: number = 16,
    as_object: boolean = false
): string | EncryptDecryptOptions {
    const key = {
        key: randomBytes(key_length_in_bytes || 32).toString("base64"), // 16 for 128 bit, 32 for 256 //aes256
        iv: randomBytes(iv_length_in_bytes || 16).toString("base64") // IV always 16b bytes
    };

    if (as_object) {
        return key;
    }

    return key.iv + "." + key.key;
}

export interface EncryptDecryptOptions {
    algorithm?: string;
    key: string;
    iv: string;
}

/**
 * Pass text, and AES key options as key + iv or as a string formatted "iv.key"
 *
 * @export
 * @param {string} text text to be encrypted
 * @param {EncryptDecryptOptions} options
 * @returns {string}
 */
export function encrypt(text: string, keyOrOptions: string | EncryptDecryptOptions): string {
    const options = getOptions(keyOrOptions);

    const cipher = createCipheriv(
        options.algorithm || "aes-256-cbc",
        Buffer.from(options.key, "base64"),
        Buffer.from(options.iv, "base64")
    );

    let encrypted: Buffer = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("base64");
}

function getOptions(options: any): EncryptDecryptOptions {
    if (!options.iv || typeof options === "string") {
        const [iv, key] = options.split(".");
        options = { key, iv, algorithm: options.algorithm };
    }
    return options;
}

/**
 * Given ciphertext, key and iv, decrypts a ciphertext and returns plaintext string.
 *
 * @export
 * @param { EncryptDecryptOptions} options
 * @returns {string} plaintext
 */
export function decrypt(ciphertext: string, options: string | EncryptDecryptOptions): string {
    options = getOptions(options);

    const encryptedText = Buffer.from(ciphertext, "base64");

    const decipher = createDecipheriv(
        options.algorithm || "aes-256-cbc",
        Buffer.from(options.key, "base64"),
        Buffer.from(options.iv, "base64")
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}
