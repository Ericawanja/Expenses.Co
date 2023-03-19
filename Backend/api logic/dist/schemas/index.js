"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expensesSchema = exports.projectSchema = exports.clientRegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.clientRegisterSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string()
        .required()
        .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    location: joi_1.default.string().required(),
});
exports.projectSchema = joi_1.default.object({
    clientId: joi_1.default.string().required(),
    projectTitle: joi_1.default.string().min(3).max(100).required(),
    projectType: joi_1.default.string().min(3).max(100).required(),
    assigned_on: joi_1.default.string().required(),
    due_on: joi_1.default.string().required(),
});
exports.expensesSchema = joi_1.default.object({
    projectId: joi_1.default.string().required(),
    expenditure: joi_1.default.number().required(),
    budget: joi_1.default.number().required(),
    isPaid: joi_1.default.boolean(),
});
