import * as Joi from '@hapi/joi';
import { optional_uuid, required_uuid } from './uuid';

export const POST_ACCOUNT_SCHEMA = Joi.object().keys({
    first_name: Joi.string()
        .trim()
        .regex(/^[a-zA-Z]+$/)
        .required()
        .error(new Error('Invalid first name.')),
    last_name: Joi.string()
        .trim()
        .regex(/^[a-zA-Z]+$/)
        .required()
        .error(new Error('Invalid last name.')),
    username: Joi.string()
        .trim()
        .alphanum()
        .required()
        .error(new Error('Invalid username.')),
    email: Joi.string()
        .email()
        .lowercase()
        .required()
        .error(new Error('Invalid email.')),
    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .strict()
        .strip()
        .error(new Error('Password validation failed.')),
    confirm_password: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .strict()
        .strip()
        .error(new Error('Password validation failed.')),
    age: Joi.number()
        .integer()
        .min(18)
        .max(99)
        .required()
        .error(new Error('Must be 18-99 of age.'))
});

export const PUT_ACCOUNT_SCHEMA = POST_ACCOUNT_SCHEMA.keys({
    ...required_uuid
});

const methods = {
    get: optional_uuid,
    delete: required_uuid
};

export const validationMiddleware = {
    '/accounts/': {
        methods
    },
    '/accounts': {
        methods
    }
};
