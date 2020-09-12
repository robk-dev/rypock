import * as Joi from '@hapi/joi';

export interface ISchemas {
    [path: string]: { [method: string]: Joi.Schema | {} };
}
