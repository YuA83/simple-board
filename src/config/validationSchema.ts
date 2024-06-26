import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_DATABASE: Joi.string().required(),
});
