import { validationMiddleware as users } from './users-schema';
import { validationMiddleware as accounts } from './accounts-schema';
import { ISchemas } from '../../interfaces/schemas.interface';
export * from './uuid';

export const schemas: ISchemas = { ...users, ...accounts };
