"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../Controllers");
const validator_1 = require("../midlewares/validator");
const schemas_1 = require("../schemas");
const auth = (0, express_1.Router)();
auth.post("/register", (0, validator_1.validator)(schemas_1.registerSchema), Controllers_1.register);
auth.post("/login", (0, validator_1.validator)(schemas_1.loginSchema), Controllers_1.login);
auth.post("/forgot", (0, validator_1.validator)(schemas_1.forgotPasswordSchema), Controllers_1.forgot);
auth.post("/reset", (0, validator_1.validator)(schemas_1.loginSchema), Controllers_1.reset);
exports.default = auth;
