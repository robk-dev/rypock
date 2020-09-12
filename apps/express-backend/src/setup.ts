// import { injector, ILogger, NoSQLConnectionManager } from 'rypock-utilities';
// import { IUsers } from './models';
// import { Db } from 'mongodb';
// const logger = injector.get<ILogger>('Logger');

// export async function init() {
//     try {
//         const db: Db = injector.get<NoSQLConnectionManager>('DB').getClient();
//         const users = injector.get<IUsers>('users');
//         console.log({ users });
//         const res = await users.find();
//         console.log({ res });
//         // const drop = await db.dropCollection('User');
//         // const createCollection = await db.createCollection("users");

//         // const createIndex1 = await db.collection('users').createIndex({ email: 1 }, { unique: true });
//         const createIndex2 = await db.collection('users').createIndex({ id: 1 }, { unique: true });
//         const createIndex3 = await db.collection('accounts').createIndex({ username: 1, email: 1 }, { unique: true });
//         console.log({ createIndex2, createIndex3 });
//     } catch (error) {
//         logger.error('error setting up', { error });
//     }
// }
