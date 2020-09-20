import * as Joi from 'joi';

export interface ISchemas {
    [path: string]: { [method: string]: Joi.Schema | {} };
}
