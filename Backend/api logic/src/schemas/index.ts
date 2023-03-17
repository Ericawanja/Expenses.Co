import Joi from 'joi'

export const clientRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    location: Joi.string().required(),
  password: Joi.string().required().min(8).max(20),
  isAdmin: Joi.number(),

})