import { Request, Response, NextFunction } from "express";
import Joi from "joi";

interface ExtendedRequest extends Request {
  body: {};
}

export const validator =
  (schema: Joi.ObjectSchema) =>
  (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    next();
  };
