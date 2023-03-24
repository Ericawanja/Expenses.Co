import Joi from "joi";

export const clientRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  location: Joi.string().required(),
});

export const projectSchema = Joi.object({
  clientId: Joi.string().required(),
  projectTitle: Joi.string().min(3).max(100).required(),
  projectType: Joi.string().min(3).max(100).required(),
  assigned_on: Joi.string().required(),
  due_on: Joi.string().required(),
  budget: Joi.number().required(),
});

export const expensesSchema = Joi.object({
  projectId: Joi.string().required(),
  expenseTitle: Joi.string().required(),
  expenseDescription: Joi.string().required(),
  amount:Joi.number().required()
});
