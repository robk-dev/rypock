import * as Joi from '@hapi/joi';

const version = 'uuidv4';
const error = new Error(' Id validation failed');
export const required_uuid = {
    id: Joi.string()
        .guid({ version })
        .required()
        .error(error),
};

export const optional_uuid = {
    id: Joi.string()
        .guid({ version })
        .optional()
        .allow(null)
        .error(error),
};
