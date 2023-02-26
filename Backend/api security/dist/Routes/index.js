"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../Controllers");
const auth = (0, express_1.Router)();
auth.post('/register', Controllers_1.register);
exports.default = auth;
