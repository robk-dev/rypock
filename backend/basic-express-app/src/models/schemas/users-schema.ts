import * as Joi from '@hapi/joi';
import { optional_uuid, required_uuid } from './uuid';

export const POST_USERS_SCHEMA = Joi.object().keys({
    username: Joi.string()
        .alphanum()
        .required()
        .error(new Error('Invalid user name.')),
    email: Joi.string()
        .email()
        .lowercase()
        .required()
        .error(new Error('Invalid email.')),
    joined: Joi.date()
        .iso()
        .required()
        .error(new Error('Error invalid date.')),
    picture: Joi.string().uri(),
    description: Joi.string()
        .max(500)
        .optional()
});

export const PUT_USERS_SCHEMA = POST_USERS_SCHEMA.keys({
    ...required_uuid
});

const methods = {
    get: optional_uuid,
    delete: required_uuid,
    post: POST_USERS_SCHEMA,
    put: PUT_USERS_SCHEMA
};
export const validationMiddleware = {
    '/users/': {
        methods
    },
    '/users': {
        methods
    }
};
