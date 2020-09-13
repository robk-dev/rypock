/* middlewares/SchemaValidator.js */

import * as _ from 'lodash';
import * as Joi from '@hapi/joi';
import * as express from 'express';
import * as status from 'http-status';

import { schemas } from '../models/schemas';
import { IError } from '../interfaces/errors.interface';

export function validateMiddleware() {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const _validationOptions = {
            abortEarly: false, // abort after the first validation error
            allowUnknown: false, // allow unknown keys that will be ignored
            stripUnknown: true, // remove unknown keys from the validated data
        };

        let { url = '' } = req;
        url = url.split('/')[1] || '';
        const method = req.method.toLowerCase();

        console.log({ method, url });

        // if there's no schemas for the route, continue
        if (!_.has(schemas, url)) {
            return next();
        }

        if (!_.has(schemas[url].methods, method)) {
            return res.status(status['METHOD_NOT_ALLOWED']).json({
                error: {
                    message: status[405],
                    code: status['405_NAME'],
                },
            });
        }

        const _schema = _.get(schemas[url].methods, method);

        try {
            console.log('about to validate');
            // Validate req.body using the schema and validation options
            const data = await Joi.validate(req.body, _schema, _validationOptions);
            req.body = data;
            console.log('validated', { data });
            return next();
        } catch (error) {
            const err: Joi.ValidationError = error;
            // Joi Error
            const JoiError = {
                status: 'failed',
                error: {
                    original: err._object,

                    // fetch only message and type from each error
                    details: _.map(err.details, ({ message, type }: Joi.ValidationErrorItem) => ({
                        message: message.replace(/['"]/g, ''),
                        type,
                    })),
                    message: error.message,
                },
            };

            const CustomError: IError = {
                message: status[400],
                code: status['400_NAME'],
            };
            console.log('Joi validation failed', { error, JoiError, CustomError });
            // Send back the JSON error response
            return res.status(status['BAD_REQUEST']).json({ JoiError, CustomError });
        }
    };
}
