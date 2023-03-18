"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRegisterSchema = void 0;
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
    password: joi_1.default.string().required().min(8).max(20),
    isAdmin: joi_1.default.number(),
});
